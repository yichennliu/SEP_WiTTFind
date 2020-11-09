/**
 * @file Coordination of wittfind search is done in this class
 * @author Stefan Schweter <stefan@schweter.it>
 */

/**
 * Fetches a sentence (based on a sentence number) from anchored xml server
 *
 * @param document The document to be searched in
 * @param sentencenr The sentence number to be retrieved
 * @param matches Array of anchored xml compatible information for all matches
 *                e.g
 *                [
 *                  [ "start": [198,27,1],
 *                    "end": [198,27,1],
 *                    "name": Ms-115,39[3]_1
 *                  ]
 *                ]
 * @return string The found sentence
 */

var actual_search_pattern= {};

function get_sentence_from_axs(document, sentencenr, matches, last_line_number_displayed = -1) {
  return new Promise(function(resolve, reject) {
    var axs_host = c_axs["host"];
    var axs_port = c_axs["port"];
    var highlighting_arr = [];

    _.forEach(matches, function(match) {
      var current_entry = { "start": match["start"], "end": match["end"] };
      highlighting_arr.push(current_entry);
    });

    $.post("http://" + axs_host + ":" + axs_port + "/api/v1",
             JSON.stringify({"sentencenr": _.toInteger(sentencenr),
                             "display_tags": 0,
                             "document": document,
                             //"display_line_breaks": 1,
                             "display_raw_output": 1,
                             "highlighting": highlighting_arr}),
    function(sentences_json) {
      var last_line = -1;

      var last_alternative_number = 0;

      var alternatives = { };

      alternatives[0] = [];

      _.forEach(sentences_json["results"], function(token) {

        if (last_alternative_number != token["alternativenr"]) {
          alternatives[token["alternativenr"]] = [];
          last_alternative_number = token["alternativenr"];
        }

        if (last_line != -1 && last_line != token["linenr"]) {
          last_line = token["linenr"];
          alternatives[last_alternative_number].push('<br>');
        }

        if (last_line == -1) {
          last_line = token["linenr"];
        }

        var modified_token = _.replace(_.unescape(token["word"]), '<lb rend="shyphen"/>', '-<br>');

        var current_token = striptags(modified_token, '<br>');

        if (token["start_highlighting"] == 1) {
          current_token = '<b>' + current_token;
        }

        if (token["end_highlighting"] == 1) {
          current_token = current_token + '</b>';
        }

        if (token["trailing_space"]) {
          current_token = current_token + " ";
        }

        if (alternatives[last_alternative_number].length > 0 && _.startsWith(token["tag"], "$")) {
          alternatives[last_alternative_number][alternatives[last_alternative_number].length - 1] = alternatives[last_alternative_number][alternatives[last_alternative_number].length - 1] + current_token;

        } else {
          alternatives[last_alternative_number].push(current_token);
        }
      });

      if (_.size(alternatives) > 1) {
        var timestamp = new Date().getTime();
        var original_text = _.join(alternatives[1], "");
        var min_alternative_key = _.min(alternatives, function(alt) { return alt; });

        d_output = '<hr>';

        d_output += '<div class="row">';
        d_output += '<div class="btn-group btn-toggle pull-right" style="visibility:hidden;">';
        d_output += '<button onclick="on_toggle(this)" class="btn btn-xs btn-secondary" id="expand-' + timestamp +'"><span class="fa fa-compress"></span></button>';
        d_output += '<button onclick="on_toggle(this)" class="btn btn-xs btn-primary active"><span class="fa fa-expand"></span></button>';
        d_output += '</div></div>';

        d_output += '<div class="container-fluid" id="hit' + timestamp + '">';
        d_output += '<ul class="nav nav-tabs">';

        btnID = 'expand-' + timestamp;
        d_rightclick = 'onclick="return show_alternatives(this);"';

        d_output += '<li role="presentation" class="active nav-item"><a class="nav-link" style="border-color:#CDCDCD; color:black;" aria-controls="home" role="tab" data-toggle="tab"';
        d_output += 'href="#text' + timestamp + '"">Ausgangstext</a></li>';
        d_tabs = '';

        _.forEach(_.range(2, _.size(alternatives)), function(item, index) {
          var current_alternative_text = _.join(alternatives[item], "");

          var original_text_no_tags = striptags(original_text);
          current_alternative_text = striptags(current_alternative_text);

          var diff = JsDiff.diffWords(original_text_no_tags,
                                      current_alternative_text);
          d_differenz = "";
          d_noHighlighting = '<p style="display:none;">';

          diff.forEach(function(part) {
            if (part.added) {
              d_differenz += '<mark> <p style="display:inline;"><b> ' + part.value + ' </b></p> </mark>';
            } else if (part.removed) {
              d_differenz += '<mark> <p style="display:inline;"> <del>' + part.value + '</del> </p> </mark>';
            } else {
              d_differenz += '<p style="display:inline;">' + part.value + '</p>';
            }
          });

          d_noHighlighting += '<b><u>Alternative ' + (item - 1) + '</u></b><br><br>';
          d_noHighlighting += current_alternative_text;
          d_noHighlighting += '</p>';

          d_tabs += '<div role="tabpanel" class="tab-pane" id="diff-' + (item-1) + timestamp + '">';
          d_tabs += d_noHighlighting;
          d_tabs += d_differenz;
          d_tabs += '</div>';

          d_output += '<li role="presentation" class="nav-item"><a class="nav-link" style="border-color: #CDCDCD; color:black;" value="' + timestamp +'" aria-controls="profile" role="tab" data-toggle="tab"';
          d_output += d_rightclick;
          d_output +='href="#diff-' + (item-1) + timestamp + '"">' + (item-1) + '</a></li>';
        });

        d_output += '</ul>';

        d_output += '<div class="tab-content">';

        d_output += '<div role="tabpanel" id="text' + timestamp + '"" class="tab-pane active">';
        d_output += original_text;
        d_output += '</div>';

        d_output += d_tabs;
        d_output += '</div>';
        d_output += '<hr>';

        if (last_line_number_displayed != -1 && last_line_number_displayed != last_line) {
          d_output = '<br>' + d_output;
        }
        resolve(d_output);
      } else {
        resolve(_.join(alternatives[0], ""));
      }
    }, "json")
      .fail(function() {
        reject("Could not retrieve information from anchored xml server!");
      });
  });
}

/**
 * Builds the quadroreader facsimile link (with sentence highlighting)
 *
 * @param data_id The data id for the quadroreader
 * @param siglum Defines the siglum
 * @param document The document name
 * @param sentencenr The number for the sentence which should be highlighted
 * @return string The formatted quadroreader facsimile link
 */
function get_quadroreader_facsimile_extract(siglum, document, sentencenr) {
  return new Promise(function(resolve, reject) {
    var qr_host = c_quadroreader["host"];
    var qr_port = c_quadroreader["port"];

    var siglumParts = siglum.substring(siglum.indexOf(",") + 1, siglum.indexOf("_")).split("et");
    var d_output = '';

    siglumParts.forEach(function(siglumPart){
      d_output += '<a class="facsimile-extract" siglum="' + document + ',' + siglumPart + '" target="_blank">';
      d_output += '<div class="img-magnifier-glass" style="visibility: hidden; border:3px solid #000;"></div>';
      d_output += '<img class="facsimile-img"' + ' id=' + siglum + ' alt="Faksimile ' + document + ',' + siglumPart + '"';
      d_output += ' data-src="http://' + qr_host + ":" + qr_port + '/facsimile/extract/';
      d_output += document + ',' + siglumPart;
      d_output += '?sentenceNumber=' + sentencenr;
      d_output += '" />';
      d_output += '</a>';
    });

    resolve(d_output);
  });
}

/**
 * Builds the quadroreader link to the facsimile and the Wittgenstein Source
 * link
 *
 * @param siglum Defines the siglum
 * @return string The formatted quadroreader and Wittgenstein Source link
 */
