//Module & Revealing Module Pattern

//Basic structure

// (function(){
//   // Declare private vars and functions

//   return {
//     //Declare public var and func

//   }

// })();

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

//OBSERVER

function EventObserver() {
  this.observers = [];
}

EventObserver.prototype = {
  subscribe: function(fn) {
    this.observers.push(fn);
    console.log(`You are now subscribe to ${fn.name}`);
  },
  unsubscribe: function(fn) {
    this.observers = this.observers.filter(function(item) {
      if (item !== fn) {
        return item;
      }
    });
    console.log(`You are now unsubscribed from ${fn.name}`);
  },
  fire: function() {
    this.observers.forEach(function(item) {
      item.call();
    });
  }
};

const click = new EventObserver();

//Event Listeners
document.querySelector(".sub-ms").addEventListener("click", function() {
  click.subscribe(getCurMilliseconds);
});
document.querySelector(".unsub-ms").addEventListener("click", function() {
  click.unsubscribe(getCurMilliseconds);
});
document.querySelector(".sub-s").addEventListener("click", function() {
  click.subscribe(getCurSeconds);
});
document.querySelector(".unsub-s").addEventListener("click", function() {
  click.unsubscribe(getCurSeconds);
});
document.querySelector(".fire").addEventListener("click", function() {
  click.fire();
});

//Click Handler

const getCurMilliseconds = function() {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};
const getCurSeconds = function() {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

//MEDIATOR

const User = function(name) {
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },

  receive: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
};

const Chatroom = function() {
  let users = {}; //list of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if (to) {
        //Single user message

        to.receive(message, from);
      } else {
        //Mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].receive(message, from);
          }
        }
      }
    }
  };
};

const brad = new User('Brad');
const max = new User('Max');
const ann = new User('Ann');


const chatroom = new Chatroom();

chatroom.register(brad);
chatroom.register(max);
chatroom.register(ann);

brad.send('Hello Max', max);
max.send('HI', ann);
ann.send('HI');

