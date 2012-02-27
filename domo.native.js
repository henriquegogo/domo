//(function () {
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
        key = key.replace(/\[]$/, "");

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

    return result;
  };

  window.onload = function() {
    if (typeof object == 'object')
      obj2dom(object);
    
    window.domo = window.domo || {};
    window.domo.body = window.domo.body || dom2obj.call(document.body);
    
    console.log( domo.body );
    console.log( JSON.stringify(domo.body) );
    //var object = {"fotos":["fotos\/5\/gogs.jpg"],"id":"5","codigo":"1","tipo":"Casa","endereco":"Av. Her\u00f3is do Acre 801\/101A","estado":"CE","cidade":"Fortaleza","bairro":"Passar\u00e9","finalidade":"Venda","pontoReferencia":"","cliente":{"imoveis":[{"imoveis":null,"id":"5","codigo":"1","tipo":"Casa","endereco":"Av. Her\u00f3is do Acre 801\/101A","estado":"CE","cidade":"Fortaleza","bairro":"Passar\u00e9","finalidade":"Venda","pontoReferencia":"","cliente_id":"1","cliente_nome":"Henrique Gog\u00f3","areaPrivativa":"","areaPrivativaMedida":"","areaTerreno":"","areaTerrenoMedida":"","dormitorios":"","suites":"","banheiros":"","pavimentos":"","condominioNome":"","anoConstrucao":"","condominioValor":"","garagem":"N\u00e3o","vagas":"","posicao":"","mobiliado":"N\u00e3o","descricao":"","created":"2012-02-21 02:08:00","updated":"2012-02-21 02:08:07","foto":null}],"id":"1","nome":"Henrique Gog\u00f3","email":"henriquegogo@hotmail.com","endereco":"Av. Her\u00f3is do Acre 801\/101A","estado":"CE","cidade":"Fortaleza","bairro":"Passar\u00e9","telefone":"85 8747-2023","created":"2012-02-20 01:25:50","updated":"2012-02-20 01:25:50"},"cliente_nome":"Henrique Gog\u00f3","areaPrivativa":"","areaPrivativaMedida":"","areaTerreno":"","areaTerrenoMedida":"","dormitorios":"","suites":"","banheiros":"","pavimentos":"","condominioNome":"","anoConstrucao":"","condominioValor":"","garagem":"N\u00e3o","vagas":"","posicao":"","mobiliado":"N\u00e3o","descricao":"","created":"2012-02-21 02:08:00","updated":"2012-02-21 02:08:07","foto":null};
  };
//})();
