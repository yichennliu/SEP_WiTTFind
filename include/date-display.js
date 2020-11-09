
function make_slider(min_val,max_val){
  //Make a slider div and two <p> amounts which show the active values so they can later be called by the query-ui function
  slider_html = "<p class='p-2'><input type='text' class='text-secondary font-weight-bold border-0' id='amount' readonly><i class='fa fa-angle-double-right'></i></p>";
  slider_html += "<div id='slider' class='col-4 mt-3'></div>";
  slider_html += "<p class='p-2'><i class='fa fa-angle-double-left'></i><input type='text' class='text-secondary font-weight-bold border-0' id='amount2' readonly></p>";
  if(sessionStorage.getItem(c_lang_name) ===  "English"){
    slider_html += "<i class='fa fa-info-circle' title ='The dates have been provided by the Wittgenstein Archives University Bergen (WAB).'></i>";
  }
  else if(sessionStorage.getItem(c_lang_name) === "Deutsch"){
    slider_html += "<i class='fa fa-info-circle' title='Datumsangaben wurden von den Wittgenstein Archives der Universität Bergen (WAB) zur Verfügung gestellt.'></i>";
  }
  $(".slider-container").append(slider_html);
  var slider_container = document.getElementById('hit-sorting');
  slider_container.style.visibility = 'visible';
  
  
  //Query-ui function that binds a slider({}) element to the previously created #slider div and fills the #amounts with values
  $( function() {
    $( "#slider" ).slider({
      range: true,
      min: 1914,
      max: 1951,
      values: [ min_val, max_val ],
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.values[ 0 ] );
        $( "#amount2" ).val( ui.values[ 1 ] );
      }
    });
    
    $( "#amount" ).val( $( "#slider" ).slider( "values", 0 ));
    $( "#amount2").val( $( "#slider" ).slider( "values", 1 ));
  });
}
