jQuery.fn.extend({
  objective: function() {
    var result = {};
    
    result = jQuery(this).children();
    
    return result;
  }
});

// jQuery.fn.extend({
//   objective: function() {
//     var result = {};
//     jQuery('[name]', this).each(function() {
//       var key = $(this).attr('name');
//       result[key] = (jQuery('[name]', this).size() > 0 && !jQuery.isArray($(this).val())) ? jQuery(this).objective() :
//                     jQuery(this).val() ? jQuery(this).val() : jQuery(this).text();
//     });
//     return result;
//   }
// });
