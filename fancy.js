px.import("px:scene.1.js").then( function ready(scene) {
var root = scene.root;
var basePackageUri = px.getPackageBaseFilePath();

var url;

var maxX = 1200
var maxY = 1400



var txt1 = scene.create({t:"text",x:1,text:"",parent:root,pixelSize:32});


url = basePackageUri + "/images/emoji.png"
var emojiScene = scene.create({t:'object',parent:root})


var ball = scene.create({t:"image",url:url,parent:emojiScene,a:0});
ball.ready.then(function() {
  ball.cx = ball.resource.w/2;
  ball.cy = ball.resource.h/2;
  ball.animate({a:1},0.4,scene.TWEEN_LINEAR)

  fancy(ball);
});


function fancy(o) {
  var startX = 350;
  var startY = 200;

  // animate x and restart the overall animation at end
  o.x = startX;
  o.animateTo({x:50}, 1.0, scene.animation.TWEEN_LINEAR,scene.animation.OPTION_LOOP, 1)
    .then(function(o){
      o.animateTo({x:startX}, 3.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1)
        .then(function(o){
          fancy(o);
      })
  });

  // animate y
  o.y = startY;
  o.animateTo({y:350}, 1.0, scene.animation.EASE_OUT_BOUNCE, scene.animation.OPTION_LOOP, 1)
    .then(function(o) {
      o.animateTo({y:startY}, 1.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);
  });

  // animate r
  o.r = 0;
  o.animateTo({r:-360}, 2.5, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);

  // animate sx, sy
  o.animateTo({sx:0.2,sy:0.2}, 1, scene.animation.TWEEN_LINEAR, scene.animation.OPTION_LOOP, 1)
    .then(function(o){
      o.animateTo({sx:2.0,sy:2.0}, 1.0, scene.animation.TWEEN_EXP1, scene.animation.OPTION_LOOP, 1)
        .then(function(o) {
          o.animateTo({sx:1.0,sy:1.0}, 1.0, scene.animation.EASE_OUT_ELASTIC, scene.animation.OPTION_LOOP, 1);
      })
  });
}



scene.on("onMouseMove", function(e) {
    txt1.text = " Hello ! There you go............" + e.x + ", " + e.y;
});

function updateSize(w, h) {

    txt1.y = h-txt1.h;
    var sx = w/maxX
    var sy = h/maxY
    emojiScene.sx = emojiScene.sy = (sx<sy)?sx:sy
}

scene.on("onResize", function(e) {console.log("fancy resize", e.w, e.h); updateSize(e.w,e.h);});
updateSize(scene.getWidth(), scene.getHeight());

}).catch( function importFailed(err){
  console.error("Import failed for fancy.js: " + err)
});