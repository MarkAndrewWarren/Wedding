function ajustMobile(){
    if(window.mobileCheck()){
        $("#img_Schedule").attr("src", "images/img_schedulemobile.png")
        $("#img_Schedule").width("800")
    }
}
ajustMobile();
