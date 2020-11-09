function display_results_raw(page_number, items_per_page, all_hits){
/**
 * @file Coordination of wittfind search is done in this class
 * @author Max Hadersbeck <maximilian@cis.lmu.de>
 */

/**
 * Fetches all hits from wf and displays them on the result page_content
 * The hits are generated from a "type=raw" call to the wf Server
 * curl 'http://wfa.wittfind.cis.uni-muenchen.de/' --data
 * '{"query":"\"undenkbaren\"","max":200,"type":"raw"}'
 *
 * @param all_hits The Results to be displayed
 * e.g
 *                [
 *                  [ "start": [198,27,1],
 *                    "end": [198,27,1],
 *                    "name": Ms-115,39[3]_1
 *                  ]
 *                ]
 *
*/
// Vom Quadroreader das HTML zum Siglum ausgelesen
// Grundlagen bei Behzat!!
// modfied Max
	create_accordion_entry_at_index.imgStatusMap = new Object();
	var index = (page_number) * items_per_page;
	items = all_hits.slice(index - items_per_page, index)

  var mds_host = c_mds["host"];
  var mds_port = c_mds["port"];
	var qr_host = c_quadroreader["host"];
  var qr_port = c_quadroreader["port"];
	// console.log("all_hits", all_hits);
	// console.log("items", items);
	$(".results").empty();
  $(".results").append('<div class="list-group">');
	var one_match_html_out= "";
	var remark_siglum_html="";
	var siglum="";
	var link="";
	var link_adress="";
	var facsimile_link_adress_sent="";
	var facsimile_link_adress="";
	var siglum_transkription = "";
  var counter = 1;
	var request = 0;
	var received = 0;

// take all results:
	_.forEach(items, function(item) {
      var one_match_html_out= "";
      //console.log("running")
			siglum=item.n;
			remark_siglum_html = siglum.replace(/\]_\d.*$/,"]")+"?html";
			// console.log("remark siglum=",remark_siglum_html);
			siglum_transkription = "";
			var transcription_request="http://" + mds_host + ":" + mds_port + "/transcription/" + remark_siglum_html;
			// console.log("Transkription request=",transcription_request);

      // print Transkription from READER, Thanks to Behzat
			request += 1
      $(".list-group").append('<div id="hit'+ counter + '"></div><hr style="width: 100%">');
      var hit_id = "hit" + counter
			//console.log(request, "content request", transcription_request);
			$.get(transcription_request,
            function (htmlContent) {
              //console.log(hit_id, "hit_id top");
        // asynchorn ... get hit
				// received += 1;
				// console.log(received, "content for link received || ", link_adress);

				link_adress='http://dev.reader.wittfind.cis.lmu.de/reader/'+item.n;
				facsimile_link_adress_sent='http://dev.reader.wittfind.cis.lmu.de:80/facsimile/extract/'+item.n;
        // if ("et" in item.n){
        //   facsimile_link_adress= facsimile_link_adress_sent.replace(/\]et.*$/,"]") +"?sentenceNumber="+item.satznr;
        // } else {
				//
        // }
		        // console.log("asynchron getHtml: HTML Kontent: ",htmlContent.html);
				siglum_transkription=htmlContent.html;


        // new row and First column
        one_match_html_out += '<div class="row"><div class="col-md-6" style="padding: 0 0 0 0; margin-bottom: 4px;">';
        //insert facsimile
        //http://reader.wittfind.cis.lmu.de:80/facsimile/extract/Ms-101,67r[5]?sentenceNumber=859
				siglum_without_sentence = item.n.split("_")[0]
				var document = siglum_without_sentence.split(",")[0]
				var siglumParts = siglum_without_sentence.split(",")[1].split("et");


				one_match_html_out += '<div class="facsimile" id="facsimile' + counter + '" style="overflow-x:hidden; overflow-y:auto;">'
				//http://reader.wittfind.cis.lmu.de:80/facsimile/extract/Ms-101,6r[2]?sentenceNumber=65
					siglumParts.forEach(function(siglumPart){
						one_match_html_out += '<a class="facsimile-extract" siglum="' + document + ',' + siglumPart + '" target="_blank" ';
						one_match_html_out += 'href= "http://' + qr_host + ":" + qr_port + '/facsimile/extract/';
						one_match_html_out += document + ',' + siglumPart;
						one_match_html_out += '?sentenceNumber=' + item.satznr;
						one_match_html_out += '" >';
						one_match_html_out += '<div class="img-magnifier-glass" style="visibility: hidden; border:3px solid #000;"></div>';
						one_match_html_out += '<img class="facsimile-img"' + ' id=' + item.n + ' alt="Faksimile ' + document + ',' + siglumPart + '"';
						one_match_html_out += ' data-src="http://' + qr_host + ":" + qr_port + '/facsimile/extract/';
						one_match_html_out += document + ',' + siglumPart;
						one_match_html_out += '?sentenceNumber=' + item.satznr + '"';
						one_match_html_out += ' src="http://' + qr_host + ":" + qr_port + '/facsimile/extract/';
						one_match_html_out += document + ',' + siglumPart;
						one_match_html_out += '?sentenceNumber=' + item.satznr;
						one_match_html_out += '" />';
						one_match_html_out += '</a>';
					});
				one_match_html_out += '</div>'

          // one_match_html_out += '<div class="facsimile" id="facsimile' + counter +
      		//     '" style="overflow-y:scroll; ;="">' +
  				// '<img class="rank-extract" value="False" src="'+facsimile_link_adress+'"' +
  				// 'id="'+ item.n +'" style="overflow-y:scroll; max-width: 100%;">' +
  				// "</img></div></div>";
				one_match_html_out += '</div>';

        //Second column (Html text)
	        one_match_html_out += '<div class="col-md-6"><div class="card rank-hit"><div class="card-body">'
	        one_match_html_out +=
        		'<a target="_blank" href='+link_adress+
        		' class="list-group-item list-group-item-action">'+
				'<div class="d-flex w-100 justify-content-between"> <h1 class="mb-1">'+
				item.n +
    		    '</h1>'+
				'<small class="small_fixed">'+
				item.date_norm +
				'</small> </div></a></div></div>';

			one_match_html_out += highlight(item, siglum_transkription);
			// counter = counter +1;
				// + button der data-src -> src
			  // + img link statt in src in data-src attribut

        // Print Information from wf:
			one_match_html_out += '<small class="small_fixed">';
			one_match_html_out += '<br/>';
			one_match_html_out += 'Satz Rank: ' + item.s_rank +":&nbsp;|&nbsp;";
			one_match_html_out += "ana: "+item.ana+":&nbsp;|&nbsp;";
			  //	_.forOwn(one_match, function(value,key) {
				//	one_match_html_out += "&nbsp;|&nbsp;"+ key + " : " + value +":&nbsp;|&nbsp;";
				//	});
			one_match_html_out += '</small>';


			one_match_html_out += '</div>';
			one_match_html_out += '</div> </div>';
	    //     console.log("From READER one_match_html_out",one_match_html_out);
	    // console.log(item.n);
			$('#' + hit_id).append(one_match_html_out);
			enable_glass();
			});
      counter+=1
	});
  $(".results").append('</div>');
  
}

function enable_glass() {

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
}

function highlight(item, siglum_transkription) {
  var innertext = siglum_transkription
  for (match of item.matches){
    innertext =replaceAll(innertext, match.token, '<b>' + match.token + '</b>')
  }
return innertext
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp("\\b"+find+"\\b", 'g'), replace);
}


function set_lazy(siglum){
    var img = document.getElementById(siglum);
    var data_switch = img.getAttribute("value");
    if(data_switch == "False"){
        var d_src = img.getAttribute("data-src");
        img.src = d_src;
        img.setAttribute("value","True");
    }else{
        img.src = "";
        img.setAttribute("value","False");
    }
}




function reset_height(div_id){
	// console.log("Wert HÃ¶he",$(div_id).css('max-height'));
    if($(div_id).css('max-height') == '0px'){
        $(div_id).css('max-height', '280px');
    }else{
        $(div_id).css('max-height', '0px');
    }
}
