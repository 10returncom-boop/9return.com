# -*- coding: utf-8 -*-
import json, os
from collections import defaultdict
WORK = r"D:\_WWW_325_private\MegaMenu一目了然\________325_台灣22縣市重劃區megamenu___________\2026更新_工作區"
rows = json.load(open(os.path.join(WORK,"target_rows.json"), encoding="utf-8"))
ACTIVE = {"預售","銷售中","興建中","交屋中","新成屋","規劃中","招商中","招商成功/規劃中"}
def yearnum(v):
    try: return int(v)
    except: return None
todo=[]
for r in rows:
    st = (r["狀態"] or "").strip()
    yr = yearnum(r["推出年"])
    active = st in ACTIVE
    new = (yr is not None and yr>=2025)
    if active or new:
        todo.append(r)
print("TODO count:", len(todo))
# group by url
g = defaultdict(list)
for r in todo:
    g[r["資料來源網址"] or "(empty)"].append(r)
for url, rs in g.items():
    print("="*80)
    print(url)
    for r in rs:
        print(f"  序{r['序']} {r['縣市']} [{r['重劃區名稱']}] {r['建案名稱']} | 建商={r['建商']} | 狀態={r['狀態']} | 推出年={r['推出年']}")
# save todo
json.dump(todo, open(os.path.join(WORK,"todo.json"),"w",encoding="utf-8"), ensure_ascii=False, indent=1)
