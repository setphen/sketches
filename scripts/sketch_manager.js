//some buttons and stuff so that we can switch the sketches
var p;

var sketchdiv = document.getElementById('sketch');
var titlediv = document.getElementById('sketch-title');
var descdiv = document.getElementById('sketch-desc');
var catalog = document.getElementById('catalog');

loadSketch = function(sketch){
    p = new p5(sketch.code, sketchdiv);

    if (sketch.meta != undefined){
        titlediv.innerHTML = sketch.meta.title || 'Untitled';
        descdiv.innerHTML = sketch.meta.desc  || '';
    }
}

window.onload = function(){
    Object.keys(window.sketches).forEach(function(sketchName){
        var sketch = window.sketches[sketchName]
        var e = document.createElement('ln');
        e.className = 'sketch-button';
        e.innerHTML = sketch.meta.title;
        e.onclick = function(){
            if(p){
                p.remove();
            }
            loadSketch(sketch)
        }
        catalog.appendChild(e);
    });

    // choose the starting sketch
    loadSketch(window.sketches['sykora'])
}

//# sourceMappingURL=sketch_manager.js.map
