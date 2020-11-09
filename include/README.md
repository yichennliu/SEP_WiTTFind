# Programmdokumentation der einzelnen javasscript Programme
Autoren: Julian Höllig, Fritz Seebauer, Max Hadersbeck    

## vVerwendete Programmiersprachen/Libraries
Es werden folgende Javascripterweiterungen/Libraries verwendet
* npm Paketmanagement und lodash
  see: ```../package.json``` or ```main.js```
* jquery
  z.B. ```.forEach``` usw. 

Es wird folgender Microservice Server verwendet:
* flask
  see ```wfa``` Server

Zum HTMl/CSS Support
* bootstrap4



## Bemerkungen zu search.js
### Datumsanzeige (search.js)
Bei der Datumsanzeige handelt es sich um das Datum der jeweiligen Treffer nach einer Suche. Das Datum steht rechtsbündig über der Bemerkung. Durch eine Suchanfrage ```wittfind_search()``` werden mit den Treffern auch die jeweilige Datumsinformation innerhalb eines Array-Objekts "data" zurückgeliefert. Ein Teil der inneren Struktur von "data", die auch das Datum ethält, befindet sich außerdem im Array-Objekt "item". Auf die Datumsinformation wird folgendermaßen zugegriffen:  
       ``` var date_norm = item["matches"][0]["date_norm"]; ```

Die Datumsinformation wird dann durch die Einbindung mit der obigen Variable im HTML Output generiert.  
    ``` d_output += '< span id="date_norm" class="date">< /i>< i class="fa fa-calendar">'
            + '< /i>    ' + date_norm + '  '
            + '< a href="#">< i id="InfoButton' + identifier + '" class="fa fa-info-circle" title='
            + '"&quot;?&quot;: &#10; Datumsangaben beruhen &#10; auf Annahme."'
            + '>< /i>< /a>< /span>'; ```

Der Code enthält außerdem wichtige Elemente für die Formatierung:
* Klasse ```date``` referenziert auf CSS Regeln für die Darstellung des Datums (in wittfind.css)
* Klasse ```fa fa-calendar``` erzeugt ein Kalendersymbol auf dem Frontend links vom Datum (aus Font Awesome Gallerie)
* Im Tag ```<a>``` wird ein Infosymbol erzeugt mit dynamischer ID. In einer separaten Funktion ```hide_info_button``` wird diese ID gebraucht. In einem Tooltipp wird außerdem der Inhalt der Info geschrieben.  

Hier die Funktion für das Infosymbol:  
        ``` function hide_info_button(date_norm, identifier) {
          if (!date_norm.includes('?')) {
            $("#InfoButton" + identifier).remove();
          }
        } ```

Die Funktion betrachtet jeden Treffer und prüft, ob sich in der Datumsinformation ein Fragezeichen befindet. Wenn ja, wird das Infosymbol für diesen Treffer entfernt.

## Datumssortierung (search.js)
Die Sortierung der Treffer wird, je nach Datumsangabe, von alt nach neu geregelt. Grundlage der Sortierung sind zwei Array-Objekte ```hit_array``` und ```hit_array_per_page```. Sie enthalten alle Treffer einen Schritt vor der Publikation in HTML. Mit der Javascript-Funktion ```.sort``` werden die Treffer in den Array-Objekten durch Vergleich der Datumsinformationen in ```date_norm``` (innerhalb der Objekte) sortiert.  
          ``` hit_array.sort(function(x,y){  
            var x = x["matches"][0]["date_norm"];
            var y = y["matches"][0]["date_norm"];
            var date_x = x.substr(0, 10);
            var date_y = y.substr(0, 10);
            return date_x == date_y ? 0 : date_x < date_y ? -1 : 1;
          }); ```

Der Code ist ausführlich in search.js kommentiert.

## Datumsauswahl (date-display.js/search.js)
Der Slider ist ein fertiges jQuery-ui Element. Dokumentation hier: https://jqueryui.com/slider/#range. 
Die Funktion liest beide Daten aus den #amount und #amount2 Html Elementen (val() ist eine jquery-ui spezifische funktion zum auslesen).
Dann werden diese gewünschten Daten mit allen Daten in dem schon vorhandenen Hit-array verglichen welcher alle Treffer der Suche enthält.
(Alles sehr ähnlich zu dem schon vorhandenen Filtern nach Dokument in der Sidebar)


