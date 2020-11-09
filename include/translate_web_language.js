/**
 * @file Change language settings
 * @author Yichen Liu
 * @datum 26.02.2019
 *
 */


/**
 * List of Dictionaries for searching the translation for the selected language
 */


var langDict_en = [['#regel_find','Rule-based Search'],['#sem_datareload','Semantics Search'],['#navbarDropdown','Cryptogragh'],['#datareload','Translator'],
    ['#bigram','Bigrams'],
    ['#transcription','Transcriptions'],['#navbarDropdown2'], ['#search_button','Search'], ['#example','Examples']];

var langDict_de = [['#regel_find','Regelbasiertes Finden'],['#sem_datareload','Semantisches Finden'],['#navbarDropdown','Geheimschrift'],['#datareload','Übersetzer'],
    ['#bigram','Bigramme'],['#transcription','Transkriptionen'],['#navbarDropdown2'],['#search_button','Suchen'],['#example','Beispiele']];


var labelTag_id_list_en = [['#color','Colors'],['#color_between','Intermediate Color'],['#groundcolor','Basic Color'],
    ['#relation','Relation'],['#glanz','Gloss'],
    ['#transparent','Transparence'],['#colorness','Colorness'],['#componists','Componists'],['#instruments','Instruments'],
    ['#genus','Genres'],['#intervals','Intervals'],['#composition','Relation to Composition'],
    ['#musical_concepts','Other Musical Concepts'],['#numeral','Numeral'],['#proper_name','Proper name'],
    ['#temporals','Temporal'],['#status','Status'],['#attribute','Attribute'],['#events','Events'],
    ['#evaluation','Evaluation'],['#comparitive','Comparitive'],['#styling','Styling'],
    ['#humen','Humen'],['#animals','Animals'],['#plants','Plants'],['#objects','Objects'],
    ['#diversa','Diversa'],['#punctuation','Punctuation'],
    ['#any_word','Other Words'],['#adjective','Adjective'],['#nouns','Noun'],['#nounn','Noun'],
    ['#vv','Verb'],['#addj','Adjective'],['#adj','Adjective'],['#v','Verb'],['#verb','Verb'],
    ['#verb2','Verb'],
    ['#sinoption','No Option'],['#keine_a','No Option'],['#belibig','Optional Word'],
    ['#belibiges_w','Optional Words'],['#any_word','Optional Words'],['#anyword','Optional Words'],
    ['#nomen','Noun'],['#nommen','Noun'],['#punct_before_after','Punctuation before and after'],
    ['#option_no','No Option'],['#adjektiv','Adjective']];


var labelTag_id_list_de = [['#color','Farben'],['#color_between','Zwischenfarbe'],['#groundcolor','Grundfarbe'],
    ['#relation','Relation'],['#glanz','Glanz'],
    ['#transparent','Transparenz'],['#colorness','Farbigkeit'],['#componists','Komponisten'],['#instruments','Instrumente'],
    ['#genus','Gattungen'],['#intervals','Intervalle'],['#composition','Bezug zu Komposition'],
    ['#musical_concepts','Other Musical Concepts'],['#numeral','Numeral'],['#proper_name','Proper name'],
    ['#temporals','Temporalia'],['#status','Zustände'],['#attribute','Eigenschaft'],['#events','Ereignisse'],
    ['#evaluation','Evaluation'],['#comparitive','Komparativ'],['#styling','Stilistika'],
    ['#humen','Menschen'],['#animals','Tiere'],['#plants','Pflanzen'],['#objects','Objekte'],
    ['#diversa','Diversa'],['#punctuation','Satzzeichen'],
    ['#any_word','Beliebiges Wort'],['#adjective','Adjektiv'],['#nouns','Nomen'],['#nounn','Nomen'],
    ['#vv','Verb'],['#addj','Adjektiv'],['#adj','Adjektiv'],['#v','Verb'],['#verb','Verb'],
    ['#verb2','Verb'],
    ['#sinoption','Keine Auswahl'],['#keine_a','Keine Auswahl'],['#belibig','Beliebiges Wort'],
    ['#belibiges_w','Beliebiges Wort'],['#any_word','Beliebiges Wort'],['#anyword','Beliebiges Wort'],
    ['#nomen','Nomen'],['#nommen','Nomen'],['#punct_before_after','Satzzeichen davor und danach'],
    ['#option_no','Keine Auswahl'],['#adjektiv','Adjektiv']];



/**
 * Set the selected homepage website language
 */

function changeLang() {

    if (sessionStorage.getItem(c_lang_name) ===  "English") {

        $('input:text').attr('placeholder','Search...');
        $('#example span').eq(1).html("Examples");
        $('#changelog span').eq(1).html("Changelog");
        $('#info span').eq(1).html("Info");
        $('#tutorial span').eq(1).html("Video-Tutorial");
        //$('#set span').eq(1).html('Settings');

        for (var z=0; z < langDict_en.length; z++){
            $(langDict_en[z][0]).html(langDict_en[z][1]);

        }


    }

    else if(sessionStorage.getItem(c_lang_name) === "Deutsch"){

        $('input:text').attr('placeholder','Suche...');
        $('#example span').eq(1).html("Beispiele");
        $('#changelog span').eq(1).html("Changelog");
        $('#info span').eq(1).html("Info");
        $('#tutorial span').eq(1).html("Video-Tutorial");
        //$('#set span').eq(1).html('Einstellungen');

        for (var m=0; m < langDict_de.length; m++){
            $(langDict_de[m][0]).html(langDict_de[m][1]);

        }
    }

}

