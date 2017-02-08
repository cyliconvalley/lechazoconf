/**
 * Home Masonry
 */

"use strict";

var Desktop         = 3,
    tabletportrait  = 2,
    mobilelandscape = 1,
    mobileportrait  = 1,
    tz_resizeTimer  = null;

function tz_init(Desktop, tabletportrait, mobilelandscape, mobileportrait){

    var window_width = jQuery(window).width();
    var home_masonry = jQuery('.tzBlogmasonry');

    var numberItem      = 2;
    var newColWidth     = 0;

    if (window_width >= 1200) {
        numberItem = Desktop;
    } else if (  window_width >= 768) {
        numberItem = tabletportrait ;
    } else if (  window_width >= 480) {
        numberItem = mobilelandscape ;
    } else if (window_width < 480) {
        numberItem = mobileportrait ;
    }

    var home_masonry_width = home_masonry.width();

    newColWidth = home_masonry_width / numberItem;

    jQuery('.blogMasonry-item').css('width',newColWidth);

    var $grid = home_masonry.imagesLoaded( function() {
        $grid.masonry({
            itemSelector: '.blogMasonry-item',
            percentPosition: true,
            columnWidth: newColWidth
        });
    });

}

jQuery(window).on('load resize', function() {
    if (tz_resizeTimer) clearTimeout(tz_resizeTimer);
    tz_resizeTimer = setTimeout("tz_init(Desktop, tabletportrait, mobilelandscape, mobileportrait)", 100);
});