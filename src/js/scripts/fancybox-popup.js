$(document).ready(function($) {

  // easy photo and video gallery
  $('.js-gallery-fancybox').fancybox({
    nextEffect: 'fade',
    prevEffect: 'fade',
    wrapCSS: 'fancybox-gallery-skin', // styles are in file css/components/popup.styl
    helpers: {
      media: true, // for video gallery
      title : {
        type : 'inside'
      }
    }
  });

  // popup
  $('.js-popup-fancybox').fancybox({
    padding: 0,
    fitToView : false,
    autoSize  : true,
    openMethod: 'changeIn'
  });

});