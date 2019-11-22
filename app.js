//Module & Revealing Module Pattern

//Basic structure

// (function(){
//   // Declare private vars and functions

//   return {
//     //Declare public var and func

//   }

// })();

//STANDARD MODULE PATTERN
const UICtrl = (function() {
  let text = "Hello World";

  const changeText = function() {
    const element = document.querySelector("h1");
    element.textContent = text;
  };

  return {
    callChangeText: function() {
      changeText();
      console.log(text);
    }
  };
})();

UICtrl.callChangeText();

//REVEALING MODULE PATTERN

const ItemCtrl = (function() {
  let data = [];

  function add(item) {
    data.push(item);
    console.log("Item Added.....");
  }

  function get(id) {
    return data.find(item => {
      return item.id === id;
    });
  }

  return {
    add: add,
    get: get
  };
})();

ItemCtrl.add({ id: 1, name: "Alex" });
console.log(ItemCtrl.get(1));

// SINGLETON

const Singleton = (function() {
  let instance;

  function createInstance() {
    const object = new Object({ name: "Max" });
    return object;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();
console.log(instanceA === instanceB);

//FACTORY PATTERN
function MemberFactory() {
  this.createMember = function(name, type) {
    let member;

    if (type === "simple") {
      member = new SimpleMembership(name);
    } else if (type === "standard") {
      member = new StandardMembership(name);
    } else if (type === "super") {
      member = new SuperMembership(name);
    }

    member.type = type;

    member.define = function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`);
    };

    return member;
  };
}

const SimpleMembership = function(name) {
  this.name = name;
  this.cost = "$5";
};
const StandardMembership = function(name) {
  this.name = name;
  this.cost = "$15";
};

const SuperMembership = function(name) {
  this.name = name;
  this.cost = "$25";
};

const members = [];

const factory = new MemberFactory();

members.push(factory.createMember("Max", "super"));
members.push(factory.createMember("Anna", "simple"));
members.push(factory.createMember("Pavel", "standard"));
members.push(factory.createMember("Alex", "simple"));
members.push(factory.createMember("Bob", "super"));
members.push(factory.createMember("Lilu", "standard"));

console.log(members);

members.forEach(function(member) {
  member.define();
});