function get_quadroreader_wittgenstein_source_links(siglum) {
  var d_output = '';

  d_output += '<a class="btn btn-link facsimile-reader-link" target="_blank" ';
  d_output += 'siglum="' + siglum + '" target="_blank">';
  d_output += '<i class="fa fa-image" title="Faksimile-Reader"></i></a>'; //TODO other reader Icon

  d_output += '<a class="btn btn-link" target="_blank" href="http://www.wittgensteinsource.org/';
  d_output += siglum.split(/\[/)[0] + '_f"><i class="fa fa-book" title="Wittgenstein Source"></i></a>';

  return d_output;
}

/**
 * Asynchronously create accordion entries.
 * This routine performs search calls to the anchored_xml_server to retrieve:
 * 1. the whole paragraph as text
 * 2. get text results for every hit + performs a highlighting in the paragraph.
 *    This step is also done asynchronously, so it won't block any other hit
 *    retrievals.
 *
 * @param index The accordion index for the hit
 * @param document Specifies the document for retrieval, like: "Ts-213"
 * @param sentencenr Defines the sentence number for the hit
 * @param matches Array of anchored xml compatible information for all matches
 *                e.g
 *                [
 *                  [ "start": [198,27,1],
 *                    "end": [198,27,1],
 *                    "name": Ms-115,39[3]_1
 *                  ]
 *                ]
 */

create_accordion_entry_at_index.imgStatusMap = new Object();

function create_accordion_entry_at_index(index, siglum, document, sentencenr, matches, show_facsimile, data_id, complete_hits_array) {
  var current_paragraph = "";
  var axs_host = c_axs["host"];
  var axs_port = c_axs["port"];

  var highlighting_arr = [];

  _.forEach(matches, function(match) {
    var current_entry = { "start": match["start"], "end": match["end"] };
    highlighting_arr.push(current_entry);
  });

  if (show_facsimile) {
    get_quadroreader_facsimile_extract(siglum, document, sentencenr).then(function(link) {
      d_output = '';
      d_output += link;
      $("#facsimile" + index).html(d_output);
      $("img").bind("mousemove", magnifyImg);
      $("img").bind("touchmove", magnifyImg);
      $(".img-magnifier-glass").bind("mousemove", calcMousePosition);
      $(".img-magnifier-glass").bind("touchmove", calcMousePosition);
      $(window).on("click", hideMagnifier);
      $(window).scroll(hideMagnifier);
	    $("img").on("mouseleave", hideMagnifier);
      $("img").unveil(0, function(){
        $(this).on('load',function(){
          var id = '"' + this.getAttribute("id") + '"';
          if(!(id in create_accordion_entry_at_index.imgStatusMap) && ($(this).height() != 25 )){
            create_accordion_entry_at_index.imgStatusMap[this.getAttribute("id")] = true;
          }
        });
      });

      get_facsimile_description(siglum, sentencenr).then(function(description_text) {
        $('img[id="' + siglum + '"]').attr('aria-label', description_text);
      });
    });
  }

  get_sentence_from_axs(document, sentencenr, matches).then(function(sentence) {
    $("#treffer" + index).html(sentence);
  });

  $('.prev-sentence-' + index).click(function(event) {
    event.preventDefault();
    var prev_sentencenr = _.toInteger($("#treffer" + index).attr('data-last-prev-sentencenr')) - 1;

    get_sentence_from_axs(document, prev_sentencenr, matches).then(function(prev_sentence) {
      $("#treffer" + index).prepend(prev_sentence + " ");
    });

    $("#treffer" + index).attr('data-last-prev-sentencenr', prev_sentencenr);
  });

  $('.next-sentence-' + index).click(function(event) {
    event.preventDefault();
    var next_sentencenr = _.toInteger($("#treffer" + index).attr('data-last-next-sentencenr')) + 1;

    get_sentence_from_axs(document, next_sentencenr, matches, next_sentencenr).then(function(next_sentence) {
      $("#treffer" + index).append(" " + next_sentence);
    });

    $("#treffer" + index).attr('data-last-next-sentencenr', next_sentencenr);
  });

  create_classification_results_for_remark_at_index(siglum.split(/_/)[0], index);
}

/**
 * Performs a search:
 * Sends a Dictionary-object via POST request to wfa server.
 * The Dictionary-objekt:
 * 		search_pattern['pattern'] defines the pattern to search for
 *      search_pattern['type'] can be used, to run wfa in RAW Mode
 *
 * if search_pattern['type'] == "raw":
 * 	  The result from the wfa server is exact the raw result
 *    which is returned from wf
 *    nothing more is done (=raw-Mode)
 * else
 * 	  The result from the wfa server is in an anchored xml compatible format.
 *    The second request is a POST request to the anchored xml server to retrieve
 *    the plain text results. Currently the whole sentence is shown, in which the
 *    search pattern was found. The result for the search pattern is highlighted.
 *
 * @param search_pattern Defines the search query
 */

function wittfind_search(search_pattern)
{
  start_loading_animation();
  var wfa_host = c_wfa["host"];
  var wfa_port = c_wfa["port"];

  actual_search_pattern = search_pattern;

  var pattern = search_pattern['pattern'];
  console.log("search.js, POST: pattern=",pattern);
  var max=200;
  if ("max" in search_pattern) {
	  max = search_pattern['max'];
	  console.log("search.js, POST: max=",max);
  };
  var wfa_query = JSON.stringify({ "query" : pattern, "max" : max })
  var type="";

/** Decide the type of hitsort and set appropriate Methods
 */
  console.log("sessionStorage set to ",sessionStorage.getItem(c_sort_method));
  if (sessionStorage.getItem(c_sort_method) == "rank-sort") {
	  search_pattern['type'] = "raw";
	  console.log("Session sort Method is set raw");
	  set_actual_sort_method();
	  search_pattern['debug'] = "1";
	  console.log("Session Debug Method is set ON");
	  set_actual_debug_method();
	  //var hit_sorting_container = document.getElementById('hit-sorting');
	  //hit_sorting_container.style.visibility = 'visible';

	  $(".hit-sort-select").attr("default",sessionStorage.getItem(c_sort_method));
	  console.log("hit_sort, Value is",$(".hit-sort-select").attr("default"));
	  $(".hit-debug-select").attr("default",sessionStorage.getItem(c_sort_debug));
	  console.log("hit_debug, Value is",$(".hit-debug-select").attr("default"));
  };

  if (("type" in search_pattern && search_pattern['type'] == "raw")) {
      type = search_pattern['type'];
      wfa_query = JSON.stringify({ "query" : pattern, "max" : max , "type" : "raw" })
      console.log("search.js, POST: type=", type);
	    console.log("wf_hits_display");
	  $.post("http://" + wfa_host + ":" + wfa_port,
         wfa_query,
         function() {}, "json").done(function(data,matches) {
        hide_motto();
        console.log("data", data)

        var hit_array = [];
        var unique_document_hit_counter = {};
        var last_hit_siglum = "";

        for (var i = 0; i < data.hits.length; i++){
          /* Build unique_document_hit_counter for OverlayNaviagtion */
          var current_document_name = _.split(_.split(data.hits[i].path, "_", 2)[1], "/", 2)[1];
          data.hits[i].document = current_document_name;
          if (current_document_name in unique_document_hit_counter){
              unique_document_hit_counter[current_document_name] += 1;
          } else {
            unique_document_hit_counter[current_document_name] = 1;
          }
          /* Delete Choices */
          var re_delete_choices = /(.*\_\d+).*/;
          current_hit_siglum = re_delete_choices.exec(data.hits[i].n)[1];
          if (last_hit_siglum == current_hit_siglum){
            data.hits.splice(i,1);
            i--;
          } else {
            hit_array.push(data.hits[i]);
          }
          last_hit_siglum = current_hit_siglum;
        }
        console.log(hit_array)
        sort_hits_by_score(hit_array);
        console.log("sorted", hit_array)

        enable_pagination_support(sessionStorage.getItem(c_items_per_page_name),
        hit_array, "raw");
        sessionStorage.setItem("totalNumberOfHits", hit_array.length);
        display_number_all_hits(unique_document_hit_counter);
        display_hit_distribution(unique_document_hit_counter);
        register_filter_out_documents_handler(hit_array, normal_search=false);
			  stop_loading_animation();
		 }).fail(function() {
			console.log("Raw mode an error occured!");
		 }).always(function(){
			$('#search_button').attr("disabled", false);
			stop_loading_animation();
		});
		console.log("Start Raw mode ");
		return;
		}
		else
		{
/** We have usual search method, via wfa and anchored Server
 */
	$.post("http://" + wfa_host + ":" + wfa_port,
         wfa_query,
         function() {}, "json")
         .done(function(data, matches) {

    var wfa_results = data;
    console.log("wfa-Results", wfa_results)
    var hit_array = [];
    var hit_siglum_array = [];

    /**
     * In order to display a per document hit distribution, we use this array:
     *
     * {
     *   "Ts-213": 5, -> 5 results in Ts-213
     *   "Ms-114": 3  -> 3 results in Ms-114
     * }
     */
    var unique_document_hit_counter = {};

    _.forEach(wfa_results, function(sentences, document) {
      console.log("document", document)
      console.log("sentences", sentences)

      var current_document_name = _.split(_.split(document, "_", 2)[1], "/", 2)[1];
      console.log("current_document_name", current_document_name)

      /** Prevent some NaN error here */
      unique_document_hit_counter[current_document_name] = 0;
      _.forEach(sentences, function(matches, sentence) {
        var current_hit = {};
        current_hit["document"] = current_document_name;
        current_hit["sentencenr"] = sentence;
        current_hit["matches"] = matches["matches"];

        /** Update or result statistic */
        unique_document_hit_counter[current_document_name] += 1;

        hit_array.push(current_hit);
        hit_siglum_array.push({ 'n': current_hit.matches[0].name });
      });
    });


    send_hits_to_quadroreader(hit_siglum_array);

    sorted_hit_array = [];

    _.forEach(c_available_documents, function(available_document) {
      filtered_documents = _.filter(hit_array, { document: available_document });
      _.forEach(filtered_documents, function(filtered_document) {
        sorted_hit_array.push(filtered_document);
      });
    });

    enable_pagination_support(sessionStorage.getItem(c_items_per_page_name),
                              sorted_hit_array);



    /**
     * Iteration of one over the wfa returned json is not necessary. This
     * method saves a lot of time, it is fast and also displays the exact
     * number of found remarks!
     */
    sessionStorage.setItem("totalNumberOfHits", sorted_hit_array.length);
    display_number_all_hits(unique_document_hit_counter);
    display_hit_distribution(unique_document_hit_counter);

    register_filter_out_documents_handler(sorted_hit_array);
  })
  .fail(function() {
    console.log("an error occured!");
  })
  .always(function(){
    $('#search_button').attr("disabled", false);
    stop_loading_animation();
  });
 }
}

/**
 * Calculates number of to be shown pages
 * Displays pagination component (footer)
 * Registers the click handler to add support for changing to a specific page
 *
 * @param items_per_page Defines the  number of to be displayed hits per page
 * @hit_array Defines an array for all hits, e.g.:
 *            [
 *              [
 *                "sentencenr": 500,
 *                "document": "Ms-114",
 *                "matches": [
 *                             [ "start": [186,3,6],
 *                               "end": [186,3,6],
 *                               "name": "Ms-114,12v[2]et13r[1]_8"
 *                             ]
 *                            ]
 *              ]
 *             ]
 */
function enable_pagination_support(items_per_page, hit_array, origin="search") {
  /**
  * Calculates how many pages must be displayed:
  * E.g. number of hits = 35
  *      items per page = 10
  * -> 4 pages must be displayed
  * We use Math.ceil for that calculation
  */
  var pages = Math.ceil(hit_array.length / parseInt(items_per_page));
  $('#pages').empty();
  /** Display pagination only, when there's more than one page */
  if (pages > 1) {
    /**
    * We use Bootstraps pagination class, for more details on that see:
    * http://getbootstrap.com/components/#pagination
    */
    var d_pagination = '<ul class="pagination justify-content-center">';

    // Button with reference to first page
    d_pagination += '<li class="page-item"><a class="page-link"' +
      'aria-label="First" href="#" id="page-link" onclick="firstPage();">' +
      '<i class="fa fa-angle-double-left" id="control_span"></i>' +
      '<span class="sr-only" id="control_span">First</span></a></li>';

    // Button with previous page reference
    d_pagination += '<li class="page-item"><a class="page-link"' +
      'aria-label="Previous" href="#" id="page-link" onclick = "prevPage();">' +
      '<i class="fa fa-angle-left" id="control_span"></i>' +
      '<span class="sr-only" id="control_span">Previous</span></a></li>';

      // Buttons for all availible pages
    for (var page = 1; page <= pages; page += 1) {
      d_pagination += '<li id="page' + page + '"><a class="page-link" id="' + page + '" href="#">'
      + page + '</a></li>';
    }

    // Button with reference to next page
    d_pagination += '<li class="page-item"><a class="page-link"' +
      ' aria-label="Next" href="#" id="page-link" onclick = "nextPage();">' +
      '<i class="fa fa-angle-right" id="control_span"></i>' +
      '<span class="sr-only" id="control_span">Next</span></a></li>';


    // Button with reference to last page
    d_pagination += '<li class="page-item"><a class="page-link"' +
      ' aria-label="Last" href="#" id="page-link" onclick="lastPage();">' +
      '<i class="fa fa-angle-double-right" id="control_span"></i>' +
      '<span class="sr-only" id="control_span">Last</span></a></li>';
    d_pagination += '</ul>';

    // Go-to-Page input box and button
    d_pagination += '<ul class="pagination pagination-ul-combine">';
    d_pagination += '<input id="go-to-page" class="form-control nav-go-to-page-text"' +
      ' onclick="navigation_hit_enter()" pattern="[0-9]*"></input>';
    d_pagination += '<button id="go-to-button" class="btn btn-secondary"' +
      ' onclick="go_to_page()">Skip to package</button>';
    d_pagination += '</ul>';

    $('#pages').html(d_pagination);

    /** Set first page as active */
    $('#page1').attr("class", "nav-active");
    if (origin == "search"){
      register_pagination_support_handler(items_per_page, hit_array, pages);
    } else{
      register_pagination_support_handler(items_per_page, hit_array, pages, "raw");
    }
  }

  /** Displays page one - if there're any results */
  if (hit_array.length > 0) {
    if (origin == "search"){
      display_page_from_hit_array(1, items_per_page, hit_array);
      pagination_rearrange(1, pages)
    }else{
      display_results_raw(1, items_per_page, hit_array);
      pagination_rearrange(1, pages)
    }
  }
}

/** Adds the button functionality to an Enter-hit in the go-to-page input box*/
function navigation_hit_enter(){
  document.getElementById("go-to-page")
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("go-to-button").click();
      }
  });
}

 // Reference functions to the specific pages according to their function (first, previous, next or last page)
 function firstPage(){
   go_to_page(page = 1);
 }

 function prevPage(){
   go_to_page(page = "prev")
 }

 function nextPage(){
   go_to_page(page = "next")
 }

 function lastPage(){
   go_to_page(page = "last")
 }

 /**
  * Function that interprets an input box, page or button value to return the
  * correct new active page

  * @param page Input value of the function (number, "prev, "next" or "last")
  *  that gets updated during this function.
  * @param active_page Returns the number of the current active page
  * @param pages Defines the total number of pages
  */

 function go_to_page(page = Number(document.getElementById("go-to-page").value)) {
   var pages = Number(document.getElementById("pages").firstChild.children.length) - 4;
   var active_page = Number(document.getElementsByClassName('nav-active')[0].firstChild.id);
   switch (page) {
     case "prev":
       if(active_page > 1){
         page = active_page - 1;
       }
       break;
     case "next":
       if(active_page < pages){
         page = active_page + 1;
       }
       break;
     case "last":
       page = pages;
       break;
     default:
       page = page;
   }

   if (page > 0 && page <= pages) {
     $("#page" + page).attr("class", "nav-active");
     var page_click_array = document.getElementsByClassName("pagination")[0];
     var pageLink = page_click_array.children[page + 1].firstChild;
     pageLink.click();
   }
 }

 /**
  * Registers the click handler for pagination
  * When a new page was selected, set all other pages as non-active and
  * highlight the active page
  *
  * @param items_per_page Defines the  number of to be displayed hits per page
  * @hit_array Defines an array for all hits, e.g.:
  *            [
  *              [
  *                "sentencenr": 500,
  *                "document": "Ms-114",
  *                "matches": [
  *                             [ "start": [186,3,6],
  *                               "end": [186,3,6],
  *                               "name": "Ms-114,16r[2]et16v[1]_11"
  *                             ]
  *                            ]
  *              ]
  *            ]
  * @param pages Defines the number of pages
  */
 function register_pagination_support_handler(items_per_page, hit_array, pages, origin="search") {
   /** Registers handler for clicking on the pagination component */
   $("#pages").click(function(event) {
     if ( !isNaN(event.target.id) ) {
       if(origin == "search"){
        display_page_from_hit_array(event.target.id, items_per_page, hit_array);
        pagination_rearrange(event.target.id, pages);
       }else{
        display_results_raw(event.target.id, items_per_page, hit_array);
        pagination_rearrange(event.target.id, pages);
       }
     }
   });
 }

 /**
  * Rearranges the shown page links around the active page.

  * 10 page links at the beginning and end of the array, 9 in between
  *  to grant a symmetric view.

  * CSS is used for classifying the page links
  *    - nav-active for the active page
  *    - nav-side shows the link around the active page
  *    - nav-invis makes all other links invisible

  * @param page_pointer Defines the number of shown page links
  *  at each the right and left side of the active page
  * @param page_separator Value for correct display of page links if page_pointer
  *  gets adjusted
  */
  function pagination_rearrange(page_number, pages){
    var page_pointer = 4;
    var max_pages =  page_pointer * 2;
    for (var page = 1; page <= pages; page += 1) {
      if (page != page_number) {
        $('#page' + page).attr("class", "nav-invis");
      }
      else {
        $('#page' + page).attr("class", "nav-active");
        if (page < page_pointer + 2) {
          for (var int = 1; int <= max_pages + 2; int += 1) {
            $('#page' + (page + int)).attr("class", "page-item");
          }
          for (var int = -1; int + page > 0; int -= 1) {
            $('#page' + (page + int)).attr("class", "page-item");
          }
          page = max_pages + 1;
        }
        else if (page > pages - (page_pointer + 1)){
          for (var int = 1; page + int <= pages; int += 1) {
            $('#page' + (page + int)).attr("class", "page-item");
          }
          for (var int = 1; page - int >= pages - max_pages; int += 1) {
            $('#page' + (page - int)).attr("class", "page-item");
          }
          page += page_pointer + 2;
        }
        else {
          for (var int = 1; int <= page_pointer && page >= page_pointer + 2; int += 1) {
            $('#page' + (page - int)).attr("class", "page-item");
            $('#page' + (page + int)).attr("class", "page-item");
          }
          page += page_pointer;
        }
      }
    }
  }

