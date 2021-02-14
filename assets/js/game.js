var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);

        break;
      }
    }

    //generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack);
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
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
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyNames.length; i++) {
    // if player is still alive, keep fighting
    if (playerHealth > 0) {
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
      var pickedEnemyName = enemyNames[i];
      enemyHealth = randomNumber(40, 60);
      //debugger; <-- use only if need to enable it.
      fight(pickedEnemyName);
      
      //if we are not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length -1) {
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
  // play again
  //startGame();
};

//function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game!  You now have a score of " + playerMoney + ".");
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
  var shopOptionPrompt = prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

  switch(shopOptionPrompt) {
    case "REFILL":
    case "refill":
      if (playerMoney >= 7) {
        alert("Refilling player's health by 20 for 7 dollars.");
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      } else {
        alert("You don't have enough money!");
      }
      break;
    
    case "UPGRADE":
    case "upgrade":
      if (playerMoney >= 7) {
        alert("Upgrading player's attack by 6 for 7 dollars.");
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      } else {
        alert("You don't have enough money!");
      }
      break;
    
    case "LEAVE":
    case "leave":
      alert("Leaving the store.");
      break;
    
    //if other than refill, upgrade, or leave
    default:
      alert("You did not pick a valid option.  Try again.");
      //call shop() again to force player to pick a valid option
      shop();
      break;

  }
}

// Start the game when the page loads
startGame();
