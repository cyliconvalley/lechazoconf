/**
 *  Gallery
 */

"use strict";

function tz_init(item_width){

    var Desktop         = 4,
        tabletportrait  = 2,
        mobilelandscape = 2,
        mobileportrait  = 1,
        cols            = 2;

    var window_width = jQuery(window).width();
    var tzmasonry   =   jQuery('.tzmasonry');

    if (window_width>1200){
        cols = Desktop;
    }
    if ((992 < window_width) && (window_width<= 1200) ){
        cols = tabletportrait;
    }
    if ((480 <= window_width) && (window_width<= 992) ){
        cols = mobilelandscape;
    }
    if (window_width < 480){
        cols = mobileportrait;
    }

    var container_width = tzmasonry.width();
    var item_width = container_width/cols;
    var item_width2 = item_width*2;
    jQuery('.pgthumb').css({
        width:item_width+'px'
    });
    jQuery('.item_width2').css({
        width:item_width2+'px'
    });
    var $grid = tzmasonry.imagesLoaded( function() {
        $grid.masonry({
            itemSelector: '.pgthumb',
            percentPosition: true,
            columnWidth: item_width
        });
    });
    TzTemplateResizeImage(jQuery('.simple'));
}

var tz_resizeTimer = null;
jQuery(window).bind('load resize', function() {
    var cols = 4;
    var album = jQuery('#pgalbums').children().length;
    var container_width = jQuery('.tzmasonry').width();
    var item_width = container_width/cols;
    jQuery('.pgthumb').css({
        'width':item_width+'px'
    });
    if(album>0){
        TzTemplateResizeImage(jQuery('.simple'));
    } else{
        if (tz_resizeTimer) clearTimeout(tz_resizeTimer);
        tz_resizeTimer = setTimeout("tz_init()", 100);
    }
});

jQuery(document).ready(function(){
    jQuery('#plusgallery1').plusGallery();
});
