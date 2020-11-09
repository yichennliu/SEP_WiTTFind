# Changelog

## 19.4 
Milestone: collect-milestone Frühing 4/2019

### witt-data
* Nachlass Daten geholt, Version März 2019 (mh,ög)
* xml-Daten neu geparsed, Spaceproblem reduziert (mh)
* Anchored Server erweitert (ssch)
* witt-data: Frequenzlisten automatisch mit python erzeugt (lgj)
* witt-data: Datumsangaben nun in der Edition (öj)
* witt-data: Datumsangaben sind in Wittfind Verfügbar (jh)

### wittfind-web
* Umstieg auf bootstrap4 (fs)
* Umstieg von bower auf npm (fs)
* favicon WAB/CIS entworfen (lp)
* Progressbar zeigt, dass wittfind noch arbeitet (fs)
* Beispiele überarbeitet, eigener Menupunkt (fb, yy)
* Internationalisierung eingebaut (yl)
* Behindertengerechter Zugang (id)
* odyssee-reader als Prototyp eingebaut (sst)
* Datum kann als Filter verwendet werden (fs)
* Benennungen auf der Übersichtsspalte geändert (mh)

### Quadroreader
* aktualisiert (ml)
* Nachlassbilder integriert (ml)
* Manifestdateien ereweitert (ml)

### OdysseeReader
* Transfer xls nach .json (sst)
* continuous integration (sst)
* svg Graphik (sst)
* Dokumentation für Kooperationspartner (sst)

### Corrector
* Optimierung der Semiautomatischen OCR Korrektur (ml,fl)

### Präsentation
* DHd Mainz/Frankfurt (Poster, ir,su,fl,mh)
* Musilhaus Klagenfurt (Vortrag, mh,sst)

### anderes
* feedback-App aktualisiert (mh)
* continuous integration optimiert (ssch)
* pipelines optimiert (ssch) 
* Dokumentation erstellt (fb)

## 18.7 

### infrastructure
* Umstieg auf neuen Server: cast1/cast2 mit debian (ssch,ts)
* Optimierung continuous integration (ssch)

### witt-data
* Transkription: Erweiterung auf nahezu gesamten Nachlass (ap,mh,ög)
* Faksimile: Erweiterung auf nahezu gesamten Nachlass, Copyright aus Wien, Cambridge, Oxford (ap,mh)
* Aufbau odysseeReader: Transfer Daten Word2003-> -xls -> .json (fu,im,mh,sst,mp)
* Kategorisierung von Bemerkungen mit CNN (ssch,jr)
* Erweiterung Lexikon, Semantik, Germanet (ir,ts)

### wittfind-web
* Semantische Suche für Musik (ir)
* Anchored Server Aufbau (ssch)
* Lupe (jh)

### Quadroreader
* aktualisiert (ml)
* Faksimile: Erweiterung auf nahezu gesamten Nachlass (ml)
* Manifestdateien erweitert (ml)
* Übersichstsseite (ml)

### Corrector
* Optimierung der Semiautomatischen OCR Korrektur (ml,fl)

### OdysseeReader
* Transfer xls nach .json (sst)
* Aufbau dynamisches WEB-frontend (ab,sst)

### Präsentationen
* DHd Köln (Poster, ir,su,fl,mh)
* Clare Hall College Cambridge (Vorträge, Exkursion, ssch,fa,ir,ml,db)
* ECDA: Paderborn (Vortrag, mh)
* Wittgenstein Symposium (Vortrag, mp,ap)

### anderes
* WIP- Deklaration auf Einstiegsseite (jr,mh)

## 17.11

* Verbesserte Alternativendarstellung (ssch)
* Neues Lexikon (ir)
* Optimierung der POS-Tagging-Pipeline (fa)

## 17.2

* Anzeige aller Faksimile-Extrakte in Trefferübersicht (ml,ssch)
* Grafisches Finden deaktiviert (ssch,mh)

## 16.12

