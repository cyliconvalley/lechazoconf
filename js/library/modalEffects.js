/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );
		var tz_md_effect_16 = jQuery('.tz_md_effect_16');

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '.' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) );
			}

			el.addEventListener( 'click', function( ev ) {

				jQuery(this).parent().find('.md-modal').addClass('md-show');

				//overlay.removeEventListener( 'click', removeModalHandler );
				//overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}

				jQuery('.md-trigger').parents('#bd').addClass('tz_bd_overflow');

			});

			if ( tz_md_effect_16.length ) {
				tz_md_effect_16.each(function(){
					jQuery(this).on( 'click', function( ) {

						tz_md_effect_16.parents('.tzSpace_default').first().addClass('tz_Space_default_content');
						jQuery('#tzwrapper > .vc_row, #tzwrapper footer').addClass('tz_body_blur');

						jQuery('#tzwrapper > .vc_row').each(function(){
							var has_md = jQuery(this).find('div').hasClass('md-modal');
							if( has_md==true ){
								jQuery(this).removeClass('tz_body_blur');
							}
						});

						jQuery('.tz_Space_default_content .wpb_column').each(function(){
							var has_md_2 = jQuery(this).find('div').hasClass('md-modal');
							if( has_md_2==false ){
								jQuery(this).addClass('tz_wpb_column_blur');
							}
						})

					});
				});
			}

			jQuery('.md-close').each(function(){
				jQuery(this).on( 'click', function( ) {
					jQuery(this).parent().parent().removeClass('md-show');
					jQuery('.md-trigger').parents('#bd').removeClass('tz_bd_overflow');

					jQuery('html').removeClass('md-perspective' );

					if ( tz_md_effect_16.length ) {

						tz_md_effect_16.parents('.tzSpace_default').first().removeClass('tz_Space_default_content');
						jQuery('#tzwrapper > .vc_row, #tzwrapper footer').removeClass('tz_body_blur');

					}

				});
			});

			jQuery('.tz-md-modal-speakers').each(function(){
				jQuery(this).on( 'click', function( ) {
					jQuery(this).removeClass('md-show');
					jQuery('.md-trigger').parents('#bd').removeClass('tz_bd_overflow');
					jQuery('html').removeClass('md-perspective' );

					if ( tz_md_effect_16.length ) {

						tz_md_effect_16.parents('.tzSpace_default').first().removeClass('tz_Space_default_content');
						jQuery('#tzwrapper > .vc_row, #tzwrapper footer').removeClass('tz_body_blur');
					}

				});
			})

		} );

	}

	init();

})();