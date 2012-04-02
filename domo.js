(function () {
  // Some helpers
  var isArray = function(array) {
    return (typeof array == 'object' && array && array.length != undefined);
  }
  var isObject = function(object) {
    return (typeof object == 'object' && object && object.length == undefined);
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
  Object.defineProperty(Object.prototype, "toDom", { enumerable: false, value:
    function(container) {
      var object = this;
      var container = container || document.body;
      var el = (container.name) ? [container] : container.children;

      var uncheck = function(tag) {
        if (tag.type == 'checkbox' || tag.type == 'radio')
          tag.removeAttribute('checked');
        else if (tag.querySelector("[selected]"))
          tag.querySelector("[selected]").removeAttribute('selected');
      };

      var removeSiblings = function(tag, name) {
        var siblings = tag.parentElement.querySelectorAll("[name='"+name+"']");
        for (var i = 1; i < siblings.length; i++) {
          try { tag.parentElement.removeChild(siblings[i]); }
          catch(err) { }
        }
      };
      
      var applyValues = function(tag, object, key) {
        key = key.toLocaleString();
        key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ? splitKey(tag, object, key) :
        isArray(object[key]) ? doArray(tag, object[key], name) :
        isObject(object[key]) ? object[key].toDom(tag) :
        tag.tagName == 'IMG' ? tag.setAttribute('src', object[key]) :
        tag.tagName == 'SELECT' ? tag.value = object[key] :
        tag.type == 'checkbox' && object[key] ? tag.setAttribute('checked', true) :
        tag.type == 'radio' && tag.value == object[key] ? tag.setAttribute("checked", true) :
        tag.tagName == 'BUTTON' || tag.type == 'file' || tag.type == 'radio' || tag.type == 'checkbox' ? false :
        tag.tagName == 'INPUT' ? tag.value = object[key] :
        tag.innerHTML = object[key] || "";
      };

      var applyAttributesVariables = function(tag, object) {
        var attributes = tag.attributes;
        
        for (var i = 0; i < attributes.length; i++)
          if ( attributes[i].value.match(/{\w*}/g) ) {
            var attrName = attributes[i].name;
            var attrValue = attributes[i].value.replace(/{(\w*)}/gi, function(m, key) { return object[key]; });
            setTimeout(function() { tag.setAttribute(attrName, attrValue); }, 0);
          }
      };

      var splitKey = function(tag, object, key) {
        var keys = key.match(/\./) ? key.split(".") : key.split("[");
        keys[1] = keys[1].replace("]", "");
        if ( isObject(object[keys[0]]) )
          applyValues(tag, object[keys[0]], keys[1]);
      };

      var doArray = function(tag, arr, name) {
        if (tag === tag.parentElement.querySelector("[name='"+name+"']:first-of-type")) {
          removeSiblings(tag, name);
          applyValues(tag, arr, 0);

          for (var i = 1; i < arr.length; i++) {
            var clone = tag.cloneNode(true);
            applyValues(clone, arr, i);
            tag.parentElement.appendChild(clone);
          }
        }
      }

      for (var i = 0; i < el.length; i++) {
        var tag = el[i];
        var key = name = tag.getAttribute("name");

        if (key) {
          key = key.replace(/\[\d*]$/, "");

          if (tag.children.length && tag.querySelector("[name]") && isObject(object[key]) ) {
            object[key].toDom(tag);
          
          } else {
            uncheck(tag);
            applyValues(tag, object, key);
          }

        } else {
          object.toDom(tag);
        }

        applyAttributesVariables(tag, object);
      }
    }
  });

  // DOM to object
  HTMLElement.prototype.toObject = function(oldResult) {
    var result = oldResult || {};
    var container = this;
    var el = container.children;

    for (var i = 0; i < el.length; i++) {
      var tag = el[i];
      var key = name = tag.getAttribute("name");

      if (key) {
        key = key.replace(/\[\d*]$/, "");

        var value = tag.children.length && tag.querySelector("[name]") ?
                    tag.toObject() : tag.value || tag.textContent;

        value = (tag.tagName == 'SELECT' && !tag.value) ? "" :
                (tag.type == 'checkbox') ? tag.checked :
                (tag.type == 'radio' && !tag.checked) ? result[key] :
                value;

        value = result[key] && !isArray(result[key]) && tag.type != 'radio' ?
                Array(result[key], value) :
                isArray(result[key]) ? append(result[key], value) :
                name.match(/\[\d*]$/) ? [value] : value;

        if ( key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ) {
          var keys = key.match(/\./) ? key.split(".") : key.split("[");
          keys[1] = keys[1].replace("]", "");
          
          result[keys[0]] = result[keys[0]] || {};
          result[keys[0]][keys[1]] = value;
          
        } else
          result[key] = value;
  
      } else {
        var childNode = tag.toObject(result);
        result = mergeObject(result, childNode);
      }
    }

    return result;
  };

  // Init
  document.addEventListener("DOMContentLoaded", function() {
    window.domo = window.domo || {};
    window.domo.body = window.domo.body || document.body.toObject();

    window.domo.body.toDom();

    document.addEventListener("change", function() {
      window.domo.body = document.body.toObject();
    });
  });
})();

