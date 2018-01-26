window.sketches = new Object;

window.sketches.molnar = {

	meta:{
		title:'Between Emotion and Method',
		desc:'after Vera Molnar'
	},

	code: function(p){

		var margin = 64;

		var colors = [
			'#9c4227',
			'#675e90',
			'#a88a1a',
			'#b3cdca',
			'#b09496'
		]

		p.setup = function() {
		  	p.createCanvas(640, 320);
			p.noLoop();
		}

		p.draw = function() {
		  	p.background(49,32,32);

			p.noFill();
			p.strokeWeight(3);

			c = p.int(p.random(colors.length));

			for(y = margin; y <= p.height-margin; y += (p.width-margin*2)/8){
				for(x = margin; x <= p.width-margin; x += (p.height-margin*2)/3){
					c = (c + 1) % colors.length;
					if (p.random() > 0.8){c = p.int(p.random(colors.length));}
					p.stroke(colors[c]);
					p.squa(x,y,margin*0.3);
				}
			}

		}

		p.mousePressed = function(){
			p.draw();
		}

		p.keyPressed = function(){
			if(p.key == 'R'){
				p.draw();
			}
		}

		p.squa = function(x,y,size){
			p.beginShape();
			for(i = 0; i <= 20; i++){
				var xx = x + Math.sign(-1.5 +  (i % 4)) * size;
				var yy = y + Math.sign(-1.5 +  ((i + 1) % 4)) * size;
				var rx = p.random(-1,1) * margin * 0.3;
				var ry = p.random(-1,1) * margin * 0.3;
				p.vertex(xx+rx,yy+ry);
			}


			p.endShape();
		}

	}
}

window.sketches.sykora = {

	meta:{
		title:'Line No. 50',
		desc:'after Zdeněk Sýkora'
	},

	code: function(p){

		var margin = 64;
		var noiseScale = 0.006;

		var colors = [
			'#221111',
			'#9977ee',
			'#a85020',
			'#b3cdca',
			'#b09496'
		]

		p.setup = function() {
		  	p.createCanvas(640, 320);
			p.noLoop();
		}

		p.draw = function() {
		  	p.background(250,250,245);

			p.noFill();
			//p.strokeWeight(3);

			c = p.int(p.random(colors.length));

			for (var i = 0; i < 60; i++) {
				c = (c + 1) % colors.length;
				p.stroke(colors[c]);

				var weight = p.pow(p.random(1.5,5),2);
				p.strokeWeight(weight);

				var pos = p.createVector(p.random(margin,p.width-margin),p.random(margin,p.height-margin))
				var vel = p5.Vector.random2D();

				var m = vel.copy();

				//march and draw line
				p.beginShape();
				for (var j = 0; j < 200; j++) {
					var m1 = p.noise(pos.x * noiseScale,pos.y * noiseScale,weight);
					var m2 = p.noise(pos.x * noiseScale,pos.y * noiseScale,weight+100);
					m1 = (m1 - 0.5) * 30;
					m2 = (m2 - 0.5) * 30;

					m.lerp(m1,m2,0,0.9);

					vel.lerp(m,0.8);

					pos.add(vel);

					p.vertex(pos.x,pos.y);
				}
				p.endShape();

				//p.ellipse(20,20,20);
			}

		}

		p.mousePressed = function(){
			p.draw();
		}

		p.keyPressed = function(){
			if(p.key == 'R'){
				p.draw();
			}
		}

	}
}

// bottom!

//# sourceMappingURL=sketches.js.map
