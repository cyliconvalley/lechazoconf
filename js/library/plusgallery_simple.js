/**
 *------------------------------------------------------------------------------
 * @package       TZ Plus Gallery
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2015 TemPlaza.com. All Rights Reserved.
 * @license       GNU General Public License version 2 or later; see LICENSE.txt
 * @authors       TemPlaza
 * @Link:         http://templaza.com
 *------------------------------------------------------------------------------
 */

/*
 * +Gallery Javascript Photo gallery v0.9.4
 * http://plusgallery.net/
 *
 * Copyright 2013, Jeremiah Martin | Twitter: @jeremiahjmartin
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html

 */


jQuery.ajaxSetup({ cache: false });
var desktop_cols = desktop_cols;
var destop_small = destop_small;
var tablet_cols = tablet_cols;
var mobile_cols = mobile_cols;

/*
SLIDEFADE
------------------------------------------------------------------------------------------------------*/

/* Custom plugin for a slide/in out animation with a fade - JJM */

(function (jQuery) {
  jQuery.fn.slideFade = function (speed, callback) {
    var slideSpeed;
      var album_class = this.selector;
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == "number") {
        slideSpeed  = arguments[i];
      }
      else {
        var callBack = arguments[i];
      }
    }
    if(!slideSpeed) {
      slideSpeed = 500;
    }
    jQuery(''+album_class+'').animate({
        opacity: 'toggle',
        height: 'toggle'
      }, slideSpeed,
      function(){
        if( typeof callBack != "function" ) { callBack = function(){}; }
        callBack.call(this);
          jQuery('.tzmasonry').tz_init();
      }

    );

  };
})( jQuery );

(function (jQuery) {
    jQuery.fn.tz_init = function () {

        var window_width = jQuery(window).width();
        if (window_width>1200){
            var cols = desktop_cols;
        }
        if ((992 < window_width) && (window_width<= 1200) ){
            var cols = destop_small;
        }
        if ((480 <= window_width) && (window_width<= 992) ){
            var cols = tablet_cols;
        }
        if (window_width < 480){
            var cols = mobile_cols;
        }

        var container_width = jQuery('.tzmasonry').width();
        var item_width = container_width/cols;
        var item_width2 = item_width*2;
        jQuery('.pgthumb').css({
            width:item_width+'px'
        })
        jQuery('.item_width2').css({
            width:item_width2+'px'
        })
        var $container = jQuery('.tzmasonry');
        //alert($container.html());
        var container = document.querySelector('.tzmasonry');
        var msnry = new Masonry( container, {
            itemSelector: '.pgthumb'
        });

        TzTemplateResizeImage(jQuery('.simple'));
    };

})( jQuery );

