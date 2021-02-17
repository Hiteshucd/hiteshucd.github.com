(function () {
    'use strict';

    const myImages = [
        'image1.png', 
        'image2.png', 
        'image3.png', 
        'image4.png', 
        ];
    
    let currentImage = 0;

    const slide = document.getElementById('myimage');

    const timer = setInterval( function () { 
        currentImage++;
        if (currentImage > myImages.length-1) {

            currentImage = 0;
        }
        slide.src = `image/${myImages[currentImage]}`;
    }, 2000 );

})();