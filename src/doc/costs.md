# alchi/src/doc/costs

## tools

fixed costs

### printer

Samsung ProXpress M3825

100 eur

see also: [printing.md](printing.md)

### stapler

cheap booklet staplers will break like 50% of all staples

booklet from A4 sheets = depth 150 mm

currently, my book has 18 sheets A4 = 72 pages A5

keywords:

* booklet stapler

suchwörter:

* Blockhefter
* Blockheftgerät
* große Einlegetiefe
* Broschüren Heftgerät
* Langarm Broschüren Heftgerät

#### Novus B54 Blockhefter

new 100 - 150 eur

used from 50 eur

170 sheets

depth 250 mm

https://www.amazon.de/dp/B000KTBIUM

old model of Novus B56XL

#### Novus B56XL Blockhefter

new 100 - 150 eur

170 sheets

depth 250 mm

https://www.amazon.de/dp/B092FL4KPJ

#### Skrebba Skre 120 lang Blockhefter

aka: Skrebba Skre 117 120 lang Blockhefter

new 100 - 150 eur

used from 50 eur

#### not: small staplers

small staplers are too weak,
they will hurt your hands and patience

they are cheap, 20 - 40 eur new,
but not worth the trouble

##### Leitz NeXXt 5560

40 sheets

40 eur

https://myofficebrand.com/Heftgeraet-Leitz-NeXXt-5560-schwarz-420-Blatt-Oberlademechanik-HK-24-6-24-8-26-6-Metall-Kunststoff

## book costs

about 0.60 eur per book

* 0.30 eur for printing
* 0.30 eur for shipping

## printing costs

* paper: 0.6 cent per page (6 eur per 500 sheets = 1.2 cent per sheet)
* toner: 0.2 cent per page (Samsung MLT-D204E)
* drum: 0.1 cent per page (Samsung MLT-R204)

0.6 + 0.2 + 0.1 = 0.9 cent per page A4

1 book = 72 pages A5 = 36 pages A4 = 18 sheets A4

36 * 0.9 cent = 32.4 cent

### paper

```console
> for (const n_1000 of [0.5, 2.5, 5, 10, 15, 20, 25, 100]) { var n = 1000 * n_1000; console.log(`${n} blatt = ${n/1000} tsd blatt = ${n/500*5} eur = ${n/2500} karton = ${n/20} hefte`); }
500 blatt = 0.5 tsd blatt = 5 eur = 0.2 karton = 25 hefte
2500 blatt = 2.5 tsd blatt = 25 eur = 1 karton = 125 hefte
5000 blatt = 5 tsd blatt = 50 eur = 2 karton = 250 hefte
10000 blatt = 10 tsd blatt = 100 eur = 4 karton = 500 hefte
15000 blatt = 15 tsd blatt = 150 eur = 6 karton = 750 hefte
20000 blatt = 20 tsd blatt = 200 eur = 8 karton = 1000 hefte
25000 blatt = 25 tsd blatt = 250 eur = 10 karton = 1250 hefte
100000 blatt = 100 tsd blatt = 1000 eur = 40 karton = 5000 hefte
```

#### SpassAmDrucken

```
SpassAmDrucken
Dominik Watzinger
Am Reiterfeld 6
84329 Wurmannsquick
Germany
```

50km von trostberg

hin- und rückweg = 100km

10 liter/100km = 10 liter = 20 eur

= 40 eur fahrtkosten

---

https://www.ebay.de/itm/293625381812

20.000 Blatt SAD Standard Kopierpapier 75g/m² DIN-A4 weiß Druckerpapier Papier

240 eur inkl versand

6.00 eur / 500 blatt

---

https://www.ebay.de/itm/293648237446

Happy Office Kopierpapier 5000 Blatt DIN A4 80 g/m² Druckerpapier Papier weiß

65 eur inkl versand

6.50 eur / 500 blatt

---

https://www.ebay.de/itm/293498124241

2500 Blatt Happy Office 80g/m² Papier DIN A4 Kopierpapier HappyOffice weiß

33 eur inkl versand

6.60 eur / 500 blatt

---

https://www.ebay.de/itm/291853762989

1 Palette Inacopia Elite 80g/m² DIN-A4 weiß 100000 Blatt Kopierpapier Papier

1300 eur inkl versand

6.50 eur / 500 blatt

---

https://www.ebay.de/itm/291035890684

2500 Blatt inapa tecno Speed / multispeed 80g A4 Papier weiß Druck- Kopierpapier

37 eur inkl versand

7.40 eur / 500 blatt

## shipping costs

paper weight: 80 grams per square meter

paper format: A4 = 210 * 297 mm2 = 0.06237 m2

weight per sheet: 80 * 0.06237 grams = 5 grams

* 64 A5 pages = 16 A4 sheets &rarr; 16 * 5 = 80 grams
* 72 A5 pages = 18 A4 sheets &rarr; 18 * 5 = 90 grams

https://www.deutschepost.de/de/b/brief_postkarte.html

groosbrief: A4, height 2 cm, weight 500 grams = 95 A4 sheets (80 g/m2) = 5 to 6 books = 1,60 EUR

1.60 eur per 5 books = 32 cent per book

groosbrief prio: with tracking, 2,70 EUR

maxibrief: A4, height 5 cm, weight 1000 grams = 190 A4 sheets (80 g/m2) = 10 to 12 books = 2,75 EUR

maxibrief prio: with tracking, 3,85 EUR

https://www.deutschepost.de/de/w/buecherundwarensendung.html

büwa 500 = Bücher- und Warensendung, weight 500 grams, height 5 cm = 1,95 EUR

büwa 1000 = Bücher- und Warensendung, weight 1000 grams, height 5 cm = 2,25 EUR

### versandtasche

aka briefumschlag

format C4 zu klein? braucht format B4?

* DIN C4 = 229x324x40
* DIN B4 = 250x353x40

versandtasche DIN B4 braun 130 g/m2

selbstklebend oder haftklebend

https://myofficebrand.com/Versandtasche-Mayer-Kuvert-30005522-DIN-B4-250-x-353-mm-braun-selbstklebend-ohne-Fenster-130-g-m-Pckg-250

250 stück = 25 eur + 5 eur versand = 30 eur

110 g/m2 = unstabil?

https://www.ebay.de/itm/360515883966

250 stück = 20 eur inkl versand

#### faltentasche

format C4 reicht, weil falten + boden

* DIN C4 = 229x324x40
* DIN B4 = 250x353x40

zu teuer? mit Boden 2cm für groosbrief

versandtasche DIN C4 braun 130 g/m2

selbstklebend oder haftklebend

https://www.ebay.de/itm/362734759387

200 stück = 30 eur inkl versand
