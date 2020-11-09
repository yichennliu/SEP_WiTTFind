function start_loading_animation(){
  $(document.body).prepend($(document.createElement("div"))
    .attr('id', 'loadingBar'))
}
function stop_loading_animation(){
  $("#loadingBar").remove()
}

