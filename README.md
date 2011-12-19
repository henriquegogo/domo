# DOM object
## How to use?
### DOM to object
$('body').domo()
### Object to DOM
$('body').domo(json)
## Want to use in console?
<pre>
var scriptJquery = document.createElement(&quot;script&quot;);
scriptJquery.src = &quot;https://raw.github.com/henriquegogo/domo/master/jquery-1.6.2.min.js&quot;;
document.body.appendChild(scriptJquery);
setTimeout(function() {
  var scriptDomo = document.createElement(&quot;script&quot;);
  scriptDomo.src = &quot;https://raw.github.com/henriquegogo/domo/master/jquery-domo.js&quot;;
  document.body.appendChild(scriptDomo);
}, 100);
</pre>