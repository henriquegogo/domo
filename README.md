# Object to DOM
You can fill DOM values with an object.

**object.toDom()** is the same as **object.toDom(** *document.body* **)**

----------

### Fill list with an array object
    var object = { list: ["First","Second","Third"] }
<!-- -->
    <ul>
      <li name="list"></li>
    </ul>

----------

### Fill list if name like array with an array object
    var object = { listWithOne: ["One item list"] };
<!-- -->
    <ul>
      <li name="listWithOne[]"></li>
    </ul>

----------

### Change nested proprieties in array tags
    var object = { parents: [
                   { father: "Davidson", mother: "Sarah", sons: 
                     ["Daniel", "Michael"]
                   },
                   { father: "Beggerson", mother: "Leka", sons:
                     ["Mary","July"]
                   }
                 ] };
<!-- -->
    <div name="parents[]">
      <p>Senior <b name="father"></b> and <b name="mother"></b></p>
      <ul>
        <li name="sons"></li>
      </ul>
    </div>

----------

### Set attribute value with variable marks
    var object = { name: "David" };
<!-- -->
    <a name="name" href="/user/{name}"></a>

----------

### Fill form fields
    var object = { description: "This is an awesome lib.",
                   sex: "Male", human: true, emails: false,
                   civil_state: "Married", city: "NY"
                 };
<!-- -->
    <form>
      <label>Description</label><br>
      <textarea name="description"></textarea><br>
      <input type="radio" name="sex" value="Female"> Female
      <input type="radio" name="sex" value="Male"> Male
      <input type="radio" name="sex" value="Dont know"> Dont know<br>
      <label>Is human?</label>
      <input type="checkbox" name="human"><br>
      <label>Want to receive emails?</label>
      <input type="checkbox" name="emails"><br>
      <label>Civil state</label>
      <select name="civil_state">
        <option>Single</option>
        <option>Married</option>
        <option>I dont know</option>
      </select><br>
      <label>City</label>
      <select name="city">
        <option value="FOR">Fortaleza</option>
        <option value="NY">New York</option>
        <option value="MI">Miami</option>
      </select>
    </form>

----------

### Fill form fields with string representation of object.propert
    var object = { people: 
                   { client: { id: "2", name: "Robert" },
                     product: {Identify: "1", description: "Soccer shoes" }
                   }
                 };
<!-- -->
    <div name="people">
      <label>Client ID</label>
      <input type="text" name="client.id"><br>
      <label>Client Name</label>
      <input type="text" name="client.name">
      <div>
        <label>Product ID</label>
        <input type="text" name="product[Identify]">
      </div>
      <div>
        <div>
          <label>Product Name</label>
          <input type="text" name="product[description]">
        </div>
      </div>
    </div>

----------

# DOM to Object
You can map DOM to an object.

**element.toObject()**

----------

### Map a list element to an array object
    <ul>
      <li name="list">First</li>
      <li name="list">Second</li>
      <li name="list">Third</li>
    </ul>

----------

### Map an element with a single item (marked to be an array) to an array object
    <ul>
      <li name="listWithOne[]">One item list</li>
    </ul>

----------

### Map nested tags in an object
    <div>
      <div name="parents[]">
        <p>Senior <b name="father">Davidson</b> and <b name="mother">Sarah</b></p>
        <ul>
          <li name="sons">Daniel</li>
          <li name="sons">Michael</li>
        </ul>
      </div>
      <div name="parents[]">
        <p>Senior <b name="father">Beggerson</b> and <b name="mother">Leka</b></p>
        <ul>
          <li name="sons">Mary</li>
          <li name="sons">July</li>
        </ul>
      </div>
    </div>

----------

### Map form fields into object
    <form>
      <label>Description</label><br>
      <textarea name="description">This is an awesome lib.</textarea>
      <input type="radio" name="sex" value="Female"> Female
      <input type="radio" name="sex" value="Male" checked="checked"> Male
      <input type="radio" name="sex" value="Dont know"> Dont know
      <label>Is human?</label>
      <input type="checkbox" name="human" checked="checked">
      <label>Want to receive emails?</label>
      <input type="checkbox" name="emails">
      <label>Civil state</label>
      <select name="civil_state">
        <option>Single</option>
        <option selected="selected">Married</option>
        <option>I dont know</option>
      </select>
      <label>City</label>
      <select name="city">
        <option value="FOR">Fortaleza</option>
        <option value="NY" selected="selected">New York</option>
        <option value="MI">Miami</option>
      </select>
    </form>

----------

### Map form fields with string representation of object.property into object
    <div name="people">
      <label>Client ID</label>
      <input type="text" name="client.id" value="2">
      <label>Client Name</label>
      <input type="text" name="client.name" value="Robert">
      <div>
        <label>Product ID</label>
        <input type="text" name="product[Identify]" value="1">
      </div>
      <div>
        <div>
          <label>Product Name</label>
          <input type="text" name="product[description]" value="Soccer shoes">
        </div>
      </div>
    </div>
