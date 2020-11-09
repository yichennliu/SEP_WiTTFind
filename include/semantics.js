/**
 * @file Coordination of semantics dialog
 * @author Angelay Krey, Stefan Schweter <stefan@schweter.it> (rewritten), Michael Woess
 */

/**
 * Inital value of search pattern: All new search criteria will be appended
 */
var search_pattern = "( ([ADJA] | [ADJD] )| [NN]) ";

/**
 * Special cases for appending, prepending
 */
var special_cases;

/**
 * id of the last created word cloud
 */
var last_word_cloud = '';

/**
 * Shows the semantics page
 */
function show_semantics_page(){
  $(".semantics").load("../semantics.html", function(){
    changeLang_semantics();
    special_cases = [" <PUNCT> "," <MOT> "," ([ADJA] | [ADJD] ) "," [NN] "," [VV] "];
  });
}

/**
 * Whenever a checkbox, radiobutton was clicked: display its value on search
 */
function show_value(){
  var new_search_pattern = search_pattern;
  $('.semantics input:checked').each(function() {
    /* Need to check, if it's -1, because it return a number not a bool!
     * @see http://api.jquery.com/jQuery.inArray/
     */
    if ($.inArray($(this).val(), special_cases) === -1 ) {
      new_search_pattern += " & " + $(this).val();
    }

    // Monkey-patch for semantic search for music:
    // Check, if radio button id is between 33 and 38
    id_string = $(this).attr('id');

    if (_.startsWith(id_string, "chk")) {
      id_ = _.toInteger(_.replace(id_string, 'chk', '' ));

      if (id_ >= 33 && id_ <= 36) {
        new_search_pattern = $(this).val();
      } else if (id_ >= 37 && id_ <= 38) {
        // Do not show value for "Bezug zu Komposition" and "Sonstige Begriffe"
        new_search_pattern = "";
      }
    }
  });

  /* Here we need to go through some special cases
   * I guess that could easily done by mapping (dictionary) and using a
   * function, but this magic can be done later...
   */
  if ($("#chk17").is(':checked')){
    new_search_pattern = "<PUNCT> " + new_search_pattern + " <PUNCT>";
  }

  if ($("#chk18").is(':checked')){
    new_search_pattern = "<MOT> " + new_search_pattern;
  }

  if ($("#chk19").is(':checked')){
    new_search_pattern = new_search_pattern + " <MOT>";
  }

  if ($("#chk20").is(':checked')){
    new_search_pattern = " ([ADJA] | [ADJD] ) " + new_search_pattern;
  }

  if ($("#chk21").is(':checked')){
    new_search_pattern = new_search_pattern + " ([ADJA] | [ADJD] ) ";
  }

  if ($("#chk22").is(':checked')){
    new_search_pattern = "[NN] " + new_search_pattern;
  }

  if ($("#chk23").is(':checked')){
    new_search_pattern = new_search_pattern + " [NN]";
  }

  if ($("#chk24").is(':checked')){
    new_search_pattern = "[VV] " + new_search_pattern;
  }

  if ($("#chk25").is(':checked')){
    new_search_pattern = new_search_pattern + " [VV]";
  }

  $(".form-control").val(new_search_pattern);
}

/**
 * shows the word cloud
 */
function show_word_cloud(file, id) {
  var filepath = '../data/' + file + '.json';
  var list = getJSON(filepath);
  var datums = [];

  for(i = 0; i < list.length; ++i){
    datums.push({
          'isLemma': true,
          'value': list[i][0],
          'frequency': list[i][1]
        });
  }

  create_word_cloud(datums, id);
  if(last_word_cloud != '' && last_word_cloud != id) {
    hide_word_cloud(last_word_cloud);
  }
  last_word_cloud = id;
  shrink_cols();

  /* adds filepath to href of the downloadbutton */
  $('#download_json_button').attr({
    "href": filepath,
    'target': '_blank'
  });

  delete_table_contents();
  create_table(list);
}

/**
 * reads a json file asynchronically and returns its contents
 */
function getJSON(url){
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': url,
    'dataType': "json",
    'success': function(data){
      json = data;
    }
  });
  return json;
}

/**
 * creates the table which contains the frequencylist
 */
function create_table(list){
  $.each(list, function(){
    $('#freqlist_tbody').append("<tr><td>" + this[0] + "</td><td>" + this[1] + "</td></tr>");
  });
}

/**
 * deletes the contents of the frequency list table
 */
function delete_table_contents(){
  $('#freqlist_tbody')[0].innerHTML = "";
}

/**
 * hides the word cloud
 */
function hide_word_cloud(id){
  var closebtn_id = id + "-closebtn";

  $(id).hide();
  $(closebtn_id).hide();
  expand_cols();
}

/**
 * shrinks column divs '#col-right-main', shows the frequencylist div and activates the alternative
 * '#col-right-secondary' div, which is shown below '#col-left' if '#col-right-main' is too big to be displayed on the * right
 */
function shrink_cols(){
  $('#col-right-main').addClass('col-md-3 d-none d-lg-block').removeClass('col-md-6');
  $('#col-right-secondary').removeClass('d-none').addClass('d-lg-none');
  $('#freqlist').removeClass('d-none').addClass('d-xs-none');
}

/**
 * undoes changes done by shrink_cols()
 */
function expand_cols(){
  $('#col-right-main').addClass('col-md-6').removeClass('col-md-3 d-none d-lg-block');
  $('#col-right-secondary').removeClass('d-lg-none').addClass('d-none');
  $('#freqlist').removeClass('d-xs-none').addClass('d-none');
}

/**
 * adds the clicked word in the word cloud to the search bar
 */
function add_word_onclick(word, div_id){
  var value = $(div_id).parent().find('input').val(word);
  show_value();
}
