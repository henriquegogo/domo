(function ($) {
  $.fn.domo = function(object) {
    // ## Object to DOM ##
    if (typeof object == 'object') {
      $('[type=checkbox], [type=radio]', this).removeAttr('checked');
      $('option', this).removeAttr('selected');

      var stringDom = function(who) { return $("<div />").html(who).html() };

      var applyValues = function(who, object, prop) {
        $.isPlainObject(object[prop]) ? doObject(who, object[prop], prop) :
        $.isArray(object[prop]) && !who.is('[type=radio]') && !who.is('[type=file]') ? doArray(who, object[prop]) :
        who.is('img') ? who.attr('src', object[prop]) :
        who.is('select') ? who.find("option[value='" + object[prop] + "'], option:contains('$" + object[prop] + "^')").attr('selected', 'true') :
        who.is('[type=checkbox]') ? who.attr('checked', object[prop]) :
        who.is('[type=radio]') ? who.filter("[value=" + object[prop] + "]").attr("checked", true) :
        who.is('[type=file]') ? false :
        who.is('input') ? who.attr('value', object[prop]) : who.html(object[prop]);
      }

      var doObject = function(me, object, obj_name) {
        if (me.length) me.domo(object);
        else {
          for (var prop in object) {
            var who = ( $("[name='" + obj_name + "." + prop + "']").length ) ?
              $("[name='" + obj_name + "." + prop + "']") :
              $("[name='" + obj_name + "." + prop + "[]']");
            
            applyValues(who, object, prop)
          }
        }
      }

      var doArray = function(who, arr) {
        var container = $("<div />");
        
        for (var i = 0; i < arr.length; i++) {
          var clone = who.eq(0).clone();
          applyValues(clone, arr, i)
          container.append(stringDom(clone));
        }
        
        if (who.length > 1) who.replaceWith(who.eq(0));
        who.replaceWith(container.html());
      }

      for (var prop in object) {
        var who = ( $("[name='" + prop + "']", this).length ) ? $("[name='" + prop + "']", this) : $("[name='" + prop + "[]']", this);
        applyValues(who, object, prop)
      }

      return this;

    } else {
      // ## DOM to object ##
      var append = function(array, value) { array.push(value); return array }
      var result = {};
      
      $(this).children().each(function() {
        var key = $(this).attr("name");

        if (key) {
          key = key.replace(/\[]$/, "");
          var value = $(this).children().size() > 0 ? $(this).domo() :
                      $(this).val() ? $(this).val() : $(this).text();

          value = $(this).is('select') ? $(this).val() :
                  $(this).is('[type=checkbox]') ? $(this).prop('checked') :
                  $(this).is('[type=radio]') ? $("[name="+ $(this).attr('name') +"]:checked").val() :
                  value;
          
          value = (result[key] && !$.isArray(result[key]) && !$(this).is('[type=radio]') || $(this).attr("name").match(/[]$/) ) ?
                  Array(result[key], value) : $.isArray(result[key]) ?
                  append(result[key], value) : value;

          result[key] = value;

        } else {
          $.extend(result, $(this).domo());
        
        }
      });

      for (var key in result) {
        if (key.match(/\./)) {
          var keys = key.split(".");
          
          result[keys[0]] = result[keys[0]] || {};
          result[keys[0]][keys[1]] = result[key];
          
          delete result[key];
        }
      }

      return result;
    }
  }

  $.domo = function() {
    window.domo = window.domo || {};
    window.domo.body = window.domo.body || $("body").domo();
    window.domo.sync = JSON.stringify(window.domo.body);
    window.domo.onchange = window.domo.onchange || function() {};
    window.domo.onchange();

    $(document)
      .undelegate("[name]", "blur.domo")
      .delegate("[name]", "blur.domo", function() {
        window.domo.body = $("body").domo();
    });
  }

  var verifyChanges = function() {
    if (JSON.stringify(window.domo.body) != window.domo.sync) {
      $("body").domo( window.domo.body );
      $.domo();
    }
  };

  $(document).ready(function() {
    $.domo();
    setInterval(verifyChanges, 100);
  });
})(jQuery);
