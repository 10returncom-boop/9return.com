# -*- coding: utf-8 -*-
import json, os
WORK = r"D:\_WWW_325_private\MegaMenu一目了然\________325_台灣22縣市重劃區megamenu___________\2026更新_工作區"
rows = json.load(open(os.path.join(WORK,"target_rows.json"), encoding="utf-8"))
# compact TSV
lines = ["序\t縣市\t編碼\t重劃區\t開發類型\t建案名稱\t建商\t戶數\t坪數\t單價\t推出年\t狀態\t來源等級\t網址"]
for r in rows:
    lines.append("\t".join("" if r[k] is None else str(r[k]) for k in
        ["序","縣市","縣市編碼","重劃區名稱","開發類型","建案名稱","建商","戶數","坪數區間","單價區間","推出年","狀態","資料來源等級","資料來源網址"]))
open(os.path.join(WORK,"target_view.tsv"),"w",encoding="utf-8-sig").write("\n".join(lines))
print("written", len(rows))
# Also list distinct 重劃區 names per city
from collections import defaultdict
d = defaultdict(set)
for r in rows:
    d[r["縣市"]].add(r["重劃區名稱"])
for c in d:
    print(c, "->", sorted(d[c]))
