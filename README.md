# Object to DOM
You can fill DOM values with an object.

----------

### Fill list with an array object
    var object = { list: ["First","Second","Third"] }
<!-- -->
    <ul>
      <li name="list"></li>
    </ul>
[Let's make it work](javascript:object.toDom(document.getElementById('list'\) \))

<ul id="list">
  <li name="list"></li>
</ul>

----------

### Fill list if name like array with an array object
    var object = { listWithOne: ["One item list"] };
<!-- -->
    <ul>
      <li name="listWithOne[]"></li>
    </ul>
[Let's make it work](javascript:object.toDom(document.getElementById('listWithOne'\) \))

<ul id="listWithOne">
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
[Let's make it work](javascript:object.toDom(document.getElementById('parents'\) \))

<div id="parents">
  <div name="parents[]">
    <p>Senior <b name="father"></b> and <b name="mother"></b></p>
    <ul>
      <li name="sons"></li>
    </ul>
  </div>
</div>

----------

### Set attribute value with variable marks
    var object = { name: "David" };
<!-- -->
    <a name="name" href="/user/{name}"></a>
[Let's make it work](javascript:object.toDom(document.getElementById('name'\) \))

<div id="name">
  <a name="name" href="/user/{name}"></a>
</div>

----------

### Fill form fields
    var object = { description: "This is an awesome lib.",
                   sex: "Male", human: true, emails: false,
                   civil_state: "Married", city: "NY"
                 };
<!-- -->
    <form>
      <label>Description</label>
      <textarea name="description"></textarea>
      <input type="radio" name="sex" value="Female"> Female
      <input type="radio" name="sex" value="Male"> Male
      <input type="radio" name="sex" value="Dont know"> Dont know
      <label>Is human?</label>
      <input type="checkbox" name="human">
      <label>Want to receive emails?</label>
      <input type="checkbox" name="emails">
      <label>Civil state</label>
      <select name="civil_state">
        <option>Single</option>
        <option>Married</option>
        <option>I dont know</option>
      </select>
      <label>City</label>
      <select name="city">
        <option value="FOR">Fortaleza</option>
        <option value="NY">New York</option>
        <option value="MI">Miami</option>
      </select>
    </form>
[Let's make it work](javascript:object.toDom(document.getElementById('form'\) \))

<form id="form">
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
      <input type="text" name="client.id">
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
[Let's make it work](javascript:object.toDom(document.getElementById('people'\) \))

<div id="people">
  <div name="people">
    <label>Client ID</label>
    <input type="text" name="client.id">
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
</div>

----------
