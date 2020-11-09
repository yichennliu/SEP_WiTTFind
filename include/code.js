/*
 * Url preview script 
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * modified by Angela Krey
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */
 
this.screenshotPreview = function(){	
	/* CONFIG */
		
		xOffset = 1;
		yOffset = 1;
		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
		
	/* END CONFIG */
	$(".screenshot").hover(function(){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<p id='screenshot'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");								 
		$("#screenshot")
			.css("top",100 + "px")
			.css("left", 100 + "px")
			.fadeIn('fast');						
    },
	function(){
		this.title = this.t;	
		$("#screenshot").remove();
    });	
	$(".screenshot").mousemove(function(){
		$("#screenshot")
			.css("top",100 + "px")
			.css("left",100 + "px");
	});			
};


// starting the script on page load
$(document).ready(function(){
	screenshotPreview();
});