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


jQuery(document).ready(function(){

    "use strict";

    /*back to top */
    jQuery('.tz-backtotop').click(function(){
        jQuery('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });

    /* slider home */
    var $tz_home_slider_meetup = jQuery('.tz_home_slider_meetup');

    if ( $tz_home_slider_meetup.length ) {

        /* bxSlider */
        jQuery('.bxslider').bxSlider({
            adaptiveHeight: true,
            nextText: '',
            prevText: '',
            controls: true,
            pager: true,
            speed: 800,
            auto: false
        });

        /* countdown slider home */
        var $tz_meetup_countdown = jQuery('.tz_meetup_countdown');
        if ( $tz_meetup_countdown.length > 0 ) {

            var $data_countdown     =   '2016/12/30 23:59:59';
            var $data_text_ended    =   'The event is ended';

            var $data_text_day      =   'days';
            var $data_text_hours    =   'hours';
            var $data_text_min      =   'mins';
            var $data_text_sec      =   'secs';


            jQuery('#clock').countdown($data_countdown)
                .on('update.countdown', function(event) {
                    var $this = jQuery(this).html(event.strftime(''
                        + '<div class="tz_meetup_countdown_time"><span>%D</span><b>'+ $data_text_day +'</b></div> '
                        + '<div class="tz_meetup_countdown_time"><span>%H</span><b>'+ $data_text_hours +'</b></div> '
                        + '<div class="tz_meetup_countdown_time"><span >%M</span><b>'+ $data_text_min +'</b></div> '
                        + '<div class="tz_meetup_countdown_time"><span>%S</span><b>'+ $data_text_sec +'</b></div> '
                    ));
                })
                .on('finish.countdown', function(event) {
                    jQuery(this).html('<span class="tz_meetup_countdown_over">'+ $data_text_ended +'</span>')
                        .parent().addClass('disabled');

                });
        }

    }

    /* opacity scroll */

    if ( $tz_home_slider_meetup.length ) {

        var header_social = jQuery('.tz_content_slider_meetup');
        var range = 380;
        jQuery(window).on('scroll', function () {
            var st = jQuery(this).scrollTop();
            header_social.each(function () {
                var offset = jQuery(this).offset().top;
                var height = jQuery(this).outerHeight();
                offset = offset + height / 2;
                jQuery(this).css({ 'opacity': 1 - (st - offset + range) / range });
            });
        });

    }


    /* Method for Search */

    var $tz_search          =   jQuery('.tz-search');
    var $tz_search_header_3 =   jQuery('.tz-search-header3');

    if ( $tz_search.length > 0 ) {
        $tz_search.click(function(){
            jQuery('.tz-form-search').css('display','block');
            jQuery('.tz-form-search .tz-search-input').focus();
        }) ;
        jQuery('.tz-form-close').click(function(){
            jQuery('.tz-form-search').css('display','none');
        });
    }

    if ( $tz_search_header_3.length > 0 ) {
        $tz_search_header_3.click(function(){
            jQuery('.tz-form-search').css('display','block');
            jQuery('.tz-form-search .tz-search-input').focus();
        }) ;
        jQuery('.tz-form-close').click(function(){
            jQuery('.tz-form-search').css('display','none');
        });
    }

    /* Counter */
    function count($this){
        var current = parseInt($this.html(), 10);
        current = current + 1; /* Where 50 is increment */

        $this.html(++current);
        if(current > $this.data('count')){
            $this.html($this.data('count'));
        } else {
            setTimeout(function(){count($this)}, 50);
        }
    }

    jQuery(".stat-count").each(function() {
        jQuery(this).data('count', parseInt(jQuery(this).html(), 10));
        jQuery(this).html('0');
        count(jQuery(this));
    });

    /* slider meetup */
    var $tz_meetup_slider = jQuery(".tz_meetup_slider");

    if ( $tz_meetup_slider.length ) {

        $tz_meetup_slider.each(function(){
            jQuery(this).owlCarousel({
                items : 1,
                slideSpeed:500,
                paginationSpeed:800,
                dotData:true,
                autoPlay: false,
                autoHeight:true
            });
        });

    }

    /* Method for parallax */
    var $tz_parallax = jQuery('.parallax');
    if ( $tz_parallax.length ) {
        $tz_parallax.each(function(){
            jQuery(this).parallax("30%", 0.1);
        });
    }

    /* Twitter */
    var $tzTwitter_slider_box = jQuery(".tzTwitter-slider-box");

    if ( $tzTwitter_slider_box.length ) {

        jQuery(".tzTwitter-slider").each(function(){
            jQuery(this).owlCarousel({
                items : 1,
                smartSpeed:800,
                paginationSpeed:800,
                dotData:true,
                autoplay: false
            });
        });

    }

    /* Partner slider */
    var $tz_partner = jQuery(".tz-partner");
    if ( $tz_partner.length ) {
        var $partner_slider = jQuery(".partner-slider");

        $partner_slider.each(function(){
            jQuery(this).owlCarousel({
                responsive : {
                    0 : {
                        items:1
                    },

                    556 : {
                        items:2
                    },

                    768 : {
                        items:3
                    },
                    991: {
                        items:5
                    }
                },
                smartSpeed:800,
                paginationSpeed:800,
                dots:false,
                autoplay: false,
                loop: true
            });

            jQuery('.tz_partner_prevs_type2').click(function(){
                $partner_slider.trigger('prev.owl.carousel');
            });
            jQuery('.tz_partner_nexts_type2').click(function(){
                $partner_slider.trigger('next.owl.carousel');
            });

        })
    }

    /* Recent posts */
    var $tz_recent_blog_meetup = jQuery(".tz_recent_blog_meetup");
    if ( $tz_recent_blog_meetup.length ) {
        var tz_meetup_slider_partner = jQuery('.tz_meetup_slider_blog');

        tz_meetup_slider_partner.owlCarousel({
            responsive : {
                0 : {
                    items:1
                },

                556 : {
                    items:2
                },
                991: {
                    items:3
                }
            },
            smartSpeed:800,
            paginationSpeed:800,
            dots:false,
            autoplay: false,
            loop: true
        });

        jQuery('.tz_recent_blog_pev_meetup').click(function(){
            tz_meetup_slider_partner.trigger('prev.owl.carousel');
        });
        jQuery('.tz_recent_blog_next_meetup').click(function(){
            tz_meetup_slider_partner.trigger('next.owl.carousel');
        });

    }

    /* prettyPhoto for image gallery modal popup custom portfolio */
    var $latestPhoto = jQuery("a[data-rel^='latestPhoto']");
    if( $latestPhoto.length > 0){
        $latestPhoto.prettyPhoto({
            social_tools: false,
            hook: 'data-rel'
        });
    }

    /* prettyPhoto for image gallery modal popup */
    var $prettyPhoto = jQuery("a[data-rel^='prettyPhoto']");
    if ( $prettyPhoto.length > 0 ) {
        $prettyPhoto.prettyPhoto({
            social_tools: false,
            hook: 'data-rel'
        });
    }
    /* prettyPhoto for image flick */
    var $prettyPhoto_flickr = jQuery("a[data-rel^='prettyPhoto_flickr']");
    if ( $prettyPhoto_flickr.length > 0 ) {
        $prettyPhoto_flickr.prettyPhoto({
            social_tools: false,
            hook: 'data-rel'
        });
    }


});

jQuery(window).on("load resize",function(){

    "use strict";

    var $win_width = jQuery(window).width();


    /* height slider home */

    if ( jQuery('.tz_home_slider_meetup').length > 0 ) {
        var $height_width = jQuery(window).height();
        var $height_width_header = jQuery('.tz-headerHome').innerHeight();

        if ( jQuery('.tz-headerHome.tz-homeTypeFixed').length > 0 ) {

            if ( $win_width <= 768 ) {

                jQuery(".tz_home_slider_meetup .bx-wrapper").css("height", ($height_width-$height_width_header) +'px' );
                jQuery(".tz_home_slider_meetup ul.bxslider li").css("height", ($height_width-$height_width_header) +'px' );

            }
            if ( $win_width > 768 ) {
                jQuery(".tz_home_slider_meetup .bx-wrapper").css("height", $height_width +'px' );
                jQuery(".tz_home_slider_meetup ul.bxslider li").css("height", $height_width +'px' );
            }

        }else {

            jQuery(".tz_home_slider_meetup .bx-wrapper").css("height", ($height_width-$height_width_header) +'px' );
            jQuery(".tz_home_slider_meetup ul.bxslider li").css("height", ($height_width-$height_width_header) +'px' );

        }
        TzTemplateResizeImage(jQuery('.tz_home_slider_meetup_setting .bx-viewport ul li'));
    }

    /* width column */

    var $tz_width_column = jQuery('.tz_width_column');
    if ( $tz_width_column.length > 0 ) {
        if ( $win_width >= 992 ) {
            var $contain_width = jQuery('.container').width();
            $tz_width_column.each(function () {
                var $tz_check_width = jQuery(this).width();
                var $tz_width_meetup_video_text = $tz_check_width - (($win_width - $contain_width) / 2);
                jQuery(this).find('.tz_custom_width').css("width", $tz_width_meetup_video_text);
            })
        }
    }

    /* height video meetup */
    if ( jQuery(".tz_video_equal_height_meetup").length ){

        if ( $win_width >= 992 ) {

            var $tz_video_meetup = jQuery('.tz_video_meetup');
            var $tz_video_meetup_height    =   $tz_video_meetup.parents().find('.tz_height_text_video').height();
            $tz_video_meetup.css("height", $tz_video_meetup_height);
            TzTemplateResizeImage($tz_video_meetup);

        }
    }

    /* tz_slider_meetup_full  */
    jQuery('.tz-full-slider-meetup').each(function(){

        var $tz_top_owl_controls = jQuery(this).parents('#slider_meetup').height();
        jQuery(".tz_slider_meetup .owl-theme .owl-dots").css({ top: $tz_top_owl_controls });

    });

    /* Our Team meetup start */
    var $tz_meetup_our_team_thumbnail = jQuery(".tz_meetup_our_team_thumbnail");
    if ( $tz_meetup_our_team_thumbnail.length ) {

        if ( $win_width >= 992 ) {
            jQuery('.tz_column_inner_meetup').each(function () {
                var $to = jQuery(this).find('.tz_meetup_our_team_thumbnail').length;
                var $height_vc_column_inner = jQuery(this).height();
                $tz_meetup_our_team_thumbnail.css("height", ($height_vc_column_inner / $to));

                TzTemplateResizeImage(jQuery('.tz_meetup_our_team_thumbnail'));

            });
        }
    }

    /* height TZGmap */
    var tz_equal_height_gmap = jQuery(".tz_equal_height_gmap");
    if ( tz_equal_height_gmap.length > 0 ){

        if ( $win_width >= 992 ) {
            var $Tzmap_meetup = tz_equal_height_gmap.parent().height();
            tz_equal_height_gmap.css("height", $Tzmap_meetup);
        }

    }

});



/**
 * method for menu
 */
jQuery(window).scroll(function(){

    "use strict";
    var $_scrollTop = jQuery(window).scrollTop();
    var $home_slider_meetup =  jQuery('.tz_home_slider_meetup');
    var $_height = $home_slider_meetup.height();

    var $_height_menu = 97;
    var $type_position = jQuery('.tz-headerHome.tz-homeTypeFixed').length;
    var headerType = jQuery('.tz-headerHome').attr('data-option');

    if ( headerType == '2' || headerType == '3' && $type_position > 0 ) {
        console.log(headerType);

        if ( $_scrollTop > 0 ) {
            jQuery('.tz-homeType2').addClass('tz-menuEffect-1');
        }else {
            jQuery('.tz-homeType2').removeClass('tz-menuEffect-1');
        }

        if ( $home_slider_meetup.length ) {

            if ( $_scrollTop >= ($_height - $_height_menu) ) {
                jQuery('.tz-homeType2').addClass('tz-menuEffect');
            }else{
                jQuery('.tz-homeType2').removeClass('tz-menuEffect');
            }

        }
    }

    if( headerType =='1' && $type_position > 0 ) {

        if ( $home_slider_meetup.length ) {

            if ( $_scrollTop >= ($_height - $_height_menu) ) {
                jQuery('.tz-homeType1').addClass('tz-homeEff');

            }else {
                jQuery('.tz-homeType1').removeClass('tz-homeEff');
            }
        }

    }

});