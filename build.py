#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
9return.com Build Script
- 自動掃描全站 HTML，生成 sitemap.xml
- 比對狀態檔，找出新增/變更的 URL
- 主動推送 Baidu（百度資源平台）
- 推送 IndexNow（Bing / Yandex / Seznam）
- 可搭配 GitHub Actions 或本地排程執行
"""

import os
import re
import json
import hashlib
import urllib.request
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path

# ===== 路徑設定 =====
ROOT = Path(__file__).resolve().parent
CONFIG_FILE = ROOT / "build_config.json"
STATE_FILE = ROOT / "build_state.json"
SITEMAP_FILE = ROOT / "sitemap.xml"
ROBOTS_FILE = ROOT / "robots.txt"

# ===== 載入設定 =====
def load_config():
    if not CONFIG_FILE.exists():
        # 首次使用：建立預設設定檔
        default = {
            "site_url": "https://9return.com",
            "baidu": {
                "site": "https://9return.com",
                "token": "YOUR_BAIDU_TOKEN_HERE",
                "enabled": False
            },
            "indexnow": {
                "host": "9return.com",
                "key": "",
                "key_location": "",
                "enabled": False
            }
        }
        CONFIG_FILE.write_text(json.dumps(default, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"[設定] 已建立預設設定檔：{CONFIG_FILE}")
        print("[設定] 請填入 Baidu token 與 IndexNow key 後再啟用推送")
        return default
    return json.loads(CONFIG_FILE.read_text(encoding="utf-8"))

# ===== 載入狀態 =====
def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {"urls": {}}  # { url: {"lastmod": "YYYY-MM-DD", "pushed_baidu": false, "pushed_indexnow": false} }

def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")

# ===== 掃描全站 HTML =====
def scan_html_files():
    """掃描所有 index.html 與主要文章頁，回傳 {相對路徑: lastmod}"""
    pages = {}
    
    # 主要目錄（每個子目錄的 index.html）
    for d in sorted(ROOT.iterdir()):
        if d.is_dir() and not d.name.startswith('.') and d.name != 'assets':
            idx = d / "index.html"
            if idx.exists():
                rel = f"/{d.name}/"
                pages[rel] = datetime.fromtimestamp(idx.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")
    
    # 根目錄 index.html
    root_idx = ROOT / "index.html"
    if root_idx.exists():
        pages["/"] = datetime.fromtimestamp(root_idx.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")
    
    # 掃描 taiwan-land-rezone 的子目錄 HTML
    land_dir = ROOT / "taiwan-land-rezone"
    if land_dir.exists():
        for f in sorted(land_dir.glob("*.html")):
            if f.name == "index.html":
                continue
            # 過濾測試/備份檔
            if f.name.startswith('.') or '-' in f.stem and f.stem.endswith('-'):
                continue
            rel = f"/taiwan-land-rezone/{urllib.parse.quote(f.name)}"
            pages[rel] = datetime.fromtimestamp(f.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")
    
    return pages

# ===== 生成 sitemap.xml =====
def generate_sitemap(pages, site_url):
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    for rel_path, lastmod in sorted(pages.items()):
        full_url = site_url.rstrip("/") + rel_path
        # 根目錄優先 1.0，其他子目錄 0.8，內頁 0.6
        if rel_path == "/":
            priority = "1.0"
            freq = "weekly"
        elif rel_path.count("/") == 1:
            priority = "0.8"
            freq = "weekly"
        else:
            priority = "0.6"
            freq = "monthly"
        
        lines.append(f"  <url>")
        lines.append(f"    <loc>{full_url}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append(f"  </url>")
    
    lines.append('</urlset>')
    SITEMAP_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"[Sitemap] 已生成：{SITEMAP_FILE}（{len(pages)} 個 URL）")

# ===== 生成 robots.txt =====
def generate_robots(site_url):
    content = f"""User-agent: *
Allow: /