/**
 * Displays all hits for the select page from a given hit array
 *
 * @param pages Defines the number of pages
 * @param items_per_page Defines the  number of to be displayed hits per page
 * @hit_array Defines an array for all hits, e.g.:
 *            [
 *              [
 *                "sentencenr": 500,
 *                "document": "Ms-114",
 *                "matches": [
 *                             [ "start": [186,3,6],
 *                               "end": [186,3,6],
 *                               "name": "Ms-114,16r[2]et16v[1]_11"
 *                             ]
 *                            ]
 *              ]
 *             ]
 */
function display_page_from_hit_array(page_number, items_per_page, hit_array) {
  var index = (page_number - 1) * items_per_page;

  //SORT BY DATE:
  //Here the arrays containing matches are sorted by date.
  hit_array.sort(function(x,y){
    var x = x["matches"][0]["date_norm"]; //Step through array object and store value of normalized date
    var y = y["matches"][0]["date_norm"]; //Step through array object and store value of 2nd normalized date
    var date_x = x.substr(0, 10);         // Store string of (first part of) the two dates
    var date_y = y.substr(0, 10);
    return date_x == date_y ? 0 : date_x < date_y ? -1 : 1; //Compare substrings of currently stored two dates
  }); // Repeat for all array items



  hit_array_per_page = [];

  $.map(hit_array.slice(index, index + parseInt(items_per_page)),
        function(val, j) {
    arr_index = index + j;
    hit_array_per_page.push(hit_array[arr_index]);

    if (val !== hit_array[arr_index]) {
      console.log("something went heavily wrong...!");
    }
  });

  //SORT BY DATE:
  //Same principple as with "hit_array.sort".
  hit_array_per_page.sort(function(x,y){
    var x = x["matches"][0]["date_norm"];
    var y = y["matches"][0]["date_norm"];
    var date_x = x.substr(0, 10);
    var date_y = y.substr(0, 10);
    return date_x == date_y ? 0 : date_x < date_y ? -1 : 1;
  });

  // Make the date select slider. Code in date_display.js
  // If() checks wether slider already exists. Arguments are smallest and highest existing date for the given search query
  if(!$("#slider").length){
    make_slider(hit_array[0]["matches"][0]["date_norm"].substr(0, 4), hit_array[hit_array.length-1]["matches"][hit_array[hit_array.length-1]["matches"].length-1]["date_norm"].substr(0, 4));
  }
  // PARAMETER SEARCH RESULTS
  // Sorted arrays are defined parameter inputs for the function that creates search result pages.
  construct_results(hit_array_per_page, hit_array);
}

