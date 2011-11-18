(function ($) {
  $.fn.domo = function(object) {
    // ###################
    // ## Object to DOM ##
    // ###################
    if (typeof object == 'object') {
      $('[type=checkbox], [type=radio]', this).removeAttr('checked');
      $('option', this).removeAttr('selected');

      var stringDom = function(who) {
        return $("<div />").html(who).html();
      }

      var doArray = function(who, arr) {
        var container = $("<div />");

        for (var i = 0; i < arr.length; i++) {
          var clone = who.eq(0).clone();

          $.isPlainObject(arr[i]) ? clone.domo(arr[i]) :
          $.isArray(arr[i]) && !who.is('[multiple], [type=radio]') ? doArray(clone, arr[i]) :
          clone.is('select') ? clone.find("option[value='" + arr[i] + "'], option:contains(" + arr[i] + ")").attr('selected', 'true') :
          clone.is('[type=checkbox]') ? clone.attr('checked', arr[i]) :
          clone.is('[type=radio]') ? clone.filter("[value=" + arr[i] + "]").attr("checked", true) :
          clone.is('input') ? clone.attr('value', arr[i]) : clone.html(arr[i]);
        
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
        who.is('select') ? who.find("option[value='" + object[prop] + "'], option:contains(" + object[prop] + ")").attr('selected', 'true') :
        who.is('[type=checkbox]') ? who.attr('checked', object[prop]) :
        who.is('[type=radio]') ? who.filter("[value=" + object[prop] + "]").attr("checked", true) :
        who.is('input') ? who.attr('value', object[prop]) : who.html(object[prop]);
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
