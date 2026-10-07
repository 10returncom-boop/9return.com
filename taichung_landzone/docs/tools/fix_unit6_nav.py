# -*- coding: utf-8 -*-
"""一次性全站導覽修正：單元六 由 西屯區 → 南屯區（研究確認：大慶地區自辦單元，併入十三期）。
僅處理仍含「西屯區・單元六」舊樣式的頁面；已修正檔（主骨架）自動跳過（幂等）。
用法：python fix_unit6_nav.py
"""
import glob, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))   # ...\docs\tools
BASE = os.path.dirname(os.path.dirname(ROOT))        # D:\_WWW_325\taichung_redevelopment_guide

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    old = c
    # 1) mega：西屯區 ul 移除 單元六
    if 'taichung_unit6_zone' not in c:
        return False, 0
    # 西屯區列（zones 版）
    c = c.replace('<li><a href="taichung_unit1_zone.html">單元一</a></li><li><a href="taichung_unit6_zone.html">單元六</a></li>',
                  '<li><a href="taichung_unit1_zone.html">單元一</a></li>')
    # 西屯區列（projects 版）
    c = c.replace('<li><a href="../zones/taichung_unit1_zone.html">單元一</a></li><li><a href="../zones/taichung_unit6_zone.html">單元六</a></li>',
                  '<li><a href="../zones/taichung_unit1_zone.html">單元一</a></li>')
    # 2) mega：南屯區 ul 加入 單元六（若尚未有）
    if not re.search(r'<li><a href="(\.\./zones/)?taichung_unit6_zone\.html">單元六</a></li>', c):
        c = c.replace('<li><a href="taichung_unit5_zone.html">單元五</a></li><li><a href="taichung_lingdong_area.html">嶺東特區</a></li>',
                      '<li><a href="taichung_unit5_zone.html">單元五</a></li><li><a href="taichung_unit6_zone.html">單元六</a></li><li><a href="taichung_lingdong_area.html">嶺東特區</a></li>')
        c = c.replace('<li><a href="../zones/taichung_unit5_zone.html">單元五</a></li><li><a href="../zones/taichung_lingdong_area.html">嶺東特區</a></li>',
                      '<li><a href="../zones/taichung_unit5_zone.html">單元五</a></li><li><a href="../zones/taichung_unit6_zone.html">單元六</a></li><li><a href="../zones/taichung_lingdong_area.html">嶺東特區</a></li>')
    # 3) drawer：移除 西屯區・單元六 行
    c = re.sub(r'\s*<a class="drawer-link" href="(\.\./zones/)?taichung_unit6_zone\.html">西屯區・單元六</a>', '', c)
    # 4) drawer：在 南屯區・單元五 後補 南屯區・單元六（若尚未有）
    if not re.search(r'<a class="drawer-link" href="(\.\./zones/)?taichung_unit6_zone\.html">南屯區・單元六</a>', c):
        c = c.replace('<a class="drawer-link" href="taichung_unit5_zone.html">南屯區・單元五</a>',
                      '<a class="drawer-link" href="taichung_unit5_zone.html">南屯區・單元五</a>\n  <a class="drawer-link" href="taichung_unit6_zone.html">南屯區・單元六</a>')
        c = c.replace('<a class="drawer-link" href="../zones/taichung_unit5_zone.html">南屯區・單元五</a>',
                      '<a class="drawer-link" href="../zones/taichung_unit5_zone.html">南屯區・單元五</a>\n  <a class="drawer-link" href="../zones/taichung_unit6_zone.html">南屯區・單元六</a>')
    if c != old:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        return True, 1
    return False, 0

changed = 0
for pattern in ('zones/*.html', 'projects/*.html'):
    for p in glob.glob(os.path.join(BASE, pattern)):
        if os.path.basename(p).startswith('_TEMPLATE'):
            continue
        ok, n = fix_file(p)
        if ok:
            changed += n
            print('FIXED', p)
print('DONE changed_files=%d' % changed)
