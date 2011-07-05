// jQuery.fn.extend({
//   objective: function() {
//     var result = {};
//     jQuery('> *', this).each(function() {
//       var key = $(this).attr('name');
//       result[key] = (jQuery('[name]', this).size() > 0 && !jQuery.isArray($(this).val())) ? jQuery(this).objective() :
//                     jQuery(this).val() ? jQuery(this).val() : jQuery(this).text();
//     });
//     return result;
//   }
// });


/*
HAMOM
function (elemento) {
  var filhosComName = []
    var todosOsFilhos = $('> *', elemento)

    for (var i = 0; i < todosOsFilhos.length; i++) {
      if ($(todosOsFilhos[i]).attr('name'))
        filhosComName.push(todosOsFilhos[i])
      else if ($(todosOsFilhos[i]).children().length > 0) {
        var netos = selecionaFilhosComName(todosOsFilhos[i])

          filhosComName = filhosComName.concat(netos);
      }
    }

  return filhosComName
} 
*/

jQuery.fn.extend({
  objective: function() {
    var result = {};
      jQuery('[name]', this).each(function() {
      var key = $(this).attr('name');
      result[key] = (jQuery('[name]', this).size() > 0 && !jQuery.isArray($(this).val())) ? jQuery(this).objective() :
                    jQuery(this).val() ? jQuery(this).val() : jQuery(this).text();
    });
    return result;
  }
});