(function (jQuery){
  jQuery.fn.plusGallery = function(options){
    var lmnt = this;
    if(lmnt.length === 0) { return false; }
    var pg = {
      /*user defined Defaults*/
      imagePath: 'images/plusgallery',
      type: null,
      albumTitle: false, //show the album title in single album mode
      albumLimit: 16, //Limit amout of albums to load initially.
      limit: 30, //Limit of photos to load for gallery / more that 60 is dumb, separate them into different albums
      apiKey: '', //used with Flickr
      exclude: null,
      include: null,
      imageData: null,

      
      /*don't touch*/
      imgArray: [],
      titleArray: [],
      t: '', //timer
      idx: 0,
      imgCount: 0,
      imgTotal: 0,
      winWidth: 1024, //resets
      touch: false,
      titleText: '',
      iconView: 'fa fa-search',

      init: function(){

        var _doc = jQuery('body');
        //check for touch device
        if ("ontouchstart" in document.documentElement) {
          window.scrollTo(0, 1);
          pg.touch = true;
        }
        
        pg.winWidth = jQuery(window).width();
        
        //reset some shit in case there is another copy that was loaded.
        jQuery('#pgzoomview').remove();
        //Unbind everything first? 
        _doc.off("click", ".pgalbumlink, #pgthumbhome, .pgthumbimg, .pgzoomarrow, .pgzoomclose, #pgzoomview, #pgzoomslide, .pgzoomimg");

        pg.getDataAttr();
        
        pg.writeHTML();

        if(pg.albumId
          || pg.type == 'instagram'
          || (pg.type == 'local' && !pg.imageData.hasOwnProperty('albums'))){
          //load single Album
            pg.albumTitle = false;
            pg.loadSingleAlbum();
        }
        else if(pg.type == 'local') {
          pg.parseAlbumData(pg.imageData);
        }
        else {
          pg.loadAlbumData();
        }

      //attach loadGallery to the album links
      _doc.off('click').on("click", ".pgalbumlink",function(e){
          e.preventDefault();
          jQuery(this).append('<span class="pgloading"></span>');
          var galleryTitle = jQuery(this).parent().find('span.pgalbumtitle').html();
          var obj_click = jQuery(this).parent().parent().parent();
          var pg_type = obj_click.attr('data-type');
          var data_limit = obj_click.attr('data-limit');
          if(pg_type == 'local') {
              var galleryID = jQuery(this).attr('data-album-index').replace('http://', '').replace('//', '').replace('https://', '');
              pg.parseData(pg.imageData.albums[galleryID],galleryTitle);
          } else {
              var galleryURL = this.href;
              pg.loadGallery(galleryURL,galleryTitle,pg_type,obj_click,data_limit);
          }
      });
        
        _doc.on("click", "#pgthumbhome",function(e){
          e.preventDefault();
            var obj_back_click = jQuery(this);
            var back_pg_id = "#"+obj_back_click.parent().parent().parent().attr('id');
            jQuery(''+back_pg_id+' #pgthumbview').slideFade(700);
            jQuery(''+back_pg_id+' #pgalbums').slideFade(700);
        });

        //attach links load detail image
        _doc.on('click','.pgthumbimg',function(e){
          e.preventDefault();
          var idx = jQuery(this).parent().parent().parent().index();
          obj = jQuery(this);
          pg.loadZoom(idx,obj);
        });
        /*zoom events*/
        _doc.on('click','.pgzoomarrow',function(e){
          e.preventDefault();
          var dir = this.rel;
          pg.prevNext(dir);
          return false;
        });
        
        _doc.on('click','.pgzoomclose',function(e){
          e.preventDefault();
          pg.unloadZoom();
        });
        _doc.on("click", "#pgzoomview",function(e){
          e.preventDefault();
          pg.unloadZoom();
        });
        
        _doc.on("click", "#pgzoomslide",function(){
          pg.unloadZoom();
        });
        
        _doc.on("click", ".pgzoomimg",function(){
          if(jQuery(this).attr('id').replace('pgzoomimg', '') < pg.imgTotal - 1) {
            pg.prevNext('next');
          }
          return false;
        });
        
        clearTimeout(pg.t);
      },

      /*--------------------------
      
        get all the user defined
        variables from the HTML element
      
      ----------------------------*/
      getDataAttr: function(){
        //Gallery Type *required
        var dataAttr = lmnt.attr('data-type');
        
        if(pg.type == null && dataAttr) {
          pg.type = dataAttr;
        }
        else if ( pg.type == null ) {
          throw('You must enter a data type.');
        }
        //Gallery User Id *required if not local
        dataAttr = lmnt.attr('data-userid');
        if(dataAttr) {
          pg.userId = dataAttr;
        }
        else if(pg.type != 'local') {
          throw('You must enter a valid User ID');
        }
        //Limit on the amount photos per gallery
        dataAttr = lmnt.attr('data-limit');
        if(dataAttr) {
          pg.limit = dataAttr;
            if(pg.limit==0){
                pg.limit=100000;
            }
        }

        // Icon zoom
          dataAttr = lmnt.attr('data-font');
          if(dataAttr) {
              pg.iconView = dataAttr;
          }

        //Limit on the amount albums
        dataAttr = lmnt.attr('data-album-limit');
          if(dataAttr) {
              pg.albumLimit = dataAttr;
              if(pg.albumLimit==0){
                  pg.albumLimit=100000;
              }
          }
        
        //album id to exclude
        dataAttr = lmnt.attr('data-exclude');
        if(dataAttr) {
          pg.exclude = dataAttr.split(',');
        }

        //album ids to include
        dataAttr = lmnt.attr('data-include');
        if(dataAttr) {
          pg.include = dataAttr.split(',');
        }
        
        //Api key - used with Flickr
        dataAttr = lmnt.attr('data-api-key');
        if(dataAttr) {
          pg.apiKey = dataAttr;
        }
        
        //Access Token - used with instagram
        dataAttr = lmnt.attr('data-access-token');
        if(dataAttr) {
          pg.accessToken = dataAttr;
        }
        dataAttr = lmnt.attr('data-album-id');
        if(dataAttr) {
          pg.albumId = dataAttr;
          //show hide the album title if we are in single gallery mode
          titleAttr = lmnt.attr('data-album-title');

          if(titleAttr == 'true') {
            pg.albumTitle = true;
          } else {
            pg.albumTitle = false;
          }
        } else{
            pg.albumTitle = true;
        }
          if(pg.type==='instagram'){
              pg.albumTitle = false;
          }
        
        dataAttr = lmnt.attr('data-credit');
        if(dataAttr == 'false') {
          pg.credit = false;
        }

        //Image path
        dataAttr = lmnt.attr('data-image-path');
        if(dataAttr) {
            pg.imagePath = dataAttr;
        }
        
        //JSON string containing image data *required only for local
        dataAttr = lmnt.attr('data-image-data');
        if(dataAttr) {
          pg.imageData = JSON.parse(dataAttr);
        }
      },
      
      /*--------------------------
      
        set up the initial HTML
      
      ----------------------------*/
      writeHTML: function(){
        var touchClass;
        if(pg.touch){
          touchClass = 'touch';
          lmnt.addClass('touch');
        }
        else {
          touchClass = 'no-touch';
          lmnt.addClass('no-touch');
        }
        
        lmnt.append(
          '<ul id="pgalbums" class="clearfix tzmasonryalbums"></ul>' +
          '<div id="pgthumbview">' +
            '<ul id="pgthumbs" class="clearfix tzmasonry"></ul>' +
          '</div>'
        );
        jQuery('body').prepend(
          '<div id="pgzoomview" class="pg ' + touchClass + '">' +
            '<a href="#" rel="previous" id="pgzoomclose" title="Close">Close</a>' +
            '<a href="#" rel="previous" id="pgprevious" class="pgzoomarrow" title="previous">Previous</a>' +
            '<a href="#" rel="next" id="pgnext" class="pgzoomarrow" title="Next">Next</a>' +
            '<div id="pgzoomscroll">' +
              '<ul id="pgzoom"></ul>' +
            '</div>' +
          '</div>'
          );
        
        lmnt.addClass('pg');
        
        if(pg.credit === true) {
          lmnt.append('<div id="pgcredit"><a href="http://www.plusgallery.net" target="_blank" title="Powered by +GALLERY"><span>+</span>Gallery</a></div>');
        }
        
        //console.log('pg.albumTitle: ' + pg.albumTitle);

        if(pg.albumTitle === true) {
          jQuery(lmnt).find('#pgthumbview').prepend('<ul id="pgthumbcrumbs" class="clearfix"><li id="pgthumbhome">&laquo;</li></ul>');
        }
      },
      
      
      /*--------------------------
      
        Parse the album data from
        the given json string.
      
      ----------------------------*/
      parseAlbumData: function(json) {
        lmnt.addClass('loaded');
        var objPath,
            albumTotal,
            galleryImage,
            galleryTitle,
            galleryJSON;

        switch(pg.type)
        {
        //have to load differently for for google/facebook/flickr
        case 'google':
        
          objPath = json.feed.entry;
          albumTotal = objPath.length;

            if(albumTotal > pg.albumLimit && pg.albumLimit!=0) {
            albumTotal = pg.albumLimit;
          }
            if(pg.albumLimit==0){
                albumTotal=albumTotal;
            }
          
          //remove excluded galleries if there are any.
          //albumTotal = albumTotal - pg.exclude.length;
        
          if(albumTotal > 0){
            jQuery.each(objPath,function(i,obj){
              //obj is entry
              if(i < albumTotal){
                galleryTitle = obj.title.$t;
                galleryJSON = obj.link[0].href;
                galleryImage = obj.media$group.media$content[0].url;
                galleryURL = obj.link[1].href;
                galleryImage = galleryImage.replace('s160','s210');
                pg.loadAlbums(galleryTitle,galleryImage,galleryJSON,galleryURL,i);
              }
  
            });
          }
          else { //else if albumTotal == 0
            throw('There are either no results for albums with this user ID or there was an error loading the data. \n' + galleryJSON);
          }
        break;
        case 'flickr':
          
          objPath = json.photosets.photoset;
          albumTotal = objPath.length;
              
          if(albumTotal > pg.albumLimit && pg.albumLimit!=0) {
            albumTotal = pg.albumLimit;
          }
            if(pg.albumLimit==0){
                albumTotal=albumTotal;
            }

          if(albumTotal > 0 ) {
            jQuery.each(objPath,function(i,obj){
              //obj is entry
              if(i < albumTotal){
                galleryTitle = obj.title._content;
                galleryImage = 'https://farm' + obj.farm + '.staticflickr.com/' + obj.server + '/' + obj.primary + '_' + obj.secret + '_n.jpg';
                galleryJSON = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + pg.apiKey + '&photoset_id=' + obj.id + '&format=json&jsoncallback=?';
                pg.loadAlbums(galleryTitle,galleryImage,galleryJSON);
              }
            });
          }
          else { //else if albumTotal == 0
            throw('There are either no results for albums with this user ID or there was an error loading the data. \n' + galleryJSON);
          }
        break;
        case 'facebook':

          objPath = json.data;
          albumTotal = objPath.length;

            if(albumTotal > pg.albumLimit && pg.albumLimit!=0) {
            albumTotal = pg.albumLimit;
          }
            if(pg.albumLimit==0){
                albumTotal=albumTotal;
            }
              
          if(albumTotal > 0) {
            jQuery.each(objPath,function(i,obj){
              if(i < albumTotal){
                galleryTitle = obj.name;
                galleryJSON = 'https://graph.facebook.com/' + obj.id + '/photos?limit=' + pg.limit + '&access_token=' + pg.accessToken;
                galleryImage = 'http://graph.facebook.com/' + obj.id + '/picture?type=album';
                pg.loadAlbums(galleryTitle,galleryImage,galleryJSON);
              }
              
            });
          }
          else {
            throw('There are either no results for albums with this user ID or there was an error loading the data. \n' + albumURL);
          }
          break;
        case 'local':
          objPath = json.albums;
          albumTotal = objPath.length;
          
          if(albumTotal > pg.albumLimit) {
            albumTotal = pg.albumLimit;
          }
            if(pg.albumLimit==0){
                albumTotal=albumTotal;
            }
              
          if(albumTotal > 0 ) {
            jQuery.each(objPath,function(i,obj){
              //obj is entry
              if(i < albumTotal){
                galleryTitle = obj.title;
                galleryImage = obj.images[0].th;
                galleryJSON = 'http://'+i;
    
                pg.loadAlbums(galleryTitle,galleryImage,galleryJSON);
              }
            });
          }
          else { //else if albumTotal == 0
            throw('There are no albums available in the specified JSON.');
          }
          break;
        }
      },
      
      
      /*--------------------------
      
        Load up Album Data JSON
        before Albums
      
      ----------------------------*/
      loadAlbumData: function() {
        var albumURL;
        switch(pg.type)
        {
        case 'google':
          albumURL = 'https://picasaweb.google.com/data/feed/base/user/' + pg.userId + '?alt=json&kind=album&hl=en_US&max-results=' + pg.albumLimit + '&callback=?';
          break;
        case 'flickr':
          albumURL = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=' + pg.apiKey + '&user_id=' + pg.userId + '&format=json&jsoncallback=?';
          break;
        case 'facebook':
          albumURL = 'https://graph.facebook.com/' + pg.userId + '/albums?limit=' + pg.albumLimit + '&access_token=' + pg.accessToken + '&callback=?';

          break;
        case 'instagram':
          //we ain't got no albums in instagram
          albumURL = null;
          break;
        case 'local':
          // No album support yet, but url wont be needed anyway.
          albumURL = null;
          break;
    
        default:
          throw('Please define a gallery type.');
        }
        
        jQuery.getJSON(albumURL,function(json) {
          pg.parseAlbumData(json);
        });
      },
      
      
      /*--------------------------
      
        Load all albums to the page
      
      ----------------------------*/
      loadAlbums: function(galleryTitle,galleryImage,galleryJSON) {
        var displayAlbum = true;
        var imgHTML;
        
        //exclude albums if pg.exclude is set
        if(pg.exclude !== null) {
          jQuery.each(pg.exclude,function(index, value){ //exclude albums if pg.exclude is set
            if(galleryJSON.indexOf(value) > 0){
              displayAlbum = false;
            }
          });
        }


        //include only specified albums if pg.include is set
        if(pg.include !== null) {
          displayAlbum = true;
          jQuery.each(pg.include,function(index, value){ //exclude albums if pg.exclude is set
            if(galleryJSON.indexOf(value) > 0){
              displayAlbum = true;
            }
          });
        }

        if (displayAlbum){
          if (pg.type == 'facebook' || pg.type == 'flickr') {
            imgHTML = '<img src="'+ pg.imagePath + '/square.png" style="background-image: url(' + galleryImage + ');" title="' + galleryTitle + '" title="' + galleryTitle + '" class="pgalbumimg">';
          }
          else {
            imgHTML = '<img src="' + galleryImage + '" title="' + galleryTitle + '" title="' + galleryTitle + '" class="pgalbumimg">';
          }
          
          if(pg.type == 'local') {
            jQuery('#pgalbums').append(
              '<li class="pgalbumthumb pgthumb simple">' +
                '<a href="#" data-album-index="' + galleryJSON + '" class="pgalbumlink">' + imgHTML + '<span class="pgalbumtitle">' + galleryTitle + '</span><span class="pgplus">+</span></a>' +
              '</li>'
            );
          } else {
            jQuery(lmnt).find('#pgalbums').append(
                '<li class="pgalbumthumb pgasimple">' +
                '<a href="' + galleryJSON + '" class="pgalbumlink">' + imgHTML + '<span class="pgalbumtitle">' + galleryTitle + '</span><span class="pgplus">+</span></a>' +
                '</li>'
            );
          }
        }
      
      }, //End loadAlbums
      
      
      /*--------------------------
      
        Load all the images within
        a specific gallery
      
      ----------------------------*/
      loadSingleAlbum:function(){
        var url;
        switch(pg.type)
        {
        case 'google':
          url = 'https://picasaweb.google.com/data/feed/base/user/' + pg.userId + '/albumid/' + pg.albumId + '?alt=json&hl=en_US';
          pg.loadGallery(url);
          break;
        case 'flickr':
          url = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + pg.apiKey + '&photoset_id=' + pg.albumId + '&format=json&jsoncallback=?';
          pg.loadGallery(url);
          break;
        case 'facebook':
          url = 'https://graph.facebook.com/' + pg.albumId + '/photos?limit=' + pg.limit + '&access_token=' + pg.accessToken;
          pg.loadGallery(url);
          break;
        case 'instagram':
          url = 'https://api.instagram.com/v1/users/' + pg.userId + '/media/recent/?access_token=' + pg.accessToken + '&count=' + pg.limit;
          pg.loadGallery(url);
          break;
        case 'local':
          pg.parseData(pg.imageData);
          break;
        }
        
        lmnt.addClass('loaded');
        //jQuery('#pgthumbhome').hide();
        
      },
      
      /*--------------------------
      
        Load all the images within
        a specific gallery
      
      ----------------------------*/
      loadGallery: function(url,title,pg_type,obj_click,data_limit){
        pg.imgArray = [];
        pg.titleArray = [];
        jQuery('#pgzoom').empty();
        jQuery.ajax({
          url: url,
          cache: false,
          dataType: "jsonp",
          success: function(json){
            pg.parseData(json,title,pg_type,obj_click,data_limit);
          }, //end success
          error: function(jqXHR, textStatus, errorThrown){
            console.log('Error: \njqXHR:' + jqXHR + '\ntextStatus: ' + textStatus + '\nerrorThrown: '  + errorThrown);
          }
        });
      }, //End loadGallery
      
      
      /*--------------------------
      
        Parse and convert the data
        of the gallery
      
      ----------------------------*/
      parseData: function(json,title,pg_type,obj_click,data_limit){
        var obPath,
            imgTitle,
            imgSrc,
            imgTh,
            imgBg = '',
            thumbsLoaded = 0,
            zoomWidth,
            flickrImgExt;

          if(obj_click){
          var pg_ids = "#"+obj_click.attr('id');
          jQuery(''+pg_ids+' .crumbtitle').remove();
          jQuery(''+pg_ids+' #pgthumbs').empty();
          } else{
              jQuery(lmnt).find('.crumbtitle').remove();
              jQuery(lmnt).find('#pgthumbs').empty();
          }
        if(title === undefined){
          title = '&nbsp;';
        }
          if(obj_click) {
              jQuery('' + pg_ids + ' #pgthumbcrumbs').append('<li class="crumbtitle">' + title + '</li>');
          } else{
              jQuery(lmnt).find('#pgthumbcrumbs').append('<li class="crumbtitle">' + title + '</li>');
          }
          if(pg_type) {
              pg_type = pg_type;
          }else{
              pg_type = pg.type;
          }
        switch(pg_type)
        {
        case 'google':
          objPath = json.feed.entry;
          break;
        case 'flickr':
          objPath = json.photoset.photo;
          break;
        case 'facebook':
          objPath = json.data;
          break;
        case 'instagram':
          objPath = json.data;
          break;
        case 'local':
          objPath = json.images;
          break;
        }
        pg.imgTotal = objPath.length;
        //limit the results
          if(data_limit){
              if(data_limit < pg.imgTotal){
                  pg.imgTotal = data_limit;
              }
              if(data_limit==0){
                  pg.imgTotal = pg.imgTotal;
              }
          }else{
              if(pg.limit < pg.imgTotal){
                  pg.imgTotal = pg.limit;
              }
              if(pg.limit==0){
                  pg.imgTotal = pg.imgTotal;
              }
          }
        
        if(pg.imgTotal === 0) {
          throw('Please check your photo permissions,\nor make sure there are photos in this gallery.');
        }

        if(pg.winWidth > 1100) {
          zoomWidth = 1024;
          flickrImgExt = '_b';
        } else if(pg.winWidth > 620) {
          zoomWidth = 768;
          flickrImgExt = '_b';
        } else {
          zoomWidth = 540;
          flickrImgExt = '_z';
        }

        jQuery.each(objPath,function(i,obj){
          //limit the results
            if(data_limit){
                var photo_limit = data_limit;
            } else{
                var photo_limit = pg.limit;
            }

          if(i < photo_limit) {
              if(pg_type) {
                  pg_type = pg_type;
              }else{
                  pg_type = pg.type;
              }

            switch(pg_type)
            {
            case 'google':
              imgTitle = obj.title.$t;
              imgSrc = obj.media$group.media$content[0].url;
              var lastSlash = imgSrc.lastIndexOf('/');
              var imgSrcSubString =imgSrc.substring(lastSlash);
              
              //show the max width image 1024 in this case
              imgSrc = imgSrc.replace(imgSrcSubString, '/s' + zoomWidth + imgSrcSubString);
              
              imgTh = obj.media$group.media$content[0].url;
              imgTh = imgTh.replace('s144','s160-c');
              imgURLLink = ''+obj.link[1].href+'';
              break;
            case 'flickr':
              imgTitle = obj.title;
              imgSrc = 'http://farm' + obj.farm + '.staticflickr.com/' + obj.server + '/' + obj.id + '_' + obj.secret + flickrImgExt + '.jpg';
              imgTh = 'http://farm' + obj.farm + '.staticflickr.com/' + obj.server + '/' + obj.id + '_' + obj.secret + '_z.jpg';
              imgURLLink = 'https://www.flickr.com/photos/'+pg.userId+'/'+obj.id+'/';
              break;
            case 'facebook':
              imgTitle = obj.name;
              imgSrc = obj.images[1].source;
              imgTh = obj.images[2].source;
              imgBg = ' style="background: url(' + obj.images[2].source + ') no-repeat 50% 50%; background-size: cover;"';
              imgURLLink = ''+obj.link+'';
              break;
            case 'instagram':
              if(obj.caption !== null){
                imgTitle = obj.caption.text;
              }
              imgSrc = obj.images.standard_resolution.url;
              imgTh = obj.images.standard_resolution.url;
              imgURLLink = ''+obj.link+'';
              break;
            case 'local':
              if(obj.caption !== null){
                imgTitle = obj.caption;
              }
              imgSrc = obj.src;
              imgTh = obj.th;
              break;
            }
            
            if(!imgTitle) {
              imgTitle = '';
            }

            pg.imgArray[i] = imgSrc;
            pg.titleArray[i] = imgTitle;

              if(obj_click) {
                  jQuery('' + pg_ids + ' #pgthumbs').append('<li class="pgthumb simple">' +
                  '<div class="effect3"><div class="simple-overlay"></div>'+
                  '<img data-src="' + imgSrc + '" src="' + imgTh + '" id="pgthumbimg' + i + '" class="" alt="' + imgTitle + '" title="' + imgTitle + '">' +
                  '<div class="simple-info">' +
                  '<a data-src="' + imgSrc + '" href="' + imgSrc + '" class="info pgthumbimg" alt="' + imgTitle + '" title="' + imgTitle + '">' + imgTitle +'</a>' +
                  '<h3>' + imgTitle +'</h3></div></div></li>');
              } else{
                  jQuery(lmnt).find('#pgthumbs').append('<li class="pgthumb simple">' +
                  '<div class="effect3"><div class="simple-overlay"></div>'+
                  '<img data-src="' + imgSrc + '" src="' + imgTh + '" id="pgthumbimg' + i + '" class="" alt="' + imgTitle + '" title="' + imgTitle + '">' +
                  '<div class="simple-info">' +
                  '<a data-src="' + imgSrc + '" href="' + imgSrc + '" class="info pgthumbimg" alt="' + imgTitle + '" title="' + imgTitle + '">' + imgTitle +'</a>' +
                  '</div></div></li>');
              }
            //check to make sure all the images are loaded and if so show the thumbs
              if(obj_click) {
                  jQuery('' + pg_ids + '').find('.pgthumbimg').each(function () {
                      thumbsLoaded++;
                      if (thumbsLoaded == pg.imgTotal) {
                          var pg_id = "#" + obj_click.attr('id');
                          jQuery('' + pg_id + ' #pgalbums').slideFade(700, function () {
                              jQuery('.pgalbumthumb .pgloading').remove();
                          });
                          jQuery('' + pg_id + ' #pgthumbview').slideFade(700);
                      }
                  })
              }else{
                  jQuery(lmnt).find('.pgthumbimg').each(function () {
                      thumbsLoaded++;
                      if (thumbsLoaded == pg.imgTotal) {
                          jQuery(lmnt).find('#pgalbums').slideFade(700, function () {
                              jQuery('.pgalbumthumb .pgloading').remove();
                          });
                          jQuery(lmnt).find('#pgthumbview').slideFade(700);

                      }
                  })
              }
          } //end if(i < pg.limit)
        }); //end each

      },
      
      zoomIdx: null, //the zoom index
      zoomImagesLoaded: [],
      zoomScrollDir: null,
      zoomScrollLeft: 0,
      loadZoom: function(idx,obj){
        pg.zoomIdx = idx;
        pg.winWidth = jQuery(window).width();
        var id_pagezoom = obj.parent().parent().parent().parent().parent().parent().attr('id');
        var pgZoomView = jQuery('#pgzoomview'),
            pgZoomScroll = jQuery('#pgzoomscroll'),
            pgPrevious = jQuery('#pgprevious'),
            pgNext = jQuery('#pgnext'),
            pgZoom = jQuery('#pgzoom'),
            pgZoomHTML = '',
            imgArrayClick = [];
            imgArrayTitle = [];
        pgZoomView.addClass('fixed');
        pgZoomView.addClass(id_pagezoom);
          obj.parent().parent().parent().parent().find('.pgthumbimg').each(function(index){
              imgArrayClick[index]=jQuery(this).attr('data-src');
              imgArrayTitle[index]=jQuery(this).attr('title');
          });
         var  totalImages = imgArrayClick.length;

        
        //show/hide the prev/next links
        if(idx === 0) {
          pgPrevious.hide();
        }
        
        if(idx == totalImages - 1) {
          pgNext.hide();
        }
    
        var pgzoomWidth = imgArrayClick.length * pg.winWidth;
        jQuery('#pgzoom').width(pgzoomWidth);
        
        var scrollLeftInt = parseInt(idx * pg.winWidth);
        
        pgZoomView.fadeIn(function(){
          //this has gotta come in after the fade or iOS blows up.
          
          jQuery(window).on('resize',pg.resizeZoom);

          jQuery.each(imgArrayClick,function(i){
            pgZoomHTML = pgZoomHTML  + '<li class="pgzoomslide loading" id="pgzoomslide' + i + '" style="width: ' + pg.winWidth + 'px;"><img src="' + pg.imagePath + '/square.gif" class="pgzoomspacer">' +
            '<img src="' + imgArrayClick[i] + '" data-src="' + imgArrayClick[i] + '" alt="' + imgArrayTitle[i] + '" id="pgzoomimg' + i + '"  class="pgzoomimg" />' +
            '<span class="pgzoomcaption">' + imgArrayTitle[i] + '</span></li>';

            if(i + 1 == imgArrayClick.length) {
              //at the end of the loop
                jQuery('#pgzoom').html(pgZoomHTML);
                
                pg.zoomKeyPress();
                jQuery('#pgzoomscroll').scrollLeft(scrollLeftInt);
                pg.zoomScrollLeft = scrollLeftInt;
                pg.loadZoomImg(idx);
                pg.zoomScroll(imgArrayClick);
                //load siblings
                if((idx - 1) >= 0){
                pg.loadZoomImg(idx - 1);
                }

                if((parseInt(idx)+ 1) < imgArrayClick.length){
                pg.loadZoomImg(idx + 1);
                }
              }
            });
          });
      },
      loadZoomImg:function(idx){
         jQuery('#pgzoomimg' + idx).addClass('active');
      },
      
      zoomScroll:function(imgArrayClick){
        var pgPrevious = jQuery('#pgprevious'),
            pgNext = jQuery('#pgnext'),
            scrollTimeout,
            canLoadZoom = true;
            
    
        jQuery('#pgzoomscroll').on('scroll',function(){
          currentScrollLeft = jQuery(this).scrollLeft();
          if(canLoadZoom === true) {
            canLoadZoom = false;
            scrollTimeout = setTimeout(function(){
              if(currentScrollLeft === 0){
                pgPrevious.fadeOut();
              }
              else {
                pgPrevious.fadeIn();
              }
              if(currentScrollLeft >= (imgArrayClick.length - 1) * pg.winWidth){
              pgNext.fadeOut();
              }
              else {
                pgNext.fadeIn();
              }
              
              /*Check if we have scrolled left and if so load up the zoom image*/
              if(currentScrollLeft % pg.zoomScrollLeft > 20 || (currentScrollLeft > 0 && pg.zoomScrollLeft === 0)){
                pg.zoomScrollLeft = currentScrollLeft;
                var currentIdx = pg.zoomScrollLeft / pg.winWidth;

                var currentIdxCeil = Math.ceil(currentIdx);
                var currentIdxFloor = Math.floor(currentIdx);
                //Lazy load siblings on scroll.
                if(!pg.zoomImagesLoaded[currentIdxCeil]) {
                  pg.loadZoomImg(currentIdxCeil);
                }
                if(!pg.zoomImagesLoaded[currentIdxFloor]){
                  pg.loadZoomImg(currentIdxFloor);
                }
              }
              canLoadZoom = true;
            },200);
          }
        });
      },
      
      zoomKeyPress: function(){
        jQuery(document).on('keyup','body',function(e){
          if(e.which == 27){
            pg.unloadZoom();
          }
          else
          if(e.which == 37){
            pg.prevNext('previous');
          }
          else
          if(e.which == 39){
            pg.prevNext('next');
          }
        });
      },
      
      resizeZoom: function(){
        pg.winWidth = jQuery(window).width();
        var pgzoomWidth = pg.imgArray.length * pg.winWidth;
        jQuery('#pgzoom').width(pgzoomWidth);
        jQuery('.pgzoomslide').width(pg.winWidth);
        
        var scrollLeftInt = parseInt(pg.zoomIdx * pg.winWidth);
        
        jQuery('#pgzoomscroll').scrollLeft(scrollLeftInt);
      },
      
      unloadZoom: function(){
        jQuery(document).off('keyup','body');
        jQuery(window).off('resize',pg.resizeZoom);
        jQuery('#pgzoomscroll').off('scroll');
        jQuery('#pgzoomview').fadeOut(function(){
          jQuery('#pgzoom').empty();
          jQuery('#pgzoomview').off('keyup');
          jQuery('#pgzoomview').removeClass('fixed');
        });
          
      },
      
      prevNext: function(dir){
        var currentIdx = jQuery('#pgzoomscroll').scrollLeft() / pg.winWidth;
        
        if(dir == "previous"){
          pg.zoomIdx = Math.round(currentIdx)  - 1;
        }
        else {
          pg.zoomIdx = Math.round(currentIdx) + 1;
        }
        
        var newScrollLeft = pg.zoomIdx * pg.winWidth;
        
        jQuery('#pgzoomscroll').stop().animate({scrollLeft:newScrollLeft});
      }
    };
    
    jQuery.extend(pg, options);
    pg.init();
  };
})( jQuery );
