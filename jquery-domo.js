(function ($) {
  $.fn.domo = function(object) {
      // ###################
      // ## Object to DOM ##
      // ###################
    if (typeof object == 'object') {
      var cloneAsArray = function(who, arr) {
        var container = $("<div />");

        for (var item in arr) {
          clone = who.clone();

          $.isPlainObject(arr[item]) ? false :
          clone.is('select') ? $("option[value='" + arr[item] + "'], option:contains(" + arr[item] + ")", clone).attr('selected', 'true') :
          clone.is('[type=checkbox]') ? clone.prop('checked', arr[item]) :
          clone.is('input') ? clone.attr('value', arr[item]) : clone.text(arr[item]);

          container.append(clone);
        }
        who.replaceWith(container.html());
      }

      var doArray = function(who, arr) {
        var container = $("<div />");

        if (who.length != arr.length) {
          var clone = $(who[0]);

          for (var i = 0; i < arr.length; i++) {
            $.isPlainObject(arr[i]) ? false :
            clone.is('select') ? $("option[value='" + arr[i] + "'], option:contains(" + arr[i] + ")", clone).attr('selected', 'true') :
            clone.is('[type=checkbox]') ? clone.prop('checked', arr[i]) :
            clone.is('input') ? clone.attr('value', arr[i]) : clone.text(arr[i]);
          
            container.append($("<div />").html(clone).html());
          }

          who.replaceWith(container.html());
        }
      }

      for (var prop in object) {
        var who = $('> [name=' + prop + ']', this);
        
        $.isPlainObject(object[prop]) ? who.domo(object[prop]) :
        $.isArray(object[prop]) && !who.is('[multiple], [type=radio]') ? doArray(who, object[prop]) :
        who.is('select') ? who.val(object[prop]) :
        who.is('[type=checkbox]') ? who.prop("checked", object[prop]) :
        who.is('[type=radio]') ? $("> [name="+ prop +"][value=" + object[prop] + "]", this).prop("checked", true) :
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
