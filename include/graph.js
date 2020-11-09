/**
 * @file Displays the Graph Editor on search page
 * @author Stefan Schweter <stefan@schweter.it>, Yuliya Kalasouskaya
 */


/**
 * GET request from graph.html file will
 * display that content in a special graph div.
 */
function inject_graph_html()
{
  var d_output = "";

  d_output += '<div class="panel-group" id="accordion_grapheditor" role="tablist" aria-multiselectable="true">';
  d_output += '<div class="panel panel-default">';
  d_output += '<div class="panel-heading" role="tab" id="heading_graph">';
  d_output += '<h4 class="panel-title">';
  d_output += '<a data-toggle="collapse" data-parent="#accordion_grapheditor" href="#collapse_graph" aria-expanded="true" aria-controls="collapse_graph">';
  d_output += 'Graphischer Editor';
  d_output += '</a></h4>';

  /** Closes panel-heading div */
  d_output += '</div>';

  d_output += '<div id="collapse_graph" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_graph">';
  d_output += '<div class="panel-body">';

  d_output += '<iframe src="grapheditor.html" style="width:100%; min-height:700px;"/>';

  /** Closes panel-body div */
  d_output += "</div>";

  /** Closes panel-collapse collapse in div */
  d_output += "</div>";

  /** Closes panel-default div */
  d_output += "</div>";

  $('.graph').append(d_output);
}

/**
 * Shows graph editor page via html *injection*
 */
function show_graph_editor() {
  inject_graph_html();
}
