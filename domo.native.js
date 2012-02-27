(function () {
  // Some helpers
  var isArray = function(array) {
    return (typeof array == 'object' && array.length != undefined);
  }
  var isObject = function(object) {
    return (typeof object == 'object' && object.length == undefined);
  }
  var clone = function(object) {
    return (isObject(object)) ? JSON.parse( JSON.stringify(object) ) : object;
  }
  var append = function(array, value) {
    array.push(value);
    return array;
  }
  var mergeObject = function(obj1, obj2) {
    for (attr in obj2) obj1[attr] = obj2[attr];
    return obj1;
  }

  // Object to DOM
  var obj2dom = function(object) {
  };

  // DOM to object
  var dom2obj = function(oldResult) {
    var result = oldResult || {};
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

        if ( key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ) {
          var keys = key.match(/\./) ? key.split(".") : key.split("[");
          keys[1] = keys[1].replace("]", "");
          
          result[keys[0]] = result[keys[0]] || {};
          result[keys[0]][keys[1]] = value;
          
        } else
          result[key] = value;
  
      } else {
        var childNode = dom2obj.call(tag, result);
        result = mergeObject(result, childNode);
      }
    }

    return result;
  };

  //window.onload = function() {
    window.domo = window.domo || {};
    window.domo.body = window.domo.body || dom2obj.call(document.body);
    
    console.log( domo.body );
    console.log( JSON.stringify(domo.body) );
  //};
})();
