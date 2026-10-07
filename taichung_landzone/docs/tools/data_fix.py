# -*- coding: utf-8 -*-
"""整合階段資料正規化（一次性）：
1) 清除 data/*.json 中 img 欄位的多餘 'images/' 前綴（build.py 以裸檔名比對 images\）。
2) 九期下建案（phase9_xinzhonghui 新中匯、phase9_leye_shuangxin 樂業雙心）district 由 beitun → east（九期實屬東區）。
用法：python data_fix.py
"""
import glob, json, os

ROOT = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(os.path.dirname(ROOT))

PROJECT_DISTRICT_FIX = {
    'phase9_xinzhonghui': ('east', '東區'),
    'phase9_leye_shuangxin': ('east', '東區'),
}

changed = []
for pattern in ('zones-*.json', 'projects-*.json'):
    for p in sorted(glob.glob(os.path.join(BASE, 'data', pattern))):
        with open(p, 'r', encoding='utf-8') as f:
            data = json.load(f)
        mod = False
        for item in data:
            if isinstance(item.get('img'), str) and item['img'].startswith('images/'):
                item['img'] = item['img'][len('images/'):]
                mod = True
            pid = item.get('id')
            if pid in PROJECT_DISTRICT_FIX and pattern.startswith('projects'):
                nd, nl = PROJECT_DISTRICT_FIX[pid]
                if item.get('district') != nd:
                    item['district'] = nd
                    item['districtLabel'] = nl
                    item['county'] = nd
                    item['countyLabel'] = nl
                    mod = True
        if mod:
            with open(p, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            changed.append(os.path.basename(p))
print('CHANGED', changed if changed else 'none')
