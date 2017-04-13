jQuery(document).ready(function () {

    "use strict";

    /*back to top */
    jQuery('.tz-backtotop').click(function () {
        jQuery('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });
});

/**
 * method for menu
 */
jQuery(window).scroll(function () {

    "use strict";
    const $_scrollTop = jQuery(window).scrollTop();
    const $home_slider_meetup = jQuery('.tz_home_slider_meetup');
    const $_height = $home_slider_meetup.height();

    const $_height_menu = 97;
    const $type_position = jQuery('.tz-headerHome.tz-homeTypeFixed').length;
    const headerType = jQuery('.tz-headerHome').attr('data-option');

    if (headerType === '2' || headerType === '3' && $type_position > 0) {
        console.log(headerType);

        if ($_scrollTop > 0) {
            jQuery('.tz-homeType2').addClass('tz-menuEffect-1');
        } else {
            jQuery('.tz-homeType2').removeClass('tz-menuEffect-1');
        }

        if ($home_slider_meetup.length) {

            if ($_scrollTop >= ($_height - $_height_menu)) {
                jQuery('.tz-homeType2').addClass('tz-menuEffect');
            } else {
                jQuery('.tz-homeType2').removeClass('tz-menuEffect');
            }

        }
    }

});