/**
 * This method calls the Remarks Classification Service (RCS) to classify
 * a remark and displays the categories for a specified search result.
 *
 * @param remark Remark to get classification results for
 * @param index Search result index
 */
function create_classification_results_for_remark_at_index(remark, index) {
  var rcs_host = c_rcs["host"];
  var rcs_port = c_rcs["port"];

  $.post("http://" + rcs_host + ":" + rcs_port,
         JSON.stringify({"remark": remark}), function(classified_remark) {
    d_output = "";

    categories = classified_remark["categories"];

    d_output += '<ul class="list-group">';

    _.forEach(categories, function(category) {
      label = category["name"];
      prob = _.pad(_.round(_.toNumber(category["probability"]), 4), 6, '0');

      d_output += '<li class="list-group-item d-flex justify-content-between ';
      d_output += 'align-items-center">';
      d_output += label;
      d_output += '<span class="badge badge-primary badge-pill">';
      d_output += prob;
      d_output += '</span></li>';
    })

    d_output += '</ul>';

    $('#pop' + index).attr('data-content', d_output);

    $('#pop' + index).popover({
      html: true,
      container: 'body',
      trigger: 'focus',
      title: "Neuronales Netz (Trainingsdaten: Ts-212)"
    })
    $('#pop-knn' + index).popover({
      html: true,
      container: 'body',
      trigger: 'focus',
      title: "KNN search"
    })

  });
}

/**
 * Builds nice accordions for every hit
 * This includes building all necessary links (facsimile, reader)
 *
 * @hit_array Defines an array for all hits, e.g.:
 *            [
 *              [
 *                "sentencenr": 500,
 *                "document": "Ms-114",
 *                "matches": [
 *                             [ "start": [186,3,6],
 *                               "end": [186,3,6],
 *                               "name": "Ms-114,16r[2]et16v[1]_11"
 *                             ]
 *                            ]
 *              ]
 *             ]
 */
