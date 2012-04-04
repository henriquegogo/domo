describe("Domo", function() {
  Element.prototype.find = Element.prototype.querySelector;
  Element.prototype.findAll = Element.prototype.querySelectorAll;
  
  describe("Object to DOM", function() {
    var object, element;
    
    beforeEach(function() {
      element = document.createElement("div");
    });

    it("can fill list with an array object", function() {
      object = { list: ["First","Second","Third"] };
      
      element.innerHTML = '\
      <ul>\
        <li name="list"></li>\
      </ul>';

      object.toDom(element);
      var items = element.findAll("[name=list]");
      
      expect(items.length).toEqual(3);
      expect(items[0].innerHTML).toEqual('First');
      expect(items[1].innerHTML).toEqual('Second');
      expect(items[2].innerHTML).toEqual('Third');
    });

    it("can fill list if name like array with an array object", function() {
      object = { listWithOne: ["One item list"] };

      element.innerHTML = '\
      <ul>\
        <li name="listWithOne[]"></li>\
      </ul>';
    
      object.toDom(element);
      var items = element.findAll("[name='listWithOne[]']");
      
      expect(items.length).toEqual(1);
      expect(items[0].innerHTML).toEqual('One item list');
    });

    it("can change nested proprieties in array tags", function() {
      object = { parents: [
                  { father: "Davidson", mother: "Sarah", sons: 
                    ["Daniel", "Michael"]
                  },
                  { father: "Beggerson", mother: "Leka", sons:
                    ["Mary","July"]
                  }
                ] };

      element.innerHTML = '\
      <div name="parents[]">\
        <p>Senior <b name="father"></b> and <b name="mother"></b></p>\
        <ul>\
          <li name="sons"></li>\
        </ul>\
      </div>';
    
      object.toDom(element);
      var parents = element.findAll("[name='parents[]']");
      
      expect(parents.length).toEqual(2);
      expect(parents[0].find("[name=father]").innerHTML).toEqual('Davidson');
      expect(parents[0].find("[name=mother]").innerHTML).toEqual('Sarah');
      expect(parents[0].findAll("[name=sons]").length).toEqual(2);
      expect(parents[0].findAll("[name=sons]")[0].innerHTML).toEqual('Daniel');
      expect(parents[0].findAll("[name=sons]")[1].innerHTML).toEqual('Michael');
      expect(parents[1].find("[name=father]").innerHTML).toEqual('Beggerson');
      expect(parents[1].find("[name=mother]").innerHTML).toEqual('Leka');
      expect(parents[1].findAll("[name=sons]").length).toEqual(2);
      expect(parents[1].findAll("[name=sons]")[0].innerHTML).toEqual('Mary');
      expect(parents[1].findAll("[name=sons]")[1].innerHTML).toEqual('July');
    });

    it("can set attribute value with variable marks", function() {
      object = { name: "David" };

      element.innerHTML = '<a name="name" href="/user/{name}"></a>';

      object.toDom(element);
      var link = element.find("a");

      setTimeout(function() {
        expect(link.getAttribute('href')).toEqual('/user/David');
        expect(link.innerHTML).toEqual('David');
      }, 0);
    });

    it("can fill form fields", function() {
      object = { description: "This is an awesome lib.",
                 sex: "Male", human: true, emails: false,
                 civil_state: "Married", city: "NY"
               };

      element.innerHTML = '\
      <form>\
        <label>Description</label>\
        <textarea name="description"></textarea>\
        <label>Sex</label>\
        <input type="radio" name="sex" value="Female"> Female\
        <input type="radio" name="sex" value="Male"> Male\
        <input type="radio" name="sex" value="Dont know"> Dont know\
        <label>Is human?</label>\
        <input type="checkbox" name="human">\
        <label>Want to receive emails?</label>\
        <input type="checkbox" name="emails">\
        <label>Civil state</label>\
        <select name="civil_state">\
          <option>Single</option>\
          <option>Married</option>\
          <option>I dont know</option>\
        </select>\
        <label>City</label>\
        <select name="city">\
          <option value="FOR">Fortaleza</option>\
          <option value="NY">New York</option>\
          <option value="MI">Miami</option>\
        </select>\
      </form>';

      object.toDom(element);
      var form = element.find("form");
    
      expect(form.description.value).toEqual('This is an awesome lib.');
      expect(form.find("[name=sex]:checked").value).toEqual('Male');
      expect(form.find("[name=human]:checked")).toBeTruthy();
      expect(form.find("[name=emails]:checked")).toBeNull();
      expect(form.civil_state.value).toEqual('Married');
      expect(form.city.value).toEqual('NY');
    });

    it("can fill form fields with string representation of object.property", function() {
      object = { people: 
                 { client: { id: "2", name: "Robert" },
                   product: {Identify: "1", description: "Soccer shoes" }
                 }
               };

      element.innerHTML = '\
      <div name="people">\
        <label>Client ID</label>\
        <input type="text" name="client.id">\
        <label>Client Name</label>\
        <input type="text" name="client.name">\
        <div>\
          <label>Product ID</label>\
          <input type="text" name="product[Identify]">\
        </div>\
        <div>\
          <div>\
            <label>Product Name</label>\
            <input type="text" name="product[description]">\
          </div>\
        </div>\
      </div>';

      object.toDom(element);

      expect(element.find("[name='client.id']").value).toEqual('2');
      expect(element.find("[name='client.name']").value).toEqual('Robert');
      expect(element.find("[name='product[Identify]']").value).toEqual('1');
      expect(element.find("[name='product[description]']").value).toEqual('Soccer shoes');

    });
  });

  describe("DOM to Object", function() {
    beforeEach(function() {
    });

    it("can create an object from an input field", function() {
    });
  });

});
