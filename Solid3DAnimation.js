px.import("px:scene.1.js").then( function ready(scene) {
var root = scene.root;
var basePackageUri = px.getPackageBaseFilePath();

var url;

var maxX = 1200
var maxY = 1400

// First time when scene is loading

var txt1 = scene.create({t:"text",x:5,text:"Move your mouse to see the mouse positon",parent:root,pixelSize:32});

url = basePackageUri + "/MultipleImages/pp5.png"
var solidAnimation = scene.create({t:'object',parent:root})


var soldObject = scene.create({t:"image",url:url,parent:solidAnimation,a:0});
soldObject.ready.then(function() {
  
  soldObject.animate({a:1},0.8,scene.TWEEN_LINEAR);

  startAnimation(soldObject);
});


function startAnimation(o) {
  var startX = 350;
  var startY = 200;

  // animate x and restart the overall animation at end
  o.x = startX;
  o.y= startY;
  o.animateTo({x:50}, 1.0, scene.animation.TWEEN_LINEAR,scene.animation.OPTION_LOOP, 1)
    .then(function(o){
     o.animateTo({y:startY}, 3.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1)
        .then(function(o){
          startAnimation(o);
      })
  });

  // animate y
  o.y = startY;
  o.animateTo({y:350}, 1.0, scene.animation.EASE_IN_QUAD, scene.animation.OPTION_LOOP, 1)
    .then(function(o) {
      o.animateTo({y:startY}, 1.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);
  });

}


scene.on("onMouseDown", function(e) {
	
	 txt1.text = " Mouse down at" + e.x + ", " + e.y + " cordinates";
     txt1.textColor =0xff0000ff;	 
});

scene.on("onMouseMove", function(e) {
	
	 txt1.text = " Mouse moving at " + e.x + ", " + e.y + " cordinates";
     
     txt1.textColor =0x00ff00ff;	 
});


scene.on("onMouseUp", function(e) {
	
	 txt1.text = " Mouse up at " + e.x + ", " + e.y + " cordinates";
	 txt1.textColor =0x00ff00ff;
     
});



function updateSize(w, h) {

    txt1.y = h-txt1.h;
    var sx = w/maxX
    var sy = h/maxY
    solidAnimation.sx = solidAnimation.sy = (sx<sy)?sx:sy
}

scene.on("onResize", function(e) {console.log("fancy resize", e.w, e.h); updateSize(e.w,e.h);});
updateSize(scene.getWidth(), scene.getHeight());

}).catch( function importFailed(err){
  console.error("Import failed for fancy.js: " + err)
});