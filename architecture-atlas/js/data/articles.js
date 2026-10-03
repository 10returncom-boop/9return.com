/* ============================================================
   articles.js — 100 篇世界建築史專業內文 data
   世界建築史 · Architecture Atlas
   結構：title / en / style / region / cat / era / summary /
        body(段落) / buildings / architects / terms / keywords / img / featured
   ============================================================ */
window.ARCH_ARTICLES = [
/* ========== 古文明建築 ancient (1–16) ========== */
{
 id:1, title:'吉薩金字塔群', en:'Giza Pyramid Complex', style:'古埃及', region:'非洲', cat:'ancient', era:'前2580–前2560', featured:true,
 img:'images/giza_pyramid_ancient_egypt.webp', summary:'古埃及第四王朝法老於吉薩高原興建的三大金字塔，人類建築史上最宏偉的巨石工程之一，也是現存僅存的古代世界七大奇蹟。',
 milestone:'砌築約二百三十萬塊巨石，底座對齊正北誤差僅十五公分，樹立古埃及天文測量的精準典範',
 body:[
  '吉薩金字塔群坐落於開羅西南方高原，由胡夫（Khufu）、卡夫拉（Khafre）與孟卡拉（Menkaure）三座大金字塔及其附屬神廟、獅身人面像組成。胡夫大金字塔原高約146.6 公尺，以約230 萬塊平均 2.5 噸的石塊砌築，其內部的升殿、皇后殿與大走廊展現了古埃及工程師對幾何與荷重的精準掌握。',
  '金字塔的朝向與正北幾乎完全對齊，底座四邊誤差僅約 15 公分，顯示古埃及人已具備先進的天文觀測與測量技術。其建造過程至今仍是爭論焦點，主流學說認為透過斜坡、滑橇與大批勞動力的協作，在約 20 年內完成。',
  '在宗教意義上，金字塔是法老通往永生的階梯，朝向太陽與星辰的祭儀空間。它同時是國家的經濟與社會組織中心，周邊設有工人村、麵包坊與工匠聚落，見證了古王國時代高度中央集權的國家機器。'
 ],
 buildings:['胡夫大金字塔','卡夫拉金字塔','孟卡拉金字塔','獅身人面像'],
 buildingsEn:['Great Pyramid of Khufu','Pyramid of Khafre','Pyramid of Menkaure','Sphinx'],
 architects:['伊姆霍特普（傳統所歸）','胡夫之子海米烏努（一說）'],
 architectsEn:['Imhotep (traditionally attributed)','Hemiunu, son of Khufu (one account)'],
 terms:[{t:'金字塔',d:'古埃及法老陵墓的方錐體巨石建築，象徵太陽光芒與通往永生之路'},{t:'大走廊',d:'胡夫金字塔內部的大型斜頂石造通道，通往法老墓室'}],
 keywords:['埃及','吉薩','法老','巨石','世界奇蹟']
},
{
 id:2, title:'卡納克神廟', en:'Karnak Temple Complex', style:'古埃及', region:'非洲', cat:'ancient', era:'前2000–前300', featured:true,
 img:'images/karnak_temple_complex_egypt.webp', summary:'底比斯規模最龐大的神廟建築群，歷經 2000 年擴建，其巨型柱廳為古埃及建築雄渾之最。',
 milestone:'以一百三十四根逾二十公尺巨柱撐起多柱廳，將紙莎草叢林化為柱列式神聖空間',
 body:[
  '卡納克神廟位於尼羅河東岸的底比斯（今盧克索），是供奉太陽神阿蒙的國家級神廟。整個建築群歷經中王國至托勒密時代長達約 2000 年的增建，占地超過 100 公頃，包含柱廳、方尖碑、聖湖與多座附屬神廟。',
  '其中最具震撼力的是多柱廳（Great Hypostyle Hall），以 134 根高達 20 公尺以上的巨柱支撐石造天花板，柱身滿布浮雕，模擬紙莎草叢林般的聖境氛圍。密集的柱列在日光與陰影間形成強烈的節奏，是古埃及柱式建築的巔峰。',
  '神廟的擴建紀錄本身即是古埃及政治與宗教史的縮影，各朝法老競相在此留下銘刻。每年舉行祭祀阿蒙、穆特與孔斯三位一體神祇的儀典，形成信仰與權力的中心，也深刻影響了希臘與後世神廟空間的佈局。'
 ],
 buildings:['多柱廳','聖湖','圖特摩斯三世節慶廳','方尖碑'],
 buildingsEn:['Hypostyle Hall','Sacred Lake','Festival Hall of Thutmose III','Obelisk'],
 architects:['歷代法老與祭司集團'],
 architectsEn:['Successive pharaohs and the college of priests'],
 terms:[{t:'多柱廳',d:'由密集石柱支撐的大型殿堂，古埃及神廟代表性空間'},{t:'方尖碑',d:'整塊花崗岩雕成的尖頂石碑，象徵太陽神的光線'}],
 keywords:['埃及','盧克索','阿蒙','神廟','柱廳']
},
{
 id:3, title:'阿布辛貝神廟', en:'Abu Simbel Temples', style:'古埃及', region:'非洲', cat:'ancient', era:'前1264', featured:false,
 img:'images/abu_simbel_rock_temple.webp', summary:'拉美西斯二世於努比亞山壁鑿出的巨型岩窟神廟，1960 年代因興建水壩而整體遷移，成為國際保護文物的典範。',
 milestone:'於砂岩崖整體鑿出岩窟神廟，並以方位設計使旭日每年精準照亮內殿四尊神像',
 body:[
  '阿布辛貝神廟由拉美西斯二世於約西元前 1264 年下令鑿建於砂岩崖壁，用以震懾南方努比亞並祭祀太陽神。廟前矗立四尊高約 20 公尺的拉美西斯巨型坐像，入口上方尚有太陽神雕像，氣勢磅礡。',
  '神廟的「太陽奇蹟」設計令人驚嘆：每年二月與十月，旭日會精準穿透內殿，照亮後牆的四尊神像。這顯示古埃及建築師對太陽軌跡與方位幾何有極高的掌握。',
  '1960 年代埃及興建亞斯文水壩，神廟面臨淹沒。聯合國教科文組織發起國際搶救行動，將整座神廟切割後遷移至約 65 公尺高的新址重組，開創了全球跨國文物保護的先例，也促使世界遺產保護意識興起。'
 ],
 buildings:['大廟','小廟（供奉哈索爾）'],
 buildingsEn:['Great Temple','Small Temple (dedicated to Hathor)'],
 architects:['拉美西斯二世的皇家建築師'],
 architectsEn:['Royal architects of Ramesses II'],
 terms:[{t:'岩窟神廟',d:'自山壁鑿挖而成的神廟，立面與內殿一體成形'},{t:'太陽奇蹟',d:'特定日期陽光精準照亮內殿神像的建築天文現象'}],
 keywords:['埃及','拉美西斯二世','岩窟','太陽奇蹟','世界遺產']
},
{
 id:4, title:'薩卡拉階梯金字塔', en:'Step Pyramid of Djoser', style:'古埃及', region:'非洲', cat:'ancient', era:'前2667–前2648', featured:false,
 img:'images/djoser_step_pyramid_saqqara.webp', summary:'史上第一座石造金字塔，建築師伊姆霍特普以六層階梯結構開創了金字塔時代。',
 milestone:'由伊姆霍特普首創六層階梯石造陵墓，帶動古埃及從泥磚邁向紀念性石材時代',
 body:[
  '薩卡拉階梯金字塔是第三王朝法老左塞爾（Djoser）的陵墓，約建於西元前 27 世紀，被視為人類最早的巨型石造建築之一。它由六層依序遞減的矩形石階疊成，高約 60 公尺，象徵通往天界的階梯。',
  '其建築師伊姆霍特普被後世尊為醫學與建築之神，他以小塊石料模仿泥磚與蘆葦結構的細節，完成了從泥磚到石材的技術躍進。周邊附屬的祭廟、庭院與圍牆構成完整的葬儀建築群。',
  '這座金字塔的出現標誌著古埃及建築從簡樸的泥磚陵墓正式邁入紀念性石造建築的時代，其層疊形式與建築群規劃深刻影響了日後吉薩時代的金字塔發展。'
 ],
 buildings:['左塞爾金字塔','葬祭廟','北墓與庭院'],
 buildingsEn:['Step Pyramid of Djoser','Mortuary Temple','North Tomb and Courtyard'],
 architects:['伊姆霍特普'],
 architectsEn:['Imhotep'],
 terms:[{t:'階梯金字塔',d:'以逐層遞減的石階構成的金字塔，金字塔發展的早期形式'},{t:'葬祭廟',d:'位於金字塔旁用於祭祀亡者的神廟'}],
 keywords:['埃及','左塞爾','伊姆霍特普','階梯','石造']
},
{
 id:5, title:'人面獅身像', en:'Great Sphinx of Giza', style:'古埃及', region:'非洲', cat:'ancient', era:'前2500', featured:false,
 img:'images/giza_sphinx_limestone_guardian.webp', summary:'以整塊石灰岩雕刻的巨大獅身人面像，守護吉薩金字塔群，其謎樣身世與風化問題至今引人關注。',
 milestone:'以單一石灰岩岩體雕成長逾七十公尺的臥姿巨像，化身法老的智慧與神性守護',
 body:[
  '獅身人面像位於吉薩高原，為一座臥姿獅身、頭戴王室頭巾的人面巨像，長約 73 公尺、高約 20 公尺，多數學者認為其面容對應卡夫拉法老，約建於西元前 2500 年。',
  '它由開採金字塔石料後留下的天然石灰岩岩體雕成，獅身象徵力量與守護，人面則代表法老的智慧與神性。身前的夢石碑記載了圖特摩斯四世「夢中受命」修復獅身人面像的傳說。',
  '數千年來，獅身人面像飽受風蝕與地下水侵蝕，曾多次被沙掩埋，直至近代才重見天日。其鼻子失蹤之謎、以及修復工程對原始面貌的影響，都是考古與文物保護領域持續討論的課題。'
 ],
 buildings:['獅身人面像','夢石碑'],
 buildingsEn:['Sphinx','Dream Stele'],
 architects:['不詳（傳為卡夫拉）'],
 architectsEn:['Unknown (traditionally attributed to Khafre)'],
 terms:[{t:'獅身人面像',d:'獅身與人面結合的巨型雕像，常見於埃及與近東文明'},{t:'夢石碑',d:'刻有圖特摩斯四世夢境的石碑，記錄修復獅身人面像的緣起'}],
 keywords:['埃及','吉薩','卡夫拉','獅身','守護']
},
{
 id:6, title:'美索不達米亞塔廟', en:'Mesopotamian Ziggurat', style:'古埃及', region:'中東', cat:'ancient', era:'前3000–前500', featured:false,
 img:'images/mesopotamian_ziggurat_ancient_ur.webp', summary:'兩河流域以泥磚層層疊起的階梯形神塔，是通往天庭的聖山，也是聖經巴別塔傳說的原型。',
 milestone:'以泥磚層層疊築出階梯形神塔，豎立凡人通往天庭的聖山，啟發後世高塔想像',
 body:[
  '塔廟（Ziggurat）是美索不達米亞文明最具代表性的紀念性建築，由蘇美人、巴比倫人與亞述人興建。它以曬乾泥磚與燒磚層層砌築，形成逐層遞減的階梯形高台，頂端設有神龕，被視為凡人通往天庭的階梯。',
  '最著名的烏爾大塔廟（Ziggurat of Ur）高約 30 公尺，底座達 64×46 公尺，以精巧的磚砌與排水系統營造神聖的祭祀空間。塔廟亦擔負天文觀測與行政功能，是城邦宗教與政治的中心。',
  '聖經中「巴別塔」的記載普遍被認為取材自巴比倫的埃特曼南基塔廟。塔廟的階梯式體量與垂直性，深刻影響了後世金字塔與紀念性高塔的空間想像。'
 ],
 buildings:['烏爾大塔廟','巴比倫埃特曼南基塔廟','楚格扎納比爾塔廟'],
 buildingsEn:['Ziggurat of Ur','Etemenanki Ziggurat (Babylon)','Ziggurat of Chogha Zanbil'],
 architects:['城邦祭司與王室營造師'],
 architectsEn:['City-state priesthood and royal builders'],
 terms:[{t:'塔廟',d:'美索不達米亞階梯形神塔，頂端設神龕'},{t:'巴別塔',d:'聖經所載人類欲通天的高塔，一般認為源自巴比倫塔廟'}],
 keywords:['兩河流域','蘇美','烏爾','塔廟','泥磚']
},
{
 id:7, title:'巴比倫城與空中花園', en:'Babylon & Hanging Gardens', style:'古埃及', region:'中東', cat:'ancient', era:'前600', featured:false,
 img:'images/babylon_hanging_gardens_legend.webp', summary:'古代世界最富盛名的都城之一，伊什塔爾門的彩釉磚牆與傳說中的空中花園使其成為傳奇。',
 milestone:'以拱頂結構與階梯灌溉構想傳說中的空中花園，展現巴比倫高超的拱券與水利工程',
 body:[
  '巴比倫城位於今伊拉克境內幼發拉底河畔，新巴比倫王國時期（約前 600）達到鼎盛。城市以宏偉的雙重城牆與眾多塔廟環繞，其中最著名的是飾滿彩釉磚浮雕的伊什塔爾門（Ishtar Gate）。',
  '伊什塔爾門以深藍釉磚為底，鑲嵌金色與彩色的龍、公牛與獅子浮雕，象徵巴比倫的守護神祇。其華麗的釉面磚工藝與儀式大道構成古代近東最壯觀的城門景觀，今大部分原件收藏於柏林佩加蒙博物館。',
  '被列為古代世界七大奇蹟的「空中花園」，傳說由尼布甲尼撒二世為思念故鄉的王妃而建，以拱頂結構與階梯式綠植營造懸浮花園。因缺乏明確考古證據，其真實樣貌至今仍是謎，但相關的拱券與灌溉技術反映了巴比倫工程的高度。'
 ],
 buildings:['伊什塔爾門','儀式大道','空中花園（傳說）'],
 buildingsEn:['Ishtar Gate','Processional Way','Hanging Gardens (legendary)'],
 architects:['尼布甲尼撒二世的皇家營造師'],
 architectsEn:['Royal builders of Nebuchadnezzar II'],
 terms:[{t:'伊什塔爾門',d:'巴比倫城北門，以彩釉磚浮雕裝飾的宏偉城門'},{t:'空中花園',d:'傳說中的階梯式植栽花園，古代世界七大奇蹟之一'}],
 keywords:['巴比倫','美索不達米亞','伊什塔爾門','空中花園','釉磚']
},
{
 id:8, title:'帕德嫩神廟', en:'Parthenon', style:'古希臘', region:'歐洲', cat:'ancient', era:'前447–前432', featured:true,
 img:'images/parthenon_acropolis_athens_greece.webp', summary:'雅典衛城上的多立克柱式神廟，希臘古典建築的完美典範，其視覺修正與比例堪稱精確至極。',
 milestone:'以多立克柱式與嚴密數學比例構築，成為後世西方古典美學與比例觀念的源頭',
 body:[
  '帕德嫩神廟興建於西元前 447–432 年，供奉雅典娜女神，由雕刻家菲迪亞斯總監、建築師伊克提諾斯與卡利克拉特設計。它採用多立克柱式，長邊八柱、短邊十七柱，整體以數學比例構築。',
  '神廟最著名的技術成就在於細微的「視覺修正」：立柱略向內傾、柱身具有微妙凸脹，台基微微上拱，以矯正人眼觀看直線時的視覺錯覺，使建築顯得絕對平直。這些以公分計的調整，被譽為古典建築的黃金標準。',
  '神廟曾作為教堂、清真寺與軍火庫，1687 年因砲擊爆炸而嚴重受損，大量浮雕被掠至大英博物館。它不僅是希臘建築的象徵，更是西方美學與比例觀念的源頭。'
 ],
 buildings:['帕德嫩神廟','衛城山門','厄瑞克忒翁神廟'],
 buildingsEn:['Parthenon','Propylaea of the Acropolis','Erechtheion'],
 architects:['伊克提諾斯','卡利克拉特','菲迪亞斯（雕刻總監）'],
 architectsEn:['Ictinus','Kallikrates','Phidias (director of sculpture)'],
 terms:[{t:'多立克柱式',d:'古希臘最早且最簡樸的柱式，柱頭無裝飾'},{t:'視覺修正',d:'為矯正視覺錯覺而對直線所做的細微弧度調整'}],
 keywords:['希臘','雅典衛城','雅典娜','多立克','比例']
},
{
 id:9, title:'埃皮達魯斯劇場', en:'Theatre of Epidaurus', style:'古希臘', region:'歐洲', cat:'ancient', era:'前4世紀', featured:false,
 img:'images/epidaurus_theatre_ancient_greece.webp', summary:'保存最完好的古希臘劇場，其扇形觀眾席與卓越聲學設計使後排仍能清晰聽到台上耳語。',
 milestone:'依山展開扇形觀眾席與半圓樂池，容納約一萬四千觀眾，奠定現代劇場空間格局',
 body:[
  '埃皮達魯斯劇場建於西元前 4 世紀，位於伯羅奔尼撒半島的醫神聖地。它依山坡而建，觀眾席呈巨大的扇形展開，分為上下兩區共約 55 排，可容納約 1.4 萬名觀眾。',
  '劇場最為人稱道的是其聲學奇蹟：即使坐在最上排，也能清楚聽見舞台中央細微的聲響。這得益於碗狀的幾何形狀、石灰岩座椅的反射特性，以及與地形的高度契合。',
  '古希臘劇場是城邦公共生活與戲劇節慶的核心空間，其半圓形樂池（orchestra）與階梯式觀眾席（theatron）構成了現代劇場空間的雛形，也體現了希臘人對聲學、比例與群眾體驗的高度重視。'
 ],
 buildings:['埃皮達魯斯劇場','醫神聖殿'],
 buildingsEn:['Theatre of Epidaurus','Sanctuary of Asclepius (Asclepieion)'],
 architects:['波呂克勒托斯（傳）'],
 architectsEn:['Polykleitos (traditionally attributed)'],
 terms:[{t:'劇場',d:'古希臘依山而建的半圓形露天劇場'},{t:'聲學設計',d:'透過幾何形狀與材質使聲音均勻傳播的設計'}],
 keywords:['希臘','劇場','聲學','扇形','露天']
},
{
 id:10, title:'奧林匹亞宙斯神廟', en:'Temple of Zeus at Olympia', style:'古希臘', region:'歐洲', cat:'ancient', era:'前470–前456', featured:false,
 img:'images/olympia_temple_zeus_greece.webp', summary:'奧林匹亞聖地的多立克神廟，曾供奉由菲迪亞斯製作的古代世界奇蹟宙斯巨像。',
 milestone:'作為奧林匹亞運動會聖地的多立克神廟，具體展現泛希臘信仰與古典神廟尺度',
 body:[
  '奧林匹亞宙斯神廟建於西元前 470–456 年，位於奧林匹亞運動會發源地。這座多立克柱式神廟長邊六柱、短邊十三柱，以當地貝殼石灰岩與大理石砌築，是古典時期最具代表性的神廟之一。',
  '廟內曾供奉雕刻家菲迪亞斯以黃金與象牙製作、高逾 12 公尺的宙斯坐像，被列為古代世界七大奇蹟之一。山牆上刻有伯羅奔尼撒戰爭神話浮雕，展現當時頂尖的雕刻技法。',
  '神廟與奧林匹亞運動會緊密相連，是古希臘「泛希臘聖所」精神的具體展現。此處現存柱列與倒塌的柱鼓，讓後人得以重構古典神廟的尺度與比例。'
 ],
 buildings:['宙斯神廟','赫拉神廟','奧林匹亞體育場'],
 buildingsEn:['Temple of Zeus','Temple of Hera','Stadium of Olympia'],
 architects:['利邦（Libon of Elis）'],
 architectsEn:['Libon of Elis'],
 terms:[{t:'多立克柱式',d:'古希臘最簡樸雄健的柱式'},{t:'泛希臘聖所',d:'全希臘共同尊奉的宗教聖地'}],
 keywords:['希臘','奧林匹亞','宙斯','多立克','菲迪亞斯']
},
{
 id:11, title:'羅馬競技場', en:'Colosseum', style:'古羅馬', region:'歐洲', cat:'ancient', era:'72–80', featured:true,
 img:'images/colosseum_rome_arena_amphitheatre.webp', summary:'古羅馬最大的圓形競技場，混凝土拱券結構與階梯式觀眾席的傑作，也是現代體育場的原型。',
 milestone:'以地下暗道升降角鬥士野獸與遮陽棚機械，展現羅馬帝國後台工程的卓越組織',
 body:[
  '羅馬競技場（又稱弗拉維安圓形劇場）由韋斯帕薌皇帝始建、提圖斯皇帝於西元 80 年啟用，可容納約 5 萬名觀眾。其橢圓形平面以混凝土與拱券結構支撐，外牆四層依序使用多立克、愛奧尼與科林斯柱式裝飾。',
  '競技場的核心是地下錯綜的「hypogeum」暗道系統，用於升降角鬥士、野獸與舞台佈景，展現了古羅馬卓越的機械與工程能力。上方的巨型遮陽棚（velarium）由水手操作，可為觀眾遮陽。',
  '它見證了羅馬「麵包與競技」的公共娛樂文化，雖因地震與石材盜採而部分坍塌，仍是羅馬帝國的象徵與混凝土建築技術的里程碑，其分層座椅與動線設計深刻影響現代體育場。'
 ],
 buildings:['競技場','君士坦丁凱旋門','羅馬廣場'],
 buildingsEn:['Colosseum','Arch of Constantine','Roman Forum'],
 architects:['弗拉維安王朝皇家工程師'],
 architectsEn:['Imperial engineers of the Flavian dynasty'],
 terms:[{t:'拱券',d:'以楔形磚石砌成的弧形承重結構'},{t:'Hypogeum',d:'競技場地下暗道系統，用於升降佈景與野獸'}],
 keywords:['羅馬','競技場','混凝土','拱券','體育場']
},
{
 id:12, title:'萬神殿', en:'Pantheon', style:'古羅馬', region:'歐洲', cat:'ancient', era:'126', featured:true,
 img:'images/pantheon_rome_dome_oculus.webp', summary:'擁有世界最大無鋼筋混凝土穹頂的古羅馬神廟，其圓形大殿與圓頂採光眼被譽為古典建築的奇蹟。',
 milestone:'以頂端九公尺採光眼引入移動光柱，穹頂鑲板自下遞減減重，開創神聖光影空間',
 body:[
  '羅馬萬神殿由哈德良皇帝於西元 126 年重建，保存至今仍相當完整。其巨大的圓形穹頂直徑達 43.3 公尺，與整座建築高度相等，至今仍是世界上最大的無鋼筋混凝土穹頂，兩千年來未曾倒塌。',
  '穹頂頂端開有直徑約 9 公尺的圓形「採光眼」（oculus），讓自然光以一道光柱灑入大殿，營造出神聖而神秘的空間氛圍。穹頂內壁的鑲板自下而上遞減，巧妙地減輕了頂部重量。',
  '萬神殿的入口以宏偉的科林斯柱廊與山牆構成，與圓形大殿形成對比。它曾被改建為教堂而得以倖存，其穹頂與光影手法對文藝復興以降的圓頂建築影響深遠。'
 ],
 buildings:['萬神殿','哈德良陵墓','羅馬廣場'],
 buildingsEn:['Pantheon','Mausoleum of Hadrian','Roman Forum'],
 architects:['哈德良時期的皇家建築師'],
 architectsEn:['Imperial architects of the Hadrianic period'],
 terms:[{t:'Oculus',d:'穹頂頂端開放的圓形採光口'},{t:'穹頂',d:'半球形的弧形屋頂結構，古羅馬的重大技術成就'}],
 keywords:['羅馬','萬神殿','穹頂','混凝土','採光眼']
},
{
 id:13, title:'塞哥維亞水道橋', en:'Aqueduct of Segovia', style:'古羅馬', region:'歐洲', cat:'ancient', era:'1–2世紀', featured:false,
 img:'images/segovia_aqueduct_roman_arches.webp', summary:'保存極佳的羅馬高架水道橋，以巨石乾砌雙層拱券，橫跨西班牙塞哥維亞城區逾兩千年。',
 milestone:'不用灰漿乾砌二萬四千塊花崗岩，靠精密切割與拱券力學歷經地震屹立兩千年',
 body:[
  '塞哥維亞水道橋約建於西元 1–2 世紀，全長約 16 公里，將 17 公里外的山泉引入城中。其最壯觀的部分位於城市廣場，以雙層拱券跨越河谷，最高處約 28 公尺。',
  '整座橋以約 2.4 萬塊花崗岩巨石乾砌而成，未使用任何灰漿，完全依靠精確的切割與拱券力學維持穩定。兩千年來歷經地震與使用仍屹立不搖，是羅馬工程與石材工藝的極致。',
  '水道橋體現了羅馬城市建設中供水系統的重要性，是古代公共工程的典範。它於 1985 年被列入世界遺產，至今仍是塞哥維亞的城市地標。'
 ],
 buildings:['水道橋','塞哥維亞舊城','阿卡薩城堡'],
 buildingsEn:['Aqueduct','Old Town of Segovia','Alcázar of Segovia'],
 architects:['羅馬工程營造師'],
 architectsEn:['Roman imperial engineers'],
 terms:[{t:'水道橋',d:'將水源跨越山谷或低地引入城市的拱券式輸水結構'},{t:'乾砌',d:'不使用灰漿、依靠精確切割與摩擦力堆疊石材的工法'}],
 keywords:['西班牙','羅馬','水道橋','拱券','乾砌']
},
{
 id:14, title:'卡拉卡拉浴場', en:'Baths of Caracalla', style:'古羅馬', region:'歐洲', cat:'ancient', era:'212–216', featured:false,
 img:'images/caracalla_baths_ancient_rome.webp', summary:'羅馬帝國的巨型公共浴場，包含冷熱水池、健身房與圖書館的綜合娛樂與社交中心。',
 milestone:'地底磚砌煙道中央供暖，沿軸配置冷溫熱浴室，體現羅馬公共生活的高度組織',
 body:[
  '卡拉卡拉浴場由皇帝卡拉卡拉於西元 212–216 年興建，占地約 11 公頃，可同時容納約 1600 人使用。它不僅是沐浴場所，更是集體育、圖書館、花園與社交於一體的公共綜合體。',
  '浴場沿中軸線依序佈置更衣室、冷水浴場（frigidarium）、溫水浴場（tepidarium）與熱水浴場（caldarium），並設有複雜的中央供暖系統，熱水透過地底磚砌煙道傳導。',
  '其宏偉的拱券與混凝土結構在羅馬晚期仍屹立，殘存的巨大磚牆與拱頂成為後世印象派與新古典畫家描繪羅馬廢墟的靈感來源，也見證了羅馬公共生活的奢華與城市工程的高度組織性。'
 ],
 buildings:['卡拉卡拉浴場','戴克里先浴場','圖拉真浴場'],
 buildingsEn:['Baths of Caracalla','Baths of Diocletian','Baths of Trajan'],
 architects:['卡拉卡拉皇帝的皇家營造師'],
 architectsEn:['Imperial builders under Emperor Caracalla'],
 terms:[{t:'Frigidarium',d:'冷水浴場'},{t:'Caldarium',d:'熱水浴場，通常設於最內側並配備供暖系統'}],
 keywords:['羅馬','浴場','混凝土','供暖','公共建築']
},
{
 id:15, title:'奇琴伊察', en:'Chichen Itza', style:'馬雅阿茲特克', region:'美洲', cat:'ancient', era:'600–1200', featured:true,
 img:'images/chichen_itza_kukulkan_maya.webp', summary:'墨西哥猶加敦半島的馬雅城市，其階梯金字塔庫庫爾坎神廟融合天文與曆法，展現精湛的建築智慧。',
 milestone:'於春秋分投射蜿蜒蛇身光影，象徵羽蛇神降臨，將天文曆法化為建築奇觀',
 body:[
  '奇琴伊察位於墨西哥猶加敦半島，是馬雅文明後古典時期的重鎮，融合了馬雅與托爾特克文化。其中最著名的庫庫爾坎金字塔（又稱羽蛇神金字塔）高約 30 公尺，四面各有 91 級階梯，加上頂部平台恰為 365，對應一年的天數。',
  '金字塔的春分與秋分會出現「羽蛇光影」奇觀：陽光在階梯邊緣投射出蜿蜒如蛇身的光影，象徵羽蛇神降臨。這顯示馬雅建築師對天文、曆法與光影的精確掌握。',
  '城內另有戰士神廟、千柱廣場與聖井等建築，展現複雜的祭祀與城市功能。奇琴伊察於 1988 年被列入世界遺產，是研究馬雅天文與建築最重要的遺址之一。'
 ],
 buildings:['庫庫爾坎金字塔','戰士神廟','聖井','千柱廣場'],
 buildingsEn:['Temple of Kukulcán (El Castillo)','Temple of the Warriors','Sacred Cenote','Plaza of a Thousand Columns'],
 architects:['馬雅祭司與建築師'],
 architectsEn:['Maya priests and architects'],
 terms:[{t:'馬雅曆法',d:'馬雅文明發展的精確曆法系統'},{t:'羽蛇神',d:'馬雅與中美洲崇拜的羽蛇神祇庫庫爾坎'}],
 keywords:['墨西哥','馬雅','金字塔','曆法','羽蛇神']
},
{
 id:16, title:'馬丘比丘', en:'Machu Picchu', style:'馬雅阿茲特克', region:'美洲', cat:'ancient', era:'1450', featured:true,
 img:'images/machu_picchu_inca_citadel.webp', summary:'安地斯山脊上的印加石城，以精密切割的巨型石塊構築，遺世獨立於雲霧之間，名列新世界七大奇蹟。',
 milestone:'在海拔二千四百公尺山脊以梯田灌溉系統馴服高山地形，筑起印加石城',
 body:[
  '馬丘比丘位於祕魯安地斯山脈海拔約 2430 公尺的山脊上，約建於西元 1450 年印加帝國時期。它由約 200 座建築組成，包含神廟、祭壇、住宅與梯田，隱藏於崇山峻嶺之間。',
  '印加建築的標誌在於其「抗震石工」：巨型花崗岩石塊被切割至毫米級精度，相互咬合而無需灰漿，接縫密合得連刀片都難以插入。梯田與灌溉系統則體現了對高海拔農業與水土保持的高度掌握。',
  '1911 年由探險家海勒姆·賓厄姆重新發現後，馬丘比丘成為印加文明與拉丁美洲的象徵。它於 1983 年被列入世界遺產，也是全球最著名的考古景點之一。'
 ],
 buildings:['太陽神廟','拴日石','三窗之屋','梯田'],
 buildingsEn:['Temple of the Sun','Intihuatana','Room of the Three Windows','Agricultural Terraces'],
 architects:['印加帝國皇家營造師'],
 architectsEn:['Imperial builders of the Inca Empire'],
 terms:[{t:'印加石工',d:'以精密切割巨石乾砌、無灰漿的建築工法'},{t:'拴日石',d:'印加用於觀測太陽、標定季節的石質儀器'}],
 keywords:['祕魯','印加','石城','安地斯','世界遺產']
},
/* ========== 中世紀建築 medieval (17–30) ========== */
{
 id:17, title:'聖索菲亞大教堂', en:'Hagia Sophia', style:'拜占庭', region:'歐洲', cat:'medieval', era:'532–537', featured:true,
 img:'images/hagia_sophia_istanbul_dome.webp', summary:'拜占庭建築的巔峰之作，其懸浮式大圓頂改變了教堂的空間概念，先後作為教堂、清真寺與博物館。',
 milestone:'先後歷經教堂、清真寺與博物館身分，其懸浮穹頂理念同時影響東西方宗教建築',
 body:[
  '聖索菲亞大教堂由拜占庭皇帝查士丁尼一世於西元 532–537 年興建於君士坦丁堡（今伊斯坦堡）。建築師安提繆斯與伊西多魯斯以創新的懸掛穹頂，讓巨大的圓頂彷彿懸浮於光線之中。',
  '教堂中央穹頂直徑約 31 公尺，透過一系列鼓座與半圓穹頂過渡至方形底座，形成流暢的空間過渡。內部以大量金底馬賽克與彩色大理石裝飾，營造出「人間天堂」般的輝煌氛圍。',
  '聖索菲亞在歷史中歷經多重身分轉變：奧斯曼征服後改為清真寺，增建了宣禮塔；近代曾作為博物館，後又恢復宗教功能。其穹頂結構與空間理念深刻影響了東西方的宗教建築，也標誌著拜占庭建築的成熟。'
 ],
 buildings:['聖索菲亞大教堂','聖伊琳娜教堂','查士丁尼建築群'],
 buildingsEn:['Hagia Sophia','Hagia Irene','Justinian\'s building complex'],
 architects:['安提繆斯','伊西多魯斯'],
 architectsEn:['Anthemius of Tralles','Isidore of Miletus'],
 terms:[{t:'懸掛穹頂',d:'以鼓座與過渡結構支撐、看似漂浮的大穹頂'},{t:'馬賽克',d:'以彩色小方塊拼貼的裝飾與圖像藝術'}],
 keywords:['伊斯坦堡','拜占庭','穹頂','馬賽克','教堂']
},
{
 id:18, title:'聖馬可大教堂', en:'St Mark\'s Basilica', style:'拜占庭', region:'歐洲', cat:'medieval', era:'1063–1094', featured:false,
 img:'images/st_marks_basilica_venice.webp', summary:'威尼斯最具代表性的拜占庭式教堂，希臘十字平面與金光閃爍的馬賽克裝飾使其獨樹一格。',
 milestone:'匯集拜占庭、哥德與文藝復興元素，成為威尼斯海上共和國東西交流的財富象徵',
 body:[
  '聖馬可大教堂始建於 1063 年，位於威尼斯聖馬可廣場，是拜占庭文化在義大利的輝煌體現。其希臘十字平面覆以五座圓頂，整體輪廓如同一朵展開的蓮花。',
  '教堂外立面以大理石拱門、雕塑與繁複的柱頭裝飾，內部則覆滿約 8000 平方公尺的金底馬賽克，講述聖經與聖馬可的故事，在昏暗中閃爍金光，被譽為「金色大教堂」。',
  '聖馬可大教堂的布局與裝飾深受君士坦丁堡影響，同時融入哥德與文藝復興元素，是威尼斯海上共和國財富與東西方文化交流的具體象徵。'
 ],
 buildings:['聖馬可大教堂','聖馬可鐘樓','總督宮'],
 buildingsEn:['St Mark\'s Basilica','St Mark\'s Campanile','Doge\'s Palace'],
 architects:['威尼斯營造工匠'],
 architectsEn:['Venetian master builders'],
 terms:[{t:'希臘十字平面',d:'四臂等長的十字形教堂平面'},{t:'金色馬賽克',d:'以金箔鑲嵌的馬賽克裝飾，常見於拜占庭教堂'}],
 keywords:['威尼斯','拜占庭','馬賽克','希臘十字','圓頂']
},
{
 id:19, title:'拉文納聖維塔萊教堂', en:'Basilica of San Vitale', style:'拜占庭', region:'歐洲', cat:'medieval', era:'526–547', featured:false,
 img:'images/san_vitale_ravenna_mosaic.webp', summary:'拜占庭早期建築的傑作，其八邊形集中式平面與金碧輝煌的馬賽克壁畫保存極佳。',
 milestone:'保存查士丁尼與狄奧多拉皇后的鑲嵌肖像，影響日後查理曼亞琛禮拜堂布局',
 body:[
  '聖維塔萊教堂位於義大利拉文納，建於西元 526–547 年，是拜占庭藝術在義大利的典範。其八邊形集中式平面與中央穹頂構成強烈的垂直感與向心性。',
  '教堂最珍貴的是其完整保存的馬賽克裝飾，尤其是東側聖壇兩側的查士丁尼一世與狄奧多拉皇后的鑲嵌肖像，人物神情莊嚴、服飾華麗，是拜占庭宮廷藝術的代表作。',
  '聖維塔萊的集中式布局與馬賽克工藝深刻影響了日後查理曼的亞琛禮拜堂，成為早期中世紀建築的重要源頭，並於 1996 年被列入世界遺產。'
 ],
 buildings:['聖維塔萊教堂','加拉·普拉奇迪亞陵墓','拉文納洗禮堂'],
 buildingsEn:['Basilica of San Vitale','Mausoleum of Galla Placidia','Baptistery of Ravenna'],
 architects:['拜占庭皇家營造師'],
 architectsEn:['Byzantine imperial builders'],
 terms:[{t:'集中式平面',d:'以圓形或多邊形為中心、對稱發展的建築平面'},{t:'鑲嵌肖像',d:'以馬賽克製作的皇室人物肖像'}],
 keywords:['拉文納','拜占庭','馬賽克','八邊形','集中式']
},
{
 id:20, title:'比薩主教座堂建築群', en:'Piazza dei Miracoli', style:'羅馬風', region:'歐洲', cat:'medieval', era:'1063–14世紀', featured:true,
 img:'images/pisa_cathedral_leaning_tower.webp', summary:'包含主教座堂、洗禮堂與聞名世界的比薩斜塔，是義大利羅馬風建築的整體傑作。',
 milestone:'以白綠大理石相間的羅馬風立面群，完整展示比薩海上共和國的建築輝煌',
 body:[
  '比薩的「奇蹟廣場」包含主教座堂、洗禮堂、鐘樓（比薩斜塔）與墓園，是義大利羅馬風建築最完整的展示。主教座堂建於 1063 年，以白色與綠色大理石相間裝飾立面。',
  '聞名全球的比薩斜塔是主教堂的獨立鐘樓，建於 1173 年起，因地基不均而在施工期間即開始傾斜，歷經數百年仍持續微傾，其圓柱拱廊層層相疊的造型優美而獨特。',
  '比薩斜塔在 1990–2001 年間進行大規模扶正工程，將傾斜角度穩定。奇蹟廣場的建築群體現了比薩海上共和國的繁榮與羅馬風建築的多樣性，於 1987 年被列入世界遺產。'
 ],
 buildings:['比薩主教座堂','比薩斜塔','洗禮堂'],
 buildingsEn:['Pisa Cathedral','Leaning Tower of Pisa','Pisa Baptistery'],
 architects:['布斯凱托斯（傳）','迪奧提薩爾維'],
 architectsEn:['Buscheto (attributed)','Diotisalvi'],
 terms:[{t:'羅馬風',d:'歐洲 11–12 世紀以厚牆、圓拱與小窗為特徵的建築風格'},{t:'獨立鐘樓',d:'與主教堂分離的塔形鐘樓，義大利常見做法'}],
 keywords:['義大利','比薩','羅馬風','斜塔','大理石']
},
{
 id:21, title:'施佩耶爾主教座堂', en:'Speyer Cathedral', style:'羅馬風', region:'歐洲', cat:'medieval', era:'1030–1106', featured:false,
 img:'images/speyer_cathedral_romanesque_germany.webp', summary:'歐洲規模最大的羅馬風教堂，神聖羅馬帝國皇帝的葬禮之所，以四座塔樓與宏偉石造穹頂著稱。',
 milestone:'地下陵寢安葬多位神聖羅馬皇帝，以對稱塔樓與石造拱頂樹立德意志羅馬風典範',
 body:[
  '施佩耶爾主教座堂位於德國萊茵河畔，由薩利安王朝的皇帝們於西元 1030–1106 年興建，是羅馬風建築中規模最大的教堂之一，全長達 134 公尺。',
  '教堂採用厚重的石造穹頂與半圓拱，東西兩端各有成對的塔樓，立面輪廓雄偉而莊嚴。其巨大的石砌拱頂與地下陵寢（Crypt）承載著多位神聖羅馬帝國皇帝與國王的墓葬。',
  '施佩耶爾主教座堂是神聖羅馬帝國皇權與信仰的具體象徵，於 1981 年被列入世界遺產，其對稱的塔樓布局與石造結構影響了德意志地區的羅馬風建築。'
 ],
 buildings:['施佩耶爾主教座堂','地下陵寢','皇帝寢宮遺址'],
 buildingsEn:['Speyer Cathedral','Crypt','Ruins of the Imperial Quarters'],
 architects:['薩利安王朝皇家營造師'],
 architectsEn:['Imperial Builders of the Salian Dynasty'],
 terms:[{t:'羅馬風穹頂',d:'以石料砌築的筒形或十字拱頂'},{t:'Crypt',d:'教堂地下的拱頂陵墓空間'}],
 keywords:['德國','羅馬風','皇帝陵墓','拱頂','教堂']
},
{
 id:22, title:'聖德尼教堂', en:'Basilica of Saint-Denis', style:'哥德式', region:'歐洲', cat:'medieval', era:'1140', featured:false,
 img:'images/saint_denis_basilica_gothic.webp', summary:'哥德式建築的誕生地，修道院院長敘熱以尖拱與彩色玻璃開創了歐洲全新的建築語言。',
 milestone:'作為法國皇家陵寢，其尖拱肋拱與彩窗結構迅速傳遍歐洲，催生巴黎聖母院',
 body:[
  '聖德尼教堂位於巴黎近郊，是中世紀法國皇家陵寢所在地。約 1140 年，修道院院長敘熱（Suger）主持重建教堂西立面與唱詩班區，被公認為哥德式建築的開端。',
  '敘熱以尖拱、肋拱與大面積彩色玻璃取代羅馬風的厚牆與小窗，讓光線充盈於聖壇。他主張「以光象徵神聖」，彩色玻璃窗成為哥德式建築的核心美學。',
  '聖德尼教堂的新結構方法迅速傳遍歐洲，催生了巴黎聖母院、夏特與亞眠等哥德式主教堂。它同時是法國國王加冕與安葬的聖所，見證了法蘭西王權與信仰的結合。'
 ],
 buildings:['聖德尼教堂','皇家陵寢'],
 buildingsEn:['Basilica of Saint-Denis','Royal Necropolis'],
 architects:['敘熱（Abbot Suger）'],
 architectsEn:['Abbot Suger'],
 terms:[{t:'肋拱',d:'哥德式建築中拱頂的肋狀骨架結構'},{t:'尖拱',d:'兩段圓弧相交形成的尖頂拱形'}],
 keywords:['巴黎','哥德式','敘熱','尖拱','彩窗']
},
{
 id:23, title:'巴黎聖母院', en:'Notre-Dame de Paris', style:'哥德式', region:'歐洲', cat:'medieval', era:'1163–1345', featured:true,
 img:'images/notre_dame_paris_cathedral.webp', summary:'法蘭西哥德式主教堂的象徵，其飛扶壁、玫瑰窗與雙塔立面成為巴黎的精神地標。',
 milestone:'歷時約兩百年在西堤島築成高聳哥德殿堂，成為法國歷史與民族記憶的核心象徵',
 body:[
  '巴黎聖母院始建於 1163 年，位於塞納河中的西堤島上，歷經約兩百年建成。它是哥德式主教堂的典範，以尖拱、肋拱與巨大的飛扶壁支撐高聳的中央殿堂。',
  '其西立面以雙塔、三座大門與巨型玫瑰窗構成，浮雕與雕像滿布門楣。內部高約 33 公尺的拱頂與彩色玻璃在光線下營造出神聖空間。',
  '2019 年的一場大火燒毀了尖塔與木構屋頂，引發全球關注與修復工程。巴黎聖母院不僅是宗教建築，更是法國歷史、文學（如雨果《鐘樓怪人》）與民族記憶的核心象徵。'
 ],
 buildings:['巴黎聖母院','飛扶壁','玫瑰窗'],
 buildingsEn:['Notre-Dame de Paris','Flying Buttress','Rose Window'],
 architects:['尚·德·謝勒','皮耶·德·蒙特勒伊'],
 architectsEn:['Jean de Chelles','Pierre de Montreuil'],
 terms:[{t:'飛扶壁',d:'將拱頂側推力傳導至外部墩柱的拱形結構，哥德式特徵'},{t:'玫瑰窗',d:'大型圓形彩色玻璃窗'}],
 keywords:['巴黎','哥德式','飛扶壁','玫瑰窗','火災修復']
},
{
 id:24, title:'夏特主教座堂', en:'Chartres Cathedral', style:'哥德式', region:'歐洲', cat:'medieval', era:'1194–1220', featured:false,
 img:'images/chartres_cathedral_gothic_glass.webp', summary:'哥德式主教堂保存最完整者，其藍色玻璃與雕塑堪稱中世紀藝術的巔峰。',
 milestone:'以完整雕塑與彩窗構成石與光的聖經，為研究高哥德藝術最完整的資料庫',
 body:[
  '夏特主教座堂於 1194 年大火後迅速重建，約 1220 年完成，是法國高哥德式教堂的完美典範。其結構輕盈、比例和諧，飛扶壁與尖拱配合得宜。',
  '教堂以「夏特藍」玻璃著稱，那深邃而閃耀的藍色玫瑰窗與側窗被譽為中世紀彩色玻璃的極致，主題涵蓋聖經故事與宇宙觀。',
  '夏特是朝聖中心，保存著相傳的聖母聖衣遺物。其大量雕塑與玻璃構成一部「石與光的聖經」，於 1979 年被列入世界遺產，是研究哥德式藝術最完整的資料庫。'
 ],
 buildings:['夏特主教座堂','夏特藍玻璃窗'],
 buildingsEn:['Chartres Cathedral','Chartres Blue Stained-glass Windows'],
 architects:['中世紀哥德建築師（佚名）'],
 architectsEn:['Medieval Gothic Architects (anonymous)'],
 terms:[{t:'高哥德式',d:'法國哥德式的高度成熟階段，結構輕盈高聳'},{t:'夏特藍',d:'夏特教堂特有的深邃藍色玻璃'}],
 keywords:['法國','哥德式','彩窗','雕塑','朝聖']
},
{
 id:25, title:'科隆大教堂', en:'Cologne Cathedral', style:'哥德式', region:'歐洲', cat:'medieval', era:'1248–1880', featured:true,
 img:'images/cologne_cathedral_twin_spires.webp', summary:'歐洲最高的哥德式教堂之一，其雙尖塔歷經六百年才完工，成為德意志信仰與工藝的象徵。',
 milestone:'內部拱頂高達四十三公尺，二戰轟炸中奇蹟屹立，成就北歐最大的哥德式教堂',
 body:[
  '科隆大教堂始建於 1248 年，因中斷與戰爭，直至 1880 年才宣告完工，建造過程橫跨六百多年。其雙塔高達 157 公尺，完工時曾是世界最高建築。',
  '教堂採用法國高哥德式風格，以飛扶壁與尖拱支撐，內部高達 43 公尺的拱頂氣勢恢宏。彩色玻璃與大量雕塑滿布其間，是北歐最大的哥德式教堂。',
  '科隆大教堂象徵著歐洲中世紀信仰與工匠精神的延續，二戰時雖遭轟炸仍奇蹟般屹立。它於 1996 年被列入世界遺產，至今仍是科隆與德意志的標誌。'
 ],
 buildings:['科隆大教堂','三王聖龕','珍寶館'],
 buildingsEn:['Cologne Cathedral','Shrine of the Three Kings','Cathedral Treasury'],
 architects:['格哈德·馮·里爾（初任）','歷代工匠'],
 architectsEn:['Gerhard von Rile (first master builder)','Generations of Craftsmen'],
 terms:[{t:'哥德式雙塔',d:'教堂西立面兩座高聳的尖塔'},{t:'聖龕',d:'存放聖物與遺骸的華麗容器'}],
 keywords:['德國','科隆','哥德式','尖塔','世界遺產']
},
{
 id:26, title:'米蘭大教堂', en:'Milan Cathedral', style:'哥德式', region:'歐洲', cat:'medieval', era:'1386–1965', featured:true,
 img:'images/milan_cathedral_marble_gothic.webp', summary:'義大利規模最大的哥德式教堂，以白色大理石與上百座尖塔構成的「大理石森林」著稱。',
 milestone:'動工逾五百年方告完工，以135座大理石尖塔疊合哥德至新哥德諸風格',
 body:[
  '米蘭大教堂始建於 1386 年，直至 20 世紀才大致完工，是義大利最大、世界第三大的教堂。其立面以白色大理石砌築，在陽光下閃耀。',
  '教堂以多達 135 座尖塔與約 3400 座雕像構成繁複的垂直輪廓，最高處的聖母雕像高達 108 公尺。屋頂可供人行走，能近距離觀賞這些精雕細琢的尖塔。',
  '米蘭大教堂融合了義大利與日耳曼哥德式，並加入文藝復興與新哥德元素，其漫長的建造過程本身就是一部義大利建築史的縮影。'
 ],
 buildings:['米蘭大教堂','聖母雕像','地下考古區'],
 buildingsEn:['Milan Cathedral','Madonnina (Statue of the Virgin)','Archaeological Area'],
 architects:['馬可·索拉里','詹·加萊亞佐·維斯孔蒂（贊助者）'],
 architectsEn:['Marco Solari','Gian Galeazzo Visconti (patron)'],
 terms:[{t:'大理石森林',d:'米蘭大教堂密集的尖塔群'},{t:'新哥德式',d:'19 世紀復興哥德式元素的建築風格'}],
 keywords:['義大利','米蘭','哥德式','大理石','尖塔']
},
{
 id:27, title:'亞眠主教座堂', en:'Amiens Cathedral', style:'哥德式', region:'歐洲', cat:'medieval', era:'1220–1270', featured:false,
 img:'images/amiens_cathedral_gothic_france.webp', summary:'法國高哥德式的極致，其內部空間高度與和諧比例被譽為哥德式教堂的完美典範。',
 milestone:'以飛扶壁與肋拱撐起約42公尺中殿，樹立法式高哥德的結構理性典範',
 body:[
  '亞眠主教座堂於 1220 年開始興建，1270 年大致完成，是法國哥德式建築「高聳時代」的代表。其內部拱頂高達約 42 公尺，是法國最高的教堂中殿之一。',
  '教堂以輕盈的飛扶壁與密集的肋拱構成骨架，牆面開滿彩色玻璃，使整個空間通透明亮。其雕刻精美的西立面與迴廊雕塑是中世紀藝術的珍寶。',
  '亞眠主教座堂被譽為「哥德式的完美聖殿」，其結構理性與光影效果對後世影響深遠，於 1981 年被列入世界遺產。'
 ],
 buildings:['亞眠主教座堂','迴廊雕塑','雙塔'],
 buildingsEn:['Amiens Cathedral','Cloister Sculptures','Twin Towers'],
 architects:['羅貝爾·德·呂扎爾什'],
 architectsEn:['Robert de Luzarches'],
 terms:[{t:'高聳時代',d:'法國哥德式的成熟高聳階段'},{t:'肋拱',d:'哥德式拱頂的肋狀骨架'}],
 keywords:['法國','哥德式','高聳','飛扶壁','世界遺產']
},
{
 id:28, title:'威尼斯總督宮', en:'Doge\'s Palace', style:'哥德式', region:'歐洲', cat:'medieval', era:'1340–1442', featured:false,
 img:'images/doges_palace_venice_gothic.webp', summary:'威尼斯共和國政治中心的哥德式宮殿，其倒置的拱廊結構與華麗立面獨樹一格。',
 milestone:'首創上重下輕的倒置拱廊立面，揉合拜占庭與東方元素成就威尼斯哥德',
 body:[
  '總督宮位於威尼斯聖馬可廣場旁，是威尼斯共和國總督的官邸與政府所在，主要建於 1340–1442 年，採用威尼斯獨特的哥德式風格。',
  '其最特別之處在於「上重下輕」的倒置結構：厚重的上層以哥德式拱窗為主，底層卻以輕盈的連續拱廊支撐，形成視覺上的奇異平衡。立面以粉白色大理石與雕飾交織。',
  '總督宮內部有宏偉的大會議廳與眾多壁畫，見證了威尼斯海上共和國的政治輝煌。它融合拜占庭、哥德與文藝復興元素，是威尼斯建築多元性的代表。'
 ],
 buildings:['總督宮','嘆息橋','聖馬可鐘樓'],
 buildingsEn:['Doge\'s Palace','Bridge of Sighs','St Mark\'s Campanile'],
 architects:['菲利波·卡倫達里奧（傳）'],
 architectsEn:['Filippo Calendario (trad.)'],
 terms:[{t:'威尼斯哥德式',d:'威尼斯獨特融合東方元素的哥德式風格'},{t:'拱廊',d:'由連續拱券構成的走廊'}],
 keywords:['威尼斯','哥德式','總督宮','拱廊','共和國']
},
{
 id:29, title:'蒙聖米歇爾修道院', en:'Mont-Saint-Michel', style:'羅馬風', region:'歐洲', cat:'medieval', era:'966–13世紀', featured:false,
 img:'images/mont_saint_michel_abbey.webp', summary:'矗立於潮汐孤島上的哥德式修道院，被譽為「西方奇蹟」，是法蘭西的聖地與工程奇觀。',
 milestone:'於潮汐孤島的錐形岩頂層層疊建，以石拱結構征服極端基地成就西方奇蹟',
 body:[
  '蒙聖米歇爾修道院位於法國諾曼第外海的潮汐島上，羅馬風與哥德式建築層層疊加於錐形岩石山頂。漲潮時四面環水，退潮時與陸地相連，形成戲劇性的景觀。',
  '修道院始建於 966 年，歷經數世紀擴建，其「奇蹟」迴廊與尖塔在雲霧與海潮中聳立。建築依山形而建，狹窄的石徑與拱頂結構克服了極端的基地條件。',
  '蒙聖米歇爾是中世紀朝聖重鎮，其工程成就與宗教意義使它於 1979 年被列入世界遺產，成為法蘭西最具代表性的建築象徵之一。'
 ],
 buildings:['修道院教堂','奇蹟迴廊','潮汐島','城牆'],
 buildingsEn:['Abbey Church','La Merveille (The Marvel)','Tidal Island','Ramparts'],
 architects:['本篤會修士與工匠'],
 architectsEn:['Benedictine Monks and Craftsmen'],
 terms:[{t:'潮汐島',d:'漲潮時與陸地隔絕的島嶼'},{t:'本篤會',d:'重視勞動與建築的基督教修道會'}],
 keywords:['法國','修道院','孤島','哥德式','世界遺產']
},
{
 id:30, title:'亞琛大教堂', en:'Aachen Cathedral', style:'羅馬風', region:'歐洲', cat:'medieval', era:'792–805', featured:false,
 img:'images/aachen_cathedral_charlemagne_octagon.webp', summary:'查理曼大帝的宮廷禮拜堂，融合拜占庭集中式平面，是北歐首座被列入世界遺產的建築。',
 milestone:'借鑑拉文納集中式平面將拜占庭建築引入北方，此後加冕三十餘位神聖羅馬皇帝',
 body:[
  '亞琛大教堂由查理曼大帝於西元 792–805 年興建於其亞琛宮廷中，其八角形禮拜堂直接借鑑了拉文納聖維塔萊教堂的集中式平面，將拜占庭建築傳統引入北方。',
  '禮拜堂以八角形中央空間與環繞的雙層拱廊構成，內部以彩色大理石柱與馬賽克裝飾，象徵查理曼繼承羅馬與基督教帝國的理想。',
  '亞琛自 936 年起成為神聖羅馬帝國皇帝的加冕教堂，歷經三十餘位皇帝在此加冕。它於 1978 年成為北歐第一座世界遺產建築，象徵歐洲中世紀早期的文化整合。'
 ],
 buildings:['亞琛八角禮拜堂','皇家陵墓','宮廷教堂'],
 buildingsEn:['The Octagon (Octagonal Chapel)','Royal Tomb','Palatine Chapel'],
 architects:['查理曼宮廷營造師（傳為奧多·德·梅斯）'],
 architectsEn:['Charlemagne\'s Court Builders (trad. Odo of Metz)'],
 terms:[{t:'集中式禮拜堂',d:'以圓形或多邊形為中心的教堂空間'},{t:'加冕教堂',d:'舉行皇帝或國王加冕儀式的教堂'}],
 keywords:['德國','查理曼','集中式','加冕','世界遺產']
},
/* ========== 文藝復興與巴洛克 renbaroque (31–42) ========== */
{
 id:31, title:'聖母百花大教堂', en:'Florence Cathedral Dome', style:'文藝復興', region:'歐洲', cat:'renbaroque', era:'1420–1436', featured:true,
 img:'images/florence_cathedral_brunelleschi_dome.webp', summary:'布魯內萊斯基以雙層磚砌穹頂攻克佛羅倫斯百年難題，開啟了文藝復興建築的新紀元。',
 milestone:'不搭大型木模即以雙層外殼與魚骨砌法跨越45公尺，宣告文藝復興工程理性誕生',
 body:[
  '佛羅倫斯聖母百花大教堂始建於 1296 年，但巨大的八角形唱詩班區上方一直缺少穹頂，因跨度達 45 公尺、高逾 50 公尺，百年來無人能解。',
  '1420 年，金匠兼建築師菲利波·布魯內萊斯基以創新的「雙層外殼」與「魚骨式」磚砌法，在不使用大型木拱架的情況下完成了穹頂，並以採光亭收頂。其結構理性打破了中世紀的施工慣例。',
  '這座穹頂被視為文藝復興建築的開端，象徵著以數學、透視與古典比例為基礎的新建築觀。它至今仍是佛羅倫斯天際線的標誌與工程奇蹟。'
 ],
 buildings:['聖母百花大教堂','布魯內萊斯基穹頂','洗禮堂','喬托鐘樓'],
 buildingsEn:['Florence Cathedral (Santa Maria del Fiore)','Brunelleschi\'s Dome','Florence Baptistery','Giotto\'s Campanile'],
 architects:['菲利波·布魯內萊斯基'],
 architectsEn:['Filippo Brunelleschi'],
 terms:[{t:'雙層穹頂',d:'內外兩層殼構成的穹頂，兼具承重與減重'},{t:'魚骨式砌法',d:'以交錯磚塊形成自支撐結構的磚砌工法'}],
 keywords:['佛羅倫斯','布魯內萊斯基','穹頂','文藝復興','磚造']
},
{
 id:32, title:'布魯內萊斯基育嬰院', en:'Ospedale degli Innocenti', style:'文藝復興', region:'歐洲', cat:'renbaroque', era:'1419–1445', featured:false,
 img:'images/ospedale_degli_innocenti_florence.webp', summary:'被公認的史上第一座文藝復興建築，其拱廊立面重拾古典比例與秩序。',
 milestone:'首以嚴格模數與古典圓拱柱廊取代哥德繁複，確立文藝復興理性設計典範',
 body:[
  '育嬰院（Ospedale degli Innocenti）由布魯內萊斯基於 1419 年設計，是佛羅倫斯的孤兒院，也是被普遍認定的第一座文藝復興建築。',
  '其底層以連續的圓拱廊柱構成立面，柱頭採用古典科林斯式，上層為簡潔的水平線腳與窗戶。整體以嚴格的模數、比例與對稱取代了哥德式的垂直與繁複。',
  '這座建築標誌著建築師從「工匠」轉為「設計者」，以幾何與古典範式為基礎的理性設計理念，開啟了文藝復興建築的典範。'
 ],
 buildings:['育嬰院','聖母百花大教堂穹頂'],
 buildingsEn:['Ospedale degli Innocenti (Foundling Hospital)','Dome of Florence Cathedral (Brunelleschi\'s Dome)'],
 architects:['菲利波·布魯內萊斯基'],
 architectsEn:['Filippo Brunelleschi'],
 terms:[{t:'拱廊',d:'連續拱券構成的古典廊道'},{t:'模數',d:'建築中以基本單位推演整體比例的方法'}],
 keywords:['佛羅倫斯','布魯內萊斯基','拱廊','比例','文藝復興']
},
{
 id:33, title:'聖彼得大教堂', en:'St Peter\'s Basilica', style:'文藝復興', region:'歐洲', cat:'renbaroque', era:'1506–1626', featured:true,
 img:'images/st_peters_basilica_vatican.webp', summary:'梵蒂岡的天主教聖殿，匯集布拉曼特、米開朗基羅與貝尼尼等大師，是文藝復興與巴洛克建築的總和。',
 milestone:'匯聚四代大師接力營建，以約136公尺穹頂樹立天主教世界的宏偉中心',
 body:[
  '聖彼得大教堂於 1506 年由教宗朱利葉斯二世下令興建，歷經一個多世紀，由布拉曼特首倡希臘十字集中式平面，米開朗基羅主持設計其宏偉穹頂，後又由馬代爾諾延長中殿，最後以貝尼尼的柱廊與祭壇完成。',
  '米開朗基羅設計的穹頂高達約 136 公尺，為當時世界最高，成為羅馬天際線的標誌。教堂內部金碧輝煌，貝尼尼的銅華蓋與聖彼得寶座將巴洛克戲劇性推向高峰。',
  '聖彼得大教堂是天主教世界的中心與藝術大師的合奏，其穹頂與柱廊空間深刻影響了全球宗教建築，是文藝復興與巴洛克建築的總結。'
 ],
 buildings:['聖彼得大教堂','聖彼得廣場','梵蒂岡宮'],
 buildingsEn:['St. Peter\'s Basilica','St. Peter\'s Square','Apostolic Palace (Vatican Palace)'],
 architects:['布拉曼特','米開朗基羅','貝尼尼','馬代爾諾'],
 architectsEn:['Donato Bramante','Michelangelo','Gian Lorenzo Bernini','Carlo Maderno'],
 terms:[{t:'希臘十字平面',d:'四臂等長的集中式十字平面'},{t:'華蓋',d:'聖壇上方的裝飾性頂篷'}],
 keywords:['梵蒂岡','米開朗基羅','穹頂','巴洛克','文藝復興']
},
{
 id:34, title:'圓廳別墅', en:'Villa Rotonda', style:'文藝復興', region:'歐洲', cat:'renbaroque', era:'1567–1592', featured:false,
 img:'images/villa_rotonda_palladio_symmetry.webp', summary:'帕拉迪奧的經典別墅，四面相同柱廊與中央圓頂構成完美的對稱，影響了全球建築兩百年。',
 milestone:'以四面對稱柱廊與中央圓頂凝固古典秩序，透過建築四書啟發歐美近兩百年',
 body:[
  '圓廳別墅（Villa Rotonda）位於義大利維琴察郊外，由安德烈亞·帕拉迪奧約於 1567 年設計。它坐落於山丘頂，四面完全對稱，各設一座古典柱廊，中央覆以圓頂。',
  '別墅以嚴格的幾何比例與完全對稱的平面著稱，象徵宇宙秩序的古典理想。每個立面皆面向一片風景，將建築與環境和諧結合。',
  '圓廳別墅成為帕拉迪奧建築風格的代名詞，其設計被收入《建築四書》，影響了英國鄉間別墅、美國傑佛遜的蒙蒂塞洛以至現代住宅近兩百年。'
 ],
 buildings:['圓廳別墅','維琴察巴西利卡','奧林匹克劇場'],
 buildingsEn:['Villa Rotonda','Basilica Palladiana','Teatro Olimpico (Olympic Theatre)'],
 architects:['安德烈亞·帕拉迪奧'],
 architectsEn:['Andrea Palladio'],
 terms:[{t:'帕拉迪奧式',d:'帕拉迪奧所倡導的古典對稱建築風格'},{t:'柱廊',d:'由列柱支撐的門廊'}],
 keywords:['維琴察','帕拉迪奧','對稱','圓頂','古典']
},
{
 id:35, title:'維琴察巴西利卡', en:'Basilica Palladiana', style:'文藝復興', region:'歐洲', cat:'renbaroque', era:'1549–1617', featured:false,
 img:'images/palladiana_basilica_vicenza_arcade.webp', summary:'帕拉迪奧以「帕拉迪奧母題」為哥德式舊廳包覆雙層拱廊，成為其建築理論的宣言。',
 milestone:'創造出中央大拱夾小開口的帕拉迪奧母題，為不規則舊構披上和諧柱式外殼',
 body:[
  '維琴察巴西利卡是帕拉迪奧於 1549 年起為中世紀舊廳所加的雙層拱廊外殼，用以整飭不規則的舊結構。其底層為商業廊道，上層為市民議政廳。',
  '帕拉迪奧在此發展出著名的「帕拉迪奧母題」：每跨由中央大拱與兩側較小的方形開口的組合構成，以疊柱與山牆細分，和諧而有節奏。',
  '這座建築使帕拉迪奧聲名鵲起，其母題與比例體系被收入《建築四書》，廣為流傳，成為文藝復興柱式設計的教科書。'
 ],
 buildings:['維琴察巴西利卡','圓廳別墅','奧林匹克劇場'],
 buildingsEn:['Basilica Palladiana','Villa Rotonda','Teatro Olimpico (Olympic Theatre)'],
 architects:['安德烈亞·帕拉迪奧'],
 architectsEn:['Andrea Palladio'],
 terms:[{t:'帕拉迪奧母題',d:'中央大拱與兩側小開口的拱廊組合單元'},{t:'疊柱',d:'多層建築中不同柱式依序堆疊的做法'}],
 keywords:['維琴察','帕拉迪奧','拱廊','母題','文藝復興']
},
{
 id:36, title:'凡爾賽宮', en:'Palace of Versailles', style:'巴洛克', region:'歐洲', cat:'renbaroque', era:'1661–1715', featured:true,
 img:'images/versailles_palace_hall_mirrors.webp', summary:'路易十四的絕對王權象徵，其鏡廳與花園將巴洛克奢華推向極致，並重塑了歐洲宮廷建築。',
 milestone:'以73公尺鏡廳與軸線花園將絕對王權空間化，成為歐洲宮廷營建的模仿原型',
 body:[
  '凡爾賽宮由路易十四於 1661 年起將狩獵行宮擴建為宏偉宮殿，成為法國絕對君主制的權力中心。建築以對稱的凡爾賽式立面與金碧輝煌的內部裝飾著稱。',
  '最著名的鏡廳（Hall of Mirrors）長約 73 公尺，一面以十七面大鏡反射花園景觀，另一面開窗，與水晶吊燈構成眩目空間。凡爾賽宮的花園以幾何對稱、噴泉與雕塑聞名。',
  '凡爾賽宮象徵著巴洛克宮廷文化與專制王權的頂峰，同時也因奢華與不平等而成為法國大革命的導火線之一。它於 1979 年被列入世界遺產。'
 ],
 buildings:['凡爾賽宮','鏡廳','大特里亞農宮','幾何花園'],
 buildingsEn:['Palace of Versailles','Hall of Mirrors','Grand Trianon','Geometric Gardens of Versailles'],
 architects:['路易·勒沃','儒勒·阿杜安-芒薩爾','安德烈·勒諾特（花園）'],
 architectsEn:['Louis Le Vau','Jules Hardouin-Mansart','Andre Le Notre (Gardens)'],
 terms:[{t:'鏡廳',d:'凡爾賽宮中以鏡面與窗戶相對構成的長廊'},{t:'法式花園',d:'以幾何軸線與噴泉為特徵的對稱花園'}],
 keywords:['法國','路易十四','巴洛克','鏡廳','花園']
},
{
 id:37, title:'聖保羅大教堂', en:'St Paul\'s Cathedral', style:'巴洛克', region:'歐洲', cat:'renbaroque', era:'1675–1710', featured:true,
 img:'images/st_pauls_cathedral_london.webp', summary:'倫敦天際線的巴洛克圓頂教堂，雷恩以雙層穹頂與巧妙結構在火災廢墟上重建大英帝國的聖殿。',
 milestone:'以雙層殼夾磚錐的巧妙結構撐起約111公尺圓頂，重建火後倫敦的精神地標',
 body:[
  '聖保羅大教堂由克里斯多佛·雷恩於 1666 年倫敦大火後設計重建，1675 年動工，1710 年完成。其宏偉的圓頂高約 111 公尺，為倫敦天際線的標誌。',
  '雷恩採用雙層穹頂結構，外層輪廓優美、內層供人仰望，中間以磚砌錐體過渡。教堂立面融合巴洛克與古典元素，寬闊的門廊與雙塔氣勢莊嚴。',
  '聖保羅大教堂見證了英國的加冕、婚禮與國葬等重要國家儀典，也是雷恩建築生涯的總結，其圓頂與結構智慧被譽為英國巴洛克建築的巔峰。'
 ],
 buildings:['聖保羅大教堂','耳語廊','圓頂'],
 buildingsEn:['St Paul\'s Cathedral','Whispering Gallery','Dome'],
 architects:['克里斯多佛·雷恩'],
 architectsEn:['Sir Christopher Wren'],
 terms:[{t:'雙層穹頂',d:'以多層殼構成的穹頂，外觀與內視兼顧'},{t:'耳語廊',d:'圓頂內側以聲音反射著稱的走廊'}],
 keywords:['倫敦','雷恩','圓頂','巴洛克','雙層']
},
{
 id:38, title:'布蘭登堡門', en:'Brandenburg Gate', style:'新古典主義', region:'歐洲', cat:'renbaroque', era:'1788–1791', featured:false,
 img:'images/brandenburg_gate_berlin_classical.webp', summary:'柏林的新古典主義地標，以雅典衛城山門為藍本，見證了普魯士與德意志的興衰。',
 milestone:'取法雅典衛城山門以多立克柱式立凱旋門，從分裂象徵轉化為德意志統一記憶',
 body:[
  '布蘭登堡門由卡爾·戈特哈德·朗漢斯於 1788–1791 年興建，作為柏林城的凱旋門。它以雅典衛城山門為藍本，採多立克柱式，宏偉而莊嚴。',
  '門頂的勝利女神駕馭四馬戰車（Quadriga）雕像象徵和平與勝利，曾多次在戰爭中被掠奪與回歸。門下是柏林的儀式大道。',
  '布蘭登堡門是冷戰時期東西柏林分裂的象徵，柏林圍牆即橫亙於此，1989 年圍牆倒塌後成為德國統一的象徵，是德意志民族記憶的核心地標。'
 ],
 buildings:['布蘭登堡門','國會大廈','菩提樹下大道'],
 buildingsEn:['Brandenburg Gate','Reichstag Building','Unter den Linden'],
 architects:['卡爾·戈特哈德·朗漢斯'],
 architectsEn:['Carl Gotthard Langhans'],
 terms:[{t:'新古典主義',d:'18–19 世紀回歸希臘羅馬古典樣式的建築風格'},{t:'四馬戰車',d:'由四匹馬拉動的勝利女神雕像'}],
 keywords:['柏林','新古典','凱旋門','統一','多立克']
},
{
 id:39, title:'美國國會大廈', en:'United States Capitol', style:'新古典主義', region:'美洲', cat:'renbaroque', era:'1793–1863', featured:false,
 img:'images/us_capitol_washington_dome.webp', summary:'美國聯邦權力象徵，其白色穹頂與古典立面確立了華盛頓特區的都市軸線與共和國美學。',
 milestone:'以鐵鑄白穹頂坐鎮國家軸線，將希臘羅馬民主語彙轉化為美洲共和國美學',
 body:[
  '美國國會大廈始建於 1793 年，歷經多次擴建，其標誌性的白色鐵鑄穹頂於 1863 年完成，高約 88 公尺，位於華盛頓特區的國家軸線上。',
  '建築採新古典主義風格，中央圓形大廳與兩翼的參議院、眾議院相對稱。穹頂內壁繪有大型壁畫，頂端立有自由女神雕像。',
  '國會大廈象徵著美國憲法與共和制度，其古典比例呼應古希臘羅馬的民主傳統，深刻影響了美國聯邦與各州公共建築的樣式，成為新古典主義在美洲的典範。'
 ],
 buildings:['美國國會大廈','圓形大廳','華盛頓紀念碑','林肯紀念堂'],
 buildingsEn:['United States Capitol','Rotunda','Washington Monument','Lincoln Memorial'],
 architects:['威廉·桑頓','班傑明·拉特羅布','托馬斯·沃爾特'],
 architectsEn:['William Thornton','Benjamin Henry Latrobe','Thomas U. Walter'],
 terms:[{t:'共和國美學',d:'以古典形式象徵民主共和價值的建築美學'},{t:'圓形大廳',d:'國會大廈中央的圓頂大廳'}],
 keywords:['美國','華盛頓','國會','穹頂','新古典']
},
{
 id:40, title:'巴黎先賢祠', en:'Panthéon Paris', style:'新古典主義', region:'歐洲', cat:'renbaroque', era:'1758–1790', featured:false,
 img:'images/pantheon_paris_neoclassical_dome.webp', summary:'原為教堂後改為法國偉人祠，其巨型圓頂與科林斯柱廊是法國新古典主義的代表。',
 milestone:'以83公尺圓頂與科林斯柱廊容啟蒙理性，將教堂轉為安葬國族偉人的先賢祠',
 body:[
  '巴黎先賢祠由雅克-日爾曼·蘇弗洛於 1758 年設計，原為聖熱納維耶芙教堂，法國大革命後改為安葬國家偉人的先賢祠。',
  '其立面以宏偉的科林斯柱廊與三角形山牆構成，中央巨大的圓頂高約 83 公尺，融合古典廟宇與基督教教堂的元素，體現啟蒙時代的理性精神。',
  '先賢祠安葬著伏爾泰、盧梭、雨果、居禮夫人等法國歷史偉人，其古典建築語言象徵法蘭西的共和理想與啟蒙價值，是法國新古典主義的標誌。'
 ],
 buildings:['巴黎先賢祠','偉人地下墓室'],
 buildingsEn:['Pantheon, Paris','Pantheon Crypt (Aux Grands Hommes)'],
 architects:['雅克-日爾曼·蘇弗洛'],
 architectsEn:['Jacques-Germain Soufflot'],
 terms:[{t:'先賢祠',d:'安葬國家偉人的紀念性建築'},{t:'科林斯柱式',d:'以華麗毛茛葉柱頭為特徵的古希臘柱式'}],
 keywords:['巴黎','新古典','圓頂','先賢祠','啟蒙']
},
{
 id:41, title:'大英博物館', en:'British Museum', style:'新古典主義', region:'歐洲', cat:'renbaroque', era:'1823–1852', featured:false,
 img:'images/british_museum_greek_revival.webp', summary:'以雅典式柱廊與大中庭聞名的博物館，其希臘復興立面成為倫敦文化地標。',
 milestone:'以八根愛奧尼柱式複刻希臘神廟立面，再以鋼玻大中庭重塑博物館公共殿堂',
 body:[
  '大英博物館由羅伯特·斯默克於 1823 年設計，其正面以八根宏偉的愛奧尼柱式與三角形山牆構成，直接呼應古希臘神廟，是希臘復興式建築的代表。',
  '館內最著名的是由諾曼·福斯特設計的大中庭（Great Court），以玻璃與鋼構屋頂覆蓋中央庭院，形成一個通透的公共空間，連接了博物館的各展廳。',
  '大英博物館收藏了帕德嫩大理石等大量世界文物，其建築本身就是希臘復興與現代玻璃工程的結合，象徵著博物館作為公共文化殿堂的理念。'
 ],
 buildings:['大英博物館','大中庭','希臘復興立面'],
 buildingsEn:['British Museum','Great Court','Greek Revival Façade'],
 architects:['羅伯特·斯默克','諾曼·福斯特（大中庭）'],
 architectsEn:['Robert Smirke','Norman Foster (Great Court)'],
 terms:[{t:'希臘復興式',d:'19 世紀直接模仿古希臘神廟的建築風格'},{t:'大中庭',d:'以玻璃屋頂覆蓋的中央庭院空間'}],
 keywords:['倫敦','博物館','希臘復興','柱廊','玻璃']
},
{
 id:42, title:'冬宮', en:'Winter Palace', style:'巴洛克', region:'歐洲', cat:'renbaroque', era:'1754–1762', featured:false,
 img:'images/winter_palace_petersburg_baroque.webp', summary:'聖彼得堡的巴洛克宮殿，俄羅斯沙皇的冬宮，其華麗立面與綠白配色成為冬宮博物館的所在。',
 milestone:'以綠白立面與逾千廳室將義大利巴洛克移植俄國，蛻變為艾爾米塔什藝術殿堂',
 body:[
  '冬宮由義大利建築師弗朗切斯科·拉斯特雷利於 1754–1762 年興建，是俄羅斯巴洛克建築的巔峰。其立面以綠色與白色相間，飾以大量柱式、山牆與鍍金雕飾。',
  '宮殿規模宏大，內有超過一千間房間，繁複的裝飾與金色大廳彰顯沙皇的絕對權力。其約旦階梯與宴會大廳金碧輝煌，是俄羅斯宮廷文化的代表。',
  '冬宮自 1917 年十月革命後改為國家艾爾米塔什博物館，收藏數百萬件藝術品，是全世界最重要的博物館之一，其建築本身即為俄國巴洛克的傑作。'
 ],
 buildings:['冬宮','約旦階梯','艾爾米塔什博物館'],
 buildingsEn:['Winter Palace','Jordan Staircase','Hermitage Museum'],
 architects:['弗朗切斯科·拉斯特雷利'],
 architectsEn:['Francesco Rastrelli'],
 terms:[{t:'俄羅斯巴洛克',d:'融合義大利與俄國傳統的華麗巴洛克風格'},{t:'冬宮',d:'俄國沙皇在聖彼得堡的冬季皇宮'}],
 keywords:['俄羅斯','聖彼得堡','巴洛克','冬宮','博物館']
},
/* ========== 近現代建築 modern (43–62) ========== */
{
 id:43, title:'水晶宮', en:'Crystal Palace', style:'工業時期', region:'歐洲', cat:'modern', era:'1851', featured:false,
 img:'images/crystal_palace_iron_glass.webp', summary:'1851 年萬國博覽會以鐵與玻璃預製構件快速組裝的巨型展廳，開啟了現代建築工業化之門。',
 milestone:'首以預製鐵玻模組於數月內崛起19英畝巨廳，宣告現代工業建築材料革命',
 body:[
  '水晶宮由約瑟夫·帕克斯頓設計，為 1851 年倫敦萬國博覽會而建。它以預製的鐵柱與玻璃板組成，占地達 19 英畝，以空前速度在數月內組裝完成。',
  '這座建築徹底顛覆了傳統的厚重牆體觀念，以輕盈的結構與大面積採光創造了通透的「溫室式」空間。其模組化與預製工法預示了現代工業建築的方向。',
  '水晶宮於博覽會後遷至倫敦南部重建，惜於 1936 年遭火災焚毀。它標誌著鐵與玻璃作為建築材料的勝利，是現代建築史的里程碑。'
 ],
 buildings:['水晶宮','萬國博覽會展館'],
 buildingsEn:['Crystal Palace','World\'s Fair Pavilion'],
 architects:['約瑟夫·帕克斯頓'],
 architectsEn:['Joseph Paxton'],
 terms:[{t:'預製構件',d:'工廠預先生產、現場快速組裝的建築部件'},{t:'萬國博覽會',d:'展示各國工業與文化成就的世界性博覽會'}],
 keywords:['倫敦','鐵','玻璃','博覽會','工業']
},
{
 id:44, title:'艾菲爾鐵塔', en:'Eiffel Tower', style:'工業時期', region:'歐洲', cat:'modern', era:'1887–1889', featured:true,
 img:'images/eiffel_tower_paris_landmark.webp', summary:'為 1889 年巴黎世界博覽會而建的鐵塔，一度是世界最高建築，成為巴黎與工業時代的象徵。',
 milestone:'以1.8萬塊鍛鐵鉚接與漸收抗風曲線登頂世界最高，將工程美鑄為法國象徵',
 body:[
  '艾菲爾鐵塔由古斯塔夫·艾菲爾設計，為 1889 年巴黎世界博覽會而建。全高約 300 公尺（含天線 330 公尺），以約 1.8 萬塊鍛鐵鉚接而成，完工時是世界最高建築。',
  '鐵塔的結構透過精密的風力計算與漸收的曲線抵抗風荷，體現了工程理性。其觀景台俯瞰巴黎全景，成為城市地標。',
  '鐵塔最初被許多藝術家視為「怪物」並遭反對，但最終成為法國的全球象徵。它標誌著鐵結構與工程美學在公共紀念物上的勝利。'
 ],
 buildings:['艾菲爾鐵塔','戰神廣場'],
 buildingsEn:['Eiffel Tower','Champ de Mars'],
 architects:['古斯塔夫·艾菲爾'],
 architectsEn:['Gustave Eiffel'],
 terms:[{t:'鍛鐵',d:'經鍛造加工、強度較高的鐵'},{t:'抗風結構',d:'為抵抗風力而設計的漸收與孔隙化結構'}],
 keywords:['巴黎','艾菲爾','鐵塔','世界博覽會','工程']
},
{
 id:45, title:'布魯克林大橋', en:'Brooklyn Bridge', style:'工業時期', region:'美洲', cat:'modern', era:'1869–1883', featured:false,
 img:'images/brooklyn_bridge_suspension_steel.webp', summary:'首座以鋼纜吊索跨越寬闊水道的大橋，其哥德式石塔與混合理論是工程史與城市象徵。',
 milestone:'首創以鋼纜吊索與哥德石塔混合跨越東河，開啟現代長跨吊橋工程紀元',
 body:[
  '布魯克林大橋由約翰·羅布林設計、其子華盛頓·羅布林監造，於 1869–1883 年建成，是當時世界上最長的吊橋，跨越東河連接曼哈頓與布魯克林。',
  '這座橋首次大規模使用鋼纜，結合鋼索與石造塔墩的「混合式吊橋」結構。巨大的哥德式石拱塔既是工程結構也是建築裝飾，兼顧美學與功能。',
  '興建過程犧牲了多位工人與工程師，其頑強與壯觀使它成為紐約與美國工業精神的象徵，也被視為土木工程史上最重要的橋樑之一。'
 ],
 buildings:['布魯克林大橋','東河'],
 buildingsEn:['Brooklyn Bridge','East River'],
 architects:['約翰·羅布林','華盛頓·羅布林'],
 architectsEn:['John A. Roebling','Washington Roebling'],
 terms:[{t:'吊橋',d:'以懸掛鋼纜與吊索支撐橋面的橋樑'},{t:'鋼纜',d:'由多股鋼絲絞合而成的高強度纜索'}],
 keywords:['紐約','布魯克林','吊橋','鋼纜','工程']
},
{
 id:46, title:'巴黎歌劇院', en:'Palais Garnier', style:'美術學院派', region:'歐洲', cat:'modern', era:'1861–1875', featured:false,
 img:'images/palais_garnier_opera_paris.webp', summary:'第二帝國時期美術學院派的奢華殿堂，其華麗立面與宏偉階梯成為歌劇院的建築原型。',
 milestone:'以鍍金大階梯與繁複柱式立面樹立歌劇院原型，綻放第二帝國學院派奢華',
 body:[
  '巴黎歌劇院由夏爾·加尼葉設計，1861 年動工，1875 年啟用，是法國第二帝國時期美術學院派建築的極致代表。',
  '其立面以繁複的柱式、雕塑與鍍金裝飾構成，內部宏偉的大階梯與大廳金碧輝煌，天花板由夏卡爾繪製。整個建築被譽為「一個裝飾的大盒子」。',
  '巴黎歌劇院體現了美術學院派對華麗、對稱與劇場性的追求，其階梯與觀眾席空間深刻影響了全球歌劇院的設計，也啟發了《歌劇魅影》的傳說。'
 ],
 buildings:['巴黎歌劇院','大階梯','歌劇院大道'],
 buildingsEn:['Palais Garnier (Paris Opera)','Grand Staircase','Avenue de l\'Opéra'],
 architects:['夏爾·加尼葉'],
 architectsEn:['Charles Garnier'],
 terms:[{t:'美術學院派',d:'19 世紀法國美術學院強調的華麗折衷風格'},{t:'加尼葉歌劇院',d:'巴黎歌劇院的正式名稱'}],
 keywords:['巴黎','歌劇院','加尼葉','豪華','折衷']
},
{
 id:47, title:'聖家堂', en:'Sagrada Família', style:'新藝術', region:'歐洲', cat:'modern', era:'1882–至今', featured:true,
 img:'images/sagrada_familia_barcelona_gaudi.webp', summary:'安東尼·高第的未竟巨作，以自然有機形態與結構創新持續建造，是巴塞隆納的永恆地標。',
 milestone:'以樹狀分叉支柱與雙曲面仿生結構支撐高塔，書寫百年猶續建造的建築傳奇',
 body:[
  '聖家堂由安東尼·高第自 1883 年起接手設計，至今仍在建造，是世界上最著名的未完工建築。它融合哥德式與新藝術的有機形態，以仿生結構著稱。',
  '高第以樹狀分叉的支柱、雙曲面與自然幾何支撐高聳的空間，將力學與生物形態結合。其十八座尖塔象徵基督與使徒，立面雕刻繁複的聖經故事。',
  '聖家堂被聯合國教科文組織列為世界遺產，計畫於 21 世紀陸續完成。它體現了高第「建築即自然」的哲學，是西班牙現代主義建築的巔峰。'
 ],
 buildings:['聖家堂','誕生立面','受難立面','榮耀立面'],
 buildingsEn:['Sagrada Família','Nativity Façade','Passion Façade','Glory Façade'],
 architects:['安東尼·高第'],
 architectsEn:['Antoni Gaudí'],
 terms:[{t:'仿生結構',d:'模仿自然形態與力學的建築結構'},{t:'雙曲面',d:'高第使用的馬鞍形幾何曲面'}],
 keywords:['巴塞隆納','高第','聖家堂','新藝術','仿生']
},
{
 id:48, title:'米拉之家', en:'Casa Milà', style:'新藝術', region:'歐洲', cat:'modern', era:'1906–1912', featured:false,
 img:'images/casa_mila_barcelona_gaudi.webp', summary:'高第以流動的波浪石立面與無承重牆結構打造的公寓，被戲稱為「採石場」。',
 milestone:'揚棄承重牆改以內藏柱拱支撐，成就波浪海蝕般的有機立面與自由開放住宅',
 body:[
  '米拉之家由高第於 1906–1912 年為米拉夫婦設計的公寓，位於巴塞隆納的格拉西亞大道。其波浪狀的石造立面宛如海蝕岩壁，陽台鐵欄則如蔓生植物。',
  '建築內部以自由平面與無承重牆設計，支撐結構藏於內部的柱與拱，讓空間極具彈性。屋頂上矗立著造型奇特的煙囪與通風塔。',
  '米拉之家被戲稱為「採石場」（La Pedrera），是現代主義住宅的典範。它於 1984 年被列入世界遺產，體現高第對自然形態與結構自由的追求。'
 ],
 buildings:['米拉之家','波浪立面','屋頂雕塑'],
 buildingsEn:['Casa Milà (La Pedrera)','Wavy Façade','Rooftop Sculptures'],
 architects:['安東尼·高第'],
 architectsEn:['Antoni Gaudí'],
 terms:[{t:'自由平面',d:'不以承重牆限定、空間可自由分隔的平面'},{t:'有機立面',d:'模仿自然波浪與生物形態的建築立面'}],
 keywords:['巴塞隆納','高第','公寓','波浪','有機']
},
{
 id:49, title:'奎爾公園', en:'Park Güell', style:'新藝術', region:'歐洲', cat:'modern', era:'1900–1914', featured:false,
 img:'images/park_guell_barcelona_mosaic.webp', summary:'高第為奎爾伯爵設計的住宅公園，其馬賽克蜥蜴與波浪座椅構築了童話般的公共空間。',
 milestone:'首以碎裂馬賽克拼貼波浪座椅依山組景，將有機地景鑄為大眾公共樂園',
 body:[
  '奎爾公園由高第於 1900–1914 年設計，原為奎爾伯爵委託的住宅社區，後因計畫未成而轉為公園。它依山勢而建，融入地中海的地形與光線。',
  '公園以碎裂馬賽克（trencadís）拼貼的波浪長椅、入口的彩色蜥蜴噴泉與百柱廳著稱，色彩斑斕如夢境。高第以地景建築手法將自然與人造和諧融合。',
  '奎爾公園於 1984 年被列入世界遺產，是巴塞隆納最受歡迎的公共空間之一，也展現了高第對馬賽克工藝與有機地景的獨創性。'
 ],
 buildings:['奎爾公園','波浪座椅','百柱廳','蜥蜴噴泉'],
 buildingsEn:['Park Güell','Wavy Bench','Hypostyle Hall','Lizard Fountain'],
 architects:['安東尼·高第'],
 architectsEn:['Antoni Gaudí'],
 terms:[{t:'馬賽克拼貼',d:'以碎瓷片拼貼裝飾的工藝，加泰隆尼亞語稱 trencadís'},{t:'地景建築',d:'將建築與自然地形融為一體的設計'}],
 keywords:['巴塞隆納','高第','公園','馬賽克','地景']
},
{
 id:50, title:'克萊斯勒大樓', en:'Chrysler Building', style:'裝飾藝術', region:'美洲', cat:'modern', era:'1928–1930', featured:true,
 img:'images/chrysler_building_art_deco.webp', summary:'裝飾藝術風格的巔峰，其不鏽鋼拱形塔冠與日光角窗定義了紐約的摩天樓黃金時代。',
 milestone:'以層層收分的不鏽鋼拱冠與日光角窗登頂世界最高，鐫刻裝飾藝術摩天神話',
 body:[
  '克萊斯勒大樓由威廉·凡·艾倫設計，於 1928–1930 年建成，是克萊斯勒汽車公司的總部。它曾是當時世界最高的建築，直至被帝國大廈超越。',
  '其最著名的是層層收縮的不鏽鋼拱形塔冠，以放射狀的日光角窗與鷹頭裝飾構成裝飾藝術的極致。大樓象徵速度與機器時代的優雅。',
  '克萊斯勒大樓被譽為裝飾藝術摩天樓的代表作，其塔冠設計啟發了全球摩天樓的造型，是紐約天際線最具辨識度的地標之一。'
 ],
 buildings:['克萊斯勒大樓','裝飾藝術塔冠'],
 buildingsEn:['Chrysler Building','Art Deco Crown'],
 architects:['威廉·凡·艾倫'],
 architectsEn:['William Van Alen'],
 terms:[{t:'裝飾藝術',d:'1920–1940 年代的幾何、對稱、奢華裝飾風格'},{t:'日光角窗',d:'以三角形與拱形窗構成的裝飾語彙'}],
 keywords:['紐約','克萊斯勒','裝飾藝術','摩天樓','不鏽鋼']
},
{
 id:51, title:'帝國大廈', en:'Empire State Building', style:'裝飾藝術', region:'美洲', cat:'modern', era:'1930–1931', featured:true,
 img:'images/empire_state_building_skyscraper.webp', summary:'曾為世界最高建築逾四十年，其階梯式收頂與藝術裝飾立面成為美國夢與紐約的象徵。',
 milestone:'創下一年多極速施工紀錄，以階梯收頂定義裝飾藝術摩天樓',
 body:[
  '帝國大廈由施里夫、蘭姆與哈蒙建築師事務所設計，於 1930–1931 年在短短一年多內建成，高達 381 公尺，成為當時世界最高建築並保持逾四十年。',
  '其立面以裝飾藝術風格的垂直線條與階梯式收頂著稱，頂部設有觀景台與夜間燈光秀。大廈的快速建造體現了摩天樓時代的工程與組織奇蹟。',
  '帝國大廈歷經經濟大蕭條時期興建，象徵著美國的韌性與樂觀，並在流行文化中（如《金剛》）屢屢出現，是紐約與美國的全球地標。'
 ],
 buildings:['帝國大廈','觀景台','裝飾藝術立面'],
 buildingsEn:['Empire State Building','Observation Deck','Art Deco Façade'],
 architects:['施里夫、蘭姆與哈蒙'],
 architectsEn:['Shreve, Lamb and Harmon'],
 terms:[{t:'階梯式收頂',d:'摩天樓依高度層層退縮的形體'},{t:'觀景台',d:'位於高層供人俯瞰城市的平台'}],
 keywords:['紐約','帝國大廈','摩天樓','裝飾藝術','地標']
},
{
 id:52, title:'芝加哥論壇報大樓', en:'Tribune Tower', style:'裝飾藝術', region:'美洲', cat:'modern', era:'1923–1925', featured:false,
 img:'images/tribune_tower_chicago_gothic.webp', summary:'1922 年國際設計競賽的獲勝之作，其哥德式塔冠匯集全球名勝石材，開啟了摩天樓競賽傳統。',
 milestone:'首將哥德塔冠與飛扶壁語彙移植於摩天樓，以環球石材嵌面',
 body:[
  '論壇報大樓由雷蒙德·胡德與約翰·豪厄爾斯設計，源於 1922 年芝加哥論壇報主辦的國際建築競賽，該競賽吸引了全球頂尖建築師參與，成為現代建築史的轉捩點。',
  '建築以哥德式的垂直塔冠與飛扶壁語彙融入摩天樓，立面嵌有來自全球著名建築的紀念石材。胡德的折衷設計擊敗了包括理性主義在內的多位競爭者。',
  '這座大樓象徵著摩天樓樣式的多樣性與國際競賽對建築方向的影響，也見證了芝加哥作為現代建築之都的地位。'
 ],
 buildings:['論壇報大樓','哥德式塔冠'],
 buildingsEn:['Tribune Tower','Gothic Revival Crown'],
 architects:['雷蒙德·胡德','約翰·豪厄爾斯'],
 architectsEn:['Raymond Hood','John Mead Howells'],
 terms:[{t:'哥德式復興',d:'現代建築中借用哥德式垂直語彙的風格'},{t:'建築競賽',d:'以競圖方式徵選建築設計的機制'}],
 keywords:['芝加哥','論壇報','哥德式','摩天樓','競賽']
},
{
 id:53, title:'包浩斯校舍', en:'Bauhaus Dessau', style:'國際式', region:'歐洲', cat:'modern', era:'1925–1926', featured:true,
 img:'images/bauhaus_dessau_gropius_functionalism.webp', summary:'格羅佩斯設計的包浩斯校舍，以不對稱體量、玻璃帷幕與功能主義開啟現代主義教育與建築新頁。',
 milestone:'以玻璃帷幕與裸露鋼混凝土拋棄歷史裝飾，樹立形式追隨功能典範',
 body:[
  '包浩斯德紹校舍由沃爾特·格羅佩斯於 1925–1926 年設計，是現代主義建築與設計教育的里程碑。它整合了工坊、教室、宿舍與禮堂等功能。',
  '建築以不對稱的體量組合、水平開窗、玻璃帷幕與裸露的混凝土、磚構為特徵，強調「形式追隨功能」，拋棄了歷史裝飾。',
  '包浩斯校舍象徵著現代設計運動的理想，將藝術、工藝與工業結合。它於 1996 年被列入世界遺產，深刻影響了全球的現代建築與設計教育。'
 ],
 buildings:['包浩斯校舍','工坊翼','玻璃帷幕'],
 buildingsEn:['Bauhaus Building (Dessau)','Workshop Wing','Glass Curtain Wall'],
 architects:['沃爾特·格羅佩斯'],
 architectsEn:['Walter Gropius'],
 terms:[{t:'功能主義',d:'以功能決定形式的現代建築原則'},{t:'形式追隨功能',d:'沙利文所倡導的現代主義格言'}],
 keywords:['德紹','包浩斯','格羅佩斯','功能主義','現代']
},
{
 id:54, title:'薩伏伊別墅', en:'Villa Savoye', style:'現代主義', region:'歐洲', cat:'modern', era:'1928–1931', featured:true,
 img:'images/villa_savoye_le_corbusier.webp', summary:'勒·柯比意「新建築五點」的完整宣言，其懸浮量體與水平窗定義了現代住宅。',
 milestone:'完整實踐底層支柱、屋頂花園等新建築五點，塑造懸浮白盒住宅',
 body:[
  '薩伏伊別墅由勒·柯比意於 1928–1931 年設計，位於巴黎郊外，是現代主義住宅的典範。它完整實踐了柯比意的「新建築五點」。',
  '五點包括：底層獨立支柱（pilotis）、屋頂花園、自由平面、水平長窗與自由立面。別墅宛如一座懸浮於草地的白色幾何盒，光線與空間自由流動。',
  '薩伏伊別墅象徵現代建築對衛生、光線與機械時代的追求，於 1965 年被列入法國歷史古蹟，是柯比意建築理論最具代表性的實踐。'
 ],
 buildings:['薩伏伊別墅','底層支柱','屋頂花園'],
 buildingsEn:['Villa Savoye','Pilotis','Roof Garden'],
 architects:['勒·柯比意'],
 architectsEn:['Le Corbusier'],
 terms:[{t:'新建築五點',d:'柯比意提出的現代建築五項原則'},{t:'Pilotis',d:'支撐建築底層的獨立柱'}],
 keywords:['巴黎','柯比意','現代主義','白盒子','五點']
},
{
 id:55, title:'落水山莊', en:'Fallingwater', style:'現代主義', region:'美洲', cat:'modern', era:'1935–1939', featured:true,
 img:'images/fallingwater_organic_house_waterfall.webp', summary:'法蘭克·洛伊·萊特的有機建築傑作，懸臂陽台凌越瀑布，將建築與自然地形融為一體。',
 milestone:'以凌空懸臂混凝土陽台覆於瀑布之上，獲譽美國建築史上最偉大作品',
 body:[
  '落水山莊由法蘭克·洛伊·萊特於 1935–1939 年為考夫曼家族設計，位於賓州熊跑溪的瀑布之上。其懸臂式混凝土陽台凌空伸向瀑布，成為有機建築的象徵。',
  '萊特以「與自然共生」的理念，讓石材、玻璃與混凝土與岩石、流水呼應，建築彷彿從基地自然生長。水平線條與大面積玻璃模糊了室內外界限。',
  '落水山莊被美國建築師學會評為「美國建築史上最偉大的作品」，其結構創新與環境融合深刻影響了現代建築，1966 年被列為國家歷史地標。'
 ],
 buildings:['落水山莊','懸臂陽台','溪石壁爐'],
 buildingsEn:['Fallingwater','Cantilevered Balcony','Creek-side Stone Hearth'],
 architects:['法蘭克·洛伊·萊特'],
 architectsEn:['Frank Lloyd Wright'],
 terms:[{t:'有機建築',d:'強調建築與自然環境和諧共生的理念'},{t:'懸臂結構',d:'一端固定、另一端伸出的承重結構'}],
 keywords:['美國','萊特','有機建築','懸臂','瀑布']
},
{
 id:56, title:'古根漢美術館（紐約）', en:'Guggenheim Museum NY', style:'現代主義', region:'美洲', cat:'modern', era:'1943–1959', featured:false,
 img:'images/guggenheim_new_york_spiral.webp', summary:'萊特的螺旋坡道美術館，以連續流動的空間徹底革新了博物館的參觀體驗。',
 milestone:'首創混凝土螺旋圓塔與中央天窗，將博物館化為連續流動的雕塑空間',
 body:[
  '紐約古根漢美術館由法蘭克·洛伊·萊特設計，1943 年開始構想，1959 年落成。其標誌性的白色螺旋坡道自上而下連續環繞，參觀者沿坡道自然地遊覽藝術品。',
  '建築以獨特的混凝土圓柱體量與螺旋的中央天窗構成，打破傳統博物館的方格展廳，強調空間的連續性與流動性。',
  '古根漢美術館是萊特晚期的代表作，其反傳統的博物館空間引起廣泛討論，卻成為紐約的建築地標與現代博物館設計的轉捩點。'
 ],
 buildings:['古根漢美術館','螺旋坡道','中央天窗'],
 buildingsEn:['Guggenheim Museum (New York)','Spiral Ramp','Central Skylight'],
 architects:['法蘭克·洛伊·萊特'],
 architectsEn:['Frank Lloyd Wright'],
 terms:[{t:'螺旋坡道',d:'連續環繞、無階梯的參觀坡道'},{t:'雕塑空間',d:'將建築空間本身視為藝術雕塑'}],
 keywords:['紐約','古根漢','萊特','螺旋','美術館']
},
{
 id:57, title:'巴西利亞大教堂', en:'Cathedral of Brasília', style:'現代主義', region:'美洲', cat:'modern', era:'1958–1970', featured:false,
 img:'images/brasilia_cathedral_niemeyer_concrete.webp', summary:'奧斯卡·尼邁耶的未來派主教座堂，以放射狀混凝土柱與彩色玻璃構成王冠般的形體。',
 milestone:'以十六根放射狀混凝土支柱張成荊冠形體，以曲線重塑現代主教座堂',
 body:[
  '巴西利亞大教堂由奧斯卡·尼邁耶設計，於 1958–1970 年建成，位於巴西新首都巴西利亞。其獨特的形體由十六根放射狀的混凝土支柱構成，宛如一頂荊冠或張開的手掌。',
  '支柱之間以彩色玻璃填補，讓光線以繽紛色彩灑入地下的禮拜空間。整體建築以流暢的曲線與混凝土的雕塑感著稱，是現代主義與未來主義的結合。',
  '巴西利亞大教堂是巴西利亞這座現代主義規劃城市的象徵之一，尼邁耶以曲線反抗直角，展現了現代主義在南美的獨特詮釋。'
 ],
 buildings:['巴西利亞大教堂','巴西利亞國家博物館','巴西利亞城市規劃'],
 buildingsEn:['Cathedral of Brasília','National Museum of Brasília','Brasília Master Plan'],
 architects:['奧斯卡·尼邁耶','路西奧·科斯塔（城市規劃）'],
 architectsEn:['Oscar Niemeyer','Lúcio Costa (Urban Planning)'],
 terms:[{t:'混凝土雕塑',d:'以混凝土塑造自由曲線的建築形式'},{t:'未來主義',d:'強調速度與未來感的建築風格'}],
 keywords:['巴西','巴西利亞','尼邁耶','混凝土','現代']
},
{
 id:58, title:'雪梨歌劇院', en:'Sydney Opera House', style:'現代主義', region:'大洋洲', cat:'modern', era:'1959–1973', featured:true,
 img:'images/sydney_opera_house_shell.webp', summary:'約恩·烏松以貝殼般的白帆屋頂塑造了全球最具辨識度的現代建築，歷經艱辛建成。',
 milestone:'以預製混凝土肋組裝球面貝殼殼體，克服工程難題躋身世界遺產',
 body:[
  '雪梨歌劇院由丹麥建築師約恩·烏松設計，源於 1957 年的國際競賽。其標誌性的白色「貝殼」屋頂由多片球面殼體構成，宛如張滿的帆。',
  '建造過程充滿工程挑戰與政治波折，烏松於中途辭職，建築於 1973 年由他人完成。其屋頂的預製混凝土肋與瓷磚覆面是結構與工藝的奇蹟。',
  '雪梨歌劇院被列為世界遺產，是 20 世紀最具代表性的建築之一，象徵澳洲的文化認同，也證明了大膽的建築夢想即使歷經磨難也能成為現實。'
 ],
 buildings:['雪梨歌劇院','表演大廳','音樂廳'],
 buildingsEn:['Sydney Opera House','Performance Hall','Concert Hall'],
 architects:['約恩·烏松'],
 architectsEn:['Jørn Utzon'],
 terms:[{t:'球面殼體',d:'以球面幾何構成的薄殼屋頂單元'},{t:'瓷磚覆面',d:'以白色瓷磚拼貼的防水飾面'}],
 keywords:['澳洲','雪梨','歌劇院','烏松','貝殼']
},
{
 id:59, title:'馬賽公寓', en:'Unité d\'Habitation', style:'粗獷主義', region:'歐洲', cat:'modern', era:'1947–1952', featured:false,
 img:'images/unite_habitation_marseille_brutalism.webp', summary:'勒·柯比意的「垂直花園城市」，以未修飾混凝土構築的巨型住宅單元，是粗獷主義的先聲。',
 milestone:'開創清水混凝土居住單元原型，以模數窗框與內部街道形塑垂直城市',
 body:[
  '馬賽公寓由勒·柯比意於 1947–1952 年設計，是他在二戰後構想的「居住單元」原型，試圖在單一巨型建築中容納城市生活所需的機能。',
  '建築以未修飾的清水混凝土（béton brut）構築，外立面飾以標準化的「模數」彩色窗框。內部設有購物街、托兒所、健身房與屋頂花園。',
  '馬賽公寓是粗獷主義建築的起源之作，其裸露混凝土的粗獷美學與垂直城市的理想深刻影響了二戰後的歐洲住宅與公共建築。'
 ],
 buildings:['馬賽公寓','屋頂花園','內部街道'],
 buildingsEn:['Unité d\'Habitation','Roof Garden','Interior Street'],
 architects:['勒·柯比意'],
 architectsEn:['Le Corbusier'],
 terms:[{t:'清水混凝土',d:'未加飾面的裸露混凝土，法語 béton brut'},{t:'粗獷主義',d:'以裸露混凝土與巨大體量為特徵的建築風格'}],
 keywords:['馬賽','柯比意','住宅','混凝土','粗獷']
},
{
 id:60, title:'蓬皮杜中心', en:'Centre Pompidou', style:'高技術', region:'歐洲', cat:'modern', era:'1971–1977', featured:true,
 img:'images/centre_pompidou_high_tech.webp', summary:'皮亞諾與羅傑斯將設備管線外露於立面的高技術建築，徹底顛覆了博物館的空間與形象。',
 milestone:'將結構管線以彩色編碼全部外露，打造內外翻轉的機器式文化空間',
 body:[
  '蓬皮杜中心由倫佐·皮亞諾與理查·羅傑斯設計，源於 1971 年的競賽，於 1977 年落成。其最具爭議的特色是將結構、管線與電扶梯全部外露於彩色立面上。',
  '建築內部以無柱的開放空間容納博物館、圖書館與表演廳，外露的管線以顏色區分（藍為空調、綠為水、黃為電、紅為動線），形成「內外翻轉」的機器美學。',
  '蓬皮杜中心是高技術建築的代表作，其激進的外觀最初飽受爭議，如今卻成為巴黎最受歡迎的文化地標之一，深刻影響了現代文化建築。'
 ],
 buildings:['蓬皮杜中心','外露管線','電扶梯'],
 buildingsEn:['Centre Pompidou','Exposed Pipes','Escalator'],
 architects:['倫佐·皮亞諾','理查·羅傑斯'],
 architectsEn:['Renzo Piano','Richard Rogers'],
 terms:[{t:'高技術',d:'以暴露結構與設備為美學的建築風格'},{t:'服務帶',d:'集中配置管線與設備的建築區帶'}],
 keywords:['巴黎','蓬皮杜','皮亞諾','羅傑斯','高技術']
},
{
 id:61, title:'西格拉姆大廈', en:'Seagram Building', style:'國際式', region:'美洲', cat:'modern', era:'1954–1958', featured:true,
 img:'images/seagram_building_glass_tower.webp', summary:'密斯·凡·德·羅的鋼構玻璃摩天樓，其懸吊玻璃帷幕與廣場成為國際式風格的完美典範。',
 milestone:'以青銅鋼構與玻璃帷幕極致演繹少即是多，樹立二十世紀辦公樓國際標竿',
 body:[
  '西格拉姆大廈由路德維希·密斯·凡·德·羅與菲利普·強森設計，於 1954–1958 年建成於紐約。它被譽為國際式風格摩天樓的完美化身。',
  '建築以青銅色鋼構與玻璃帷幕構成簡潔的垂直體量，立面採用「少即是多」的幾何秩序。其前方的廣場成為紐約摩天樓的公共空間範例。',
  '西格拉姆大廈是密斯「皮與骨」建築理念的極致，其對比例、材質與細節的精準控制，使其成為 20 世紀辦公建築的國際標竿。'
 ],
 buildings:['西格拉姆大廈','紐約廣場'],
 buildingsEn:['Seagram Building','Seagram Plaza'],
 architects:['密斯·凡·德·羅','菲利普·強森'],
 architectsEn:['Ludwig Mies van der Rohe','Philip Johnson'],
 terms:[{t:'國際式風格',d:'強調玻璃帷幕、幾何秩序與少裝飾的現代風格'},{t:'少即是多',d:'密斯倡導的極簡建築格言'}],
 keywords:['紐約','密斯','玻璃帷幕','鋼構','國際式']
},
{
 id:62, title:'泰特現代美術館', en:'Tate Modern', style:'工業時期', region:'歐洲', cat:'modern', era:'2000（改造）', featured:false,
 img:'images/tate_modern_power_station.webp', summary:'赫佐格與德梅隆將廢棄發電廠改造為美術館，其渦輪大廳成為當代藝術的殿堂。',
 milestone:'以最小介入保留發電廠渦輪大廳，樹立工業遺產活化為美術館的典範',
 body:[
  '泰特現代美術館由赫爾佐格與德梅隆於 2000 年將倫敦的河岸發電廠改造而成。其巨大的渦輪大廳被保留為無柱的入口空間，尺度恢宏。',
  '改造策略以「最小介入」為原則，保留原有的磚造量體與煙囪，新增的玻璃擴建頂層（2016 年完成）提供開闊的觀景與展覽空間。',
  '泰特現代美術館是工業遺產活化與當代藝術結合的典範，其成功改造證明歷史建築能以現代功能重獲新生，成為倫敦最具人氣的文化地標。'
 ],
 buildings:['泰特現代美術館','渦輪大廳','橋屋擴建'],
 buildingsEn:['Tate Modern','Turbine Hall','Switch House (Blavatnik Building)'],
 architects:['赫爾佐格與德梅隆'],
 architectsEn:['Herzog & de Meuron'],
 terms:[{t:'工業遺產活化',d:'將廢棄工業建築賦予新用途的改造'},{t:'渦輪大廳',d:'發電廠原渦輪機房改造的巨大入口空間'}],
 keywords:['倫敦','泰特','改造','美術館','工業']
},
/* ========== 東亞傳統 east (63–76) ========== */
{
 id:63, title:'北京故宮', en:'Forbidden City', style:'傳統中式', region:'亞洲', cat:'east', era:'1406–1420', featured:true,
 img:'images/forbidden_city_beijing_palace.webp', summary:'明清兩代皇宮，世界上最大的木構宮殿群，其中軸對稱與屋瓦等級體系是中國古典建築的總成。',
 milestone:'以中軸對稱布局與黃瓦紅牆等級體系，集中國古代宮殿營造之大成',
 body:[
  '北京故宮（紫禁城）於 1406–1420 年由明成祖興建，是明清兩代二十四位皇帝的皇宮，占地約 72 萬平方公尺，是世界上現存最大的宮殿建築群。',
  '整座宮城沿南北中軸線嚴格對稱，以太和、中和、保和三大殿為核心，前朝後寢，層層遞進。黃色琉璃瓦、紅色牆身與漢白玉台基構成等級森嚴的色彩體系。',
  '故宮採用抬梁式木構架，以斗栱承托屋簷，屋頂形式依等級分為廡殿、歇山等。它於 1987 年被列入世界遺產，是中國古代宮殿建築與禮制的最高表現。'
 ],
 buildings:['太和殿','乾清宮','午門','角樓'],
 buildingsEn:['Hall of Supreme Harmony','Palace of Heavenly Purity','Meridian Gate','Corner Tower'],
 architects:['蒯祥','蔡信'],
 architectsEn:['Kuai Xiang','Cai Xin'],
 terms:[{t:'斗栱',d:'木構中承托屋簷的層層交錯構件'},{t:'中軸對稱',d:'沿中軸線左右對稱的傳統布局'}],
 keywords:['北京','故宮','紫禁城','木構','中軸線']
},
{
 id:64, title:'天壇祈年殿', en:'Temple of Heaven', style:'傳統中式', region:'亞洲', cat:'east', era:'1420–1890', featured:true,
 img:'images/temple_of_heaven_beijing.webp', summary:'明清皇帝祭天的圓形三重簷大殿，以「天圓」理念與藍瓦金頂構築宇宙秩序。',
 milestone:'以二十八根柱子對應四時月令，將祭天建築化為天人合一的數理儀式空間',
 body:[
  '天壇始建於 1420 年，是明清皇帝祭天祈穀的聖地。其核心的祈年殿為圓形三重簷藍瓦大殿，矗立於三層漢白玉圓台上，象徵「天圓」。',
  '祈年殿以圓形平面、藍色琉璃瓦與鎏金寶頂呼應天象，內部以二十八根柱子象徵四時、十二個月與十二時辰。圜丘壇以九的倍數構築祭天的數理。',
  '天壇整體布局以「天圓地方」為理念，建築與數理、色彩嚴密對應，體現了中國古代「天人合一」的宇宙觀，於 1998 年被列入世界遺產。'
 ],
 buildings:['祈年殿','圜丘壇','皇穹宇','齋宮'],
 buildingsEn:['Hall of Prayer for Good Harvests','Circular Mound Altar','Imperial Vault of Heaven','Hall of Abstinence'],
 architects:['明成祖時期的營造工匠'],
 architectsEn:['Craftsmen of the Yongle Emperor period (Ming Chengzu)'],
 terms:[{t:'天圓地方',d:'以圓象徵天、以方象徵地的傳統宇宙觀'},{t:'三重簷',d:'三層屋簷疊加的屋頂形式'}],
 keywords:['北京','天壇','祈年殿','祭天','天圓']
},
{
 id:65, title:'應縣木塔', en:'Yingxian Wooden Pagoda', style:'傳統中式', region:'亞洲', cat:'east', era:'1056', featured:false,
 img:'images/yingxian_wooden_pagoda_liao.webp', summary:'佛宮寺釋迦塔，世界現存最高最古老的純木構樓閣式塔，歷經地震與戰亂千年不倒。',
 milestone:'疊用數十種斗栱構成外五內九層塔身，歷經地震砲擊千年屹立不倒',
 body:[
  '應縣木塔（佛宮寺釋迦塔）建於 1056 年（遼代），高約 67 公尺，是世界上現存最高、最古老的純木結構樓閣式塔。',
  '木塔以抬梁與鬥栱層層疊構，外觀五層、內部實為九層，採用數十種鬥栱組合。其精密的木構接合與受力體系使其歷經多次地震與砲擊仍巍然屹立。',
  '應縣木塔是中國古代木構建築的奇蹟，其斗栱之繁複與結構之穩定被譽為「木塔之冠」，也是研究中國古建築力學與工藝的珍貴實物。'
 ],
 buildings:['應縣木塔','佛宮寺'],
 buildingsEn:['Yingxian Wooden Pagoda','Fogong Temple'],
 architects:['遼代營造工匠'],
 architectsEn:['Liao-dynasty builders and craftsmen'],
 terms:[{t:'樓閣式塔',d:'以樓閣層疊構成的木塔形式'},{t:'斗栱',d:'木構的層層承托構件'}],
 keywords:['應縣','木塔','遼代','斗栱','木構']
},
{
 id:66, title:'佛光寺東大殿', en:'Foguang Temple', style:'傳統中式', region:'亞洲', cat:'east', era:'857', featured:true,
 img:'images/foguang_temple_tang_dynasty.webp', summary:'中國現存最早的唐代木構大殿之一，1937 年梁思成與林徽因發現，是研究唐代建築的關鍵實物。',
 milestone:'以碩大斗栱與深遠出簷確證唐代木構樣式，改寫中國古建築研究坐標',
 body:[
  '佛光寺東大殿位於山西五台山，建於 857 年（唐大中十一年），是中國現存保存最完整的唐代木構建築之一，被譽為「唐代建築的瑰寶」。',
  '1937 年，建築史家梁思成與林徽因依據敦煌壁畫線索找到此殿，確證了唐代木構的樣式。大殿以雄偉的斗栱、碩大的柱列與深遠的出簷著稱。',
  '東大殿的結構以梁柱斗栱構成的完整框架承重，其比例的雄健與工藝的嚴謹展現了唐代建築的宏偉氣象，是中國古建築研究的里程碑。'
 ],
 buildings:['佛光寺東大殿','唐代木構'],
 buildingsEn:['East Hall of Foguang Temple','Tang-dynasty timber structure'],
 architects:['唐代營造工匠'],
 architectsEn:['Tang-dynasty builders and craftsmen'],
 terms:[{t:'唐代木構',d:'唐代的木構建築樣式'},{t:'出簷',d:'屋簷向外延伸的深度'}],
 keywords:['山西','佛光寺','唐代','木構','梁思成']
},
{
 id:67, title:'蘇州園林', en:'Suzhou Classical Gardens', style:'傳統中式', region:'亞洲', cat:'east', era:'11–19世紀', featured:true,
 img:'images/suzhou_garden_rockery_literati.webp', summary:'「咫尺山林」的私家園林典範，以疊石、理水與借景構築文人理想中的自然天地。',
 milestone:'以疊石理水與借景虛實手法，在咫尺之地再造文人理想中的山水意境',
 body:[
  '蘇州園林是中國私家園林的代表，以拙政園、留園等為典範，盛行於 11–19 世紀。文人造園師以「咫尺山林」的理念，在有限空間中營造無限的自然意境。',
  '園林以疊石、理水、建築與花木四要素構成，透過借景、對景與虛實相生的手法創造層次豐富的空間。太湖石的瘦漏透皺成為疊石美學的標誌。',
  '蘇州園林是中國「天人合一」與文人隱逸理想的具象化，拙政園、留園等於 1997 年被列入世界遺產，影響了東亞庭園藝術。'
 ],
 buildings:['拙政園','留園','網師園','環秀山莊'],
 buildingsEn:['Humble Administrator\'s Garden','Lingering Garden','Master of the Nets Garden','Mountain Villa with Embracing Beauty'],
 architects:['文人造園家（如計成、文徵明相關）'],
 architectsEn:['Literati garden designers (e.g. Ji Cheng, associated with Wen Zhengming)'],
 terms:[{t:'借景',d:'將園外景物納入園內視覺的手法'},{t:'疊石理水',d:'以假山與水體構築園林景觀'}],
 keywords:['蘇州','園林','拙政園','疊石','文人']
},
{
 id:68, title:'萬里長城', en:'Great Wall of China', style:'傳統中式', region:'亞洲', cat:'east', era:'前7世紀–17世紀', featured:true,
 img:'images/great_wall_china_fortress.webp', summary:'歷經兩千年修築的巨型防禦工事，其烽燧、關隘與磚石工程綿延萬里，是中華文明的象徵。',
 milestone:'歷經兩千年續建、綿延逾兩萬公里，以磚石敵樓依山勢構成最宏偉防禦工程',
 body:[
  '萬里長城始於春秋戰國，秦、漢、明等朝代歷經兩千餘年修築，總長逾兩萬公里，是世界上規模最宏大的軍事防禦工程。',
  '現存主要為明代所築，以磚石與夯土構築城牆、敵樓、烽火台與關隘，依山勢蜿蜒。八達嶺、居庸關、嘉峪關等為著名關口。',
  '長城體現了古代中國在組織、測量與營造上的巨大成就，於 1987 年被列入世界遺產，既是防禦的智慧，也是中華民族精神的象徵。'
 ],
 buildings:['八達嶺','居庸關','嘉峪關','烽火台'],
 buildingsEn:['Badaling','Juyong Pass','Jiayu Pass (Jiayuguan)','Beacon Tower'],
 architects:['歷代王朝的軍事營造系統'],
 architectsEn:['Military construction system of successive dynasties'],
 terms:[{t:'烽火台',d:'以煙火傳遞軍情的瞭望台'},{t:'關隘',d:'長城上的軍事要隘'}],
 keywords:['長城','中國','防禦','磚石','烽火']
},
{
 id:69, title:'京都金閣寺', en:'Kinkaku-ji', style:'日本傳統', region:'亞洲', cat:'east', era:'1397', featured:true,
 img:'images/kinkakuji_golden_pavilion_kyoto.webp', summary:'足利義滿的舍利殿，金箔覆面的樓閣倒映於鏡湖池，是北山文化的禪意象徵。',
 milestone:'三層樓閣融鑄寢殿造、武家造與禪宗佛殿三種樣式，金箔倒映池面成北山文化象徵',
 body:[
  '金閣寺（鹿苑寺舍利殿）建於 1397 年，為室町幕府將軍足利義滿的別墅。其三層樓閣以金箔覆面，矗立於鏡湖池畔，故稱「金閣」。',
  '建築各層採用不同樣式：底層為寢殿造、中層為武家造、上層為禪宗佛殿，反映當時多元的建築傳統。金閣與庭園、池水構成北山文化的意象。',
  '金閣寺在 1950 年遭一名僧侶縱火焚毀（三島由紀夫小說《金閣寺》取材於此），後依原樣重建並復貼金箔。它於 1994 年被列入世界遺產，是京都最著名的地標。'
 ],
 buildings:['金閣','鏡湖池','陸舟之松'],
 buildingsEn:['Golden Pavilion (Kinkaku)','Mirror Pond (Kyoko-chi)','Land-boat Pine (Rikushu-no-matsu)'],
 architects:['足利義滿的庭園營造者'],
 architectsEn:['Garden builders for Ashikaga Yoshimitsu'],
 terms:[{t:'寢殿造',d:'平安時代貴族住宅的樣式'},{t:'金箔覆面',d:'以金箔貼覆建築表面的工法'}],
 keywords:['京都','金閣寺','足利義滿','金箔','禪']
},
{
 id:70, title:'平等院鳳凰堂', en:'Byōdō-in Phoenix Hall', style:'日本傳統', region:'亞洲', cat:'east', era:'1053', featured:true,
 img:'images/byodoin_phoenix_hall_kyoto.webp', summary:'平安時代淨土宗建築的傑作，其展翅如鳳凰的歇山頂與阿彌陀堂象徵西方極樂淨土。',
 milestone:'以展翅鳳凰般的平面與銅鳳凰歇山頂，將西方極樂淨土具象於阿字池畔',
 body:[
  '平等院鳳凰堂位於京都宇治，建於 1053 年，是平安時代淨土信仰建築的代表。其平面如展翅的鳳凰，中央為阿彌陀堂，兩側為翼廊。',
  '鳳凰堂被設計成「西方極樂淨土的具體化」，堂內供奉阿彌陀如來坐像，壁面繪有淨土圖。其屋頂兩端的鳳凰銅像與優美的歇山頂輪廓著稱。',
  '鳳凰堂是日本現存最古老的貴族寢殿造建築，於 1994 年被列入世界遺產，也是日本千元紙幣上的圖案，象徵平安時代的貴族美學。'
 ],
 buildings:['鳳凰堂','阿彌陀堂','阿字池'],
 buildingsEn:['Phoenix Hall (Hoodo)','Amida Hall','Aji Pond (Aji-ike)'],
 architects:['藤原賴通委託的營造者'],
 architectsEn:['Builders commissioned by Fujiwara no Yorimichi'],
 terms:[{t:'淨土建築',d:'以表現西方淨土為理念的宗教建築'},{t:'歇山頂',d:'屋頂兩側呈三角形山面的形式'}],
 keywords:['宇治','平等院','鳳凰堂','淨土','平安']
},
{
 id:71, title:'法隆寺', en:'Hōryū-ji', style:'日本傳統', region:'亞洲', cat:'east', era:'607', featured:true,
 img:'images/horyuji_five_story_pagoda.webp', summary:'世界最古老的木構建築群之一，其金堂與五重塔是日本飛鳥時代建築與佛教文化的瑰寶。',
 milestone:'以中心柱結構支撐五重塔千年抗震，保存世界現存最古老木構伽藍群',
 body:[
  '法隆寺位於奈良，相傳由聖德太子於 607 年興建，是世界現存最古老的木構建築群之一。其西院的金堂與五重塔並列，構成飛鳥時代的伽藍布局。',
  '金堂以二重簷歇山頂與雲形斗栱著稱，內奉世界最古老的佛像之一。五重塔為現存最古老的木塔，其中心柱結構穩定歷經千年地震。',
  '法隆寺於 1993 年被列入世界遺產，是日本首個世界遺產之一，其木構技術與佛教藝術見證了日本接受中國與朝鮮建築影響的歷程。'
 ],
 buildings:['法隆寺金堂','五重塔','夢殿','迴廊'],
 buildingsEn:['Hōryū-ji Golden Hall (Kondō)','Five-story Pagoda','Yumedono (Hall of Dreams)','The Cloister (Kairō)'],
 architects:['飛鳥時代工匠（受百濟影響）'],
 architectsEn:['Asuka-period craftsmen (influenced by Baekje)'],
 terms:[{t:'伽藍',d:'佛教寺院建築群的整體布局'},{t:'五重塔',d:'五層的樓閣式木塔'}],
 keywords:['奈良','法隆寺','木構','聖德太子','世界遺產']
},
{
 id:72, title:'姬路城', en:'Himeji Castle', style:'日本傳統', region:'亞洲', cat:'east', era:'1333–1618', featured:true,
 img:'images/himeji_castle_white_heron.webp', summary:'日本保存最完整的木造城郭，其白牆天守與錯綜的防禦迷宮被譽為「白鷺城」。',
 milestone:'以五重六階木造天守與迷宮式防禦動線，築成日本保存最完好的白鷺城郭',
 body:[
  '姬路城始建於 14 世紀，於 1618 年由池田輝政完成現存的大天守，是日本保存最完好、最美的木造城郭，因其潔白牆面與展翅輪廓被稱為「白鷺城」。',
  '大天守為五重六階的木構建築，內部以複雜的「迷宮式」動線與多道城門、櫓台構成層層防禦。其屋頂曲線、白牆與防火構造是日本城郭的極致。',
  '姬路城是日本最早被列入世界遺產的古蹟之一，象徵戰國至江戶時代的築城技術與美學，也是日本城郭建築的典範。'
 ],
 buildings:['大天守','西之丸','小天守','城門'],
 buildingsEn:['Main Keep (Daitenshu)','Nishi-no-maru (West Bailey)','Small Keep (Kotenshu)','Castle Gates'],
 architects:['池田輝政的築城工匠'],
 architectsEn:['Castle builders under Ikeda Terumasa'],
 terms:[{t:'天守',d:'城郭中心最高的望樓式建築'},{t:'迷宮式動線',d:'以複雜路徑阻礙敵人的防禦布局'}],
 keywords:['姬路','白鷺城','天守','木造','世界遺產']
},
{
 id:73, title:'伊勢神宮', en:'Ise Grand Shrine', style:'日本傳統', region:'亞洲', cat:'east', era:'古代–現代', featured:false,
 img:'images/ise_grand_shrine_shinto.webp', summary:'日本神道最高聖地，其樸素的「神明造」建築每隔二十年遷宮重建，體現日本建築的永續傳統。',
 milestone:'首創每隔二十年依原樣遷宮重建，延續千餘年保存檜木工藝與永續傳統',
 body:[
  '伊勢神宮是日本神道信仰的最高聖地，供奉天照大神。其正殿採用「神明造」樣式，以樸素的檜木與茅草屋頂構成，無任何裝飾。',
  '伊勢神宮最特別的是「式年遷宮」：每隔二十年將正殿遷移至相鄰的用地並依原樣重建，已延續一千三百餘年。此舉既保存了工藝，也象徵生命的更新。',
  '伊勢神宮以素樸、原始的木造美學對比於華麗的宗教建築，是日本建築「侘寂」精神的源頭，也體現了日本以重建維護傳統的獨特方式。'
 ],
 buildings:['正殿','式年遷宮','內宮與外宮'],
 buildingsEn:['Main Sanctuary (Shōden)','Shikinen Sengū (Ritual Rebuilding)','Inner Sanctuary (Naikū) and Outer Sanctuary (Gekū)'],
 architects:['宮大工（神社木匠）'],
 architectsEn:['Miyadaiku (shrine carpenters)'],
 terms:[{t:'神明造',d:'日本最古老樸素的社殿樣式'},{t:'式年遷宮',d:'定期遷移重建神社的傳統儀式'}],
 keywords:['伊勢','神宮','神明造','遷宮','檜木']
},
{
 id:74, title:'桂離宮', en:'Katsura Imperial Villa', style:'日本傳統', region:'亞洲', cat:'east', era:'1620–1660', featured:false,
 img:'images/katsura_imperial_villa_kyoto.webp', summary:'江戶時代的書院造庭園別墅，其洗練的空間與「間」的美學被視為日本建築的至高典範。',
 milestone:'以書院造與迴遊庭園演繹間的留白美學，啟發陶特等西方現代主義建築師',
 body:[
  '桂離宮位於京都，建於 1620–1660 年，為八條宮家的別墅。它由書院造建築與迴遊式庭園構成，被譽為日本建築美學的極致。',
  '建築以簡潔的木構、推拉門與「間」（ma）的留白空間著稱，室內外透過廊道與庭園融為一體。其不對稱與素材的樸素展現了「侘寂」與自然。',
  '桂離宮在 20 世紀被現代主義建築師（如布魯諾·陶特）重新發現並推崇為抽象、理性的典範，深刻影響了西方對日本建築的認識。'
 ],
 buildings:['古書院','中書院','月波樓','庭園'],
 buildingsEn:['Old Shoin (Koshōin)','Middle Shoin (Chūshoin)','Gepparō (Moon-wave Pavilion)','The Garden'],
 architects:['八條宮家的營造者'],
 architectsEn:['Builders of the Hachijō-no-miya family'],
 terms:[{t:'書院造',d:'武家與貴族的住宅樣式'},{t:'間（Ma）',d:'日本美學中留白與空間間隙的概念'}],
 keywords:['京都','桂離宮','書院造','庭園','侘寂']
},
{
 id:75, title:'慶州石窟庵', en:'Seokguram Grotto', style:'日本傳統', region:'亞洲', cat:'east', era:'751', featured:false,
 img:'images/seokguram_grotto_gyeongju_buddha.webp', summary:'統一新羅時期的花崗岩石窟佛寺，其幾何精確的穹頂與莊嚴佛像代表東亞佛教建築的巔峰。',
 milestone:'以花崗岩精準砌築完美穹頂與壁面浮雕，將東亞石窟寺技藝推向巔峰',
 body:[
  '石窟庵位於韓國慶州吐含山，建於 751 年，與佛國寺同為統一新羅時期的佛教建築傑作，以花崗岩精準砌築而成。',
  '其圓形主室以石塊砌成完美的穹頂，中央供奉本尊釋迦牟尼佛像，壁面浮雕諸天與菩薩。建築的幾何精度與聲學效果令人驚嘆。',
  '石窟庵象徵新羅王朝對佛教與建築工藝的極致追求，於 1995 年與佛國寺一同被列入世界遺產，是東亞石窟建築與石雕的瑰寶。'
 ],
 buildings:['石窟庵','佛國寺','釋迦牟尼佛'],
 buildingsEn:['Seokguram Grotto','Bulguksa Temple','Sakyamuni Buddha (main statue)'],
 architects:['新羅工匠（傳為金大城主持）'],
 architectsEn:['Silla craftsmen (traditionally led by Kim Tae-seong)'],
 terms:[{t:'石窟寺',d:'以石塊砌築或開鑿岩洞的佛寺'},{t:'穹頂石室',d:'以石材砌成的圓拱形殿堂'}],
 keywords:['韓國','慶州','石窟庵','新羅','石雕']
},
{
 id:76, title:'鹿港龍山寺', en:'Lukang Longshan Temple', style:'傳統中式', region:'亞洲', cat:'east', era:'1786–1833', featured:true,
 img:'images/longshan_temple_lukang_taiwan.webp', summary:'台灣保存最完整的傳統閩南廟宇，其歇山重簷與精巧木雕見證清代的移民信仰與工藝。',
 milestone:'完整移植清代閩南中軸格局與斗栱藻井技藝，保存台灣木構廟宇的活化石',
 body:[
  '鹿港龍山寺始建於 1786 年，1833 年遷至現址，是台灣最具代表性的閩南式寺廟建築，被譽為「台灣廟宇之冠」。',
  '其布局採「山門—五門—正殿—後殿」的中軸對稱格局，屋頂為歇山重簷，斗栱、藻井與木雕石雕精美絕倫，展現清代閩南匠師的高超技藝。',
  '鹿港龍山寺是台灣移民社會信仰與建築工藝的縮影，象徵泉州龍山寺的香火在台延續，也保存了台灣傳統木構建築的珍貴實例。'
 ],
 buildings:['鹿港龍山寺','藻井','五門','正殿'],
 buildingsEn:['Lukang Longshan Temple','Caisson Ceiling','Wumen (Five-gate Entrance)','Main Hall'],
 architects:['閩南泉州匠師'],
 architectsEn:['Minnan (Quanzhou) craftsmen'],
 terms:[{t:'閩南式',d:'源自福建的台灣傳統建築樣式'},{t:'藻井',d:'天花板中央的斗栱穹頂裝飾'}],
 keywords:['台灣','鹿港','龍山寺','閩南','木雕']
},
/* ========== 伊斯蘭建築 islamic (77–88) ========== */
{
 id:77, title:'圓頂清真寺', en:'Dome of the Rock', style:'伊斯蘭', region:'中東', cat:'islamic', era:'687–691', featured:true,
 img:'images/dome_of_rock_jerusalem.webp', summary:'耶路撒冷聖殿山上的八角形穹頂聖殿，金頂與彩色磁磚是伊斯蘭建築最早與最美的傑作之一。',
 milestone:'開創伊斯蘭紀念性穹頂聖殿形制，融合拜占庭與波斯工藝，奠定伊斯蘭美學原點',
 body:[
  '圓頂清真寺於 687–691 年由倭馬亞王朝哈里發阿卜杜勒-馬利克興建，位於耶路撒冷聖殿山。其巨大的金色穹頂與八角形平面極具辨識度。',
  '聖殿以大理石與彩色磁磚裝飾外牆，內部穹頂飾以繁複的植物與幾何圖案，融合拜占庭與波斯工藝。它是伊斯蘭建築中最早的紀念性聖殿之一。',
  '圓頂清真寺對三教都具有神聖意義，其穹頂形式與裝飾語言深刻影響了後世伊斯蘭建築，是伊斯蘭建築美學的原點。'
 ],
 buildings:['圓頂清真寺','聖殿山','金穹頂'],
 buildingsEn:['Dome of the Rock','Temple Mount (Haram al-Sharif)','Gilded Golden Dome'],
 architects:['倭馬亞王朝的皇家營造師'],
 architectsEn:['Royal architects of the Umayyad dynasty'],
 terms:[{t:'八角形聖殿',d:'以八角形平面構成的紀念性宗教建築'},{t:'幾何裝飾',d:'伊斯蘭建築中抽象的幾何與植物紋樣'}],
 keywords:['耶路撒冷','圓頂清真寺','穹頂','磁磚','伊斯蘭']
},
{
 id:78, title:'泰姬瑪哈陵', en:'Taj Mahal', style:'伊斯蘭', region:'亞洲', cat:'islamic', era:'1632–1653', featured:true,
 img:'images/taj_mahal_agra_mausoleum.webp', summary:'沙賈汗為愛妻穆塔芝瑪哈興建的白色大理石陵墓，被譽為「永恆之淚」，是蒙兀兒建築的巔峰。',
 milestone:'以白色大理石嵌寶與對稱中軸花園集波斯、印度、伊斯蘭元素大成，登蒙兀兒建築之巔',
 body:[
  '泰姬瑪哈陵位於印度阿格拉，由蒙兀兒皇帝沙賈汗於 1632–1653 年為其愛妻興建，以白色大理石構築的陵墓被譽為世界最美的建築之一。',
  '陵墓坐落在對稱的花園中軸線上，中央的大穹頂與四座宣禮塔構成莊嚴的平衡。白色大理石嵌以寶石花卉，隨光線變化呈現不同的色澤。',
  '泰姬瑪哈陵融合波斯、印度與伊斯蘭建築元素，是蒙兀兒建築的巔峰，於 1983 年被列入世界遺產，象徵不朽的愛情與莫臥兒帝國的輝煌。'
 ],
 buildings:['泰姬瑪哈陵','四座宣禮塔','波斯花園'],
 buildingsEn:['Taj Mahal','Four Minarets','Persian Charbagh Garden'],
 architects:['烏斯塔德·艾哈邁德·拉胡里（傳）'],
 architectsEn:['Ustad Ahmad Lahauri (attributed)'],
 terms:[{t:'蒙兀兒建築',d:'印度蒙兀兒帝國的伊斯蘭建築風格'},{t:'八角亭',d:'陵墓四角的拱形涼亭'}],
 keywords:['印度','阿格拉','泰姬瑪哈','蒙兀兒','大理石']
},
{
 id:79, title:'科爾多瓦大清真寺', en:'Great Mosque of Córdoba', style:'伊斯蘭', region:'歐洲', cat:'islamic', era:'785–10世紀', featured:true,
 img:'images/great_mosque_cordoba_arches.webp', summary:'安達盧斯的伊斯蘭建築奇蹟，其紅白相間的雙層拱券柱林營造出壯觀的幽林意象。',
 milestone:'創紅白相間雙層拱券柱林，營造無盡幽林的空間詩意，成為伊比利文化交融見證',
 body:[
  '科爾多瓦大清真寺於 785 年由倭馬亞王朝的阿卜杜勒-拉赫曼一世興建，歷經數世紀擴建，是西班牙伊斯蘭建築的代表作。',
  '其祈禱大廳以紅磚與白石相間的雙層拱券柱林構成，營造出宛如椰棗林般的無盡節奏與幽深空間，是伊斯蘭建築空間藝術的極致。',
  '建築在基督教收復失地後被改為教堂並嵌入主祭壇。科爾多瓦大清真寺於 1984 年被列入世界遺產，象徵伊斯蘭與基督教文化在伊比利半島的交流。'
 ],
 buildings:['科爾多瓦大清真寺','拱券柱林','米哈拉布'],
 buildingsEn:['Great Mosque of Córdoba (Mezquita)','Forest of Columns and Double Arches','Mihrab'],
 architects:['倭馬亞王朝的營造師'],
 architectsEn:['Architects of the Umayyad dynasty'],
 terms:[{t:'雙層拱券',d:'上下兩層拱券交疊的伊斯蘭結構'},{t:'米哈拉布',d:'指示麥加方向的壁龕'}],
 keywords:['西班牙','科爾多瓦','清真寺','拱券','安達盧斯']
},
{
 id:80, title:'蘇萊曼尼耶清真寺', en:'Süleymaniye Mosque', style:'伊斯蘭', region:'中東', cat:'islamic', era:'1550–1557', featured:false,
 img:'images/suleymaniye_mosque_istanbul_sinan.webp', summary:'奧斯曼建築大師錫南的巔峰之作，其宏偉穹頂與光影設計俯瞰金角灣。',
 milestone:'錫南以層遞穹頂系統與精準光影控制，將奧斯曼穹頂建築推向成熟',
 body:[
  '蘇萊曼尼耶清真寺由奧斯曼帝國首席建築師米馬爾·錫南於 1550–1557 年興建，是伊斯坦堡最具代表性的清真寺之一，由蘇萊曼大帝委託。',
  '建築以層層遞進的穹頂系統構成宏偉的內部空間，中央大穹頂直徑逾 26 公尺。四座宣禮塔與多座附屬建築構成完整的庫里耶（建築群）。',
  '錫南以對光線與結構的精準控制著稱，蘇萊曼尼耶清真寺體現了奧斯曼伊斯蘭建築的成熟，象徵帝國的權力與伊斯蘭信仰的融合。'
 ],
 buildings:['蘇萊曼尼耶清真寺','四座宣禮塔','庫里耶建築群'],
 buildingsEn:['Süleymaniye Mosque','Four Minarets','Külliye Complex'],
 architects:['米馬爾·錫南'],
 architectsEn:['Mimar Sinan'],
 terms:[{t:'錫南穹頂系統',d:'錫南發展的層遞穹頂結構'},{t:'庫里耶',d:'清真寺周邊的附屬宗教與社會建築群'}],
 keywords:['伊斯坦堡','蘇萊曼尼耶','錫南','穹頂','奧斯曼']
},
{
 id:81, title:'藍色清真寺', en:'Sultan Ahmed Mosque', style:'伊斯蘭', region:'中東', cat:'islamic', era:'1609–1616', featured:false,
 img:'images/blue_mosque_istanbul_tiles.webp', summary:'伊斯坦堡的地標清真寺，以數萬片藍色伊茲尼克磁磚裝飾內壁，六座宣禮塔獨樹一格。',
 milestone:'以逾兩萬片伊茲尼克藍磚與罕見六宣禮塔，完成對聖索菲亞的致敬與超越',
 body:[
  '藍色清真寺（蘇丹艾哈邁德清真寺）由蘇丹艾哈邁德一世於 1609–1616 年委託興建，與聖索菲亞相對而立，是伊斯坦堡的地標。',
  '其內壁以逾兩萬片藍色伊茲尼克磁磚裝飾，光線透過二百多扇彩窗灑入，營造出深邃而寧靜的氛圍。六座宣禮塔在當時極為罕見。',
  '藍色清真寺體現了奧斯曼晚期建築對聖索菲亞的致敬與超越，其穹頂與光影的結合使其成為伊斯蘭建築與土耳其旅遊的象徵。'
 ],
 buildings:['藍色清真寺','六座宣禮塔','伊茲尼克磁磚'],
 buildingsEn:['Sultan Ahmed Mosque (Blue Mosque)','Six Minarets','Iznik Tiles'],
 architects:['塞德夫哈爾·穆罕默德阿迦'],
 architectsEn:['Sedefkar Mehmed Agha'],
 terms:[{t:'伊茲尼克磁磚',d:'土耳其伊茲尼克生產的彩釉磁磚'},{t:'宣禮塔',d:'清真寺用於喚禮的高塔'}],
 keywords:['伊斯坦堡','藍色清真寺','磁磚','穹頂','宣禮塔']
},
{
 id:82, title:'阿爾罕布拉宮', en:'Alhambra', style:'伊斯蘭', region:'歐洲', cat:'islamic', era:'13–14世紀', featured:true,
 img:'images/alhambra_granada_court_lions.webp', summary:'格拉納達的奈斯爾王朝宮殿，其獅子庭院與精雕灰泥裝飾是伊斯蘭宮殿建築的極致。',
 milestone:'以獅子庭院的灰泥雕飾與水光相映，凝聚伊比利半島伊斯蘭文明的最後輝煌',
 body:[
  '阿爾罕布拉宮位於西班牙格拉納達的山丘上，是奈斯爾王朝（13–14 世紀）的宮殿與堡壘，被譽為伊斯蘭建築的「人間天堂」。',
  '其核心的獅子庭院以十二頭石獅環繞噴泉，四周迴廊以纖細的柱林與繁複的灰泥（stucco）雕飾構成，牆面滿布幾何與植物紋樣及阿拉伯書法。',
  '阿爾罕布拉宮象徵伊比利半島伊斯蘭文明最後的輝煌，於 1984 年被列入世界遺產，其水、光與裝飾的結合深刻影響了西方對伊斯蘭建築的想像。'
 ],
 buildings:['獅子庭院','桃金孃庭院','獅子噴泉','使節廳'],
 buildingsEn:['Court of the Lions','Court of the Myrtles','Fountain of the Lions','Hall of the Ambassadors'],
 architects:['奈斯爾王朝的工匠'],
 architectsEn:['Artisans of the Nasrid dynasty'],
 terms:[{t:'灰泥雕飾',d:'以石膏雕琢的繁複裝飾'},{t:'阿拉伯書法',d:'以阿拉伯文字構成的裝飾藝術'}],
 keywords:['格拉納達','阿爾罕布拉','伊斯蘭','庭院','灰泥']
},
{
 id:83, title:'撒馬爾罕雷吉斯坦', en:'Registan of Samarkand', style:'伊斯蘭', region:'亞洲', cat:'islamic', era:'15–17世紀', featured:false,
 img:'images/registan_samarkand_madrasa_blue.webp', summary:'絲路上的三座經學院廣場，其藍釉穹頂與巨型壁龕門是帖木兒建築的輝煌見證。',
 milestone:'以三座經學院高聳壁龕門與藍釉穹頂圍合廣場，豎立絲路帖木兒建築丰碑',
 body:[
  '撒馬爾罕的雷吉斯坦廣場由烏魯格別克、希爾多與蒂拉卡里三座經學院（madrasa）圍合而成，是中亞絲路的建築瑰寶。',
  '經學院以藍綠釉磚砌築的高聳壁龕門（pishtaq）與穹頂著稱，內為迴廊與學生宿舍圍合的庭院。其幾何與書法裝飾精美絕倫。',
  '雷吉斯坦是帖木兒帝國及後續王朝建築的象徵，於 2001 年被列入世界遺產，見證了絲綢之路上的伊斯蘭文化與商貿繁榮。'
 ],
 buildings:['烏魯格別克經學院','希爾多經學院','蒂拉卡里經學院'],
 buildingsEn:['Ulugh Beg Madrasa','Sher-Dor Madrasa','Tilya-Kori Madrasa'],
 architects:['帖木兒王朝的營造師'],
 architectsEn:['Builders of the Timurid dynasty'],
 terms:[{t:'經學院',d:'伊斯蘭的神學與學術學校'},{t:'壁龕門',d:'經學院入口的高聳拱形門廊'}],
 keywords:['烏茲別克','撒馬爾罕','經學院','釉磚','絲路']
},
{
 id:84, title:'伊瑪目清真寺', en:'Imam Mosque of Isfahan', style:'伊斯蘭', region:'中東', cat:'islamic', era:'1611–1629', featured:false,
 img:'images/imam_mosque_isfahan_dome.webp', summary:'伊斯法罕世界廣場上的薩法維清真寺，其雙層穹頂與彩釉磁磚是波斯建築的頂峰。',
 milestone:'以偏轉麥加軸線與廣場軸線的精準幾何，配藍釉雙層穹頂登波斯建築之頂',
 body:[
  '伊瑪目清真寺位於伊斯法罕的伊瑪目廣場，由薩法維王朝的阿拔斯一世於 1611–1629 年興建，是波斯伊斯蘭建築的傑作。',
  '其宏偉的壁龕門、雙層穹頂與以藍色為主的彩釉磁磚裝飾構成壯觀的景觀。穹頂的幾何圖案與書法在陽光下閃爍。',
  '清真寺面向麥加的軸線與廣場軸線巧妙偏轉，體現了精確的幾何構思。它於 1979 年與伊斯法罕古蹟一同被列入世界遺產，象徵薩法維王朝的輝煌。'
 ],
 buildings:['伊瑪目清真寺','伊斯法罕廣場','彩釉穹頂'],
 buildingsEn:['Imam Mosque (Shah Mosque)','Naqsh-e Jahan Square','Glazed-tile Dome'],
 architects:['薩法維王朝的皇家營造師'],
 architectsEn:['Royal builders of the Safavid dynasty'],
 terms:[{t:'薩法維建築',d:'伊朗薩法維王朝的建築風格'},{t:'彩釉磁磚',d:'以藍色釉面磁磚拼貼的裝飾'}],
 keywords:['伊朗','伊斯法罕','清真寺','彩釉','穹頂']
},
{
 id:85, title:'蘇丹哈桑清真寺', en:'Mosque-Madrasa of Sultan Hassan', style:'伊斯蘭', region:'中東', cat:'islamic', era:'1356–1363', featured:false,
 img:'images/sultan_hassan_mosque_cairo.webp', summary:'開羅的馬穆魯克建築傑作，其宏偉的十字形平面與懸垂穹頂展現埃及伊斯蘭建築的雄渾。',
 milestone:'以四伊萬十字平面與鐘乳狀懸垂穹頂，展現馬穆魯克追求紀念性的雄渾石工',
 body:[
  '蘇丹哈桑清真寺-經學院由馬穆魯克蘇丹哈桑於 1356–1363 年興建於開羅，是埃及伊斯蘭建築的巔峰之作。',
  '建築採十字形（四伊萬）平面，中央巨大的庭院四周設四座經學院。其入口的懸垂鍾乳狀（muqarnas）穹頂與宏偉的立面令人震撼。',
  '蘇丹哈桑清真寺體現了馬穆魯克王朝對建築紀念性的追求，其巨大的尺度與精緻的石工使其成為開羅伊斯蘭地標與世界遺產的一部分。'
 ],
 buildings:['蘇丹哈桑清真寺','十字形庭院','懸垂穹頂'],
 buildingsEn:['Sultan Hassan Mosque','Cruciform Courtyard','Hanging (Muqarnas) Dome'],
 architects:['馬穆魯克王朝的營造師'],
 architectsEn:['Builders of the Mamluk dynasty'],
 terms:[{t:'四伊萬平面',d:'十字形庭院四邊各設一個拱廳的布局'},{t:'Muqarnas',d:'伊斯蘭建築中的鐘乳狀立體裝飾'}],
 keywords:['開羅','馬穆魯克','清真寺','伊斯蘭','石造']
},
{
 id:86, title:'波伊卡隆', en:'Po-i-Kalyan', style:'伊斯蘭', region:'亞洲', cat:'islamic', era:'1127–16世紀', featured:false,
 img:'images/kalyan_minaret_bukhara_uzbekistan.webp', summary:'布哈拉的心臟，以卡隆宣禮塔與卡隆清真寺構成中亞最宏偉的伊斯蘭建築群之一。',
 milestone:'以高約45公尺的磚砌幾何宣禮塔屹立數百年，成為中亞絲路城市精神地標',
 body:[
  '波伊卡隆位於烏茲別克布哈拉，由卡隆宣禮塔、卡隆清真寺與米里阿拉伯經學院構成，是城市的心臟與伊斯蘭建築的標誌。',
  '建於 1127 年的卡隆宣禮塔高約 45 公尺，以磚砌幾何紋樣裝飾，曾倖免於成吉思汗的毀城。其塔身傾斜卻歷經數百年不倒。',
  '波伊卡隆於 1993 年隨布哈拉舊城被列入世界遺產，象徵中亞伊斯蘭文化的深厚底蘊與絲路城市的建築成就。'
 ],
 buildings:['卡隆宣禮塔','卡隆清真寺','米里阿拉伯經學院'],
 buildingsEn:['Kalyan Minaret','Kalyan Mosque','Mir-i-Arab Madrasa'],
 architects:['阿爾斯蘭汗的營造師'],
 architectsEn:['Builders of Arslan Khan'],
 terms:[{t:'宣禮塔',d:'用於喚禮的高塔'},{t:'磚砌紋樣',d:'以磚排列構成的幾何裝飾'}],
 keywords:['烏茲別克','布哈拉','宣禮塔','清真寺','磚砌']
},
{
 id:87, title:'希巴姆土城', en:'Shibam Hadhramaut', style:'伊斯蘭', region:'中東', cat:'islamic', era:'16世紀', featured:false,
 img:'images/shibam_mudbrick_tower_yemen.webp', summary:'葉門的「沙漠曼哈頓」，以泥磚高塔密集構築的古城，是土築建築的奇蹟。',
 milestone:'因防洪而垂直向上層層疊砌泥磚高樓，誕生世界最早的垂直高密度城市之一',
 body:[
  '希巴姆位於葉門哈德拉毛河谷，是一座以泥磚高塔密集構築的古城，數百座高達五至十一層的泥磚樓宇緊密排列，被稱為「沙漠中的曼哈頓」。',
  '由於頻繁的洪水，居民將房屋垂直向上建造，形成世界上最早的垂直高密度城市之一。厚實的泥牆與密集布局提供了防熱與防禦。',
  '希巴姆是土築建築（rammed earth）的極致範例，於 1982 年被列入世界遺產，象徵人類在嚴酷沙漠環境中適應與建造的智慧。'
 ],
 buildings:['希巴姆高塔','泥磚樓宇','古城牆'],
 buildingsEn:['Shibam Tower Houses','Mud-brick Buildings','Ancient City Walls'],
 architects:['哈德拉毛的土築工匠'],
 architectsEn:['Mud-brick Artisans of Hadhramaut'],
 terms:[{t:'土築建築',d:'以夯土或泥磚構築的建築'},{t:'垂直聚落',d:'以高密度垂直發展的城市聚落'}],
 keywords:['葉門','希巴姆','泥磚','沙漠','高塔']
},
{
 id:88, title:'卡魯因清真寺', en:'Karaouine Mosque', style:'伊斯蘭', region:'非洲', cat:'islamic', era:'859', featured:false,
 img:'images/karaouine_mosque_fez_morocco.webp', summary:'摩洛哥非斯的清真寺與全球最古老的大學之一，其馬蹄形拱廊與中庭是馬格里布建築的代表。',
 milestone:'附設持續運作最古老的大學，以馬蹄形拱廊中庭樹立馬格里布建築範式',
 body:[
  '卡魯因清真寺位於摩洛哥非斯，建於 859 年，其附屬的卡魯因大學被金氏世界紀錄認定為世界上持續運作最古老的大學。',
  '清真寺以連續的馬蹄形拱廊與巨大的中央庭院著稱，屋頂與拱券以伊斯蘭幾何與植物紋樣裝飾，並設有寬敞的禮拜大廳。',
  '卡魯因清真寺是馬格里布（西北非）伊斯蘭建築的代表，象徵非斯作為伊斯蘭學術與文化中心的地位，也見證了摩洛哥的建築傳統。'
 ],
 buildings:['卡魯因清真寺','卡魯因大學','中庭'],
 buildingsEn:['Al-Qarawiyyin Mosque','University of al-Qarawiyyin','Atrium'],
 architects:['法蒂瑪·菲赫里（創建者）'],
 architectsEn:['Fatima al-Fihri (founder)'],
 terms:[{t:'馬蹄形拱',d:'伊斯蘭建築中呈馬蹄形的拱形'},{t:'馬格里布',d:'西北非地區（摩洛哥等）'}],
 keywords:['摩洛哥','非斯','清真寺','大學','拱廊']
},
/* ========== 當代與未來 contemp (89–100) ========== */
{
 id:89, title:'畢爾包古根漢美術館', en:'Guggenheim Museum Bilbao', style:'解構主義', region:'歐洲', cat:'contemp', era:'1991–1997', featured:true,
 img:'images/guggenheim_bilbao_titanium_gehry.webp', summary:'法蘭克·蓋瑞以鈦金屬曲面塑造的「解構」地標，其帶動城市轉型的「畢爾包效應」成為全球典範。',
 milestone:'首以電腦建模自由鈦曲面塑造可走入的雕塑，開創標誌建築復興城市的畢爾包效應',
 body:[
  '畢爾包古根漢美術館由法蘭克·蓋瑞於 1991–1997 年設計，坐落於西班牙畢爾包的內維翁河畔。其以鈦金屬板覆蓋的雕塑感曲面在陽光下粼粼閃爍。',
  '蓋瑞以電腦輔助設計與軟體建模處理複雜的自由曲面，將建築塑造為一座「可走入的雕塑」。內部的中庭與坡道串聯各展廳。',
  '這座美術館使衰落的工業城市畢爾包蛻變為文化觀光勝地，被譽為「畢爾包效應」，證明標誌性建築能成為城市復興的引擎。'
 ],
 buildings:['畢爾包古根漢','鈦金屬曲面','中庭'],
 buildingsEn:['Guggenheim Museum Bilbao','Curved Titanium Surfaces','Atrium'],
 architects:['法蘭克·蓋瑞'],
 architectsEn:['Frank Gehry'],
 terms:[{t:'解構主義',d:'以破碎、斜線與不穩定為特徵的建築風格'},{t:'畢爾包效應',d:'以標誌建築帶動城市復興的現象'}],
 keywords:['西班牙','畢爾包','古根漢','蓋瑞','鈦金屬']
},
{
 id:90, title:'北京鳥巢', en:'Beijing National Stadium', style:'高技術', region:'亞洲', cat:'contemp', era:'2003–2008', featured:true,
 img:'images/birds_nest_stadium_beijing.webp', summary:'赫佐格與德梅隆為 2008 奧運設計的「鳥巢」體育場，其鋼構編織外觀是中國當代地標。',
 milestone:'以交織鋼構編織將承重結構直接化為立面，開創結構即外觀的體育場典範',
 body:[
  '北京國家體育場（鳥巢）由赫爾佐格與德梅隆設計，於 2003–2008 年為 2008 年北京奧運會興建，可容納約九萬名觀眾。',
  '其獨特的「鳥巢」造型由交織的鋼構框架構成，宛如樹枝編織的容器，將結構與立面融為一體。紅色的看台與銀灰鋼構形成對比。',
  '鳥巢象徵中國在 21 世紀的崛起與現代建築的雄心，其結構美學與大型體育場的組織能力使其成為北京與奧運的標誌。'
 ],
 buildings:['鳥巢','國家游泳中心（水立方）'],
 buildingsEn:['Bird\'s Nest (National Stadium)','National Aquatics Center (Water Cube)'],
 architects:['赫爾佐格與德梅隆'],
 architectsEn:['Herzog & de Meuron'],
 terms:[{t:'鋼構編織',d:'以交織鋼構形成的立體結構'},{t:'結構即立面',d:'將承重結構直接作為建築外觀的手法'}],
 keywords:['北京','鳥巢','奧運','鋼構','體育場']
},
{
 id:91, title:'水立方', en:'Water Cube', style:'高技術', region:'亞洲', cat:'contemp', era:'2003–2008', featured:false,
 img:'images/water_cube_beijing_natatorium.webp', summary:'北京奧運游泳中心的「泡泡」立面，以 ETFE 膜材構成的細胞狀幾何，是材料工程的創新。',
 milestone:'首以肥皂泡細胞幾何包覆大面積ETFE膜材，創下當時全球最大規模膜結構應用',
 body:[
  '國家游泳中心（水立方）由 PTW 建築事務所等設計，於 2003–2008 年興建，其外觀以藍色「泡泡」般的 ETFE 膜材構築。',
  '建築以隨機的細胞狀幾何（基於肥皂泡結構）覆蓋立面與屋頂，透過 ETFE 膜材讓光線柔和滲入，兼具隔熱與透光。',
  '水立方與鳥巢相對，象徵北京奧運的現代建築與材料創新，其膜結構技術是當時全球規模最大的 ETFE 應用之一。'
 ],
 buildings:['水立方','國家體育場（鳥巢）'],
 buildingsEn:['Water Cube','Beijing National Stadium (Bird\'s Nest)'],
 architects:['PTW Architects','CCDI'],
 architectsEn:['PTW Architects','CCDI'],
 terms:[{t:'ETFE 膜',d:'輕量高透光的氟聚合物膜材'},{t:'細胞幾何',d:'以肥皂泡結構為靈感的隨機幾何'}],
 keywords:['北京','水立方','ETFE','游泳','膜結構']
},
{
 id:92, title:'廣州塔', en:'Canton Tower', style:'參數化設計', region:'亞洲', cat:'contemp', era:'2005–2010', featured:false,
 img:'images/canton_tower_guangzhou_twist.webp', summary:'廣州的新電視塔，其扭轉的「小蠻腰」造型以參數化設計與超高結構著稱。',
 milestone:'以橢圓截面沿高度扭轉收縮塑造小蠻腰，樹立參數化設計與超高結構結合典範',
 body:[
  '廣州塔由荷蘭建築師馬克·海默爾設計，於 2005–2010 年建成，高約 600 公尺，是中國最高的建築之一，也是世界最高的電視塔之一。',
  '其獨特的「小蠻腰」造型以橢圓截面沿高度扭轉收縮，外圍的鋼斜撐與內層核心形成優美的雙層結構。塔身在不同高度設有觀景台。',
  '廣州塔是參數化設計與結構工程結合的典範，其纖細而富有動勢的輪廓成為廣州的城市名片。'
 ],
 buildings:['廣州塔','觀景台','摩天輪'],
 buildingsEn:['Canton Tower','Observation Deck','Ferris Wheel'],
 architects:['馬克·海默爾（IBA）'],
 architectsEn:['Mark Hemel (IBA)'],
 terms:[{t:'參數化',d:'以演算法與參數生成建築形態的設計方法'},{t:'扭轉結構',d:'沿高度旋轉收縮的塔身結構'}],
 keywords:['廣州','廣州塔','小蠻腰','超高','參數化']
},
{
 id:93, title:'上海中心大廈', en:'Shanghai Tower', style:'挑高摩天', region:'亞洲', cat:'contemp', era:'2008–2015', featured:true,
 img:'images/shanghai_tower_gensler_supertall.webp', summary:'中國第一高樓，其旋轉扭轉的雙層玻璃帷幕與垂直社區理念是超高層建築的典範。',
 milestone:'以約120度螺旋扭轉形體與雙層帷幕空中庭園，兼降風載並開創垂直社區超高層',
 body:[
  '上海中心大廈由 Gensler 設計，於 2008–2015 年建成，高達 632 公尺，是中國第一、世界第二高的建築。',
  '其標誌性的旋轉扭轉形體以約 120 度的螺旋上升，雙層玻璃帷幕之間設有空中庭園，形成「垂直社區」。扭曲設計亦降低風載荷。',
  '上海中心大廈象徵中國超高層建築的技術成就與陸家嘴的天際線，其節能與垂直城市理念為超高層建築樹立新標準。'
 ],
 buildings:['上海中心大廈','空中庭園','觀景台'],
 buildingsEn:['Shanghai Tower','Sky Lobby','Observation Deck'],
 architects:['Gensler'],
 architectsEn:['Gensler'],
 terms:[{t:'超高層建築',d:'高度逾 300 公尺的摩天大樓'},{t:'垂直城市',d:'將城市機能垂直整合於高樓的理念'}],
 keywords:['上海','上海中心','超高層','扭轉','天際線']
},
{
 id:94, title:'哈里發塔', en:'Burj Khalifa', style:'挑高摩天', region:'中東', cat:'contemp', era:'2004–2010', featured:true,
 img:'images/burj_khalifa_dubai_tower.webp', summary:'世界最高建築，其伊斯蘭風格收縮與Y形平面在沙漠中衝破 800 公尺大關。',
 milestone:'以Y形平面層層退縮收至828公尺，登世界最高並將伊斯蘭幾何轉為抗風結構',
 body:[
  '哈里發塔由 SOM 建築事務所的阿德里安·史密斯設計，於 2004–2010 年建成於杜拜，高達 828 公尺，是世界最高的人造建築。',
  '其 Y 形平面與層層收縮的階梯式形體源自伊斯蘭建築的幾何與沙漠花卉的結構，既減少風荷載也逐層遞增高度。外牆以鋁與玻璃帷幕覆蓋。',
  '哈里發塔象徵杜拜的雄心與超高層建築技術的極限，其「垂直城市」內含住宅、辦公、飯店與觀景台，是 21 世紀工程奇蹟。'
 ],
 buildings:['哈里發塔','杜拜購物中心','觀景台'],
 buildingsEn:['Burj Khalifa','The Dubai Mall','Observation Deck'],
 architects:['阿德里安·史密斯（SOM）'],
 architectsEn:['Adrian Smith (SOM)'],
 terms:[{t:'Y形平面',d:'以三翼展開的平面以提升結構效率'},{t:'階梯收縮',d:'超高層建築逐層退縮的形體'}],
 keywords:['杜拜','哈里發塔','世界最高','超高層','沙漠']
},
{
 id:95, title:'濱海灣金沙', en:'Marina Bay Sands', style:'後現代主義', region:'亞洲', cat:'contemp', era:'2007–2010', featured:false,
 img:'images/marina_bay_sands_skypark.webp', summary:'新加坡的「三塔一舟」度假勝地，其空中花園橫跨三座高塔，是後現代地標性建築。',
 milestone:'以長340公尺、懸挑65公尺的空中花園橫跨三塔，重塑後現代綜合開發天際線',
 body:[
  '濱海灣金沙由摩西·薩夫迪設計，於 2007–2010 年建成，其三座高塔頂端以一艘巨大的空中花園（SkyPark）相連，長達 340 公尺。',
  '空中花園設有無邊際泳池、觀景台與花園，懸挑出塔身 65 公尺，是工程與設計的奇觀。整體建築融合飯店、賭場、會展與購物。',
  '濱海灣金沙是新加坡的地標與後現代綜合開發的典範，其大膽的懸挑結構與公共空間重新定義了度假與城市天際線。'
 ],
 buildings:['濱海灣金沙','空中花園','無邊際泳池'],
 buildingsEn:['Marina Bay Sands','SkyPark','Infinity Pool'],
 architects:['摩西·薩夫迪'],
 architectsEn:['Moshe Safdie'],
 terms:[{t:'空中花園',d:'架設於高樓頂端的公共花園平台'},{t:'綜合開發',d:'整合多種機能的複合建築'}],
 keywords:['新加坡','濱海灣金沙','空中花園','後現代','綜合']
},
{
 id:96, title:'香港中銀大廈', en:'Bank of China Tower', style:'高技術', region:'亞洲', cat:'contemp', era:'1985–1990', featured:false,
 img:'images/bank_of_china_tower.webp', summary:'貝聿銘以竹子為靈感的幾何切割摩天樓，其鑽石般的切面是香港天際線的傳奇。',
 milestone:'貝聿銘以竹節靈感的三角棱柱切割與菱形支撐，鑽石切面豎立香港天際線',
 body:[
  '中銀大廈由貝聿銘設計，於 1985–1990 年建成於香港中環，高約 367 公尺。其以竹節為靈感的幾何切割造型極具辨識度。',
  '建築的立面由四個三角棱柱構成，隨高度依次收縮，以鑽石般的切面與菱形結構支撐。其鋼構與玻璃帷幕展現高技術美學。',
  '中銀大廈象徵香港的金融繁榮與中國銀行業的現代化，是貝聿銘在亞洲的代表作，也是香港最具標誌性的摩天樓之一。'
 ],
 buildings:['中銀大廈','鑽石切面','維多利亞港'],
 buildingsEn:['Bank of China Tower','Diamond Facets','Victoria Harbour'],
 architects:['貝聿銘'],
 architectsEn:['I. M. Pei'],
 terms:[{t:'幾何切割',d:'以棱柱與斜面構成的建築體量'},{t:'高技術',d:'暴露結構與幾何美學的風格'}],
 keywords:['香港','中銀大廈','貝聿銘','摩天樓','幾何']
},
{
 id:97, title:'台北101', en:'Taipei 101', style:'後現代主義', region:'亞洲', cat:'contemp', era:'1999–2004', featured:true,
 img:'images/taipei_101_tower_taiwan.webp', summary:'曾為世界最高建築的台北地標，以竹子節節高升的意象與巨型阻尼器著稱。',
 milestone:'以八節漸收竹節形體與重約660噸世界最大調諧質量阻尼器，抗衡颱風地震',
 body:[
  '台北101由李祖原設計，於 1999–2004 年建成，高達 508 公尺，2004–2010 年間曾是世界最高建築。其節節上升的造型靈感來自竹子與如意。',
  '大樓以八節漸收的塔身構成，融合中國「節節高升」與「如意」的意象。內部設有世界最大的調諧質量阻尼器（重約 660 噸）以抵禦颱風與地震。',
  '台北101象徵台灣的經濟與工程成就，是台北天際線的核心地標，其阻尼器與防震設計也是超高層建築的技術典範。'
 ],
 buildings:['台北101','阻尼器','觀景台'],
 buildingsEn:['Taipei 101','Tuned Mass Damper','Observation Deck'],
 architects:['李祖原'],
 architectsEn:['C. Y. Lee'],
 terms:[{t:'調諧質量阻尼器',d:'以巨大擺錘抵消建築搖晃的裝置'},{t:'節節高升',d:'象徵步步高升的竹節意象'}],
 keywords:['台北','101','阻尼器','超高層','地標']
},
{
 id:98, title:'華特·迪士尼音樂廳', en:'Walt Disney Concert Hall', style:'解構主義', region:'美洲', cat:'contemp', era:'1999–2003', featured:false,
 img:'images/walt_disney_concert_hall.webp', summary:'蓋瑞以不鏽鋼曲面塑造的音樂廳，其反光造型與聲學設計是洛杉磯的建築奇觀。',
 milestone:'以不鏽鋼波浪曲面包覆葡萄園式觀眾席，將雕塑外觀與世界級聲學融為一體',
 body:[
  '華特·迪士尼音樂廳由法蘭克·蓋瑞設計，於 1999–2003 年建成於洛杉磯。其以不鏽鋼板覆蓋的波浪狀曲面屋頂在陽光下熠熠生輝。',
  '音樂廳的聲學由聲學家山崎·永田設計，以葡萄園式環繞觀眾席提供卓越的音響。建築的曲線與材質與周邊城市形成強烈對比。',
  '迪士尼音樂廳是蓋瑞解構主義風格的代表，其雕塑般的外觀與世界級聲學使其成為洛杉磯的文化與建築地標。'
 ],
 buildings:['迪士尼音樂廳','葡萄園式觀眾席','不鏽鋼屋頂'],
 buildingsEn:['Walt Disney Concert Hall','Vineyard (Surround) Seating','Stainless Steel Roof'],
 architects:['法蘭克·蓋瑞'],
 architectsEn:['Frank Gehry'],
 terms:[{t:'葡萄園式',d:'以環繞分區觀眾席改善聲學的音樂廳布局'},{t:'不鏽鋼曲面',d:'以金屬板塑造的自由曲面'}],
 keywords:['洛杉磯','迪士尼音樂廳','蓋瑞','不鏽鋼','聲學']
},
{
 id:99, title:'阿利耶夫文化中心', en:'Heydar Aliyev Center', style:'參數化設計', region:'亞洲', cat:'contemp', era:'2007–2012', featured:true,
 img:'images/heydar_aliyev_center_baku.webp', summary:'扎哈·哈迪德的參數化建築極致，其連續流動的白色曲面消解了牆與地的界限。',
 milestone:'以連續流動白色曲面消解牆地界限，登流體建築巔峰並立參數化製造里程碑',
 body:[
  '阿利耶夫文化中心由扎哈·哈迪德於 2007–2012 年設計，位於亞塞拜然巴庫，是參數化建築與「地景建築」的典範。',
  '建築以連續流動的白色曲面構成，屋頂、牆面與地面在波動中融為一體，宛如一波起伏的織物或沙丘。其曲面以大量纖維強化塑膠面板覆蓋。',
  '阿利耶夫文化中心象徵扎哈·哈迪德流體建築的巔峰，是 21 世紀參數化設計與數位製造的里程碑，也是巴庫的新地標。'
 ],
 buildings:['阿利耶夫文化中心','流動曲面','階梯與坡道'],
 buildingsEn:['Heydar Aliyev Center','Flowing Surfaces','Steps and Ramps'],
 architects:['扎哈·哈迪德'],
 architectsEn:['Zaha Hadid'],
 terms:[{t:'流體建築',d:'以連續流動曲面為特徵的建築'},{t:'地景建築',d:'建築與地形融為一體的手法'}],
 keywords:['巴庫','哈迪德','參數化','流動曲面','地景']
},
{
 id:100, title:'銀河SOHO', en:'Galaxy SOHO', style:'參數化設計', region:'亞洲', cat:'contemp', era:'2009–2012', featured:false,
 img:'images/galaxy_soho_beijing_hadid.webp', summary:'扎哈·哈迪德在北京的連續曲線綜合體，其流動的體量與中庭重新定義了城市街區。',
 milestone:'以四座連續流動橢圓體量環繞中庭，將參數化曲面與高密度商辦機能融為一體',
 body:[
  '銀河SOHO由扎哈·哈迪德於 2009–2012 年設計，位於北京東二環。其由四座連續流動的橢圓體量構成，宛如銀河星系般環繞中庭。',
  '建築以參數化曲面與白色面板覆蓋，水平流動的體量與天空中的雲朵相呼應，內部以連續的坡道與中庭串聯商業與辦公空間。',
  '銀河SOHO是扎哈·哈迪德在北京的代表作，象徵參數化建築在亞洲都市的應用，其流動的造型與高密度機能結合，成為北京的新地標。'
 ],
 buildings:['銀河SOHO','流動體量','中央中庭'],
 buildingsEn:['Galaxy SOHO','Flowing Volume','Central Atrium'],
 architects:['扎哈·哈迪德'],
 architectsEn:['Zaha Hadid'],
 terms:[{t:'參數化曲面',d:'以演算法生成的連續曲面'},{t:'流動體量',d:'以流暢輪廓構成的建築量體'}],
 keywords:['北京','銀河SOHO','哈迪德','參數化','流動']
}
];
