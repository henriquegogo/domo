(function ($) {
  $.fn.dom2obj = function() {
    var append = function(array, value) { array.push(value); return array }
    var result = {};
    
    $(this).children().each(function() {
      var who = $(this).attr('name') ? $(this) : $(this).find('> [name], > :not([name]) [name]');
      var key = who.attr('name');

      var value = who.find('> [name], > :not([name]) [name]').size() > 0 ? who.dom2obj() :
                  who.val() ? who.val() : who.text();
      
      value = who.is('select') ? who.val() :
              who.is('[type=checkbox]') ? who.prop('checked') :
              who.is('[type=radio]') ? $("[name="+ $(this).attr('name') +"]:checked").val() :
              value;

      if (key) result[key] = (result[key] && !$.isArray(result[key]) && !who.is('[type=radio]')) ? Array(result[key], value) :
                             $.isArray(result[key]) ? append(result[key], value) : value;
    });
    
    return result;
  };

  $.fn.obj2dom = function(object) {
    for (var prop in object) {
      var who = $('[name=' + prop + ']', this);

      who.is('select') ? who.val(object[prop]) :
      who.is('[type=checkbox]') ? who.prop("checked", object[prop]) :
      who.is('[type=radio]') ? $("[name=radiobutton][value=" + object[prop] + "]").prop("checked", true) :
      $.isPlainObject(object[prop]) ? who.obj2dom(object[prop]) :
      $.isArray(object[prop]) ? console.log(object[prop] + " é array") :
      who.is('input') ? who.val(object[prop]) : who.text(object[prop]);
    }
  };
})(jQuery);
