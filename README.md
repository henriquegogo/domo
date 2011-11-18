# DOM object
## How to use?
### DOM to object
$('body').domo()
### Object to DOM
$('body').domo(json)
## Want to use in console?
var scriptJquery = document.createElement(&quot;script&quot;);<br/>scriptJquery.src = &quot;https://raw.github.com/henriquegogo/domo/master/jquery-1.6.2.min.js&quot;;<br/>document.body.appendChild(scriptJquery);<br/>var scriptDomo = document.createElement(&quot;script&quot;);<br/>scriptDomo.src = &quot;https://raw.github.com/henriquegogo/domo/master/jquery-domo.js&quot;;<br/>document.body.appendChild(scriptDomo);