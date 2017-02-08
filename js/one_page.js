jQuery(document).ready(function() {
    "use strict";
    var $_height = jQuery('.tz-headerSlider').height();
    var $_heightProvo = jQuery('#Tz-provokeMe').height();
    var $_heightHeader = $_heightProvo + $_height;

    jQuery('.tz-homeType4').css('height',$_heightHeader +'px');
    var $nav;
    $nav = jQuery('.tz-nav');
    $nav.onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 2200,
        scrollOffset: 100,
        scrollThreshold: 0.5,
        filter: '',
        easing: '',
        begin: function () {
            /* I get fired when the animation is starting */
        },
        end: function () {
            /* I get fired when the animation is ending */
        },
        scrollChange: function ($currentListItem) {
            /* I get fired when you enter a section and I pass the list item of the section */
        }
    });

    var $tz_slider_home_btn = jQuery('.tz_slider_home_btn_click');
    $tz_slider_home_btn.onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 2200,
        scrollOffset: 0,
        scrollThreshold: 0.5,
        filter: '',
        easing: '',
        begin: function () {
            /* I get fired when the animation is starting */
        },
        end: function () {
            /* I get fired when the animation is ending */
        },
        scrollChange: function ($currentListItem) {
            /* I get fired when you enter a section and I pass the list item of the section */
        }
    });

    var $tz_meetup_btn = jQuery('.tz_meetup_btn');
    $tz_meetup_btn.onePageNav({

        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 2200,
        scrollOffset: 0,
        scrollThreshold: 0.5,
        filter: '',
        easing: '',
        begin: function () {
            /* I get fired when the animation is starting */
        },
        end: function () {
            /* I get fired when the animation is ending */
        },
        scrollChange: function ($currentListItem) {
            /* I get fired when you enter a section and I pass the list item of the section */
        }

    });

    var $tz_meetup_header_option_phone = jQuery('.tz_meetup_header_option_phone');
    $tz_meetup_header_option_phone.onePageNav({

        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 2200,
        scrollOffset: 0,
        scrollThreshold: 0.5,
        filter: '',
        easing: '',
        begin: function () {
            /* I get fired when the animation is starting */
        },
        end: function () {
            /* I get fired when the animation is ending */
        },
        scrollChange: function ($currentListItem) {
            /* I get fired when you enter a section and I pass the list item of the section */
        }

    });

});

jQuery(window).load(function(){
    "use strict";

    var $tp_mask_wrap = jQuery('.tp-mask-wrap');
    $tp_mask_wrap.onePageNav({

        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 2200,
        scrollOffset: 0,
        scrollThreshold: 0.5,
        filter: '',
        easing: '',
        begin: function () {
            /* I get fired when the animation is starting */
        },
        end: function () {
            /* I get fired when the animation is ending */
        },
        scrollChange: function ($currentListItem) {
            /* I get fired when you enter a section and I pass the list item of the section */
        }

    });

});
