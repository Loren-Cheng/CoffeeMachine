const input = require('sync-input');

const coffeeTypes = [{name: `espresso`, water: 250, milk: 0, coffee: 16, price: 4, disposableCups: 1},
  {name: `latte`, water: 350, milk: 75, coffee: 20, price: 7, disposableCups: 1},
  {name: `cappuccino`, water: 200, milk: 100, coffee: 12, price: 6, disposableCups: 1},
  {name: `xl cappuccino`, water: 300, milk: 150, coffee: 18, price: 8, disposableCups: 1}];

let coffeeMachine = { // currently supply
  money: 550, // $
  water: 400,   // ml
  milk: 540,    // ml
  coffee: 120,  // g
  disposableCups: 9,
  fillSupplies() {
    this.water += Number(input(`Write how many ml of water you want to add:`));
    this.milk += Number(input(`Write how many ml of milk you want to add:`));
    this.coffee += Number(input(`Write how many grams of coffee beans you want to add:`));
    this.disposableCups += Number(input(`Write how many disposable coffee cups you want to add:`));
    console.log();
  },
  state() {
    console.log(`The coffee machine has:` +
      `\n${this.water} ml of water` +
      `\n${this.milk} ml of milk` +
      `\n${this.coffee} g of coffee beans` +
      `\n${this.disposableCups} disposable cups` +
      `\n$${this.money} of money` +
      `\n`
    );
  },
  selectCoffeeType() {
    let selectCoffeeName = ``;
    let userChoice = input(`What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - xl cappuccino, back - to main menu:`);
    if (userChoice === `1`) {
      selectCoffeeName = `espresso`;
    } else if (userChoice === `2`) {
      selectCoffeeName = `latte`;
    } else if (userChoice === `3`) {
      selectCoffeeName = `cappuccino`;
    } else if (userChoice === `4`) {
      selectCoffeeName = `xl cappuccino`;
    }

    for (let i = 0; i < coffeeTypes.length; i++) {
      if (selectCoffeeName === coffeeTypes[i].name) {
        return coffeeTypes[i];
      }
    }
    return null;
  }
  ,
  makeACoffee(coffeeType) {
    if (coffeeType != null) {
      if (this.water >= coffeeType.water
        & this.milk >= coffeeType.milk
        & this.coffee >= coffeeType.coffee
        & this.disposableCups >= coffeeType.disposableCups) {
        console.log(`I have enough resources, making you a coffee!`);
        this.water -= coffeeType.water;
        this.milk -= coffeeType.milk;
        this.coffee -= coffeeType.coffee;
        this.disposableCups -= coffeeType.disposableCups;
        this.money += coffeeType.price;
        console.log();
      } else {
        if (this.water < coffeeType.water
        ) {
          console.log(`Sorry, not enough water!`);
        }
        if (this.milk < coffeeType.milk) {
          console.log(`Sorry, not enough milk!`);
        }
        if (this.coffee < coffeeType.coffee) {
          console.log(`Sorry, not enough coffee!`);
        }
        if (this.disposableCups < coffeeType.disposableCups) {
          console.log(`Sorry, not enough disposableCups!`);
        }
        console.log();
      }
    }
  },
  giveMoney() {
    console.log(`I gave you $${this.money}` + `\n`);
    this.money -= this.money;
  }
}

while (true) {
  let userAction = input(`Write action (buy, fill, take, remaining, exit):`);
  console.log();
  switch (userAction) {
    default:
      continue;
    case `buy`:
      coffeeMachine.makeACoffee(coffeeMachine.selectCoffeeType());
      continue;
    case `fill`:
      coffeeMachine.fillSupplies();
      continue;
    case `take`:
      coffeeMachine.giveMoney();
      continue;
    case `remaining`:
      coffeeMachine.state();
      continue;
    case `exit`:
      break;
  }
  break;
}