//= require plugins/**/*

//= require plugins/fancybox/jquery.fancybox.js
//= require plugins/fancybox/helpers/jquery.fancybox-media.js
//= require !plugins/fancybox/helpers/jquery.fancybox-buttons.js
//= require !plugins/fancybox/helpers/jquery.fancybox-thumbs.js


//= require scripts/**/*.*
//= require scripts.coffee


$(document).ready(function($) {

  // icheck
  $('[type=radio], [type=checkbox').iCheck()
});