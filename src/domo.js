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
    window.toDom = function(object, container) {
        var container = $(container) || $(document);
        var el = (container.attr('name')) ? container : container.children();
        
        var uncheck = function(tag) {
            if (tag.attr('type') == 'checkbox' || tag.attr('type') == 'radio') {
                tag.removeAttr('checked');
                tag[0].checked = false;
            } else if (tag.find("[selected]"))
                tag.find("[selected]").removeAttr('selected');
        };

        var removeSiblings = function(tag, name) {
            var siblings = tag.parent().find("[name='"+name+"']");
            siblings.each(function() {
                try { tag.parent()[0].removeChild(this); }
                catch(err) { }
            });
        };

        var setSelectTagValue = function(tag, value) {
            tag.val(value);
            // This code below is just because iE needs
            var options = tag.children();
            for (var i in options) {
                if (options[i].value == value)
                    options[i].selected = true;
            }
        };

        var applyValues = function(tag, object, key) {
            key = "" + key;
            key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ? splitKey(tag, object, key) :
            $.isArray(object[key]) ? doArray(tag, object[key], name) :
            $.isObject(object[key]) ? toDom(object[key], tag) :
            tag.prop('tagName') == 'IMG' ? tag.attr('src', object[key]) :
            tag.prop('tagName') == 'SELECT' ? setSelectTagValue(tag, object[key]) :
            tag.attr('type') == 'checkbox' && object[key] ? tag[0].checked = true :
            tag.attr('type') == 'radio' && tag.value == object[key] ? tag[0].checked = true :
            tag.prop('tagName') == 'BUTTON' || tag.attr('type') == 'file' || tag.attr('type') == 'radio' || tag.attr('type') == 'checkbox' ? false :
            tag.prop('tagName') == 'INPUT' ? tag.val() = object[key] :
            tag.html(object[key] || "");
        };

        var applyAttributesVariables = function(tag, object) {
            var attributes = tag[0].attributes;

            for (var i = 0; i < attributes.length; i++)
                if ( attributes[i].value.match(/{\w*}/g) ) {
                    var attrName = attributes[i].name;
                    var attrValue = attributes[i].value.replace(/{(\w*)}/gi, function(m, key) { return object[key]; });
                    setTimeout(function() { tag.attr(attrName, attrValue); }, 0);
                }
        };

        var splitKey = function(tag, object, key) {
            var keys = key.match(/\./) ? key.split(".") : key.split("[");
            keys[1] = keys[1].replace("]", "");
            if ( $.isObject(object[keys[0]]) )
                applyValues(tag, object[keys[0]], keys[1]);
        };

        var doArray = function(tag, arr, name) {
            if (tag === tag.parent().find("[name='"+name+"']")) {
                removeSiblings(tag, name);
                applyValues(tag, arr, 0);

                for (var i = 1; i < arr.length; i++) {
                    var clone = tag.clone();
                    applyValues(clone, arr, i);
                    tag.parent().append(clone);
                }
            }
        };

        el.each(function(){
            var tag = $(this);
            var key = name = tag.attr("name");

            if (key) {
                key = key.replace(/\[\d*]$/, "");

                if (tag.children().length && tag.find("[name]").length && $.isPlainObject(object[key]) ) {
                    toDom(object[key], tag);

                } else {
                    uncheck(tag);
                    applyValues(tag, object, key);
                }

            } else {
                toDom(object, tag);
            }

            applyAttributesVariables(tag, object);
        });

        return container;
    };

    // DOM to object
    window.toObject = function(target, oldResult) {
        var result = oldResult || {};
        var container = $(target);
        var elements = container.children();

        elements.each(function() {
            var tag = $(this);
            var key = name = tag.attr("name");

            if (key) {
                key = key.replace(/\[\d*]$/, "");

                var value = tag.children().length && tag.find("[name]").length ?
                            toObject(tag[0]) : tag.val() || tag.text();

                value = (tag.prop('tagName') == 'SELECT' && !tag.val()) ? tag[0].options[tag[0].selectedIndex].value :
                        (tag.attr('type') == 'checkbox') ? tag[0].checked :
                        (tag.attr('type') == 'radio' && !tag[0].checked) ? result[key] :
                        value;

                value = result[key] && !$.isArray(result[key]) && tag.attr('type') != 'radio' ?
                        Array(result[key], value) :
                        $.isArray(result[key]) ? append(result[key], value) :
                        name.match(/\[\d*]$/) ? [value] : value;

                if ( key.match(/\./) || key.match(/\[[a-zA-Z].*]/) ) {
                    var keys = key.match(/\./) ? key.split(".") : key.split("[");
                    keys[1] = keys[1].replace("]", "");

                    result[keys[0]] = result[keys[0]] || {};
                    result[keys[0]][keys[1]] = value;

                } else
                    result[key] = value;

            } else {
                var childNode = toObject(tag[0], result);
                result = $.extend(result, childNode);
            }
        });

        return result;
    };
})();