function construct_results(hit_array, complete_hits_array) {
  /** The final formatted and sorted DOM is represented here */
  var d_output = "";

  /**
   * The panel-group for all accordions comes next
   * @see http://getbootstrap.com/javascript/#collapse-example-accordion
   */
  $('.results').html('<div class="panel-group" id="accordion" role="tablist"'
                     + 'aria-multiselectable="true"></div>');

  var identifier = 0;

  var show_facsimile = (sessionStorage.getItem(c_show_facsimile_remarks_name) === 1 || sessionStorage.getItem(c_show_facsimile_remarks_name) === "true");

  _.forEach(hit_array, function(item) {
    var siglum = item["matches"][0]["name"];
    var date_norm = item["matches"][0]["date_norm"];

    /**
     * Take first and last item of to build the accordion header:
     * Title shows information about first and last sentence id
     * current_date contains normalized date informaion from wfa server
     */
    var current_title = siglum;
    var current_date = date_norm;

    if (item["matches"].length > 1) {

      var last_sentence_name = item["matches"][item["matches"].length - 1]["name"];

      if (last_sentence_name != current_title) {
        current_title += " - " + item["matches"][item["matches"].length - 1]["name"];
      }
    }

    d_output = '<div id="hit' + identifier + '">';

     d_output += '<div class="row">';

     /** Output for facsimile and content above facsimile. Authors: Stefan Schweter, Julian Höllig
     *
     * current_Title contains name of siglum, date_norm contains normalized date information
     * Calender symbol and info button (with tooltip) in context of date information.
     */
      if (show_facsimile) {
        d_output += '<div class="col-md-6">';
        d_output += '<h1 class="siglum_title">' + current_title + '</h1>';
        d_output += '<div class="btn-group">'; //group of symbols/links
          d_output += get_quadroreader_wittgenstein_source_links(siglum);
          d_output += '<a id="pop' + identifier + '" tabindex="' + identifier
                  + '" class="btn btn-link" role="button"' + " data-toggle='popover'"
                  + ' data-trigger="focus" data-html="True"'
                  + ' data-content="Nicht verfügbar';
          d_output += '"><i class="fa fa-sitemap" title="Kategorisierung"></i></a>';
          d_output += '<a id="pop-knn' + identifier + '"  title="KNN" tabindex="' + identifier
            d_output += '<a id="pop-knn' + identifier + '" tabindex="' + identifier
                  + '" class="btn btn-link"'
                  + " data-toggle='popover'"
                  + ' data-content="Nicht verfügbar';
            d_output += '"><i class="fa fa-tasks" title="KNN" aria-hidden="true"></i></a>';

        d_output += '</div>'

        if(sessionStorage.getItem(c_lang_name) ===  "English"){
          d_output += '<span id="date_norm" class="date"></i><i class="fa fa-calendar">'
                   + '</i>    ' + date_norm + '  '
                   + '<a href="#"><i id="InfoButton' + identifier + '" class="fa fa-info-circle" title='
                      + '"The questionmark shows that the date is unknown or unsecure.'
                      + '&#10;N.B.: Handwritten revisions in typoscripts can be significantly later than the shown date."'
                   + '></i></a></span>';
        }
        else if(sessionStorage.getItem(c_lang_name) ===  "Deutsch"){
          d_output += '<span id="date_norm" class="date"></i><i class="fa fa-calendar">'
                   + '</i>    ' + date_norm + '  '
                   + '<a href="#"><i id="InfoButton' + identifier + '" class="fa fa-info-circle" title='
                      + '"Das Fragezeichen zeigt an, dass das Datum unbekannt oder unsicher ist.'
                      + '&#10;N.B.: Handschriftliche Revisionen in Typoskripten können bedeutend später als'
                      + ' das für das Typoskript angegebene Datum sein."'
                   + '></i></a></span>';
        }

        d_output += '<div class="facsimile" id="facsimile' + identifier + '"; style="overflow-x:hidden; overflow-y:auto;">';

      /** Closes facsimile-extract div */
      d_output += '</div>';
      d_output += '</div>';

    }

    d_output += '<div class="col-md-6">';
    d_output += '<div class="span12" style="text-align:center">';
    d_output += '<a class="btn btn-lg prev-sentence-' + identifier + '" href="#"><i class="fa fa-angle-double-up" title="Previous sentence"></i></a>';
    d_output += '</div>';

    d_output += '<div class="treffer" data-last-prev-sentencenr='
             + item["sentencenr"] + ' data-last-next-sentencenr='
             + item["sentencenr"] + ' id="treffer' + identifier + '">';

    /** Closes treffer div */
    d_output += '</div>';

    d_output += '<div class="span12" style="text-align:center">';
    d_output += '<a class="btn btn-lg next-sentence-' + identifier + '" href="#"><i class="fa fa-angle-double-down" title="Next sentence"></i></a>';
    d_output += '</div>';

    d_output += '</div>';

    d_output += '</div>';

    d_output += '<hr>';

    $('#accordion').append(d_output);

    hide_info_button(date_norm, identifier);

    create_accordion_entry_at_index(identifier, siglum, item["document"],
                                    item["sentencenr"],
                                    item["matches"], show_facsimile,
                                    complete_hits_array);

    identifier += 1;
  });

  pubsub.publish('quadroreader-elements-ready');
}

/**
 * Reads number of found remarks from session storage
 * Displays number of all found remarks under search form using Boostrap's alert divs
 */
function display_number_all_hits(unique_document_hit_counter)
{
  var number_all_hits = sessionStorage.getItem("totalNumberOfHits");
/** Hide Motto on the SEARCH Page
 **/
  hide_motto();

  var number_all_hits_label = number_all_hits > 0
  ? "<div class='alert alert-info' role='alert' style='display:none; text-align:center; margin:auto; width:50%;'><span class='hidden-xs'> Es wurden " + number_all_hits + ' Treffer gefunden. <a href="#" id="stats_button">Statistik ein/ausblenden</a> </span>' + "<span class='visible-xs'>" + number_all_hits + ' Treffer. <a href="#" id="small_stats_button">Statistik ein/ausblenden</a> </span>'
  : "<div class='alert alert-danger' role='alert' style='text-align:center; margin:auto; width:50%;'>Es wurden keine Treffer gefunden";

  number_all_hits_label += "</div>";

  $('.number-hits').html(number_all_hits_label);

  $(".number-hits").append('<div class="stats_overlay stats_overlay-right d-none" id="statsOverlay"><div class="chart_control"></div><div class="chart_container"></div></div>');
  $(".chart_control").append('<button type="button" class="close" aria-label="Close" onclick="closeStats();"><span aria-hidden="true">&times;</span></button>');
}

/**
 * Displays all documents + hits
 *
 * @param document_hit_counter Defines a stastic of hits per document, e.g.
 *        {
 *          "Ts-213": 5,
 *          "Ms-153a": 2
 *        }
 */
