describe("Domo", function() {
  describe("Object to DOM", function() {
    var object;
    
    beforeEach(function() {
      object = {
        "list": ["One item", "Other item"],
        "listWithOne": ["One item list", "Other item in one item list"],
        "parents": [
          {"son":"Henrique","daughter":"Mariah","sons": ["Mary", "Smith", "James"]},
        ],
        "name": "Diane",
        "description": "What do you want?",
        "sex": "Female",
        "human": true,
        "emails": true,
        "civil_state": "Single",
        "city": "FOR",
        "people": {
          "client": {"id": "1","name": "Gilbert"},
          "product": {"Identify": "33", "firstName": "iPod"}
        }
      };
    });

    it("can fill list with an array object", function() {
      var el = document.getElementById("test-list").cloneNode(true);
      object.toDom(el);
      var html = el.innerHTML;

      expect(html).toMatch('One item');
      expect(html).toMatch('Other item');
    });

    it("can fill list if name like array with an array object", function() {
      var el = document.getElementById("test-list-array-forced").cloneNode(true);
      object.toDom(el);
      var html = el.innerHTML;
      
      expect(html).toMatch('One item list');
      expect(html).toMatch('Other item in one item list');
    });

    it("can change nested proprieties in array tags", function() {
      var el = document.getElementById("test-children-tags").cloneNode(true);
      object.toDom(el);
      var html = el.innerHTML;
      var items = el.querySelectorAll("[name='parents[]']")
      
      expect(items.length).toEqual(1);
      expect(html).toMatch('Henrique');
      expect(html).toMatch('Mariah');
      expect(html).toMatch('Mary');
      expect(html).toMatch('Smith');
      expect(html).toMatch('James');
    });

    it("can set attribute value with variable marks", function() {
      var el = document.getElementById("name").cloneNode(true);
      object.toDom(el);
      var html = el.outerHTML;
      
      expect(html).toMatch('/user/David');
    });

    it("can fill form fields", function() {
      var el = document.getElementById("test-form").cloneNode(true);
      object.toDom(el);
      var html = el.innerHTML;
      var city = el.querySelector("[name=city]");
      
      expect(html).toMatch('Diane');
      expect(html).toMatch('What do you want?');
      expect(html).toMatch('"Female" checked="true"');
      expect(html).toMatch('"human" checked="true"');
      expect(html).toMatch('"emails" checked="true"');
      expect(city.value).toEqual('FOR');
    });

    it("can fill form fields with string representation of object.property", function() {
      var el = document.getElementById("test-props").cloneNode(true);
      object.toDom(el);
      var client_id = el.querySelector("[name='client.id']");
      var client_name = el.querySelector("[name='client.name']");
      var product_identify = el.querySelector("[name='product[Identify]']");
      var product_firstName = el.querySelector("[name='product[firstName]']");
      var html = el.outerHTML;
      
      expect(client_id.value).toEqual('1');
      expect(client_name.value).toEqual('Gilbert');
      expect(product_identify.value).toEqual('33');
      expect(product_firstName.value).toEqual('iPod');
    });
  });

  describe("DOM to Object", function() {
    beforeEach(function() {
    });

    it("can create an object from an input field", function() {
    });
  });

});
