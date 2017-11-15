//some buttons and stuff so that we can switch the sketches
var p;

var sketchdiv = document.getElementById('sketch');
var catalog = document.getElementById('catalog');

Object.keys(window.sketches).forEach(function(sketch){
    var e = document.createElement('button');
    e.innerHTML = sketch;
    e.onclick = function(){
        if(p){
            p.remove();
        }
        p = new p5(window.sketches[sketch], sketchdiv);
    }
    catalog.appendChild(e);
});

//# sourceMappingURL=sketch_manager.js.map