/**
 * set the selected semantics search website language
 */
function changeLang_semantics() {

    if (sessionStorage.getItem(c_lang_name) === "English") {

        //replace text for titles
        $("div#sem_musik").html("Semantic Classes for Music Concepts");
        $("div#sem_farben").html("Semantic Classes for Adjective and Noun - Colors");
        $("div#sem_adj").html("Semantic Classes for Adjective and Noun");
        $("div#sem_nuradj").html("Semantic Classes Only for Adjective");
        $("div#sem_noun").html("Semantic Classes Only for Noun");
        $("div#sem_kontextoption").html("Context Options");
        $("div#kontext_davor").html("Context Before");
        $("div#kontext_danach").html("Context After");
        $("th#word").html("Word");
        $("th#frequency").html("Frequency");
        $("div#freq").html("Frequency Lists");

        //replace text in the a tags with hyperlinks
        $("a#kontext_stop").html("&lt;Context stopword&gt;");
        $("a#komposita_kontext").html("&lt;Context&gt;");
        $("a#interval").html("&lt;Intervals&gt;");
        $("a#bezug_komposita").html("&lt;Relation to Composition&gt;");
        $("a#kompo_adj").html("&lt;Componists&gt;");
        $("a#kontext").html("&lt;Context&gt;");
        $("a#instrument").html("&lt;Instruments&gt;");
        $("a#kontext_instrument").html("&lt;Context&gt;");
        $("a#kontext_stopword").html("&lt;Context with Stopwords&gt;");
        $("a#gattungen").html("&lt;Genres&gt;");
        $("a#kontext_gattungen").html("&lt;Context&gt;");
        $("a#kontext_stop").html("&lt;Context with Stopwords&gt;");
        $("a#interval_kontext").html("&lt;Context&gt;");
        $("a#interval_stop").html("&lt;Context with Stopwords&gt;");
        $("a#kontext_stop_komposita").html("&lt;Context with Stopwords&gt;");
        $("a#sonstiges").html("&lt;Other Concepts&gt;");
        $("a#sonst_kontext").html("&lt;Context&gt;");
        $("a#sonst_kon_stop").html("&lt;Context with Stopwords&gt;");


        //replace text for label tags
        for (var x=0; x < labelTag_id_list_en.length; x++){
            $(labelTag_id_list_en[x][0]).contents().last().replaceWith(labelTag_id_list_en[x][1]);

        }

        //replace example texts
        for(var i=0; i < 30; i++) {
            var example_id= "#example"+i;
            $(example_id+" "+"span").html("Examples for");

        }


    } else if(sessionStorage.getItem(c_lang_name) === "Deutsch") {
        $("div#sem_musik").html("Semantische Klassen für Musikbegriffe");
        $("div#sem_farben").html("Semantische Klassen für Adjektive und Nomen - Farben");
        $("div#sem_adj").html("Semantische Klassen für Adjektive und Nomen");
        $("div#sem_nuradj").html("Semantische Klassen nur für Adjektive");
        $("div#sem_noun").html("Semantische Klassen nur für Nomen");
        $("div#sem_kontextoption").html("Kontextoptionen");
        $("div#kontext_davor").html("Kontext davor");
        $("div#kontext_danach").html("Kontext danach");
        $("th#word").html("Wort");
        $("th#frequency").html("Frequenz");
        $("div#freq").html("Frequenzliste");

        $("a#kontext_stop").html("&lt;Kontext mit Stopwörtern&gt;");
        $("a#komposita_kontext").html("&lt;Kontext&gt;");
        $("a#interval").html("&lt;Intervalle&gt;");
        $("a#bezug_komposita").html("&lt;Bezug zu Komposition&gt;");
        $("a#kompo_adj").html("&lt;Komponisten&gt;");
        $("a#kontext").html("&lt;Kontext&gt;");
        $("a#instrument").html("&lt;Instrumente&gt;");
        $("a#kontext_instrument").html("&lt;Kontext&gt;");
        $("a#kontext_stopword").html("&lt;Kontext mit Stopwörtern&gt;");
        $("a#gattungen").html("&lt;Gattungen&gt;");
        $("a#kontext_gattungen").html("&lt;Kontext&gt;");
        $("a#kontext_stop").html("&lt;Kontext mit Stopwörtern&gt;");
        $("a#interval_kontext").html("&lt;Kontext&gt;");
        $("a#interval_stop").html("&lt;Kontext mit Stopwörtern&gt;");
        $("a#kontext_stop_komposita").html("&lt;Kontext mit Stopwörtern&gt;");
        $("a#sonstiges").html("&lt;Sonstiges&gt;");
        $("a#sonst_kontext").html("&lt;Kontext&gt;");
        $("a#sonst_kon_stop").html("&lt;Kontext mit Stopwörtern&gt;");


        for (var y=0; y < labelTag_id_list_de.length; y++){
            $(labelTag_id_list_de[y][0]).contents().last().replaceWith(labelTag_id_list_de[y][1]);

        }

        for(var j=0; j < 30; j++) {
            var example_id_de = "#example"+j;
            $(example_id_de+" "+"span").html("Beispiele für");

        }


    }

}

