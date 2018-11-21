title: "Interaktivní mapa kvality života: nastavte si vlastní kritéria a podívejte se, ve kterých obcích se dobře žije"
perex: "Byl by pro vás problém žít v místě s častými exekucemi, nedýchatelným vzduchem nebo třeba hodně/málo věřícími? Model, který vytvořili datoví novináři serveru iRozhlas se sociologem Danielem Prokopem a agenturou Median, umožní sestavit mapu subjektivní kvality života. Ukazuje také, jak blízko je od ní k politické nespokojenosti."
published: "22. listopadu 2018"
coverimg: https://www.irozhlas.cz/sites/default/files/styles/zpravy_snowfall/public/uploader/xxx_181121-201856_jab.png?itok=JPKSud8v
coverimg_note: ""
styles: [https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.2.0/css/ol.css]
libraries: [jquery, highcharts, https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.2.0/build/ol.js, https://openmaptiles.org/maps/olms.js, https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js, https://unpkg.com/geostats@1.5.0/lib/geostats.min.js] #datatables
options: []
---
Nezaměstnanost, podíl exekucí, bezpečnost, závislost na průmyslu, vzdálenost od okresního města, dostupnost lékařské péče, dostupnost středních a mateřských škol, možnost připojení k rychlému internetu, dlouhověkost, přírůstek obyvatel, rozvodovost a počet věřících: těchto čtrnáct veřejně dostupných datových sad v rozlišení na obce nebo okresy ukazuje mapa kvality života.

Po kliknutí na ozubené kolo v levém horním rohu mapy si můžete nastavit vlastní parametry a vytvořit tak vlastní index kvality života. Mezera na místě Prahy není chyba – hlavní město je v některých ukazatelích zbytku republiky hodně vzdálené. Bez Prahy jsou v mapě zřetelnější charakteristiky obcí a regionů, proto s ní model nepracuje.

<wide>

<div id="cont">
    <div id="sliders">
		<div id="showsliders">&#9881;</div>
		<div id="sliderbox"></div>
	</div>
    <div id="map"></div>
	<div class="over">
		<div class="loader"></div>
	</div>
</div>
<div id="tooltip">Vyberte obec v mapě.</div>

</wide>

## Střeva modelu: jak jsme mapu počítali

Oproti podobným indexům se mapa liší ve dvou ohledech: jednak je detailnější, většina ostatních indexů končí u větších měst. A za druhé ne všechny proměnné mají stejnou váhu.

„Problémem existujících žebříčků je, že předpokládají stejnou důležitost problémů, navíc se v nich ukazatele duplikují: například naděje dožití a znečištění vzduchu spolu souvisí, podobně jako vzdálenost k okresním městům a dostupnost zdravotnictví. To se snažíme zohlednit,“ vysvětluje sociolog Martin Buchtík, jeden z autorů modelu.

Median proto zkusil vyjádřit důležitost ukazatelů pro index celkové kvality života jako kompromis mezi subjektivním hodnocením – co Češi považují za důležité – a objektivním měřítkem: jak jsou v obcích zastoupeny skupiny voličů vyjadřující společenskou a politickou nespokojenost. Oba pohledy se přitom podstatně liší.

„Podle respondentů ve výzkumu Medianu je pro kvalitu života důležitá nezaměstnanost, podíl exekucí, kriminalita, znečištění životního prostředí, dostupnost zdravotnictví a mateřských škol,“ vysvětluje sociolog Daniel Prokop.

„V objektivním pohledu na společenskou nespokojenost kriminalita nemá takový vliv,“ pokračuje Prokop. „Naopak dobrý ukazatel je třeba naděje dožití, která souvisí s životním stylem nebo typem práce.“

Rozdíly mezi tím, co Češi považují za důležité a co je důležité z hlediska zastoupení politicky a společensky nespokojených skupin, ukazuje následující tabulka.

<wide>
<table class="table table-bordered table-hover table-condensed">
<thead><tr><th title="Field #1">Ukazatel</th>
<th title="Field #2">Proměnná</th>
<th title="Field #3">Subjektivně</th>
<th title="Field #4">Objektivně</th>
</tr></thead>
<tbody><tr>
<td>Nezaměstnanost</td>
<td>Míra nezaměstnanosti (2016)</td>
<td>++++</td>
<td>++</td>
</tr>
<tr>
<td>Exekuce</td>
<td>Počet exekucí na obyvatele (2017)</td>
<td>+++++</td>
<td>+++</td>
</tr>
<tr>
<td>Bezpečnost</td>
<td>Počet obyvatel na kriminální čin (2016)</td>
<td>+++++</td>
<td>0</td>
</tr>
<tr>
<td>Závislost na průmyslu</td>
<td>Pracující v průmyslu / zaměstnaní (2011)</td>
<td>0</td>
<td>+++</td>
</tr>
<tr>
<td>Emise</td>
<td>Procento území nad hranicí znečištění (2016)</td>
<td>++++</td>
<td>0</td>
</tr>
<tr>
<td>Vzdálenost k okresnímu městu</td>
<td>Vzdušná k hlavnímu městu okresu</td>
<td>+++</td>
<td>+++</td>
</tr>
<tr>
<td>Nedostupnost mateřských škol</td>
<td>Indikátor, že v obci není MŠ nebo je počet dětí na MŠ v ORP vyšší než medián (2016)</td>
<td>++++</td>
<td>0</td>
</tr>
<tr>
<td>Nedostupnost středních škol</td>
<td>Počet dětí na SŠ (2016)</td>
<td>+++</td>
<td>+</td>
</tr>
<tr>
<td>Nedostupnost zdravotních zařízení</td>
<td>Počet obyvatel na zdravotnické zařízení (2016)</td>
<td>++++</td>
<td>+</td>
</tr>
<tr>
<td>Nedostupnost rychlého internetu</td>
<td>Kategorie 1-3 podle počtu poskytovatelů rychlého internetu (2016)</td>
<td>++</td>
<td>0</td>
</tr>
<tr>
<td>Dlouhověkost</td>
<td>Naděje dožití mužů (2012-2016)</td>
<td>++</td>
<td>++++</td>
</tr>
<tr>
<td>Přírůstek obyvatel</td>
<td>Procento přírůstku (2012-2017)</td>
<td>+++</td>
<td>++</td>
</tr>
<tr>
<td>Index rozvodovosti</td>
<td>Počet rozvodů / manželství (2017)</td>
<td>++</td>
<td>0</td>
</tr>
<tr>
<td>Procento věřících</td>
<td>Procento věřících (SLDB 2011)</td>
<td>0</td>
<td>+</td>
</tr>
</tbody></table>
</wide>

Za protestní volbu odrážející politickou nespokojenost přitom autoři modelu považují volbu KSČM, SPD nebo rozhodnutí nevolit v parlamentních volbách 2017. I tady se opírají o data Medianu: podle výzkumu MML-TGI 2017 jsou právě voliči těchto dvou stran nejčastěji nespokojeni se společenským a politickým vývojem. U SPD je to 54 procent voličů, u KSČM 50 procent.

<div style="max-width: 100%; height: 400px" id="nespokojenost"></div>

## Vysočinsko-orlický pás štěstí

Nejlépe se podle mapy žije v pásu táhnoucím se od Třebíče po Náchod. Až za ním jsou některá velká města s okolními obcemi.

„I když si Nové Veselí nebo Sázavu většina z nás nespojuje se závratnou kvalitou života, jejich obyvatelé skutečně jsou nadprůměrně spokojení,“ tvrdí Prokop. „Potvrzuje to třeba velký výzkum Proměny české společnosti. Ačkoliv ve většině ukazatelů nevynikají, kombinují se zde solidní socioekonomické a demografické podmínky, nízká kriminalita a příjemné životní prostředí.“

I díky tomu podle něj v této oblasti tolik nepropadají tradiční strany.

Dodává ale, že v mapě chybí třeba hůře dostupné ukazatele dostupnosti kulturního vyžití nebo kvality silniční sítě, které by mohly některé obce z této oblasti srazit níže.

Naopak nejnižší kvalita života je podle modelu v severních Čechách a na severní Moravě – tedy v oblastech, které se do značné míry překrývají s historickými Sudety, které [utrpěly poválečným odsunem a následným divokým dosídlením](https://interaktivni.rozhlas.cz/sudety/). Pohraničí je oproti zbytku republiky výrazně červenější hned v pěti ukazatelích: nezaměstnanosti, emisích škodlivin, očekávané naději dožití, podílu exekucí a bezpečnostních statistikách.

„Tyhle regiony trpí obrovskými problémy: exekucemi je v některých oblastech zasažena až čtvrtina populace, v jednotlivých obcích je to i 60 procent obyvatel, řada z nich navíc trpí mnoha exekucemi najednou,“ říká Prokop. „Podobně zoufalá je hlavně na Karlovarsku a Ústecku kvalita druhého stupně základních škol, ta se v testech gramotnosti PISA blíží Rumunsku a lepším latinskoamerickým zemím,“ dodává Buchtík.

## Vnitřní průmyslové periferie

Ne všechny nepříjemnosti ale kopírují hranice Sudet. Třeba průmyslové oblasti – a s nimi spojené negativní jevy – jsou podstatně menší a najdete je po celém území Česka: pás od Mladé Boleslavi po Varnsdorf, okolí Mohelnice a Lanškrouna nebo region mezi Kopřivnicí a Zubří.

„Vysoký počet lidí pracujících v průmyslu nutně nemusí zhoršovat kvalitu života,“ vysvětlují autoři indexu. „Může ale znamenat křehký pracovní trh v závislosti na vývoji globální ekonomiky, větší problémy s životním prostředím a kratší život kvůli fyzicky náročné práci. Koncentrují se zde také profese s nižším nárůstem reálné mzdy po roce 1989,“ dodávají.

Právě ukazatele jako zaměstnanost v průmyslu podle studie dokládají, že mentální rozdělení Česka na Prahu, chudé kraje a zbytek republiky je krátkozraké. I chudší kraje mají slušně prosperující části, naopak některé průměrně prosperující oblasti, jako střední Čechy či Vysočina, se potýkají s problémem takzvaných vnitřních periferií – míst s velkou dojezdovou vzdáleností do školy, k lékaři nebo do zaměstnání ve městě.

Sympaticky rozprostřený je ukazatel míry rozvodovosti. Ta se nesoustředí na bohatých předměstích velkých měst, trápí celé Česko rovnoměrně.

Na věřící a nevěřící část zase Česko poměrně spolehlivě rozděluje 50. rovnoběžka, podobně jako 38. rovnoběžka Koreu.

## Hostouň, máme problém

Model také ilustruje vztah mezi celkovou kvalitou života a politickým chováním. Nízká kvalita života má k protestní volbě blízko hlavně u větších obcí – právě tam je vztah mezi oběma ukazateli poměrně silný. V malých obcích více rozhodují osobnosti starostů a lokální politika.

<h3>GRAF KVALITA ŽIVOTA × PROTESTNÍ VOLBA</h3>

Protestní volba, tedy hlas pro SPD, KSČM nebo neúčast ve volbách, se v jednotlivých obcích pohybuje mezi 35 a 80 procenty. Ve třicítce větších obcí s nejvyšší kvalitou života přitom takto volí jen okolo 40 až 45 procent obyvatel, ve třicítce s nejnižší kvalitou života je to 65 až 70 procent.

Řada obcí ale volí výrazně jinak, než by se z kvality života dalo očekávat. Čtrnáct ukazatelů v modelu vysvětluje necelou polovinu rozptylu protestní volby. Volba často souvisí s lokálními podmínkami, které proměnné nedokážou postihnout.

Příkladem může být západočeská Hostouň. V ní je kvalita života výrazně nadprůměrná – index 62,5 – ale podíl protestních voličů je extrémně vysoký, 68 procent. Důvodem nespokojenosti tisícihlavé obce může být výchovný ústav a [s ním spojené problémy](https://plzen.idnes.cz/vychovny-ustav-hostoun-plan-vrazda-vychovatele-chovanci-vazba-ps6-/plzen-zpravy.aspx?c=A170914_103158_plzen-zpravy_vb).

Podobně nespokojení jsou voliči v Plané na Tachovsku, která se potýkala s podfinancovanými službami v okrese, a jsou zde ubytovny pro agenturně zaměstnávané cizince.

Překvapivě negativně volí také třeba Vyškov a Rousínov, Jindřichův Hradec, Domažlice, Moravské Budějovice nebo Humpolec.

Naopak optimisticky volí třeba středočeský Kolín. S indexem kvality života 54,5 má „jen“ 49 procent protestních voličů, což je podstatně méně, než by kvalita života předpovídala. Podobné je to v Bolaticích na Ostravsku. Roli může hrát velká důvěra ve vedení města, zřetelná hlavně v komunálních volbách.

Většina obcí, které volí pozitivněji, než by odpovídalo jejich kvalitě života, je ve Středočeském kraji. Projevuje se zřejmě blízkost Prahy – na předměstích hlavního města častěji žijí bohatší lidé, kteří budou mít vyšší kvalitu života bez ohledu na podmínky v obci.

## Co s tím: oddlužení, dostupné bydlení, podpora dětí z chudých rodin

Autoři indexu kvality života proto navrhují několik opatření, která by dokázala oblasti s nižší kvalitou života – ať už Sudety, nebo vnitřní periferii – podpořit.

„Situace v těchto oblastech a hlavně vyloučených lokalitách je neřešitelná bez výrazně přístupnějšího institutu oddlužení, který by dlužníky motivoval k práci,“ shrnuje doporučení výzkumníků sociolog Dan Prokop, jeden z autorů studie. „Nejspornější části dluhů, které často vznikly predátorskými půjčkami nebo skrytými sankcemi, by měl insolvenční správce odepsat, lidé v exekuci a insolvenci by měli být motivováni k práci a v případě snahy dlužníka by měla být umožněna [nižší než třicetiprocentní hranice pro oddlužení](https://www.irozhlas.cz/zpravy-domov/osobni-bankrot-poslanecka-snemovna-novela-insolvence_1810261301_kro).“

Dalšími ekonomickými faktory jsou podle výzkumníků dostupné obecní bydlení či nižší zdanění levné práce. Mluví také o daňové asignaci – možnosti převést část daní vybranému spolku nebo sdružení – a dalších opatřeních, která by podpořila občanský a kulturní život.

„V investicích do vzdělávání je nutné zaměřit se na snižování regionálních rozdílů v kvalitě základních a středních škol, které pomáhají reprodukovat chudobu. Měli bychom také vyrovnávat šance dětí ze znevýhodněného prostředí v raném věku, třeba teď aktuálními obědy zdarma ve školkách nebo speciálním předškolním vzděláváním,“ uzavírá Prokop.