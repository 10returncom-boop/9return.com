# -*- coding: utf-8 -*-
"""一次性全站導覽修正 #2：九期 由 北屯區 → 東區（研究確認：九期旱溪市地重劃位於東區）。
新增「東區」mega 欄位（置於 南區 與 烏日區 之間）；drawer 改為「東區・九期」。
僅處理仍含「北屯區・九期」舊樣式的檔案（幂等）；含兩份主骨架 _TEMPLATE。
用法：python fix_unit9_nav.py
"""
import glob, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(os.path.dirname(ROOT))

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    if '北屯區・九期' not in c and '>九期</a></li>' not in c:
        return False
    old = c
    # 1) mega：北屯區 ul 移除 九期（zones / projects 兩版本）
    c = c.replace('<li><a href="taichung_beitun_mrt_area.html">機捷特區</a></li><li><a href="taichung_phase9_zone.html">九期</a></li>',
                  '<li><a href="taichung_beitun_mrt_area.html">機捷特區</a></li>')
    c = c.replace('<li><a href="../zones/taichung_beitun_mrt_area.html">機捷特區</a></li><li><a href="../zones/taichung_phase9_zone.html">九期</a></li>',
                  '<li><a href="../zones/taichung_beitun_mrt_area.html">機捷特區</a></li>')
    # 2) mega：新增 東區 欄（南區與烏日區之間）
    if not re.search(r'<li><a href="(\.\./zones/)?taichung_phase9_zone\.html">九期</a></li>', c):
        c = c.replace('<li><a href="taichung_phase13_zone.html">十三期</a></li>\n            </ul></div>\n            <div class="mega-col"><h4><span class="dot" style="background:#4A9078"></span>烏日區</h4><ul>',
                      '<li><a href="taichung_phase13_zone.html">十三期</a></li>\n            </ul></div>\n            <div class="mega-col"><h4><span class="dot" style="background:#5A8F6E"></span>東區</h4><ul>\n              <li><a href="taichung_phase9_zone.html">九期</a></li>\n            </ul></div>\n            <div class="mega-col"><h4><span class="dot" style="background:#4A9078"></span>烏日區</h4><ul>')
        c = c.replace('<li><a href="../zones/taichung_phase13_zone.html">十三期</a></li>\n            </ul></div>\n            <div class="mega-col"><h4><span class="dot" style="background:#4A9078"></span>烏日區</h4><ul>',
                      '<li><a href="../zones/taichung_phase13_zone.html">十三期</a></li>\n            </ul></div>\n            <div class="mega-col"><h4><span class="dot" style="background:#5A8F6E"></span>東區</h4><ul>\n              <li><a href="../zones/taichung_phase9_zone.html">九期</a></li>\n            </ul></div>\n            <div class="mega-col"><h4><span class="dot" style="background:#4A9078"></span>烏日區</h4><ul>')
    # 3) drawer：移除 北屯區・九期 行
    c = re.sub(r'\s*<a class="drawer-link" href="(\.\./zones/)?taichung_phase9_zone\.html">北屯區・九期</a>', '', c)
    # 4) drawer：在 南區・十三期 後補 東區・九期（若尚未有）
    if not re.search(r'<a class="drawer-link" href="(\.\./zones/)?taichung_phase9_zone\.html">東區・九期</a>', c):
        c = c.replace('<a class="drawer-link" href="taichung_phase13_zone.html">南區・十三期</a>',
                      '<a class="drawer-link" href="taichung_phase13_zone.html">南區・十三期</a>\n  <a class="drawer-link" href="taichung_phase9_zone.html">東區・九期</a>')
        c = c.replace('<a class="drawer-link" href="../zones/taichung_phase13_zone.html">南區・十三期</a>',
                      '<a class="drawer-link" href="../zones/taichung_phase13_zone.html">南區・十三期</a>\n  <a class="drawer-link" href="../zones/taichung_phase9_zone.html">東區・九期</a>')
    if c != old:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        return True
    return False

changed = 0
for pattern in ('zones/*.html', 'projects/*.html'):
    for p in glob.glob(os.path.join(BASE, pattern)):
        if fix_file(p):
            changed += 1
            print('FIXED', p)
print('DONE changed_files=%d' % changed)
