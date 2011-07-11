jQuery.fn.extend({
  objective: function() {
    var append = function(array, value) { array.push(value); return array }
    var result = {};
    
    jQuery(this).children().each(function() {
      var key = jQuery(this)[0].tagName;

      var value = jQuery(this).children().size() > 0 ? jQuery(this).objective() :
                  jQuery(this).val() ? $(this).val() : jQuery(this).text();

      result[key] = (result[key] && !jQuery.isArray(result[key])) ? Array(result[key], value) :
                    jQuery.isArray(result[key]) ? append(result[key], value) : value;
    });
    
    return result;
  }
});

