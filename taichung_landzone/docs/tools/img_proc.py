# -*- coding: utf-8 -*-
"""台灣重劃區指南 — 共享圖片處理腳本
用法（Windows PowerShell，務必用 UTF-8 讀寫）：
    python img_proc.py dl <url> <out_path>                # 下載到本地
    python img_proc.py compress <in_path> <out_path> [max_side] [quality]
    python img_proc.py one <url> <out_path> [max_side] [quality]   # 下載+壓縮一步完成
規則：產出 JPEG/WebP，max_side 預設 1600、品質 82，壓縮後 < 400KB 為佳。
"""
import sys, io, os, urllib.request

def download(url, out):
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as r, open(out, 'wb') as f:
        f.write(r.read())
    print('downloaded', os.path.getsize(out), 'bytes ->', out)

def compress(inp, out, max_side=1600, quality=82):
    from PIL import Image
    im = Image.open(inp)
    if im.mode in ('RGBA', 'P', 'LA'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    elif im.mode != 'RGB':
        im = im.convert('RGB')
    w, h = im.size
    if max(w, h) > max_side:
        r = max_side / max(w, h)
        im = im.resize((int(w * r), int(h * r)), Image.LANCZOS)
    ext = os.path.splitext(out)[1].lower()
    if ext in ('.webp',):
        im.save(out, 'WEBP', quality=quality, method=6)
    else:
        im.save(out, 'JPEG', quality=quality, optimize=True, progressive=True)
    print('compressed', os.path.getsize(out), 'bytes ->', out, im.size)

if __name__ == '__main__':
    args = sys.argv
    if len(args) >= 4 and args[1] == 'dl':
        download(args[2], args[3])
    elif len(args) >= 4 and args[1] == 'compress':
        ms = int(args[4]) if len(args) > 4 else 1600
        q = int(args[5]) if len(args) > 5 else 82
        compress(args[2], args[3], ms, q)
    elif len(args) >= 4 and args[1] == 'one':
        ms = int(args[4]) if len(args) > 4 else 1600
        q = int(args[5]) if len(args) > 5 else 82
        tmp = out = args[3]
        download(args[2], tmp)
        compress(tmp, out, ms, q)
    else:
        print(__doc__)
