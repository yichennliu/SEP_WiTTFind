zoom = sessionStorage.getItem(c_zoom_factor_name);

// size width 300 height 150
function calcMousePos(zoom, img, glass, e) {
	var w, h, mouseX, mouseY;
	
	w = glass.width()/2;
	h = glass.height()/2;

	e.preventDefault();
	e = e || window.event;

	offset = $(img).offset();
	position = $(img).position();

	mouseX = (e.pageX - offset.left);
	mouseY = (e.pageY - offset.top);
	
	glass.css("cursor", "none");
	glass.css("visibility", "visible");
	glass.css("left", (mouseX-glass.width() + 150  + position.left) + "px");
	glass.css("top", (mouseY-glass.height() + 75  + position.top) + "px");
	glass.css("backgroundPosition", -1*(((mouseX +150/zoom) * zoom) - w*2) + "px " + -1*(((mouseY + 75/zoom) * zoom) - h*2) + "px");
	
	if(mouseX <= 0 || mouseY <= 0 || mouseX >= $(img).width() || mouseY >= $(img).height()){
		glass.css("visibility", "hidden");
	}
} 


function magnifyImg(e){
	img = e.target;
	glass = $(img).parent().find(".img-magnifier-glass").first();

	if(create_accordion_entry_at_index.imgStatusMap[img.getAttribute("id")] === true){		
		if(!glass.hasOwnProperty("background")){
			glass.css("background", "url('" + img.src + "')");
			glass.css("backgroundRepeat", "no-repeat");
			glass.css("backgroundSize", (img.width * zoom) + "px " + (img.height * zoom) + "px");
		}
		
		calcMousePos(zoom, img, glass, e);
	}		
}

function calcMousePosition(e){
	glass = $(e.target);
	img = glass.parent().find("img").first();
	
	calcMousePos(zoom, img, glass, e);
}

function hideMagnifier(e){
	$(".img-magnifier-glass").css("visibility", "hidden");
}