function display_hit_distribution(document_hit_counter) {
  $(".number-hits").append('<div class="overlay overlay-right" id="navigationOverlay"></div>');
  //$(".number-hits").append('<div class="stats_overlay" id="statsOverlay"><div class="chart_control"></div><div class="chart_container"></div></div>');
  $(".number-hits").append('<button id="overlayBtn_open" class="overlayBtn-right btn btn-circle btn-lg" onclick="openNav(); toggleBtn(1);"><i class="fa fa-chevron-left"></i></button>');
  /*$(".number-hits").append('<button id="overlayBtn_open" class="overlayBtn-left btn btn-circle btn-lg" onclick="openNav(); toggleBtn(1);"><i class="glyphicon glyphicon-chevron-right"></i></button>');*/
  $(".overlay").append('<button type="button" class="close" aria-label="Close" onclick="closeStats();closeNav();toggleBtn(2);"><span aria-hidden="true">&times;</span></button>');
  //$(".chart_control").append('<button type="button" class="close" aria-label="Close" onclick="closeStats();"><span aria-hidden="true">&times;</span></button>');
  //$(".overlay").append('<button type="button" aria-label="Right" class="close overlay-control overlay-control-right" onclick="toggleSides(1);"><i aria-hidden="true" class="fa fa-arrow-right"></i></button><button type="button" aria-label="Left" class="close overlay-control overlay-control-left" onclick="toggleSides(0);"><i aria-hidden="true" class="fa fa-arrow-left"></i></button>');
  $(".overlay").append('<div class="overlay-content" id="navigationOverlay-content" role="navigation"></div>');
  $(".overlay-content").append('<ul class="nav nav-pills flex-column" id="hit-tabs"></ul>');
  var d_hits_element = $("#hit-tabs");
  var hit_elements = "";

  /* All documents should be selectable, too! */

  var number_all_hits = sessionStorage.getItem("totalNumberOfHits");

  if (number_all_hits == 0){
	  closeNav();
  }

  hit_elements += "<li class='nav-item'><a class='nav-link' href='#' id='all'>Found remarks" + "<br> <span class='badge badge-secondary' style='text-align:center;'>"
               +  number_all_hits + "</span></a></li>";

  ms1List = "<li style='display:none;' class='hitsSubfolder' id='ms1List'>";
  ms2List = "<li style='display:none;' class='hitsSubfolder' id='ms2List'>";
  ms3List = "<li style='display:none;' class='hitsSubfolder' id='ms3List'>";
  tsList = "<li style='display:none;' class='hitsSubfolder' id='tsList'>";
  tscList = "<li style='display:none;' class='hitsSubfolder' id='tscList'>";

  ms1Count = 0;
  ms2Count = 0;
  ms3Count = 0;
  tsCount = 0;
  tscCount = 0;

  ms1= ["139a","139b","140","141","143","172","178a","178b","178c","178d","178e","178f","178g","178h","181","182"];
  ms2= ["101","102","103","104","142","144","145","146","147","148","149","150","151","152","153a","153b","154","155","156a","156b","157a","157b","158","159","160","161","162a","162b","163","164","165","166","167","168","169","170","171","173","174","175","176","177"];
  ms3 = ["105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138"];
  ts= ["201a","201b","202","203","204","205","206","207","208","209","210","211","213","214a","214b","214c","215a","215b","216","217","218","219","220","221","225","226","227","228","229","230","231","232","234","235","236","238","239","241","242","243","244","245","301","302","303","304","305","306","307","308","309","310","311"];
  tsc= ["212","222","223","224","233","237","240"];
  /*d= ["301","302","303","304","305","306","307","308","309","310","311"]; D is not needed atm*/

  ms1Reg =new RegExp(ms1.join("|"));
  ms2Reg =new RegExp(ms2.join("|"));
  ms3Reg =new RegExp(ms3.join("|"));
  tsReg =new RegExp(ts.join("|"));

  _.forEach(c_available_documents, function(available_document) {
    if (_.has(document_hit_counter, available_document)) {

	  if (available_document.startsWith("Ms-")){
		if (ms1Reg.test(available_document)) {
		  ms1Count += document_hit_counter[available_document];
          ms1List += "<p href='#' class='subfolder' id='" + available_document + "'>"
                   + available_document + " <span class='badge badge-secondary' style='float:right;'>"
                   + document_hit_counter[available_document]
                   + "</span></p>";
	    /*
		Not used since ms2 is the longest list and regex to compute - we claim => ms2 is when its not a ms1 or ms3 but matches "Ms-"

		}

		if (ms2Reg.test(available_document)) {
		  ms2Count += document_hit_counter[available_document];
          ms2List += "<p href='#' class='subfolder' id='" + available_document + "'>"
                   + available_document + " <span class='badge badge-secondary' style='float:right;'>"
                   + document_hit_counter[available_document]
                   + "</span></p>";
	    }*/
	    }else if (ms3Reg.test(available_document)) {
		  ms3Count += document_hit_counter[available_document];
          ms3List += "<p href='#' class='subfolder' id='" + available_document + "'>"
                   + available_document + " <span class='badge badge-secondary' style='float:right;'>"
                   + document_hit_counter[available_document]
                   + "</span></p>";
	    }else{
		  ms2Count += document_hit_counter[available_document];
          ms2List += "<p href='#' class='subfolder' id='" + available_document + "'>"
                   + available_document + " <span class='badge badge-secondary' style='float:right;'>"
                   + document_hit_counter[available_document]
                   + "</span></p>";
		}
	  }

	  if (available_document.startsWith("Ts-")){
		if (tsReg.test(available_document)) {
		  tsCount += document_hit_counter[available_document];
          tsList += "<p href='#' class='subfolder' id='" + available_document + "'>"
                   + available_document + " <span class='badge badge-secondary' style='float:right;'>"
                   + document_hit_counter[available_document]
                   + "</span></p>";
	    }else{
		  tscCount += document_hit_counter[available_document];
          tscList += "<p href='#' class='subfolder' id='" + available_document + "'>"
                   + available_document + " <span class='badge badge-secondary' style='float:right;'>"
                   + document_hit_counter[available_document]
                   + "</span></p>";
		}
	  }

    }
  });

  if (ms1Count > 0){
    hit_elements += "<li class='nav-item'><a id='MS1' href='#' onclick='openFolder(this);' class='ms1List nav-link'>Loose sheets" + "<br> <span id='MS1span' class='badge badge-secondary' style='text-align:center;'>"
                  +  ms1Count + "</span></a></li>";
    ms1List += "</li>";
    hit_elements += ms1List;
  }

  if (ms2Count > 0){
   hit_elements += "<li class='nav-item'><a id='MS2' href='#' onclick='openFolder(this);' class='ms2List nav-link'>Notebooks and other bound Manuscripts" + "<br> <span id='MS2span' class='badge badge-secondary' style='text-align:center;'>"
               +  ms2Count + "</span></a></li>";
    ms2List += "</li>";
    hit_elements += ms2List;
  }

  if (ms3Count > 0){
    hit_elements += "<li class='nav-item'><a id='MS3' href='#' onclick='openFolder(this);' class='ms3List nav-link'>Bände/Volumes" + "<br> <span id='MS3span' class='badge badge-secondary' style='text-align:center;'>"
               +  ms3Count + "</span></a></li>";
    ms3List += "</li>";
    hit_elements += ms3List;
  }

  if (tsCount > 0){
    hit_elements += "<li class='nav-item'><a id='TS' href='#' onclick='openFolder(this);' class='tsList nav-link'>Typescripts" + "<br> <span id='TSspan' class='badge badge-secondary' style='text-align:center'>"
               +  tsCount + "</span></a></li>";
    tsList += "</li>";
    hit_elements += tsList;
  }

  if (tscCount > 0){
    hit_elements += "<li class='nav-item'><a id='TSC' href='#' onclick='openFolder(this);' class='tscList nav-link'>Typescript cuttings" + "<br> <span id='TSCspan' class='badge badge-secondary' style='text-align:center'>"
               +  tscCount + "</span></a></li>";
    tscList += "</li>";
    hit_elements += tscList;
  }

  hit_elements += "<li class='nav-item'><a id='statistics_folder' class='nav-link' href='#' onclick='viewStats();'>View statistics</a></li>";
  hit_elements += "<li id='statistics_subfolders' class='d-none'>";
  hit_elements += "<p href='#' id='date_chart' class='subfolder chart_folder'>Datum</p>";
  hit_elements += "<p href='#' id='document_chart' class='subfolder chart_folder'>Dokument</p></li>";

  d_hits_element.append(hit_elements);
  open_sidebar();
}

function viewStats(){
  document.getElementById("statistics_subfolders").classList.toggle("d-none");
}

function toggleBtn(x) {
  element = document.getElementById("overlayBtn_open");
  overlay = document.getElementById("navigationOverlay");
  overlay.style.maxWidth = "173px";
  overlayContent = document.getElementById("navigationOverlay-content");
  overlayContent.style.width = "100%";

  if (x==1){
	element.style.display="none";
	open_sidebar();

  }else{
	element.style.display="block";
	close_sidebar();
  }
}

function open_sidebar(){
  //animation
  //$('#page_content').animate({width: "-= 173px"});

  //setting to calc for responsiveness
  var newWidth = $('#page_content').width()- 173;
  $('#page_content').animate({width: "-= 173px"}, {duration:500, complete:function(){ $('#page_content').width("calc(100% - 173px)"); } });
}

function close_sidebar(){
  //animation
  //$('#page_content').animate({width: "+= 173px"});

  //setting to calc for responsiveness
  //var newWidth = $('body').width();
  $('#page_content').animate({width: "+= 173px"}, {duration:500, complete:function(){ $('#page_content').width("calc(100% + 60px)"); } });
}


