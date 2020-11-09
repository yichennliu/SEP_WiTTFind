/**
 * @file Coordination of translator page
 * @author Angela Krey, Stefan Schweter <stefan@schweter.it>, Yuliya Kalasouskaya
 */

/**
 * Displays translator page via html *injection* -
 * GET request from translator.html file is displayed in a special translator div.
 */
function show_translator_page()
{
  $(".translator").load("../translator.html", function() {
    changeLang_translator();

    $('#translate_me').on('click', function(event) {
      $('#output_t').val(translate_code($('#input_t').val()));
    });

    $('#example_btn').on('click', function(event){
       $('#input_t').val("Hm dvnrt Lsrpmhmlsrv rxs tvpvhvn szyv: rxs szyv tvdrhh nrxsg af dvnrt tvpvhvn, vsvi af ervp. Wzh hvsv rxs, dvnn rxs rn vrnvo lsrpmhmlsrhxsvn Yfxs pvhv: vh eviyvhhvig ovrnv Tvwznqvn nrxsg, vh evihxspvxsgvig hrv. ");
    });

    $('#clear_btn').on('click', function(event) {
      $('#output_t').val(" ");
      $('#input_t').val(" ");
    });
  });
}

/**
 * Translate into secret code and vice versa
 */
function translate_code($old)
{
  var normal = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
  var reverse = new Array("z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "i", "h", "g", "f", "e", "d", "c", "b", "a");
  $new = "";
  $($old.split('')).each(function(index, character) {
    for (var i = 0; i < normal.length; i++) {
      if (normal[i] == character) {
        $new += reverse[i];
      }
      if (normal[i].toUpperCase() == character) {
        $new += reverse[i].toUpperCase();
      }
      if ("¯" == character) {
        $new += "e";
        break;
      }
      if (character.charCodeAt() < 65) {
        $new += character;
        break;
      }
      if ("j" == character) {
        $new += character;
        break;
      }
      if ("Ä" == character) {
        $new += "Z¯";
        break;
      }
      if ("Ö" == character) {
        $new += "M¯";
        break;
      }
      if ("Ü" == character) {
        $new += "F¯";
        break;
      }
      if ("ä" == character) {
        $new += "z¯";
        break;
      }
      if ("ö" == character) {
        $new += "m¯";
        break;
      }
      if ("ü" == character) {
        $new += "f¯";
        break;
      }
    }
  });
  return $new;
}
