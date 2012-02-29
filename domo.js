(function () {
  // Some helpers
  var isArray = function(array) {
    return (typeof array == 'object' && array.length != undefined);
  }
  var isObject = function(object) {
    return (typeof object == 'object' && object.length == undefined);
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
    var el = this.children;

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
    }
    
    var applyValues = function(tag, object, key) {
      key = key.toLocaleString();
      key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ? doObject(tag, object, key) :
      isArray(object[key]) ? doArray(tag, object[key], name) :
      tag.tagName == 'IMG' ? tag.setAttribute('src', object[key]) :
      tag.tagName == 'SELECT' ? tag.value = object[key] :
      tag.type == 'checkbox' && object[key] ? tag.setAttribute('checked', true) :
      tag.type == 'radio' && tag.value == object[key] ? tag.setAttribute("checked", true) :
      tag.type == 'file' || tag.type == 'radio' || tag.type == 'checkbox' ? false :
      tag.tagName == 'INPUT' ? tag.value = object[key] :
      tag.innerHTML = object[key];
    };

    var doObject = function(tag, object, key) {
      var keys = key.match(/\./) ? key.split(".") : key.split("[");
      keys[1] = keys[1].replace("]", "");
      applyValues(tag, object[keys[0]], keys[1]);
    }

    var doArray = function(tag, arr, name) {
      if (tag === tag.parentNode.querySelector("[name='"+name+"']:first-child")) {
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

        if (tag.children.length && tag.querySelector("[name]"))
          obj2dom.call(tag, object[key]);
        
        else {
          uncheck(tag);
          applyValues(tag, object, key);
        }

      } else {
        obj2dom.call(tag, object);
      }
    }
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
        var childNode = dom2obj.call(tag, result);
        result = mergeObject(result, childNode);
      }
    }

    return result;
  };

  // Init and bootstrap
  var domo = function() {
    window.domo = window.domo || {};
    window.domo.body = window.domo.body || dom2obj.call(document.body);
    window.domo.sync = JSON.stringify(window.domo.body);
    window.domo.onchange = window.domo.onchange || function() {};
    window.domo.onchange();
  };

  var verifyChanges = function() {
    if (JSON.stringify(window.domo.body) != window.domo.sync) {
      obj2dom.call(document.body, window.domo.body);
      domo();
    }
  };

  //window.onload = function() {
    domo();

    document.addEventListener("change", function() {
      window.domo.body = dom2obj.call(document.body);
    });

    setInterval(verifyChanges, 100);
  //};
})();
