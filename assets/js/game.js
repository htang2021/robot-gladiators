//fight or skip function

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      
      //return true if player wants to leave
      return true;
      //shop();
    } 
    //otherwise return false
    else {
      return false;
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {

  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    if (fightOrSkip()) {
      //if true, leave fight by breaking loop
      break;
    }
    //generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min +1) + min);
  return value;
}

var startGame = function() {
  //reset player stats
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      //debugger; <-- use only if need to enable it.
      fight(pickedEnemyObj);
      
      //if we are not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length -1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        if (storeConfirm) {
          shop();
        }
      }
    }
    else {
      window.alert('You have lost your robot in battle! Game Over!');
    }
  }
  endGame();
  
};

//function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game!  You now have a score of " + playerInfo.money + ".");
  } else {
    alert("You've lost your robot in battle.");
  }
  window.alert("The game has now ended.  Let's see how you did!");
  
  // ask player if they'd like to play again
  var playAgainConfirm = confirm("Would you like to play again?");
  if (playAgainConfirm) {
    startGame();
  } else {
    alert("Thank you for playing Robot Gladiators!  Come back soon!");
  }
};

var shop = function () {
  //ask player what they'd like to do
  var shopOptionPrompt = prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: '1' for REFILL, '2' for UPGRADE, or '3' for LEAVE to make a choice.");
  
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch(shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      alert("Leaving the store.");
      break;
    default:
      alert("You did not pick a valid option.  Try again.");
      //call shop() again to force player to pick a valid option
      shop();
      break;

  }
}

//function to set name
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  }, 
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];
// Start the game when the page loads
startGame();
