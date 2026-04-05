# Abregelung kleiner Solaranlagen

**User:** Milan Hauth (<milahu@gmail.com>)  
**Created:** 2026/4/5 10:30:31  
**Updated:** 2026/4/5 10:42:16  
**Exported:** 2026/4/5 10:47:10  
**Link:** [<https://chatgpt.com/c/69d21d4e-eef0-832c-bd61-4c32e4173b40>](https://chatgpt.com/c/69d21d4e-eef0-832c-bd61-4c32e4173b40)

## Prompt:

wie genau funktioniert die abregelung von kleinen solaranlagen unter 100 KW leistung?

so kleine solaranlagen müssen ja nicht teilnehmen an Redispatch-maßnahmen. welche anderen methoden gibt es zur abschaltung von kleinen solaranlagen? haben auch kleine solaranlagen eine "fernsteuerung" auf die der netzbetreiber zugreifen kann?

<https://www.sfv.de/abregelung#anchor-menu-point-1-3>

> Aktuell sind Erneuerbare Energie-Anlagen erst ab einer Größe von 100 kW zur Teilnahme am Redispatch verpflichtet. Künftig soll KI gestützt ein Redispatch 3.0 für Anlagen auch unter 100 kW stattfinden - dies ist aktuell aber noch nicht der Fall. In seltenen Engpassfällen, in denen auch die Leistung der Redispatch-Maßnahmen nicht ausreicht, darf der Netzbetreiber zur Netzstabilisierung nach §13 (1) EnWG nachrangig auch kleinere EE-Anlagen steuern. Dies ist aber nur in seltenen Fällen und stark überlasteten Netzabschnitten zu erwarten.

## Response:

Gute Frage – das Thema ist etwas unübersichtlich, weil sich die Regeln in den letzten Jahren stark verändert haben (Stichwort Digitalisierung & Smart Meter). Ich erklär dir das einmal sauber und praxisnah:

------------------------------------------------------------------------

## 1. Grundsätzlich: Unterschied Redispatch vs. „normale“ Abregelung

- **Redispatch (aktuell v. a. ab 100 kW)**  
  → Geplante Eingriffe ins Stromsystem, um Engpässe zu vermeiden  
  → verpflichtend für größere Anlagen
- **Abregelung kleiner Anlagen (\<100 kW)**  
  → erfolgt *nicht* im regulären Redispatch  
  → basiert auf anderen gesetzlichen Mechanismen

------------------------------------------------------------------------

## 2. Welche Möglichkeiten gibt es bei kleinen PV-Anlagen?

### a) Feste Wirkleistungsbegrenzung (klassisch: 70%-Regel)

Das war lange Standard bei kleinen PV-Anlagen nach dem EEG:

- Einspeisung wird dauerhaft begrenzt (z. B. auf 70 % der installierten Leistung)
- kein Eingriff des Netzbetreibers in Echtzeit nötig

👉 Heute oft ersetzt durch flexiblere Lösungen, aber noch relevant bei Bestandsanlagen.

------------------------------------------------------------------------

### b) Rundsteuerempfänger / Fernsteuerbarkeit

Ja: **Auch kleine Anlagen *können* fernsteuerbar sein.**

Typisch sind:

- **Rundsteuerempfänger (RSE)**  
  → Netzbetreiber sendet Signale über das Stromnetz  
  → Anlage wird z. B. auf 100 %, 60 %, 30 % oder 0 % gedrosselt
- **Moderne Alternative: Steuerbox / Smart Meter Gateway**  
  → digitale Ansteuerung über Kommunikationsnetz  
  → zunehmend Standard durch das **Messstellenbetriebsgesetz**

👉 Wichtig:

- Nicht jede Kleinanlage *hat* das schon
- aber **Neuanlagen werden zunehmend verpflichtend steuerbar**

------------------------------------------------------------------------

### c) §9 EEG – Pflicht zur Steuerbarkeit

Nach dem **Erneuerbare-Energien-Gesetz (EEG)** gilt:

- Anlagen müssen **technisch steuerbar sein**, wenn sie Einspeisevergütung bekommen
- je nach Größe unterschiedliche Anforderungen

Typisch heute:

- \<25 kW: oft noch vereinfacht
- 25–100 kW: zunehmend mit Fernsteuerbarkeit

------------------------------------------------------------------------

### d) Notfallmaßnahmen nach §13 EnWG

Das ist das, was du in deinem Zitat ansprichst:

- Netzbetreiber darf **im Notfall ALLE Anlagen regeln**, auch kleine
- Grundlage: §13 Abs. 1 Energiewirtschaftsgesetz §13

👉 Eigenschaften:

- **nachrangig** (erst wenn andere Maßnahmen nicht reichen)
- selten
- eher in **lokalen Netzengpässen**

------------------------------------------------------------------------

## 3. Haben kleine Anlagen IMMER eine Fernsteuerung?

Kurz gesagt:

👉 **Nein – aber immer häufiger.**

### Heute (Stand grob 2024–2026):

- **Bestandsanlagen (\<25 kW):**
  - oft *keine* Fernsteuerung
  - nur feste Begrenzung (z. B. 70%)
- **Neuere Anlagen:**
  - häufig mit:
    - Smart Meter Gateway
    - Steuerbox
    - oder RSE
- **Zukunft (Redispatch 3.0):**
  - Ziel: **auch kleine Anlagen aktiv einbeziehen**
  - wahrscheinlich KI-gestützt und automatisiert

------------------------------------------------------------------------

## 4. Wie läuft eine konkrete Abregelung technisch ab?

Wenn eine kleine Anlage steuerbar ist:

1.  Netzbetreiber erkennt Engpass
2.  Signal wird gesendet (RSE oder digital)
3.  Wechselrichter reduziert Einspeisung
4.  ggf. Entschädigung nach EEG

------------------------------------------------------------------------

## 5. Wichtiger Punkt: Einspeisevergütung & Entschädigung

Wenn deine Anlage abgeregelt wird:

- du bekommst **Entschädigung** (meist 95 % des entgangenen Ertrags)
- geregelt im EEG

------------------------------------------------------------------------

## Fazit

- Kleine PV-Anlagen **nehmen aktuell nicht am Redispatch teil**
- Aber:
  - sie können **über Rundsteuerung oder Smart Meter geregelt werden**
  - im **Notfall (§13 EnWG)** auch verpflichtend
- Trend geht klar zu:  
  👉 **voller Fernsteuerbarkeit auch im Niederspannungsnetz**

------------------------------------------------------------------------

Wenn du willst, kann ich dir das konkret für eine typische 10 kW-Dachanlage durchrechnen (inkl. wann und wie oft realistisch abgeregelt wird).

## Prompt:

ok, gibt es zahlen (oder schätzungen) wie viele alte solaranlagen am stromnetz angeschlossen sind die man überhaupt nicht regeln kann?  
vor allem, wie groß ist die stromleistung die auf diesem weg völlig unkontrolliert ins stromnetz eingespeist wird?  
zum beispiel heute (5.4.2026) werden wir circa 40 gigawatt zu viel strom-angebot haben in deutschland (quelle: smard.de), wie groß ist davon der anteil der erzeuger die man absolut gar nicht abregeln kann?

## Response:

Kurz gesagt: **Es gibt keine eine harte, offizielle Zahl „X GW sind komplett unregelbar“** – aber man kann das ziemlich gut eingrenzen. Und die Antwort ist:  
👉 **Der Anteil ist groß (mehrere 10 GW), aber „völlig unkontrolliert“ ist nur ein Teil davon.**

Ich geh das sauber Schritt für Schritt durch.

------------------------------------------------------------------------

# 1. Wie viele kleine, potenziell „nicht steuerbare“ PV-Anlagen gibt es?

Die beste belastbare Strukturzahl kommt aus Studien auf Basis des Marktstammdatenregisters:

- ca. **90 % aller PV-Anlagen sind \<25 kW** [pv magazine Deutschland](https://www.pv-magazine.de/2024/09/27/studie-empfiehlt-ansteuerbarkeit-auch-fuer-photovoltaik-anlagen-unter-25-kilowatt/?utm_source=chatgpt.com)
- diese machen etwa **~1/3 der installierten Leistung** aus [pv magazine Deutschland](https://www.pv-magazine.de/2024/09/27/studie-empfiehlt-ansteuerbarkeit-auch-fuer-photovoltaik-anlagen-unter-25-kilowatt/?utm_source=chatgpt.com)

Mit aktuellen Zahlen:

- Gesamtleistung PV Deutschland: **~115–120 GW** [ise.fraunhofer.de+1](https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf?utm_source=chatgpt.com)

👉 daraus folgt grob:

- **~35–40 GW** kommen aus kleinen Dachanlagen (\<25 kW)

------------------------------------------------------------------------

# 2. Wie viel davon ist wirklich „nicht steuerbar“?

Jetzt wird’s interessant:  
„klein“ ≠ „nicht steuerbar“

Man muss drei Gruppen unterscheiden:

### (A) Alte Bestandsanlagen (typisch vor ~2015–2018)

- oft **keine Fernsteuerung**
- nur feste 70%-Begrenzung oder gar keine
- keine Reaktion auf Preise

👉 das ist der **eigentlich „blinde“ Teil**

------------------------------------------------------------------------

### (B) Mittelalte Anlagen

- teilweise Rundsteuerempfänger
- teilweise steuerbar, aber **nicht flächendeckend eingebunden**

------------------------------------------------------------------------

### (C) Neue Anlagen (ab ~2023/25)

- zunehmend:
  - Smart Meter
  - Steuerbox
  - Einspeisebegrenzung (z. B. 60 % bis Steuerung vorhanden) [1komma5.com](https://1komma5.com/de/magazin/news/solarspitzengesetz-enwg-novelle-2025/?utm_source=chatgpt.com)

👉 diese sind **prinzipiell steuerbar**, auch wenn es noch nicht perfekt genutzt wird

------------------------------------------------------------------------

## Ergebnis als grobe Systemschätzung

Studien sagen das nicht als eine Zahl, aber implizit:

- Ein „großer Teil“ der kleinen PV ist **noch nicht systemdienlich steuerbar** [50hertz.com](https://www.50hertz.com/xspProxy/api/staticfiles/50hertz-client/images/unternehmen/partnerschaften/sapb_warmer-lichtsturm_langfassung.pdf?utm_source=chatgpt.com)
- gleichzeitig wird genau das als **akutes Problem für Netzstabilität** beschrieben [50hertz.com](https://www.50hertz.com/xspProxy/api/staticfiles/50hertz-client/images/unternehmen/partnerschaften/sapb_warmer-lichtsturm_langfassung.pdf?utm_source=chatgpt.com)

👉 realistische Einordnung (2025/26):

| Kategorie                         | Leistung                          |
|-----------------------------------|-----------------------------------|
| kleine PV gesamt                  | ~35–40 GW                         |
| davon wirklich „blind/unflexibel“ | **~20–30 GW (grobe Abschätzung)** |

Das ist keine offizielle Zahl, aber entspricht ziemlich gut:

- Altersstruktur
- fehlender Smart-Meter-Rollout
- Studienaussagen („erhebliche Teile nicht steuerbar“)

------------------------------------------------------------------------

# 3. Wie verhält sich das zu deinem Beispiel (40 GW Überschuss)?

Wichtiger Punkt:  
👉 **Nicht der gesamte Überschuss kommt aus PV – und nicht alles davon ist unregelbar**

An einem typischen „Solarspitzen-Tag“:

- PV kann mittags **60–80 GW** liefern (theoretisch)
- Last liegt evtl. bei **50–60 GW**
- → Überschuss entsteht

------------------------------------------------------------------------

## Anteil „nicht regelbar“ am Überschuss

Wenn wir die obigen Zahlen kombinieren:

- ~20–30 GW **nicht flexibel reagierende kleine PV**
- davon speist aber:
  - ein Teil **gar nicht ein (Eigenverbrauch!)**
  - ein Teil ist **ohnehin durch 70% gekappt**
  - ein Teil läuft nicht auf Volllast

👉 realistischer Anteil am *tatsächlichen Überschuss*:

➡️ **eher ~10–20 GW unflexible Einspeisung**

------------------------------------------------------------------------

# 4. Warum ist das trotzdem ein Problem?

Der kritische Punkt ist nicht nur die absolute Leistung, sondern:

### ❗ fehlende Reaktionsfähigkeit

Diese Anlagen:

- reagieren **nicht auf negative Preise**
- reagieren **nicht auf Netzengpässe**
- sind **nicht zentral steuerbar**

👉 deshalb nennt das Umweltbundesamt sie:

> „langfristig eine große unflexible Einspeisekomponente“ [Umweltbundesamt](https://www.umweltbundesamt.de/system/files/medien/11850/publikationen/2026-01/01_2026_CC.pdf?utm_source=chatgpt.com)

------------------------------------------------------------------------

# 5. Wichtig: „unregelbar“ stimmt technisch nicht ganz

Selbst alte Anlagen sind nicht völlig unkontrollierbar:

- über **Netzspannung / Frequenz** reagieren Wechselrichter automatisch
- im Extremfall:
  - **Netzabschaltung (Teilnetzabwurf)** möglich

👉 aber:

- das ist **keine gezielte Steuerung**, sondern Notfallphysik

------------------------------------------------------------------------

# 6. Fazit (ehrlich und nüchtern)

- Es gibt **keine offizielle Zahl für „nicht regelbare Leistung“**
- aber gut belegbar ist:

👉 Größenordnung heute (Deutschland):

- **~35–40 GW kleine PV**
- davon:
  - **~20–30 GW kaum steuerbar**
  - **~10–20 GW tatsächlich „problematisch unflexibel“ in Spitzenzeiten**

👉 Bei deinem Beispiel (40 GW Überschuss):

- **ein signifikanter Anteil (vielleicht 25–50 %) kommt aus solchen Anlagen**
- aber nicht der gesamte

------------------------------------------------------------------------

Wenn du willst, kann ich dir das noch genauer auseinanderziehen, z. B.:

- wie viel davon durch Eigenverbrauch „verschwindet“
- wie stark Batteriespeicher das schon entschärfen
- oder wie Redispatch 3.0 das konkret ändern soll (da wird’s richtig spannend)

## Prompt:

\* über \*\*Netzspannung / Frequenz\*\* reagieren Wechselrichter automatisch

ah, das heisst im extremfall können solaranlagen auch selbständig abschalten. wie funktioniert diese regelung? wo sind die grenzwerte (spannung, frequenz)? wie lange dauert diese abschaltung? (ich würde ja hoffen dass die wieder-einschaltung irgendwie randomisiert ist zur vermeidung von resonanzkatastrophen)

## Response:

Ja – genau. **PV-Wechselrichter haben eingebaute Netzschutzfunktionen** und reagieren automatisch auf **Frequenz und Spannung**. Das ist kein „intelligentes Netzmanagement“, sondern **lokale Schutztechnik**, die im Zweifel hart eingreift.

Ich erklär dir das konkret mit Zahlen und Verhalten.

------------------------------------------------------------------------

# 1. Grundprinzip: Netzgeführte Wechselrichter

PV-Wechselrichter arbeiten **netzgeführt**:

- sie synchronisieren sich auf:
  - **Frequenz (50 Hz)**
  - **Spannung (~230/400 V)**

👉 Wenn diese Größen außerhalb erlaubter Grenzen liegen:  
➡️ **→ sofortige Leistungsreduktion oder Abschaltung**

------------------------------------------------------------------------

# 2. Frequenzregelung (sehr wichtig bei Überschuss)

Die zentrale Kennlinie ist die sogenannte **P(f)-Droop-Regelung**.

## Verhalten oberhalb von 50 Hz:

$`P(f)=P_{max}\cdot\left(1-\frac{f-50.2}{0.3}\right)`$

Das bedeutet:

- ab **50,2 Hz**:
  - PV-Anlagen **reduzieren automatisch ihre Leistung**
- bei **50,5 Hz**:
  - → praktisch **0 % Einspeisung**

👉 Hintergrund:

- Überschuss im Netz → Frequenz steigt
- PV hilft aktiv, sich selbst „runterzuregeln“

------------------------------------------------------------------------

## Abschaltschwellen (typisch nach VDE-AR-N 4105)

- **\> 51,5 Hz** → **harte Abschaltung**
- darunter → gestufte Reduktion

------------------------------------------------------------------------

# 3. Spannungsregelung (lokal sehr relevant)

Im Niederspannungsnetz (dein Hausanschluss!) ist oft **Spannung der limitierende Faktor**.

Typische Grenzwerte:

- **\> 253 V (230 V +10%)**  
  → **Abschaltung innerhalb von Sekunden**
- oft schon vorher:  
  → Leistungsreduktion über **Q(U)- oder P(U)-Kennlinien**

👉 passiert z. B.:

- wenn viele PV-Anlagen im selben Straßenzug einspeisen

------------------------------------------------------------------------

# 4. Wie schnell passiert das?

Sehr schnell – das ist Schutztechnik:

- **Leistungsreduktion (Frequenz):**  
  → innerhalb von **Sekunden**
- **harte Abschaltung:**  
  → typischerweise **\< 0,2 Sekunden bis wenige Sekunden**

👉 das ist absichtlich schnell:

- dient der **Netzstabilität**
- verhindert Kettenreaktionen

------------------------------------------------------------------------

# 5. Wiedereinschalten (dein „Resonanzproblem“ 👇)

Sehr guter Punkt – genau das ist ein bekanntes Risiko.

👉 Deshalb gibt es **definierte Wiederzuschaltregeln**:

### a) Zeitverzögerung

- Wiederzuschaltung erst nach:
  - **typisch 60–300 Sekunden stabiler Netzlage**

------------------------------------------------------------------------

### b) Zufallsverzögerung (wichtig!)

👉 Ja: **wird tatsächlich gemacht**

- Wechselrichter haben:
  - **zufällige Zuschaltzeiten**
  - innerhalb eines Zeitfensters

👉 Ziel:

- verhindern, dass **tausende Anlagen gleichzeitig wieder anspringen**

------------------------------------------------------------------------

### c) Soft-Start

- nicht sofort volle Leistung
- sondern:
  - **Rampe über mehrere Sekunden**

------------------------------------------------------------------------

# 6. Warum das trotzdem heikel ist (Realität)

Trotz dieser Mechanismen gibt es bekannte Risiken:

### Problem 1: Gleichartiges Verhalten

Viele Wechselrichter:

- gleiche Norm
- ähnliche Parameter

👉 kann führen zu:

- **synchronem Verhalten**
- „Cluster-Abschaltungen“

------------------------------------------------------------------------

### Problem 2: Lokale Spannungseffekte

- PV schaltet ab → Spannung fällt
- → alle schalten wieder ein
- → Spannung steigt wieder

👉 mögliche Folge:

- **Oszillationen im Verteilnetz**

------------------------------------------------------------------------

### Problem 3: Keine zentrale Koordination

Das Ganze ist:

- **rein lokal**
- **nicht abgestimmt**

👉 deshalb:

- ineffizient im Vergleich zu Redispatch

------------------------------------------------------------------------

# 7. Fazit

Ja, kleine PV-Anlagen haben eine Art „Notfall-Selbstregelung“:

👉 über Frequenz:

- ab **50,2 Hz** → Leistung runter
- ab **~51,5 Hz** → aus

👉 über Spannung:

- ab **~253 V** → aus

👉 Reaktion:

- **Sekundenbereich**

👉 Wiedereinschalten:

- **zeitverzögert + randomisiert + Rampen**

------------------------------------------------------------------------

# Wichtigste Erkenntnis

👉 Diese Mechanismen sind:

- **Sicherheitsfunktionen**
- nicht für wirtschaftliche Optimierung gedacht

Und genau deshalb will man mit zukünftigen Systemen (Redispatch 3.0):

➡️ weg von „blindem Abschalten“  
➡️ hin zu **gezielter, koordinierter Steuerung**

------------------------------------------------------------------------

Wenn du willst, kann ich dir ein realistisches Szenario durchspielen (z. B. „Sonniger Sonntag in Bayern“), wo genau diese Effekte sichtbar werden – das ist ziemlich spannend.

------------------------------------------------------------------------

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
