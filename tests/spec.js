describe("Domo", function() {
  Element.prototype.find = Element.prototype.querySelector;
  Element.prototype.findAll = Element.prototype.querySelectorAll;
  
  describe("Object to DOM", function() {
    var element;
    
    beforeEach(function() {
      element = document.createElement("div");
    });

    it("can fill list with an array object", function() {
      var object = { list: ["First","Second","Third"] };
      
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
      var object = { listWithOne: ["One item list"] };

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
      var object = { parents: [
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
      var object = { name: "David" };

      element.innerHTML = '<a name="name" href="/user/{name}"></a>';

      object.toDom(element);
      var link = element.find("a");

      setTimeout(function() {
        expect(link.getAttribute('href')).toEqual('/user/David');
        expect(link.innerHTML).toEqual('David');
      }, 0);
    });

    it("can fill form fields", function() {
      var object = { description: "This is an awesome lib.",
                     sex: "Male", human: true, emails: false,
                     civil_state: "Married", city: "NY"
                   };

      element.innerHTML = '\
      <form>\
        <label>Description</label>\
        <textarea name="description"></textarea>\
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
      var object = { people: 
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
      element = document.createElement("div");
    });

    it("can map a list element to an array object", function() {
      element.innerHTML = '\
      <ul>\
        <li name="list">First</li>\
        <li name="list">Second</li>\
        <li name="list">Third</li>\
      </ul>';

      var object = element.toObject();
      
      expect(object.list.length).toEqual(3);
      expect(object.list[0]).toEqual('First');
      expect(object.list[1]).toEqual('Second');
      expect(object.list[2]).toEqual('Third');
    });

    it("can map an element with a single item (marked to be an array) to an array object", function() {
      element.innerHTML = '\
      <ul>\
        <li name="listWithOne[]">One item list</li>\
      </ul>';
    
      var object = element.toObject();
      
      expect(object.listWithOne.length).toEqual(1);
      expect(object.listWithOne[0]).toEqual('One item list');
    });

    it("can map nested tags in an object", function() {
      element.innerHTML = '\
      <div name="parents[]">\
        <p>Senior <b name="father">Davidson</b> and <b name="mother">Sarah</b></p>\
        <ul>\
          <li name="sons">Daniel</li>\
          <li name="sons">Michael</li>\
        </ul>\
      </div>\
      <div name="parents[]">\
        <p>Senior <b name="father">Beggerson</b> and <b name="mother">Leka</b></p>\
        <ul>\
          <li name="sons">Mary</li>\
          <li name="sons">July</li>\
        </ul>\
      </div>';
    
      var object = element.toObject();
      
      expect(object.parents.length).toEqual(2);
      expect(object.parents[0].father).toEqual('Davidson');
      expect(object.parents[0].mother).toEqual('Sarah');
      expect(object.parents[0].sons.length).toEqual(2);
      expect(object.parents[0].sons[0]).toEqual('Daniel');
      expect(object.parents[0].sons[1]).toEqual('Michael');
      expect(object.parents[1].father).toEqual('Beggerson');
      expect(object.parents[1].mother).toEqual('Leka');
      expect(object.parents[1].sons.length).toEqual(2);
      expect(object.parents[1].sons[0]).toEqual('Mary');
      expect(object.parents[1].sons[1]).toEqual('July');
    });

    it("can map form fields into object", function() {
      element.innerHTML = '\
      <form>\
        <label>Description</label>\
        <textarea name="description">This is an awesome lib.</textarea>\
        <label>Sex</label>\
        <input type="radio" name="sex" value="Female"> Female\
        <input type="radio" name="sex" value="Male" checked="checked"> Male\
        <input type="radio" name="sex" value="Dont know"> Dont know\
        <label>Is human?</label>\
        <input type="checkbox" name="human" checked="checked">\
        <label>Want to receive emails?</label>\
        <input type="checkbox" name="emails">\
        <label>Civil state</label>\
        <select name="civil_state">\
          <option>Single</option>\
          <option selected="selected">Married</option>\
          <option>I dont know</option>\
        </select>\
        <label>City</label>\
        <select name="city">\
          <option value="FOR">Fortaleza</option>\
          <option value="NY" selected="selected">New York</option>\
          <option value="MI">Miami</option>\
        </select>\
      </form>';

      var object = element.toObject();
    
      expect(object.description).toEqual('This is an awesome lib.');
      expect(object.sex).toEqual('Male');
      expect(object.human).toBeTruthy();
      expect(object.emails).toBeFalsy();
      expect(object.civil_state).toEqual('Married');
      expect(object.city).toEqual('NY');
    });

    it("can map form fields with string representation of object.property into object", function() {
      element.innerHTML = '\
      <div name="people">\
        <label>Client ID</label>\
        <input type="text" name="client.id" value="2">\
        <label>Client Name</label>\
        <input type="text" name="client.name" value="Robert">\
        <div>\
          <label>Product ID</label>\
          <input type="text" name="product[Identify]" value="1">\
        </div>\
        <div>\
          <div>\
            <label>Product Name</label>\
            <input type="text" name="product[description]" value="Soccer shoes">\
          </div>\
        </div>\
      </div>';

      var object = element.toObject();

      expect(object.people.client.id).toEqual('2');
      expect(object.people.client.name).toEqual('Robert');
      expect(object.people.product.Identify).toEqual('1');
      expect(object.people.product.description).toEqual('Soccer shoes');
    });
  });

});
