# -*- coding: utf-8 -*-
"""
台中重劃區與建案指南 — 建置生成器（build.py）
讀取 data/zones-*.json 與 data/projects-*.json → 產生：
  js/search-index.js（全站單一資料來源：RZ_SITE/RZ_COUNTIES/RZ_DEV_TYPES/RZ_ZONES/TC_PROJECTS/RZ_SEARCH_INDEX/RZ_ORDER）
  sitemap.xml、robots.txt（根目錄）
並做全站驗證：每筆資料的 url 對應檔案存在、img 對應 images 檔存在、
掃描 zones\*.html 與 projects\*.html 的本地連結（../images/、../zones/、../projects/、同資料夾內頁）是否有 404。
用法（PowerShell）：python build.py
idempotent：可重複執行。
"""
import glob, json, os, re, sys, datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
BASE = 'https://example.com/taichung-redevelopment-guide/'
SITE = {
  'name': '台中重劃區與建案指南',
  'shortName': '台中重劃區',
  'slogan': '一區一頁、一建案一頁，大白話看懂台中重劃區',
  'version': '1.0.0',
  'org': '台中重劃區與建案指南編輯部',
  'lang': 'zh-Hant-TW',
  'themeColor': '#0E6B5C'
}
DISTRICTS = [
  ('xitun', '西屯區'), ('nantun', '南屯區'), ('beitun', '北屯區'), ('south', '南區'),
  ('east', '東區'), ('wuri', '烏日區'), ('taiping', '太平區'), ('dali', '大里區'), ('shalu', '沙鹿區'), ('fengyuan', '豐原區')
]
DEV_TYPES = ['公辦市地重劃', '自辦市地重劃', '區段徵收', '新市鎮開發', '特定區計畫', '都市更新']