Sitemap: {site_url.rstrip('/')}/sitemap.xml
"""
    ROBOTS_FILE.write_text(content, encoding="utf-8")
    print(f"[robots.txt] 已更新")

# ===== Baidu 主動推送 =====
def push_baidu(urls_to_push, config):
    baidu_cfg = config.get("baidu", {})
    if not baidu_cfg.get("enabled"):
        print("[Baidu] 未啟用，跳過推送")
        return
    
    token = baidu_cfg.get("token", "")
    site = baidu_cfg.get("site", config["site_url"])
    if not token or token == "YOUR_BAIDU_TOKEN_HERE":
        print("[Baidu] token 未設定，跳過推送")
        return
    
    api_url = f"http://data.zz.baidu.com/urls?site={urllib.parse.quote(site)}&token={token}"
    
    # Baidu 限制每次最多 2000 條 URL
    batch_size = 2000
    for i in range(0, len(urls_to_push), batch_size):
        batch = urls_to_push[i:i+batch_size]
        body = "\n".join(batch).encode("utf-8")
        req = urllib.request.Request(
            api_url,
            data=body,
            headers={"Content-Type": "text/plain"},
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                print(f"[Baidu] 推送 {len(batch)} 條 → 成功收錄：{result.get('success', 0)}，剩餘配額：{result.get('remain', 'N/A')}")
        except Exception as e:
            print(f"[Baidu] 推送失敗：{e}")

# ===== IndexNow 推送 =====
def push_indexnow(urls_to_push, config):
    in_cfg = config.get("indexnow", {})
    if not in_cfg.get("enabled"):
        print("[IndexNow] 未啟用，跳過推送")
        return
    
    key = in_cfg.get("key", "")
    host = in_cfg.get("host", "9return.com")
    if not key:
        print("[IndexNow] key 未設定，跳過推送")
        return
    
    payload = {
        "host": host,
        "key": key,
        "keyLocation": in_cfg.get("key_location", f"https://{host}/{key}.txt"),
        "urlList": urls_to_push
    }
    
    # IndexNow 支援多個引擎：api.indexnow.org（Bing/Yandex/Seznam）
    api_url = "https://api.indexnow.org/indexnow"
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        api_url,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            code = resp.getcode()
            if code == 200 or code == 202:
                print(f"[IndexNow] 推送 {len(urls_to_push)} 條成功（HTTP {code}）")
            else:
                print(f"[IndexNow] 回應 HTTP {code}")
    except urllib.error.HTTPError as e:
        print(f"[IndexNow] 失敗：HTTP {e.code} - {e.read().decode('utf-8', errors='replace')[:200]}")
    except Exception as e:
        print(f"[IndexNow] 錯誤：{e}")

# ===== 主流程 =====
def main():
    print("=" * 50)
    print(f"9return.com Build Script - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)
    
    config = load_config()
    state = load_state()
    site_url = config["site_url"]
    
    # 1. 掃描全站
    pages = scan_html_files()
    print(f"[掃描] 找到 {len(pages)} 個 HTML 頁面")
    
    # 2. 生成 sitemap.xml + robots.txt
    generate_sitemap(pages, site_url)
    generate_robots(site_url)
    
    # 3. 比對狀態，找出需推送的 URL
    existing = state.get("urls", {})
    new_urls = []
    changed_urls = []
    
    for rel_path, lastmod in pages.items():
        full_url = site_url.rstrip("/") + rel_path
        if full_url not in existing:
            new_urls.append(full_url)
            state["urls"][full_url] = {"lastmod": lastmod, "pushed_baidu": False, "pushed_indexnow": False}
        elif existing[full_url].get("lastmod") != lastmod:
            changed_urls.append(full_url)
            state["urls"][full_url]["lastmod"] = lastmod
            state["urls"][full_url]["pushed_baidu"] = False
            state["urls"][full_url]["pushed_indexnow"] = False
    
    to_push = new_urls + changed_urls
    print(f"[狀態] 新增 {len(new_urls)} 個 URL，變更 {len(changed_urls)} 個 URL")
    
    if to_push:
        print(f"[推送] 待推送 URL 清單：")
        for u in to_push:
            print(f"  → {u}")
        
        # 4. 推送 Baidu
        push_baidu(to_push, config)
        for u in to_push:
            state["urls"][u]["pushed_baidu"] = True
        
        # 5. 推送 IndexNow
        push_indexnow(to_push, config)
        for u in to_push:
            state["urls"][u]["pushed_indexnow"] = True
    else:
        print("[推送] 無新增/變更 URL，不需推送")
    
    # 6. 儲存狀態
    save_state(state)
    print(f"[完成] 狀態已儲存：{STATE_FILE}")

if __name__ == "__main__":
    main()
