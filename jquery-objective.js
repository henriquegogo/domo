jQuery.fn.objective = function() {
  var append = function(array, value) { array.push(value); return array }
  var result = {};
  
  jQuery(this).children().each(function() {
    var who = jQuery(this).attr('name') ? jQuery(this) : jQuery(this).children('[name]');
    var key = who.attr('name');

    var value = who.children('[name]').size() > 0 && !who.is('select') ? who.objective() :
                who.val() ? who.val() :
                who.is('select') ? who.val() : who.text();

    if (key) result[key] = (result[key] && !jQuery.isArray(result[key])) ? Array(result[key], value) :
                           jQuery.isArray(result[key]) ? append(result[key], value) : value;
  });
  
  return result;
};

