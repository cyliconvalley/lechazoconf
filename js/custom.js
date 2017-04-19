/**
 * method for menu
 */
jQuery(window).scroll(function () {

    "use strict";
    const $_scrollTop = jQuery(window).scrollTop();

    const $_height_menu = 97;
    const $type_position = jQuery('.header-home.tz-homeTypeFixed').length;
    const headerType = jQuery('.header-home').attr('data-option');

    if (headerType === '2' || headerType === '3' && $type_position > 0) {
        console.log(headerType);

        if ($_scrollTop > 0) {
            jQuery('.tz-homeType2').addClass('tz-menuEffect-1');
        } else {
            jQuery('.tz-homeType2').removeClass('tz-menuEffect-1');
        }
    }

});