* Semantisches Finden: Darstellung der Frequenzlisten als WordCloud (ssch)
* Statistikanzeige: Verteilung der Treffer auf die einzelnen Dokumente  (ssch)
* Neue Trefferdarstellung: komprimierte Trefferanzeige  (ssch)
* Umstieg auf Anchored XML  (ssch) 

## 16.9

* Internet Explorer Warnung angepasst (ml)

## 16.7

* Koordinatenupdate für diverse Dokumente (ml)
* Graphisches Finden mittels Grapheditor ist wieder möglich (ssch)
* Neuer Menüpunkt Faksimile-Reader hinzugefügt (Weiterleitung zum Quadroreader)
* Sämtliche Dienste (Autovervollständigung, Quadroreader) sind per DNS-Eintrag
  zu erreichen (anstatt unter einer Portnummernangabe) (ssch, ts)
* WordCloud wird in Verbindung mit den Treffern aus der
  Autovervollständigungsliste angezeigt (ssch)
* Vorher/Nachher Faksimileextrakte sind mit dem Quadroreader verlinkt (ml,ssch)
* Warnung eingebaut falls Internet Explorer verwendet wird (ml)
* Kompatibilität zum Internet Explorer annäherend hergestellt (ml,ssch)
* Aufbau von `witt-data` abgeschlossen (ssch,mh)

## 16.6

* Automatisches Nachladen der Faksimile (ml)
* Filterung für ein bestimmtes Dokument springt zum ersten Treffer in der
  Trefferübersicht (anstatt alle anderen Dokumente auszublenden) (ssch)

## 15.11

* Autovervollständigungsserver wurde durch eine C++ Implementation ersetzt (jb,db,ssch)

## 15.10

* Autovervollständigungsliste ist nun case-sensitiv (jb,db)

## 15.9

* Eingegebener Suchbegriff wird nach Abschicken der Suchanfrage weiterhin
  angezeigt (ssch)

## 15.7

* Neuer Reiter Geheimschrift mit den Unterpunkten *Geheimschriftübersetzer* und
  *Analysen zur Geheimschrift* (ak,ssch)

## 15.6

* Satzhighlighting im Frontend implementiert (ssch)
* Die standalone Feedback App wurde durch ein Feedbackformular ersetzt (ssch)
* Footer wurde durch eine Copyrightinformation ergänzt (ml,ssch)

## 15.5

* Einspielung der Ms-114 Koordinaten (ml)
* Überarbeitung des Geheimschriftübersetzers (ssch)
* Öffnen des Readers bei Klick auf Faksimile (ml)

## 15.4

* Erweiterung der Anzeige der maximalen Trefferanzahl (ssch)

## 15.3

* Vorheriger/Nächster Satz durch Pfeile auswählbar in Bemerkungenansicht (ssch)

## 15.2

* Lemmatisierte Vorschlagssuche (ak,ssch,mh)
* Faksimilequalität auf der Hauptseite sichtba (ml)r
* Geheimschriftübersetzer für neues Layout eingebaut (ak,ssch)
* Frequenzlisten für semantisches Finden eingebaut (ssch)
* Neue HD Faksimile (Ts-213) können angezeigt werden (ml,ssch)

## 15.1

* Bemerkungen können im Einstellungenfenster ein- bzw. ausgeschalten werden (ssch)
* Reihenfolge der angezeigten Treffer entspricht der Reihenfolge im Webbrowser  (ssch)
* Anzeige der Faksimile kann im Einstellungenfenster deaktiviert werden (ml)
* Faksimilequalität im Reader sichtbar (ml)
* Dialogfenster für semantisches Finden überarbeitet (ssch)
* Hilfeseite für Reader implementiert (ml)

## 14.12

* Einstellungsmenü zur Auswahl der Faksimile Qualität (ml)
* Komplettes Redesign der Webseite (Bootstrap, Logo) (ssch,ml,mh)
* Reader verwendet HD Faksimile (ml)
