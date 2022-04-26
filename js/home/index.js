//debugger;
var FgHeight = 2500;
var FgIconHeight = 2000;
var ratio =  window.innerWidth/2400;
var bg_top = 830 * ratio;


// The function
var background_image_parallax = function($object, multiplier){
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
multiplier = 1 - multiplier;
  var $doc = $(document);
  $object.css({"background-attatchment" : "fixed"});
$(window).scroll(function(){
  var from_top = $doc.scrollTop(),
      bg_css = '0px ' +(multiplier * from_top) + 'px';
      if(from_top < bg_top){
        $object.css({"background-position" : bg_css });
        $object.offset({ top: 0, left: $object.offset().left });
      }
      else{
        $object.offset({ top: (from_top - bg_top), left: $object.offset().left });
      }

  });
};

var fixFg = function($object){  
  $object.offset({ top: (-1 * bg_top), left: $object.offset().left});
  $object.css({"background-position-y" : (500 * ratio) + 'px' });
};

var adjustImageToFitScreen = function($object){
	var windowSize = window.innerWidth;
	$object.css({"background-size" : windowSize+ 'px auto' });
  $object.width(windowSize);

  $object.height(ratio * 1055);
}

//Just pass the jQuery object
background_image_parallax($(".home_bg_1"), .7);

//optional second value for speed
background_image_parallax($(".home_bg_2"), 0.5);

//optional second value for speed
background_image_parallax($(".home_bg_3"), 0.4);

background_image_parallax($(".home_bg_4"), 0.35);

background_image_parallax($(".home_bg_5"), 0.30);

background_image_parallax($(".home_bg_6"), 0.25);

background_image_parallax($(".home_bg_7"), 0.2);

background_image_parallax($(".home_bg_8"), 0.13);

//optional second value for speed
background_image_parallax($(".home_bg_Sky"), 0.1);

adjustImageToFitScreen($(".home_bg_1"));
adjustImageToFitScreen($(".home_bg_2"));
adjustImageToFitScreen($(".home_bg_3"));
adjustImageToFitScreen($(".home_bg_4"));
adjustImageToFitScreen($(".home_bg_5"));
adjustImageToFitScreen($(".home_bg_6"));
adjustImageToFitScreen($(".home_bg_7"));
adjustImageToFitScreen($(".home_bg_8"));
adjustImageToFitScreen($(".home_bg_sky"));

adjustImageToFitScreen($(".home_fg_couple"));
fixFg($(".home_fg_couple"));