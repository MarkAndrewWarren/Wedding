//is mobile
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


//debugger;
var windowSize = window.innerWidth;
if(window.mobileCheck())
  windowSize = 980;
var FgHeight = 2500;
var FgIconHeight = 2000;
var ratio =  windowSize/2400;
var bg_top = 800 * ratio;


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

var fixSub = function($object){  
  $object.offset({ top: (-1 * bg_top), left: $object.offset().left});
  $object.css({"background-position-y" : (600 * ratio) + 'px' });
};

var adjustImageToFitScreen = function($object){
	$object.css({"background-size" : windowSize+ 'px auto' });
  $object.width(windowSize);

  $object.height(ratio * 1055);
}

var adjustTitleToFitScreen = function($object){
  $object.height(ratio  * $object.height());
}

var adjustMenuToFitScreen = function($object){
  $object.width((60 / (ratio* 1.7))  + '%' );
}

var adjustHeightToFitScreen = function($bg, $img){
  $bg.css('min-height', $img.height() + (900 * ratio));
}

var convertToMobile = function(amount, $object){
  if(window.mobileCheck()){
    amount = amount * 1.7; 
    $object.css('min-height', amount);
  }
}

var adjustTopMarginMobile = function(amount, $object){
  if(window.mobileCheck()){
    amount = amount * .75; 
    $object.css('margin-top', amount);
  }
}

//Just pass the jQuery object
background_image_parallax($(".home_bg_1"), .7);

//optional second value for speed
background_image_parallax($(".home_bg_2"), 0.5);

//optional second value for speed
background_image_parallax($(".home_bg_3"), 0.45);

background_image_parallax($(".home_bg_4"), 0.37);

background_image_parallax($(".home_bg_5"), 0.31);

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

adjustTitleToFitScreen($("#img_title"));
adjustMenuToFitScreen($(".menu-center"));


fixSub($(".sub-content"));

adjustHeightToFitScreen($(".main-content"), $(".home_bg_1"));