function openFolder(elt){
	/**
  if (elt.id.endsWith("-open")){
	  elt.id = elt.id.substring(0, elt.id.length  -5);
  } else {
	  elt.id = elt.id +  "-open";
  } */

  if (elt.classList.contains("ms1List")) {
    id = 'ms1List';
  } else if (elt.classList.contains("ms2List")){
    id = 'ms2List';
  } else if (elt.classList.contains("ms3List")){
    id = 'ms3List';
  } else if (elt.classList.contains("tsList")){
    id = 'tsList';
  } else if (elt.classList.contains("tscList")){
    id = 'tscList';
  }else{
	  return;
  }

  element = document.getElementById(id)
  var display = element.style.display;
  if (display == "none") {
	  hitList = document.getElementsByClassName('hitsSubfolder');
      for (i = 0; i < hitList.length; i++){
        hitList[i].style.display =  "none";
      }
	  element.style.display = "inline";
	  if (isOverflown(document.getElementById("navigationOverlay"))){
	   document.getElementById("navigationOverlay").style.overflowY = "auto";
	  }
  } else {
   	  element.style.display = "none";
	  document.getElementById("navigationOverlay").style.overflowY = "hidden";
  }
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function toggleSides(x){
  if (x == 0){
    document.getElementById('navigationOverlay').className = "overlay overlay-left";
	document.getElementById('statsOverlay').className = "stats_overlay stats_overlay-left";
	document.getElementById('overlayBtn_open').className = "overlayBtn-left btn btn-circle btn-lg";
	titleList = document.getElementsByClassName('siglum_title');
	for(el of titleList){
	  el.style.marginLeft =  "165px";
    }
  }else {
	document.getElementById('navigationOverlay').className = "overlay overlay-right";
	document.getElementById('statsOverlay').className = "stats_overlay stats_overlay-right";
	document.getElementById('overlayBtn_open').className = "overlayBtn-right btn btn-circle btn-lg";
	titleList = document.getElementsByClassName('siglum_title');
	for(el of titleList){
	  el.style.marginLeft =  "0px";
	  }
  }
}

/**
 * Registers the filter-out click handler
 * When a document from sidebar is selected, we need to filter out the specific
 * document from all other hits for the search query
 *
 * @hit_array Defines an array for all hits, e.g.:
 *            [
 *              [
 *                "sentencenr": 500,
 *                "document": "Ms-155",
 *                "matches": [
 *                             [ "start": [186,3,6],
 *                               "end": [186,3,6],
 *                               "name": "Ms-155,15v[2]et16r[1]_3.2"
 *                             ]
 *                            ]
 *              ]
 *             ]
 */
function register_filter_out_documents_handler(hit_array, normal_search=true) {
  $(".number-hits li").click(function(event) {
    if(event.target.id != "statistics_folder" && !event.target.classList.contains("chart_folder")){
      /**
       * Unbind the click handler for the unfiltered use case
       * to avoid side effects. Otherwise: the click handler event would be
       * executed twice: first event would display all hits for a specific
       * page without filtering - the second event would display all hits for
       * a specific page with filtering. That behavior would lead to repeated
       * and incomplete results. The binding for the click event handler is later
       * done when calling the enable_pagination_support() method!
       */
      $("#pages").unbind('click');
      var categoryClosed = true;

      var desired_document = event.target.id;
      var filtered_out_hit_array = [];

      /** Filter out desired document from hit array */

      if (desired_document === "all") {
        filtered_out_hit_array = hit_array;
      }

    else if (desired_document === "MS1") {
      var children = document.getElementById("ms1List").childNodes;
      for (child in children){
        desired_document = children[child].id;
       _.forEach(hit_array, function(hit) {
        var current_document_name = hit["document"];
        if (current_document_name === desired_document) {
          filtered_out_hit_array.push(hit);
        }
        });
      }
      }

    else if (desired_document === "MS2") {
      var children = document.getElementById("ms2List").childNodes;
      for (child in children){
        desired_document = children[child].id;
       _.forEach(hit_array, function(hit) {
        var current_document_name = hit["document"];
        if (current_document_name === desired_document) {
          filtered_out_hit_array.push(hit);
        }
        });
      }
      }

    else if (desired_document === "MS3") {
      var children = document.getElementById("ms3List").childNodes;
      for (child in children){
        desired_document = children[child].id;
       _.forEach(hit_array, function(hit) {
        var current_document_name = hit["document"];
        if (current_document_name === desired_document) {
          filtered_out_hit_array.push(hit);
        }
        });
      }
      }

    else if (desired_document === "TS") {
      var children = document.getElementById("tsList").childNodes;
      for (child in children){
        desired_document = children[child].id;
       _.forEach(hit_array, function(hit) {
        var current_document_name = hit["document"];
        if (current_document_name === desired_document) {
          filtered_out_hit_array.push(hit);
        }
        });
      }
      }

    else if (desired_document === "TSC") {
      var children = document.getElementById("tscList").childNodes;
      for (child in children){
        desired_document = children[child].id;
       _.forEach(hit_array, function(hit) {
        var current_document_name = hit["document"];
        if (current_document_name === desired_document) {
          filtered_out_hit_array.push(hit);
        }
        });
      }
      }
    else {
        _.forEach(hit_array, function(hit) {
          var current_document_name = hit["document"];
          if (current_document_name === desired_document) {
            filtered_out_hit_array.push(hit);
          }
        });
      }
    if (!normal_search){
      enable_pagination_support(sessionStorage.getItem(c_items_per_page_name), filtered_out_hit_array, "raw");
    }

    /**
     * Set the Sliders values to the min and max date of selected folder.
     * Also update the amount numbers.
     **/
    if (normal_search) {
      $("#slider").slider( "option", "values", [ filtered_out_hit_array[0]["matches"][0]["date_norm"].substr(0, 4), filtered_out_hit_array[filtered_out_hit_array.length-1]["matches"][filtered_out_hit_array[filtered_out_hit_array.length-1]["matches"].length-1]["date_norm"].substr(0, 4)] );
      $( "#amount" ).val( $( "#slider" ).slider( "values", 0 ));
      $( "#amount2").val( $( "#slider" ).slider( "values", 1 ));
      enable_pagination_support(sessionStorage.getItem(c_items_per_page_name), filtered_out_hit_array);

      let pie_chart = document.getElementById("statsOverlay");
      if(pie_chart.classList.contains("d-none")){
        let folders = document.getElementsByClassName("chart_folder");
        for(let i=0; i<folders.length; i++){
          folders[i].onclick = function(){show_chart_diagram(folders[i].id, hit_array)};
        }
      }
      else{
        show_chart_diagram($("#chart").attr('chartType'), filtered_out_hit_array);
      }
    }
  }
  });

  /**
   * Bind the filter ot the slider.
   * Basically the same as above, with important note:
   * The Dates are converted to the Javascript Date Object to be compared
   * can only be done with the .getTime() Method. More info here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
   **/
  if (normal_search){
    $("#slider").on("slidestop", function(event, ui) {
      let filtered_out_hit_array = [];
      let desired_min_date = new Date($("#amount").val());
      let desired_max_date = new Date($("#amount2").val());
      _.forEach(hit_array, function(hit) {
        hit["matches"].forEach(match =>{
          let current_date = new Date(match["date_norm"].substr(0, 10));
          if (current_date.getTime() > desired_min_date.getTime() && current_date.getTime() < desired_max_date.getTime()) {
              filtered_out_hit_array.push(hit);
          }
        });
      });


      // Make an alert if there are no Dates in the selected range.
      if(filtered_out_hit_array.length == 0){
        message = '<div class="alert alert-dark alert-dismissible fade show" role="alert">';
        message +='<a href="#" class="close" id="slider-alert-close" aria-label="Close" data-dismiss="alert">&times;</a>';
        message +='Keine Treffer in dem angegebenen Zeitraum gefunden'
        message +='</div>';

        $('.slider-alert-container').append(message);
        setTimeout(function() {
          $('.show').hide(message);
        }, 2000);
      }
      else{

        /** Handle the pie chart.
         *  If the pie chart is visible update it.
         *  Else rebind the onclick handler of the subfolders
         **/
        let pie_chart = document.getElementById("statsOverlay");
        if(pie_chart.classList.contains("d-none")){
          let folders = document.getElementsByClassName("chart_folder");
          for(let i=0; i<folders.length; i++){
            folders[i].onclick = function(){show_chart_diagram(folders[i].id, hit_array)};
          }
        }
        else{
          show_chart_diagram($("#chart").attr('chartType'), filtered_out_hit_array);
        }

        enable_pagination_support(sessionStorage.getItem(c_items_per_page_name), filtered_out_hit_array);
      }
    });
    //Rebind the onclick for the pie chart handlers at start with all results
    let folders = document.getElementsByClassName("chart_folder");
    for(let i=0; i<folders.length; i++){
      folders[i].onclick = function(){show_chart_diagram(folders[i].id, hit_array)};
    }
  }
}

function on_toggle(elt) {
  if (elt.classList.contains("btn-secondary")) {
    elt.className = "btn btn-xs btn-primary active";
  } else {
    elt.className = "btn btn-xs btn-secondary";
  }

  sibling = elt.nextSibling;

  if (sibling == null) {
    sibling = elt.previousSibling;
  }

  if (sibling.classList.contains("btn-secondary")) {
    sibling.className = "btn btn-xs btn-primary active";
  } else {
    sibling.className = "btn btn-xs btn-secondary";
  }
}

function show_alternatives(elt) {
  $(elt).tab('show');
  btnID = "expand-" + elt.getAttribute("value");
  btn = document.getElementById(btnID);
  if (btn.classList.contains("btn-secondary")) {
    list = elt.parentNode;
    ul = list.parentNode;
    identifier = document.getElementById(elt.getAttribute('href').slice(1)).getAttribute("id");
    if (document.getElementById(identifier+"-box")){
      return true;
    } else {
      child = document.getElementById(elt.getAttribute('href').slice(1)).children[0];
      alt = '<div class="alert alert-dark fade show alert-dismissible" id="'+  identifier +'-box">';
      alt +='<a href="#" class="close" data-dismiss="alert">&times;</a>' ;
      alt += child.innerHTML.replace("display:none", "display:inline");
      alt += '<br><br>' + '</div>';
      ul.parentNode.innerHTML += alt;
      return true;
    }
  }
}

/**
 * Displays a nice pie chart of number of hits in documents
 *
 * @param filtered_out_hit_array, contains all currently selected search results
 * @param chart_type contains string either "date_chart" or "document_chart" resulting in either bar or pie chart.
 *
 */
function show_chart_diagram(chart_type, filtered_out_hit_array) {
    if($("#chart").length) {
      $("#chart").remove();
    }
    let hit_array = new Map();

    d_stats  = '<div id="chart" class="c3" style="max-height: 300px;">';
    d_stats += '</div>';

	  $(".chart_container").append(d_stats);

    //This has to come before the pie chart is bound to the element, otherwise it's shifted by 32px. No idea why.
    openStats();

    if(chart_type === "date_chart"){
     //Make a map of date => amount
     filtered_out_hit_array.forEach(function(documents){
        documents["matches"].forEach(function(match){
          const date_norm = match["date_norm"].substr(0, 4);
          if(hit_array.has(date_norm)){
            const lastValue = hit_array.get(date_norm);
            hit_array.set(date_norm, lastValue + 1);
          }
          else{
            hit_array.set(date_norm, 1);
          }
        });
      });
      //save the type for updates if filter (e.G. hit-sorting or document-folder) is used later
      $("#chart").attr("chartType","date_chart");

      /**
       * Make an Array that contains date data in a form C3s bar chart will take.
       * Note: Bar_array defines the time-steps on the x-axis.
       * Algorithm should be able to adapt if timesteps are changed, but not tested.
      **/
      let bar_array = [[
        "x",
        "1914",
        "1917",
        "1920",
        "1923",
        "1926",
        "1929",
        "1932",
        "1935",
        "1938",
        "1941",
        "1944",
        "1947"
      ]
      ];
      hit_array.forEach(function(value, key){
        let date = key;
        let data_array = Array(bar_array[0].length).fill(0);
        for(let i=1; i<bar_array[0].length; i++){
          if(parseInt(date) >= parseInt(bar_array[0][i])){
            if(!!bar_array[0][i+1]){
              if(parseInt(date) < parseInt(bar_array[0][i+1])){
                data_array[i] = value;
                data_array[0] = key;
              }
            }
            else{
              data_array[data_array.length-1] = value;
              data_array[0] = key;
            }
          }
        }
        bar_array.push(data_array);
      });

      //Make a group array of the possible dates, to stack them later in the barchart
      let data_groups = [];
      for(let i=1; i<bar_array.length;i++){
        data_groups.push(bar_array[i][0]);
      }

      //Make the Chart.
      var chart = c3.generate({

        padding: {
          top: 0,
          right: 0,
          bottom: 20,
          left: 0,
        },

      data: {
      onclick: function (d, i) { console.log("onclick", d, i); },
      x: "x",
      bindto: '#chart',
          columns: Array.from(bar_array),
          type : 'bar',
          groups:[data_groups]
        },
      tooltip: {
        grouped: false
      },
      axis: {
        y:{
          inner: true
        }
      },
      bar: {
        width: {ratio: 1.0},
          label: {
            format: function (value) { return value; }
          }
        },
      legend: {
          show: false,
        }

      });
    }
    else if(chart_type === "document_chart"){
     filtered_out_hit_array.forEach(function(documents){
          if(hit_array.has(documents["document"])){
            const lastValue = hit_array.get(documents["document"]);
            hit_array.set(documents["document"], lastValue + documents["matches"].length);
          }
          else{
            hit_array.set(documents["document"], 1);
          }
        });
      //save the type for updates if filter is used later
      $("#chart").attr("chartType","document_chart");

      //Make a PIE CHART
      var chart = c3.generate({

        padding: {
          top: 0,
          right: 0,
          bottom: 20,
          left: 0,
        },

      data: {
      bindto: '#chart',
          columns: Array.from(hit_array),
          type : 'pie'
        },

      pie: {
          label: {
            format: function (value) { return value; }
          }
        },

      legend: {
          show: false,
        }

      });
    }

}

function openNav() {
  document.getElementById("navigationOverlay").style.width = "50%";
}

function closeNav() {
  document.getElementById("navigationOverlay").style.width = "0%";
}

function openStats() {
  document.getElementById("statsOverlay").classList.remove("d-none");
}

function closeStats() {
  document.getElementById("statsOverlay").classList.add("d-none");
}

/**
 * sends the collected siglen from the hits to the quadroreader
 *
 * @param hit_siglum_array Defines a collection of hit siglen
 *        [{
 *          "n": "Ms-114,16r[2]et16v[1]_11"
 *        }]
 */
function send_hits_to_quadroreader(hit_siglum_array) {
  var qr_host = c_quadroreader["host"];
  var qr_port = c_quadroreader["port"];

  var qr_server_data = {};
  qr_server_data.hitArray = JSON.stringify(hit_siglum_array);

  var data_id;
  var error = null;
  $.post("http://" + qr_host + ":" + qr_port + "/data", qr_server_data, function(data) {
    data_id = data;
  }).fail(function(xhr, textStatus, errorThrown) {
    error = true;
  });

  pubsub.subscribe('quadroreader-elements-ready', function() {
    var check_data_id = function(){
      if (error) {
        clearInterval(data_id_checker);
      } else if (typeof data_id !== 'undefined') {
        clearInterval(data_id_checker);
        create_quadroreader_links(qr_host, qr_port, data_id);
      }
    };
    var data_id_checker = setInterval(check_data_id, 250);
  });
}

/**
 * creates the links to the quadroreader containing the data id
 *
 * @param data_id Defines a uuid to the hits collection in the database (needed in the quadroreader)
 *        "ed2d4b37-8d2c-4fa8-84f8-c204e72991a4"
 */
function create_quadroreader_links(qr_host, qr_port, data_id) {
  $('.facsimile-extract, .facsimile-reader-link').each(function(){
    var quadroreader_link = 'http://' + qr_host + ':' + qr_port + '/reader/';
    quadroreader_link += $(this).attr('siglum').split('_')[0];
    quadroreader_link += '?dataId=' + data_id;
    var currentLanguage = sessionStorage.getItem('lang_name');
    if(currentLanguage === 'Deutsch'){
      quadroreader_link += '&lang=de';
    }else{
      quadroreader_link += '&lang=en';
    }
    $(this).attr('href', quadroreader_link);
  });
}
/** verstecke das Motto, wenn Du es nicht sehen willst.
 * call it from .html
 * <script>hide_motto();</script>
 */
function hide_motto() {
	$("#motto").hide();
}

/** zeige das Motto, wenn Du es sehen willst Autor: Max
 * call it from .html
 * <script>show_motto();</script>
 */
function show_motto() {
	$("#motto").show();
}

/** InfoButton remove; Autor: Julian Höllig, Fritz Seebauer
 * Info button removed in case date information contains no '?'
 */
function hide_info_button(date_norm, identifier) {
  if (!date_norm.includes('?')) {
    $("#InfoButton" + identifier).remove();
  }
}

/**
 * Event des hit-sorting wird ausgewertet und eine neue Suche gestartet!
 */
$("#hit-sorting").change(function(){
    var selected_sort = $('#hit-sorting option:selected').val();
    console.log("hit-sorting changed",selected_sort);
    sessionStorage.setItem(c_sort_method, selected_sort);
    var selected_sort_debug = $('#hit-sorting option:selected').val();
    console.log("hit-sorting debug changed",selected_sort_debug);
    sessionStorage.setItem(c_sort_debug, selected_sort_debug);
	actual_search_pattern['type']="";
    console.log("sessionStorage set to ",selected_sort, "Actual Search pattern",actual_search_pattern);
	$('#search_button').attr("disabled", false);
	wittfind_search(actual_search_pattern);
	/* neuladen der Seite ... */
	location.reload();
	set_actual_sort_method();
});


function set_actual_sort_method(){
	var hit_sel = document.getElementById('hit-sort-select');
    var selected_sort = sessionStorage.getItem(c_sort_method);

	for ( var i = 0, len = hit_sel.options.length; i < len; i++ ) {
            opt = hit_sel.options[i];
            if ( opt.value == selected_sort) {
			    console.log("set default method, option Value= ",opt.value);
				opt.selected = true;
			} else {
				opt.selected = false;
            }
	}
}


function set_actual_debug_method(){
	var hit_debug_sel = document.getElementById('hit-sort-select');
    var selected_debug = sessionStorage.getItem(c_sort_debug);
	hit_debug_sel.selected="1";
    console.log("set Debug Sort Method= ",hit_debug_sel.value);
}

function sort_hits_by_score(hit_array) {
  hit_array.sort(function(a, b) {
    if (a.s_rank == b.s_rank){
      return a.n.localeCompare(b.n)
    }
    return a.s_rank > b.s_rank ? -1: 1
    //return a.ab_rank - b.ab_rank || a.f.localeCompare(b.f)
  });
}
