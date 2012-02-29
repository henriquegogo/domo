# DOM object
Simple change/access window.domo.body object
    console.log(domo.body);
## Loading script
    <script src="https://raw.github.com/henriquegogo/domo/master/domo.js" type="text/javascript" charset="utf-8"></script>
or

    var scriptDomo = document.createElement("script");
    scriptDomo.src = "https://raw.github.com/henriquegogo/domo/master/domo.js";
    document.body.appendChild(scriptDomo);
### Mapping DOM to an object
    dom2obj.call(document.body);
### Populating DOM with an object
    obj2dom.call(document.body, {});
