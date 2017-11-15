window.sketches.sketch1 = function(p){
	p.setup = function() {
	  	p.createCanvas(640, 320);
	  	p.background(255);
	}

	p.draw = function() {
	  	if (p.mouseIsPressed) {
	    	p.fill(0);
	  	} else {
	    	p.fill(255);
	  	}

		p.ellipse(p.mouseX, p.mouseY, 80, 80);
	}
}
