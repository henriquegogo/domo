(function ($) {
  $.fn.domo = function(object) {
    // ###################
    // ## Object to DOM ##
    // ###################
    if (typeof object == 'object') {
      var stringDom = function(who) {
        return $("<div />").html(who).html();
      }

      var doArray = function(who, arr) {
        var container = $("<div />");

        var clone = who.eq(0).clone();

        for (var i = 0; i < arr.length; i++) {
          $.isPlainObject(arr[i]) ? clone.domo(arr[i]) :
          clone.is('select') ? $("option[value='" + arr[i] + "'], option:contains(" + arr[i] + ")", clone).attr('selected', 'true') :
          clone.is('[type=checkbox]') ? clone.prop('checked', arr[i]) :
          clone.is('input') ? clone.attr('value', arr[i]) : clone.text(arr[i]);
        
          container.append(stringDom(clone));
        }
        
        if (who.length > 1) {
          who.replaceWith(who.eq(0));
        }
  
        who.replaceWith(container.html());
      }

      for (var prop in object) {
        var who = $('> [name=' + prop + '], > :not([name]) [name=' + prop + ']', this);

        $.isPlainObject(object[prop]) ? who.domo(object[prop]) :
        $.isArray(object[prop]) && !who.is('[multiple], [type=radio]') ? doArray(who, object[prop]) :
        who.is('select') ? who.val(object[prop]) :
        who.is('[type=checkbox]') ? who.prop("checked", object[prop]) :
        who.is('[type=radio]') ? who.filter("[value=" + object[prop] + "]").prop("checked", true) :
        who.is('input') ? who.val(object[prop]) : who.text(object[prop]);
      }

    } else {
      // ###################
      // ## DOM to object ##
      // ###################
      var append = function(array, value) { array.push(value); return array }
      var result = {};
      
      $(this).children().each(function() {
        var who = $(this).attr('name') ? $(this) : $(this).find('> [name], > :not([name]) [name]');
        var key = who.attr('name');

        var value = who.find('> [name], > :not([name]) [name]').size() > 0 ? who.domo() :
                    who.val() ? who.val() : who.text();
        
        value = who.is('select') ? who.val() :
                who.is('[type=checkbox]') ? who.prop('checked') :
                who.is('[type=radio]') ? $("[name="+ $(this).attr('name') +"]:checked").val() :
                value;

        if (key) result[key] = (result[key] && !$.isArray(result[key]) && !who.is('[type=radio]')) ? Array(result[key], value) :
                               $.isArray(result[key]) ? append(result[key], value) : value;
      });
      
      return result;
    }
  }
})(jQuery);
