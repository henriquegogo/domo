# DOM object
Simple change/access window.domo.body object
    console.log(domo.body);
## Loading script
    <script src="https://raw.github.com/henriquegogo/domo/master/domo.js" type="text/javascript" charset="utf-8"></script>
or

    var scriptDomo = document.createElement("script");
    scriptDomo.src = "https://raw.github.com/henriquegogo/domo/master/domo.js";
    document.body.appendChild(scriptDomo);
    
    setTimeout(function() {
      var DOMContentLoaded_event = document.createEvent("Event");
      DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
      window.document.dispatchEvent(DOMContentLoaded_event);
    }, 500);
### Mapping DOM to an object
    dom2obj.call(document.body);
### Populating DOM with an object
    obj2dom.call(document.body, {});
