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
      var listElement = document.getElementById("test-list").cloneNode(true);
      object.toDom(listElement);
      var html = listElement.innerHTML;

      expect(html).toMatch('One item');
      expect(html).toMatch('Other item');
    });

    it("can fill list if name like array with an array object", function() {
      var listElement = document.getElementById("test-list-array-forced").cloneNode(true);
      object.toDom(listElement);
      var html = listElement.innerHTML;
      
      expect(html).toMatch('One item list');
      expect(html).toMatch('Other item in one item list');
    });
  });

  describe("DOM to Object", function() {
    beforeEach(function() {
    });

    it("can create an object from an input field", function() {
    });
  });

});
