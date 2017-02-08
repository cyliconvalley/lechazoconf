"use strict";
var resizeImage = function (widthImage, heightImage, widthStage, heightStage) {

    var escImageX = widthStage / widthImage;

    var escImageY = heightStage / heightImage;

    var escalaImage = (escImageX > escImageY) ? escImageX : escImageY;



    var widthV = widthImage * escalaImage;

    var heightV = heightImage * escalaImage;

    var posImageY = 0;

    var posImageX = 0;



    if (heightV > heightStage) {

        posImageY = (heightStage - heightV) / 2;

    }



    if (widthV > widthStage) {

        posImageX = (widthStage - widthV) / 2;

    }



    return { top: posImageY, left: posImageX, width: widthV, height: heightV };

};