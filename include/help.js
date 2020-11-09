/**
 * @file Coordination of help page
 * @author Angela Krey, Stefan Schweter <stefan@schweter.it>
 */

/**
 * GET request from help.html file will
 * display that content in a special help div.
 * After that the AngularJS bootstrap process is implemented.
 * All help categories are stored in raw json format here
 */
function inject_help_html()
{

  $.get("../help.html", function(result) {
      $('.help').append(result);
      changeLang_example();
  })
  /* get() will load file asynchron. -> so it´s important to bootstrap angular
   * after that process is complete. Otherwise it won´t work (spent hours...) */
  .done(function() {
    angular.module('help', []);
    angular.module('help', []).controller('MainCtrl', ['$scope', function($scope) {
      var json = {
        "modules": [{
            "title": 'Einfache Suche nach Wörtern',
            "requests": [{
              "title": 'schwarz',
              "tooltip": 'alle lexikalischen Formen von schwarz'
            }, {
              "title": '"schwarzer"',
              "tooltip": 'alle Wörter mit genau dem Wortlaut "schwarzer"'
            }, {
              "title": 'schwarz Kreis',
              "tooltip": 'alle lexikalischen Formen von "schwarz", gefolgt von allen lexikalischen Formen von "Kreis"'
            }, {
              "title": '"schwarzen" Kreis',
              "tooltip": 'alle Wörter mit genau dem Wortlaut "schwarzen", gefolgt von allen lexikalischen Formen von "Kreis"'
            }, {
              "title": 'der Kreis',
              "tooltip": 'alle lexikalischen Formen von "der" und alle lexikalischen Formen von "Kreis"'
            }, {
              "title": 'der * Kreis',
              "tooltip": 'alle lexikalischen Formen von "der", gefolgt von beliebigen Wort, gefolgt von allen lexikalischen Formen von "Kreis"'
            }, {
              "title": 'der Kr*',
              "tooltip": 'alle lexikalischen Formen von "der", gefolgt von einem Wort beginnend mit Kr'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "tagtitle": 'Anfrage - ',
              "firsttitle": 'Beschreibung'
            }],
            "details": [{
              "tag": '"Kreis"',
              "first": 'genauer Wortlaut "Kreis"'
            }, {
              "tag": 'Kreis',
              "first": 'alle lexikalischen Formen von Kreis'
            }, {
              "tag": 'Kr*',
              "first": 'Wort, das mit Kr beginnt'
            }, {
              "tag": '*eis',
              "first": 'Wort, das auf eis endet'
            }]
          }, {
            "title": 'Satzkategorien',
            "requests": [{
              "title": 'mir <PUNCT> was',
              "tooltip": 'mir + Satzzeichen + was'
            }, {
              "title": '"mir" <PUNCT> "was"',
              "tooltip": 'mir + Satzzeichen, gefolgt von genau dem Wortlaut "was"'
            }, {
              "title": '<PUNCT> <MOT> <PUNCT>',
              "tooltip": 'Satzzeichen + beliebiges Wort + Satzzeichen'
            }, {
              "title": '<BOS> ich',
              "tooltip": 'Satzanfang + ich'
            }, {
              "title": 'können <PUNCT> <EOS>',
              "tooltip": 'können + Satzzeichen + Satzende'
            }, {
              "title": '<BOS> <MOT> <EOS>',
              "tooltip": 'Satzanfang + beliebiges Wort + Satzende'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "firsttitle": 'Kategorie - ',
              "tagtitle": 'Tag -',
              "secondtitle": 'Beispiele'
            }],
            "details": [{
              "first": 'Satzanfang',
              "tag": '<BOS>',
              "second": '. Ich'
            }, {
              "first": 'Satzende',
              "tag": '<EOS>',
              "second": 'gegangen. '
            }, {
              "first": 'beliebiges Wort',
              "tag": '*',
              "second": 'Nomen, Adjektiv, Verb, ...'
            }, {
              "first": 'beliebiges Wort',
              "tag": '<MOT>',
              "second": 'Nomen, Adjektive, Verb, ...'
            }, {
              "first": 'Punktuations-Zeichen',
              "tag": '<PUNCT>',
              "second": '. ? ! ; :'
            }, {
              "first": 'Alternative',
              "tag": ' / ',
              "second": 'denken / dachte'
            }]
          }, {
            "title": 'Lexikalische Wortkategorien',
            "requests": [{
              "title": '<EN> und <EN>',
              "tooltip": 'Eigenname + und + Eigenname'
            }, {
              "title": '<KONJ> <EN>',
              "tooltip": 'Konjunktion + Eigenname'
            }, {
              "title": 'die <ADJ> Farbe',
              "tooltip": 'die + beliebiges Adjektiv + Farbe'
            }, {
              "title": 'die "gleiche" Farbe',
              "tooltip": 'die + genau Wortlaut "gleiche" + Farbe'
            }, {
              "title": 'die gleiche <N>',
              "tooltip": 'die + gleiche + Nomen'
            }, {
              "title": 'die "gleiche" <N>',
              "tooltip": 'die + genau Wortlaut "gleiche" + Nomen'
            }, {
              "title": '<V> <MOT> <EN>',
              "tooltip": 'Verb + beliebiges Wort + Eigenname'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "firsttitle": 'Kategorie - ',
              "tagtitle": 'Tag - ',
              "freqtitle": 'Frequenzliste (Ts-213)'
            }],
            "details": [{
              "first": 'Nomen',
              "tag": '<N>',
              "freq": 'Helppage/frequenzliste_nomen.html'
            }, {
              "first": 'Adjektiv',
              "tag": '<ADJ>',
              "freq": 'Helppage/frequenzliste_adjektive.html'
            }, {
              "first": 'Verb',
              "tag": '<V>',
              "freq": 'Helppage/frequenzliste_verben.html'
            }, {
              "first": 'Determinativ',
              "tag": '<DET>',
              "freq": 'Helppage/frequenzliste_det.html'
            }, {
              "first": 'Adverb',
              "tag": '<ADV>',
              "freq": 'Helppage/frequenzliste_adv.html'
            }, {
              "first": 'Partikel',
              "tag": '<PART>',
              "freq": 'Helppage/frequenzliste_part.html'
            }, {
              "first": 'Präposition',
              "tag": '<PREP>',
              "freq": 'Helppage/frequenzliste_prep.html'
            }, {
              "first": 'Präposition mit Artikel verschmolzen',
              "tag": '<PDET>',
              "freq": 'Helppage/frequenzliste_pdet.html'
            }, {
              "first": 'Konjunktion',
              "tag": '<KONJ>',
              "freq": 'Helppage/frequenzliste_konj.html'
            }, {
              "first": 'Interjektion',
              "tag": '<INTJ>',
              "freq": 'Helppage/frequenzliste_intj.html'
            }, {
              "first": 'Verbpartikel',
              "tag": '<VPART>',
              "freq": 'Helppage/frequenzliste_vpart.html'
            }, {
              "first": 'Eigenname',
              "tag": '<EN>',
              "freq": 'Helppage/frequenzliste_en.html'
            }]
          }, {
            "title": 'Lexikalische Wortkategorien um morphologische verfeinert',
            "requests": [{
              "title": '<V:3eGi>',
              "tooltip": 'Verb 3. Person Singular Präsens Indikativ'
            }, {
              "title": 'es <V:3eGi>',
              "tooltip": 'es + Verb 3. Singular Präsens Indikativ'
            }, {
              "title": '<V:3>',
              "tooltip": 'Verb in der 3. Person'
            }, {
              "title": 'es <V:3>',
              "tooltip": 'es + Verb in der 3. Person'
            }, {
              "title": 'ich <V:1>',
              "tooltip": 'ich + Verb in der 1. Person'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "firsttitle": 'Kategorie - ',
              "secondtitle": 'Eigenschaft',
              "tagtitle": 'Tag - '
            }],
            "details": [{
              "first": 'Kasus',
              "second": '<Nominativ>',
              "tag": '<n>'
            }, {
              "first": 'Kasus',
              "second": '<Akkusativ>',
              "tag": '<a>'
            }, {
              "first": 'Kasus',
              "second": '<Dativ>',
              "tag": '<d>'
            }, {
              "first": 'Kasus',
              "second": '<Genitiv>',
              "tag": '<g>'
            }, {
              "first": 'Numerus',
              "second": '<Singular>',
              "tag": '<e>'
            }, {
              "first": 'Numerus',
              "second": '<Plural>',
              "tag": '<m>'
            }, {
              "first": 'Genus',
              "second": '<Femininum>',
              "tag": '<F>'
            }, {
              "first": 'Genus',
              "second": '<Maskulinum>',
              "tag": '<M>'
            }, {
              "first": 'Genus',
              "second": '<Neutrum>',
              "tag": '<N>'
            }, {
              "first": 'Genus',
              "second": '<Unspezifiziert>',
              "tag": '<U>'
            }, {
              "first": 'Deklination (ADJ)',
              "second": '<stark>',
              "tag": '<x>'
            }, {
              "first": 'Deklination (ADJ)',
              "second": '<schwach>',
              "tag": '<y>'
            }, {
              "first": 'Deklination (ADJ)',
              "second": '<unspezifiziert>',
              "tag": '<z>'
            }, {
              "first": 'Komparierung (ADJ,ADV)',
              "second": '<Grundform>',
              "tag": '<p>'
            }, {
              "first": 'Komparierung (ADJ,ADV)',
              "second": '<Komparativ>',
              "tag": '<k>'
            }, {
              "first": 'Komparierung (ADJ,ADV)',
              "second": '<Superlativ>',
              "tag": '<s>'
            }, {
              "first": 'Person',
              "second": '<1.>',
              "tag": '<1>'
            }, {
              "first": 'Person',
              "second": '<2.>',
              "tag": '<2>'
            }, {
              "first": 'Person',
              "second": '<3.>',
              "tag": '<3>'
            }, {
              "first": 'Person',
              "second": '<Unbestimmt>',
              "tag": '<0>'
            }, {
              "first": 'Tempus',
              "second": '<Präsens>',
              "tag": '<G>'
            }, {
              "first": 'Tempus',
              "second": '<Präteritum,Perfekt>',
              "tag": '<V>'
            }, {
              "first": 'Tempus',
              "second": '<Unbestimmt>',
              "tag": '<O>'
            }, {
              "first": 'Modus',
              "second": '<Indikativ>',
              "tag": '<i>'
            }, {
              "first": 'Modus',
              "second": '<Konjunktiv>',
              "tag": '<c>'
            }, {
              "first": 'Modus',
              "second": '<Imperativ>',
              "tag": '<b>'
            }, {
              "first": 'Genus Verbii',
              "second": '<Aktiv>',
              "tag": '<A>'
            }, {
              "first": 'Genus Verbii',
              "second": '<Passiv>',
              "tag": '<P>'
            }, {
              "first": 'Infinite Verbform',
              "second": '<Infinitiv>',
              "tag": '<z>'
            }, {
              "first": 'Infinite Verbform',
              "second": '<PartizipI(Präsens)>',
              "tag": '<E>'
            }, {
              "first": 'Infinite Verbform',
              "second": '<PartizipII(Präteritum)>',
              "tag": '<Z>'
            }, {
              "first": 'Deutlichkeit',
              "second": '<Markierte Form (Genitiv)>',
              "tag": '<S>'
            }]
          }, {
            "title": 'Semantische Kategorien',
            "requests": [{
              "title": '<HUM> meinen',
              "tooltip": 'semantische Klasse Menschen + meinen'
            }, {
              "title": '<PF>',
              "tooltip": 'semantische Klasse Pflanzen'
            }, {
              "title": '<ADJ> <PF>',
              "tooltip": 'Adjektiv, gefolgt von semantischer Klasse Pflanzen'
            }, {
              "title": '<ADJ+COL+NUM> <N>',
              "tooltip": 'Adjektiv, Grundfarbe, Numeralia + Nomen'
            }, {
              "title": '([ADJA] | [ADJD]) <PF>',
              "tooltip": 'POS-Adjektiv, gefolgt von semantischer Klasse Pflanzen'
            }, {
              "title": '(([ADJA] | [ADJD]) & <+COL+NUM>) [NN]',
              "tooltip": 'POS-Adjektiv, das zugleich Grundfarbe, Numeralia ist + POS-Nomen'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "firsttitle": 'Klasse - ',
              "tagtitle": 'Tag - ',
              "secondtitle": 'Eigenschaft - ',
              "thirdtitle": 'Beispiele - ',
              "freqtitle": 'Frequenzliste (Ts-213)'
            }],
            "details": [{
              "first": 'Menschen',
              "tag": '<HUM>',
              "second": 'problemlos zu differenzieren',
              "third": 'Advokat, Alchemist',
              "freq": 'SemantischeKlassen/frequenzliste_NMenschen.html'
            }, {
              "first": 'Tiere',
              "tag": '<T>',
              "second": 'problemlos zu differenzieren',
              "third": 'Hahn, Hirsch',
              "freq": 'SemantischeKlassen/frequenzliste_NTiere.html'
            }, {
              "first": 'Pflanzen',
              "tag": '<PF>',
              "second": 'problemlos zu differenzieren',
              "third": 'Alpenblume, Rose',
              "freq": 'SemantischeKlassen/frequenzliste_NPflanzen.html'
            }, {
              "first": 'Objekte',
              "tag": '<OBJ>',
              "second": 'räumlich ausgedehnte Konkreta (eigentliche Objekte), räumlich nicht ausgedehnte Konkreta (Stoffe), mit menschlichen Sinnen wahrnehmbare Konkreta, Lokativa, Formen',
              "third": 'Buch, Wasser, Licht, Decke, Viereck',
              "freq": 'SemantischeKlassen/frequenzliste_NObjekte.html'
            }, {
              "first": 'Ereignisse',
              "tag": '<ER>',
              "second": 'zeitlich abgegrenzt, mit willenhaften Verursacher, Prozesse',
              "third": 'Konzert,Sprechen',
              "freq": 'SemantischeKlassen/frequenzliste_NEreignisse.html'
            }, {
              "first": 'Zustände',
              "tag": '<ZU>',
              "second": 'keine temporale Struktur, veränderbar',
              "third": 'Freiheit, Wohlsein',
              "freq": 'SemantischeKlassen/frequenzliste_NZustaende.html'
            }, {
              "first": 'Eigenschaften',
              "tag": '<EIG>',
              "second": 'unveränderbare Attribute von Entitäten',
              "third": 'Bildhaftigkeit, Breite',
              "freq": 'SemantischeKlassen/frequenzliste_NEigenschaft.html'
            }, {
              "first": 'Temporalia',
              "tag": '<TEMP>',
              "second": 'Zeitintervalle und - punkte',
              "third": 'Gegenwart, Minute',
              "freq": 'SemantischeKlassen/frequenzliste_NTemporalia.html'
            }, {
              "first": 'Eigennamen',
              "tag": '<EN>',
              "second": 'problemlos zu differenzieren',
              "third": 'Venus, Alpen',
              "freq": 'SemantischeKlassen/frequenzliste_NEigennamen.html'
            }, {
              "first": 'Numeralia',
              "tag": '<NUM>',
              "second": 'Zahlworte',
              "third": 'Primzahl, Acht',
              "freq": 'SemantischeKlassen/frequenzliste_NNumeralia.html'
            }, {
              "first": 'Diversa',
              "tag": '<SONST>',
              "second": 'Gefühle, Gedanken',
              "third": 'Liebe, Aberglaube, Verhältnis',
              "freq": 'SemantischeKlassen/frequenzliste_NDiversa.html'
            }, {
              "first": 'Farben',
              "tag": '<COL>',
              "second": 'Farben nach Farbenlehre Wittgensteins, Unterkategorie: Grundfarbe, Zwischenfarbe, Transparenz, Glanz, Farbigkeit',
              "third": 'rot, klar, blau, gelb, schwarz, rein, klar',
              "freq": 'SemantischeKlassen/frequenzliste_Farben.html'
            }, {
              "first": 'Numeralia',
              "tag": '<NUM>',
              "second": 'quantitativ',
              "third": 'zwei, erst, einzig, viel, weniger, zweite',
              "freq": 'SemantischeKlassen/frequenzliste_Numeralia.html'
            }, {
              "first": 'Relation',
              "tag": '<REL>',
              "second": '"auf ein Wort verweisend oder sich darauf beziehend"/ Fachsprache/ "wie"/ "aus"',
              "third": 'physikalisch, wesentlich, kausal, grammatisch, sinnlos',
              "freq": 'SemantischeKlassen/frequenzliste_Relation.html'
            }, {
              "first": 'Eigennamen',
              "tag": '<EN>',
              "second": 'von Eigennamen abgeleitete Adjektive',
              "third": 'Fermatsche, Skolemschen, Sheffersche, Eulerscher',
              "freq": 'SemantischeKlassen/frequenzliste_Eigennamen.html'
            }, {
              "first": 'Temporalia',
              "tag": '<TEMP>',
              "second": 'Zeitangaben',
              "third": 'unmittelbar, ehe, lang, andermal, vorig, meist',
              "freq": 'SemantischeKlassen/frequenzliste_Temporalia.html'
            }, {
              "first": 'Evaluation',
              "tag": '<EVAL>',
              "second": 'Wertung des Betrachters/ Konnoatiton/ Subjektivität',
              "third": 'falsch, richtig, wahr, einfach, genau',
              "freq": 'SemantischeKlassen/frequenzliste_Evaluation.html'
            }, {
              "first": 'Zustände',
              "tag": '<ZU>',
              "second": 'abgeschlossener/ definierbarer Zustand, Lokativa',
              "third": 'ganz, wirklich, gegeben, gebraucht, gesagt, allgemein',
              "freq": 'SemantischeKlassen/frequenzliste_Zustaende.html'
            }, {
              "first": 'Komparativa',
              "tag": '<KOMP>',
              "second": 'Ähnlichkeit/ Gleichheit/ Steigerung',
              "third": 'anders, gleich, verschieden, analog, besser',
              "freq": 'SemantischeKlassen/frequenzliste_Komparativa.html'
            }, {
              "first": 'Stilistika',
              "tag": '<STIL>',
              "second": 'autorenspezifische Abstufungen',
              "third": 'wohl, wirklich, bestimmt, klar, gewiß',
              "freq": 'SemantischeKlassen/frequenzliste_Stilistika.html'
            }, {
              "first": 'Eigenschaft',
              "tag": '<EIG>',
              "second": 'Eigenschaften, die Personen zugeschrieben werden',
              "third": 'gebildet, ungeschickt,peinlich, selbstständig, gutwillig, naiv',
              "freq": 'SemantischeKlassen/frequenzliste_Eigenschaft.html'
            }, {
              "first": 'Ereignisse',
              "tag": '<ER>',
              "second": 'nicht abgeschlossener Verlauf/ Handlung',
              "third": 'unendlich, hinweisend, entsprechend,vorbereitend, folgend',
              "freq": 'SemantischeKlassen/frequenzliste_Ereignisse.html'
            }]
          }, {
            "title": 'Syntaktische Wortkategorien (extrahiert mit Treetagger von Dr. H. Schmid, CIS)',
            "requests": [{
              "title": '[NE] sehen',
              "tooltip": 'syntaktische Wortkategorie Eigenname + sehen'
            }, {
              "title": '[NE] * [NE]',
              "tooltip": 'syntaktische Wortkategorie Eigenname + beliebiges Wort + syntaktische Wortkategorie Eigenname'
            }, {
              "title": '[NE] <V>',
              "tooltip": 'syntaktische Wortkategorie Eigenname + Verb'
            }, {
              "title": '[NE] [VVFIN]',
              "tooltip": 'syntaktische Wortkategorie Eigenname + syntaktische Wortkategorie finites Verb'
            }, {
              "title": '[NE] [V*]',
              "tooltip": 'syntaktische Wortkategorie Eigenname + syntaktische Wortkategorie Verb'
            }, {
              "title": '[PTKNEG]',
              "tooltip": 'syntaktische Wortkategorie Negationspartikel'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "tagtitle": 'POS - ',
              "firsttitle": 'Beschreibung - ',
              "secondtitle": 'Beispiele'
            }],
            "details": [{
              "tag": ' [ADJA]',
              "first": 'attributives Adjektiv',
              "second": ' [das] große  [Haus]'
            }, {
              "tag": ' [ADJD]',
              "first": 'adverbiales oder prädikatives Adjektiv',
              "second": ' [er fährt] schnell,  [er ist] schnell'
            }, {
              "tag": ' [ADV]',
              "first": 'Adverb',
              "second": 'schon, bald, noch'
            }, {
              "tag": ' [APPR]',
              "first": 'Präposition',
              "second": 'in  [der Stadt], ohne  [mich]'
            }, {
              "tag": ' [APPRART]',
              "first": 'Präposition mit Artikel',
              "second": 'im  [Haus], zur  [Sache]'
            }, {
              "tag": ' [APPO]',
              "first": 'Postposition',
              "second": ' [ihm] zufolge,  [der Sache] wegen'
            }, {
              "tag": ' [APZR]',
              "first": 'Zirkumposition rechts',
              "second": ' [von jetzt] an'
            }, {
              "tag": ' [ART]',
              "first": 'bestimmter oder unbestimmter Artikel',
              "second": 'der, die, das, ein, eine'
            }, {
              "tag": ' [CARD]',
              "first": 'Kardinalzahl',
              "second": 'zwei  [Männer],  [im Jahre] 1994'
            }, {
              "tag": ' [FM]',
              "first": 'Fremdsprachliches Material',
              "second": ' [Er hat das mit "] a big fish  [" übersetzt]'
            }, {
              "tag": ' [ITJ]',
              "first": 'Interjektion',
              "second": 'mhm, ach, tja'
            }, {
              "tag": ' [KOUI]',
              "first": 'unterordnende Konjunktion mit "zu" und Infinitiv',
              "second": 'um  [zu leben], anstatt  [zu fragen]'
            }, {
              "tag": ' [KOUS]',
              "first": 'unterordnende Konjunktion mit Satz',
              "second": 'weil, dass, damit, wenn, ob'
            }, {
              "tag": ' [KON]',
              "first": 'nebenordnende Konjunktion',
              "second": 'und, oder, aber'
            }, {
              "tag": ' [KOKOM]',
              "first": 'Vergleichspartikel, ohne Satz',
              "second": 'als, wie'
            }, {
              "tag": ' [NN]',
              "first": 'normales Nomen',
              "second": 'Tisch, Herr,  [das] Reisen'
            }, {
              "tag": ' [NE]',
              "first": 'Eigennamen',
              "second": 'Hans, Hamburg, HSV'
            }, {
              "tag": ' [PDS]',
              "first": 'substituierendes Demonstrativpronomen',
              "second": 'dieser, jener'
            }, {
              "tag": ' [PDAT]',
              "first": 'attribuierendes Demonstrativpronomen',
              "second": 'jener  [Mensch]'
            }, {
              "tag": ' [PIS]',
              "first": 'substituierendes Indefinitpronomen',
              "second": 'keiner, viele, man, niemand'
            }, {
              "tag": ' [PIAT]',
              "first": 'attribuierendes Indefinitpronomen ohne Determiner',
              "second": 'kein  [Mensch], irgendein  [Glas]'
            }, {
              "tag": ' [PIDAT]',
              "first": 'attribuierendes Indefinitpronomen mit Determiner',
              "second": ' [ein] wenig  [Wasser],  [die] beiden  [Brüder]'
            }, {
              "tag": ' [PPER]',
              "first": 'irreflexives Personalpronomen',
              "second": 'ich, er, ihm, mich, dir'
            }, {
              "tag": ' [PPOSS]',
              "first": 'substituierendes Possesivpronomen',
              "second": 'meins, deiner'
            }, {
              "tag": ' [PPOSAT]',
              "first": 'attribuierendes Possesivpronomen',
              "second": 'mein  [Buch], deine  [Mutter]'
            }, {
              "tag": ' [PRELS]',
              "first": 'substituierendes Relativpronomen',
              "second": ' [der Hund,] der'
            }, {
              "tag": ' [PRELAT]',
              "first": 'attribuierendes Relativpronomen',
              "second": ' [der Mann,] dessen  [Hund]'
            }, {
              "tag": ' [PRF]',
              "first": 'reflexives Personalpronomen',
              "second": 'sich, einander, dich, mir'
            }, {
              "tag": ' [PWS]',
              "first": 'substituierendes Interrogativpronomen',
              "second": 'wer, was'
            }, {
              "tag": ' [PWAT]',
              "first": 'attribuierendes Interrogativpronomen',
              "second": 'welche  [Farbe], wessen  [Hut]'
            }, {
              "tag": ' [PWAV]',
              "first": 'adverbiales Interrogativ- oder Relativpronomen',
              "second": 'warum, wo, wann, worüber, wobei'
            }, {
              "tag": ' [PAV]',
              "first": 'Pronominaladverb',
              "second": 'dafür, dabei, deswegen, trotzdem'
            }, {
              "tag": ' [PTKZU]',
              "first": '"zu" vor Infinitiv',
              "second": 'zu  [gehen]'
            }, {
              "tag": ' [PTKNEG]',
              "first": 'Negationspartikel',
              "second": 'nicht'
            }, {
              "tag": ' [PTKVZ]',
              "first": 'abgetrennter Verbzusatz',
              "second": ' [er kommt] an,  [er fährt] rad'
            }, {
              "tag": ' [PTKANT]',
              "first": 'Antwortpartikel',
              "second": 'ja, nein, danke, bitte'
            }, {
              "tag": ' [PTKA]',
              "first": 'Partikel bei Adjektiv',
              "second": 'am  [schönsten], zu  [schnell]'
            }, {
              "tag": ' [TRUNC]',
              "first": 'Kompositions-Erstglied',
              "second": 'An-  [und Abreise]'
            }, {
              "tag": ' [VVFIN]',
              "first": 'finites Verb, voll',
              "second": ' [du] gehst,  [wir] kommen  [an]'
            }, {
              "tag": ' [VVIMP]',
              "first": 'Imperativ, voll',
              "second": 'komm  [!]'
            }, {
              "tag": ' [VVINF]',
              "first": 'Infinitiv, voll',
              "second": 'gehen, ankommen'
            }, {
              "tag": ' [VVIZU]',
              "first": 'Infinitiv mit "zu", voll',
              "second": 'anzukommen, loszulassen'
            }, {
              "tag": ' [VAPP]',
              "first": 'Partizip Perfekt, voll',
              "second": 'gegangen, angekommen'
            }, {
              "tag": ' [VAFIN]',
              "first": 'finites Verb, aux',
              "second": ' [du] bist,  [wir] werden'
            }, {
              "tag": ' [VAIMP]',
              "first": 'Imperativ, aux',
              "second": 'sei  [ruhig!]'
            }, {
              "tag": ' [VAINF]',
              "first": 'Infinitiv, aux',
              "second": 'werden, sein'
            }, {
              "tag": ' [VAPP]',
              "first": 'Partizip Perfekt, aux',
              "second": 'gewesen'
            }, {
              "tag": ' [VMFIN]',
              "first": 'finites Verb, modal',
              "second": 'dürfen'
            }, {
              "tag": ' [VMINF]',
              "first": 'Infinitiv, modal',
              "second": 'wollen'
            }, {
              "tag": ' [VMPP]',
              "first": 'Partizip Perfekt, modal',
              "second": 'gekonnt,  [er hat gehen] können'
            }, {
              "tag": ' [XY]',
              "first": 'Nichtwort, Sonderzeichen enthaltend',
              "second": '3:7, H2O, D2XW3'
            }, {
              "tag": ' [$,]',
              "first": 'Komma',
              "second": ','
            }, {
              "tag": ' [$.]',
              "first": 'Satzbeendende Interpunktion',
              "second": '.?!;:'
            }, {
              "tag": ' [$(]',
              "first": 'sonstige Satzzeichen; satzintern',
              "second": '- [,]()'
            }]
          }, {
            "title": 'Suche mit Partikelverben',
            "requests": [{
              "title": 'zusammenhängen',
              "tooltip": 'findet auch: hängt ... zusammen'
            }, {
              "title": 'einfallen',
              "tooltip": 'findet auch: fällt ... ein'
            }, {
              "title": 'herausfallen',
              "tooltip": 'findet auch: fällt ... heraus'
            }, {
              "title": 'hervorgehen',
              "tooltip": 'findet auch: geht ... hervor'
            }, {
              "title": 'mitteilen',
              "tooltip": 'findet auch: teilt ... mit'
            }],
            "intro": [{
              "show": 'Details'
            }, {
              "tagtitle": 'Tag/ Verb - ',
              "firsttitle": 'Beschreibung - ',
              "secondtitle": 'Verbbeispiel - ',
              "thirdtitle": 'Partikelverbkonstruktion'
            }],
            "details": [{
              "tag": '[PTKVZ]',
              "first": 'POS: abgetrennter Verbzusatz',
              "second": 'zusammen[hängen]',
              "third": '[hängt] ... zusammen'
            }, {
              "tag": '<VPART>',
              "first": 'lexikalische Wortkategorie: Verbpartikel',
              "second": 'zusammenhängen',
              "third": 'hängt ... zusammen'
            }, {
              "tag": 'zusammenhängen',
              "first": 'Verb direkt',
              "second": 'zusammenhängen',
              "third": 'hängt ... zusammen'
            }]
          }
          /*Ende Input*/
        ]
      }
      $scope.ocw = json;
    }]);
    /* For the complete bootstrapping process see:
     * https://docs.angularjs.org/guide/bootstrap */
    angular.element($('.help')).ready(function() {
      angular.bootstrap($('.help'), ['help']);
    });
  });
}

/**
 * Shows help page via html *injection*
 * Notice: There's one GET request for getting the whole help file html
 * Multiple requests are avoided: When help page is called multiple times,
 * the search method will hide the help page div. In order to show the help
 * page again, we use show() method for the help page div.
 */
function show_help_page() {
  inject_help_html();
}
