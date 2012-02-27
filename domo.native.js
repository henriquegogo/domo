(function () {
  // Some helpers
  var isArray = function(array) {
    return (typeof array == 'object' && array.length != undefined);
  }
  var append = function(array, value) { array.push(value); return array }

  // Object to DOM
  var obj2dom = function(object) {
  };

  // DOM to object
  var dom2obj = function() {
    var result = {};
    var el = this.children;

    for (var i = 0; i < el.length; i++) {
      var tag = el[i];
      var key = name = tag.getAttribute("name");
      
      if (key) {
        key = key.replace(/\[\d*]$/, "");

        var value = tag.children.length && tag.querySelector("[name]") ?
                    dom2obj.call(tag) : tag.value || tag.textContent;

        value = (tag.type == 'checkbox') ? tag.checked :
                (tag.type == 'radio' && !tag.checked) ? result[key] :
                value;

        value = result[key] && !isArray(result[key]) && tag.type != 'radio' ?
                Array(result[key], value) : isArray(result[key]) ?
                append(result[key], value) : name.match(/\[\d*]$/) ?
                [value] : value;

        result[key] = value;
      
      } else {
        var childNode = dom2obj.call(tag);
        for (attr in childNode) { result[attr] = childNode[attr]; }
      }
    }

    for (var key in result) {
      if ( key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ) {
        var keys = key.match(/\./) ? key.split(".") : key.split("[");
        keys[1] = keys[1].replace("]", "");
        
        result[keys[0]] = result[keys[0]] || {};
        result[keys[0]][keys[1]] = result[key];
        
        delete result[key];
      
      }
    }

    return result;
  };

  window.onload = function() {
    if (typeof object == 'object')
      obj2dom(object);
    
    window.domo = window.domo || {};
    window.domo.body = window.domo.body || dom2obj.call(document.body);
    
    console.log( domo.body );
    console.log( JSON.stringify(domo.body) );
  };
})();