/**
 * set the selected language in the website translator
 */
function changeLang_translator() {

    if (sessionStorage.getItem(c_lang_name) ===  "English") {
        $("#example_btn").html("Example");
        $("#clear_btn").html("Delete");
        $("#crypto_translate").html("Cryptograpghtranslator");
        $("#cryptograph").html("Cryptograph");
        $("#translate_text").html("Translation");
        $("textarea#input_t").attr('placeholder','Please type the text here...');


    }

    else if(sessionStorage.getItem(c_lang_name) === "Deutsch"){
        $("#example_btn").html("Beispiel");
        $("#clear_btn").html("Löschen");
        $("#crypto_translate").html("Geheimschriftübersetzer");
        $("#cryptograph").html("Geheimschrift");
        $("#translate_text").html("Übersetzung");
        $("textarea#input_t").attr('placeholder','Geben Sie bitte hier den Text ein...');

    }



}

/**
 * set the selected language in the website "Examples" for Helppage
 */

function changeLang_example() {

    if (sessionStorage.getItem(c_lang_name) ===  "English") {
        $("a#lexikal_suche").html("Lexical Search");
        $("a#exakte_suche").html("Exact Search");
        $("a#satz").html("Sentence Categories");
        $("a#lexikal_wort").html("Lexical Word Categories");
        $("a#lexikal").html("Lexical Categories fined with Morphology");
        $("a#semantisch_kategorien").html("Semantics Categories");
        $("a#syntaktische_wort").html("Syntactic Word Categories (extracted with TreeTagger from Dr. H. Schmid, CIS)");
        $("a#suche_mit_partikel").html("Search with Particle Verbs");
        $("a#advanced_search_and_regex").html("Advanced Search with AND and OR Operators together with regular Expression");
        $("div#freq_list").html("Frequency Lists");
        $("th#B_word").html("Word");
        $("th#B_freq").html("Frequency");
    }

    else if(sessionStorage.getItem(c_lang_name) === "Deutsch"){
        $("a#lexikal_suche").html("Lexikalische Suche");
        $("a#exakte_suche").html("Exakte Suche");
        $("a#satz").html("Satzkategorien");
        $("a#lexikal_wort").html("Lexikalische Wortkategorien");
        $("a#lexikal").html("Lexikalische Wortkategorien um Morphologie verfeinert");
        $("a#semantisch_kategorien").html("Semantische Kategorien");
        $("a#syntaktische_wort").html("Syntaktische Wortkategorien (extrahiert mit TreeTagger von Dr. H. Schmid, CIS)");
        $("a#suche_mit_partikel").html("Suche mit Partikelverben");
        $("a#advanced_search_and_regex").html("Fortgeschrittene Suche mit UND und ODER Operatoren kombiniert mit regulärem Ausdruck");
        $("div#freq_list").html("Frequenzliste");
        $("th#B_word").html("Wort");
        $("th#B_freq").html("Frequenz");
    }
}


function changeLangImmediately(lang) {
    if (lang ===  "English") {
        $('input:text').attr('placeholder','Search...');
        $('#changelog span').eq(1).html("Changelog");
        $('#info span').eq(1).html("Info");
        $('#tutorial span').eq(1).html("Video-Tutorial");
        $('#set span').eq(1).html('Settings');

        for (var z=0; z < langDict_en.length; z++){
            $(langDict_en[z][0]).html(langDict_en[z][1]);
        }
    }

    else if(lang === "Deutsch"){
        $('input:text').attr('placeholder','Suche...');
        $('#changelog span').eq(1).html("Changelog");
        $('#info span').eq(1).html("Info");
        $('#tutorial span').eq(1).html("Video-Tutorial");
        $('#set span').eq(1).html('Einstellungen');

        for (var m=0; m < langDict_de.length; m++){
            $(langDict_de[m][0]).html(langDict_de[m][1]);
        }
    }
    changeLang_semantics();
    changeLang_translator();
    changeLang_example();
}
/**
 * Show the website in selected language when the webpage reloaded
 */
$(document).ready(function(){
    changeLang();
    
    if (sessionStorage.getItem(c_lang_name) ===  "English") {
        $('#DE').show();
    }else{
        $('#EN').show();
    }

    $('#DE').on('click', function(){
    save_setting(c_lang_name, "Deutsch");
    changeLangImmediately("Deutsch");
    $('#DE').hide();
    $('#EN').show();
  });
    $('#EN').on('click', function(){
    save_setting(c_lang_name, "English");
    changeLangImmediately("English");
    $('#EN').hide();
    $('#DE').show();
  });
});
