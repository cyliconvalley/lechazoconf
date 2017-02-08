function TzTemplateResizeImage(obj){
    "use strict";
    var widthStage;
    var heightStage ;
    var widthImage;
    var heightImage;
    obj.each(function (i,el){

        heightStage = jQuery(this).height();

        widthStage = jQuery (this).width();

        var img_url = jQuery(this).find('img').attr('src');

        var image = new Image();
        image.src = img_url;

        widthImage = image.naturalWidth;
        heightImage = image.naturalHeight;

        var tzimg	=	new resizeImage(widthImage, heightImage, widthStage, heightStage);
        jQuery(this).find('img').css ({ top: tzimg.top, left: tzimg.left, width: tzimg.width, height: tzimg.height });


    });

}


jQuery(document).ready(function() {
    "use strict";

    jQuery('.tz-blogSlider').flexslider({
        slideshowSpeed: 5000,
        animationSpeed: 1000,
        animation: "slide",
        slideshow:  false,
        controlNav: true,
        animationLoop: true,
        directionNav: false,
        prevText: "",
        nextText: "",
        smoothHeight: true
    });

    jQuery('.tz-blogSlider-related').flexslider({
        slideshowSpeed: 5000,
        animationSpeed: 1000,
        animation: "slide",
        slideshow:  false,
        controlNav: true,
        animationLoop: true,
        directionNav: false,
        prevText: "",
        nextText: "",
        smoothHeight: true
    });

    /* jquery single share */
    var $share_if = true;
    jQuery('.p-share').click(function(){
        if ( $share_if == true ){
            jQuery('.share-wrap-content').addClass('share-wrap-full');
            $share_if = false;
        }else{
            jQuery('.share-wrap-content').removeClass('share-wrap-full');
            $share_if = true;
        }

    });

});

jQuery(window).on("load resize",function(){

    "use strict";

    TzTemplateResizeImage(jQuery('.tz-blog-thubnail-item'));

});