def load_json(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print('[WARN] 無法讀取', path, '->', e)
        return []

def merge_slices(pattern):
    out = []
    for p in sorted(glob.glob(os.path.join(ROOT, 'data', pattern))):
        out += load_json(p)
    return out

def js_obj(name, data):
    return 'const %s = %s;\n\n' % (name, json.dumps(data, ensure_ascii=False, indent=2))

def build_search_index(zones, projects):
    # 資料正規化：zones 的 county/countyLabel = district/districtLabel；projects 補上 county 相容欄位
    for z in zones:
        z.setdefault('county', z.get('district', 'xitun'))
        z.setdefault('countyLabel', z.get('districtLabel', '西屯區'))
        z.setdefault('status', '發展中')
    for p in projects:
        p.setdefault('district', p.get('county', 'xitun'))
        p.setdefault('districtLabel', p.get('countyLabel', '西屯區'))
        p.setdefault('county', p['district'])
        p.setdefault('countyLabel', p['districtLabel'])
        p.setdefault('status', '待補')
        p.setdefault('price', '待補')
        p.setdefault('year', '待補')
    search_index = zones + projects
    order = [z['id'] for z in zones]
    parts = []
    parts.append('/* ============================================================\n'
                 '   台中重劃區與建案指南 — 全站單一資料來源（由 build.py 產生，勿手改）\n'
                 '   搜尋索引／相關文章／前後篇／收藏／樹狀圖／知識圖譜／建案卡片共用\n'
                 '   部署時請將 RZ_BASE_URL 換成正式網域。\n'
                 '   ============================================================ */\n')
    parts.append("const RZ_BASE_URL = %s;\n\n" % json.dumps(BASE))
    parts.append(js_obj('RZ_SITE', SITE))
    parts.append(js_obj('RZ_COUNTIES', [{'key': k, 'label': v} for k, v in DISTRICTS]))
    parts.append(js_obj('RZ_DEV_TYPES', DEV_TYPES))
    parts.append(js_obj('RZ_ZONES', zones))
    parts.append(js_obj('TC_PROJECTS', projects))
    parts.append(js_obj('RZ_SEARCH_INDEX', search_index))
    parts.append(js_obj('RZ_ORDER', order))
    with open(os.path.join(ROOT, 'js', 'search-index.js'), 'w', encoding='utf-8') as f:
        f.write(''.join(parts))
    print('search-index.js 產生：zones=%d projects=%d search=%d' % (len(zones), len(projects), len(search_index)))

def build_sitemap(pages):
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url, prio in pages:
        lines.append('  <url><loc>%s</loc><lastmod>2026-10-06</lastmod><priority>%s</priority></url>' % (url, prio))
    lines.append('</urlset>')
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('sitemap.xml 產生：%d URLs' % len(pages))

def build_robots():
    txt = 'User-agent: *\nAllow: /\nSitemap: %ssitemap.xml\n' % BASE
    with open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write(txt)
    print('robots.txt 產生')

def validate(zones, projects):
    problems = []
    imgs = set(os.listdir(os.path.join(ROOT, 'images')))
    for z in zones:
        fp = os.path.join(ROOT, z['url'])
        if not os.path.exists(fp):
            problems.append('[ZONE MISSING PAGE] %s -> %s' % (z.get('id'), z['url']))
        if z.get('img') and z['img'] not in imgs:
            problems.append('[ZONE MISSING IMG] %s -> images/%s' % (z.get('id'), z['img']))
    for p in projects:
        fp = os.path.join(ROOT, p['url'])
        if not os.path.exists(fp):
            problems.append('[PROJECT MISSING PAGE] %s -> %s' % (p.get('id'), p['url']))
        if p.get('img') and p['img'] not in imgs:
            problems.append('[PROJECT MISSING IMG] %s -> images/%s' % (p.get('id'), p['img']))
    # 掃描各頁本地連結
    html_files = glob.glob(os.path.join(ROOT, 'zones', '*.html')) + glob.glob(os.path.join(ROOT, 'projects', '*.html')) \
               + [os.path.join(ROOT, 'index.html'), os.path.join(ROOT, 'all_zone_search.html'),
                  os.path.join(ROOT, 'favorite_zone_list.html'), os.path.join(ROOT, 'about_rezone_guide.html')]
    for hf in html_files:
        try:
            with open(hf, 'r', encoding='utf-8') as f:
                html = f.read()
        except Exception:
            continue
        for m in re.finditer(r'(?:src|href)="(\.\./)?(images|zones|projects)/([^"#]+\.(?:jpg|jpeg|webp|png|html))"', html):
            folder, sub, name = m.group(1) or '', m.group(2), m.group(3)
            base = ROOT if folder else os.path.dirname(hf)
            if not os.path.exists(os.path.join(base, sub, name)):
                problems.append('[LINK 404] %s -> %s/%s' % (os.path.basename(hf), sub, name))
        for m in re.finditer(r'href="([^"#]+\.html)"', html):
            target = m.group(1)
            if target.startswith(('http://', 'https://', 'mailto:')):
                continue
            parts = target.split('/')
            base = os.path.dirname(hf)
            for part in parts[:-1]:
                if part == '..':
                    base = os.path.dirname(base)
                else:
                    base = os.path.join(base, part)
            if not os.path.exists(os.path.join(base, parts[-1])):
                problems.append('[LINK 404] %s -> %s' % (os.path.basename(hf), target))
    if problems:
        print('==== 驗證問題（%d 筆）====' % len(problems))
        for p in problems[:60]:
            print(p)
        with open(os.path.join(ROOT, 'build_log.txt'), 'a', encoding='utf-8') as f:
            f.write('\n'.join(problems) + '\n')
        return False
    print('驗證通過：無 404、無缺圖、無缺頁')
    return True

def main():
    zones = merge_slices('zones-*.json')
    projects = merge_slices('projects-*.json')
    build_search_index(zones, projects)
    pages = [(BASE + 'index.html', '1.0'), (BASE + 'all_zone_search.html', '0.8'),
             (BASE + 'favorite_zone_list.html', '0.5'), (BASE + 'about_rezone_guide.html', '0.5'),
             (BASE + 'zones/index.html', '0.9'), (BASE + 'projects/index.html', '0.9')]
    for z in zones:
        pages.append((BASE + z['url'], '0.8'))
    for p in projects:
        pages.append((BASE + p['url'], '0.6'))
    build_sitemap(pages)
    build_robots()
    ok = validate(zones, projects)
    print('BUILD DONE ok=%s' % ok)
    return 0 if ok else 2

if __name__ == '__main__':
    sys.exit(main())
