// Prevents screen from scrolling when using arrow keys
// by changing the default action
window.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// load sounds & set  background music to loop using event listener.
var backgroundMusic = new Audio('../sounds/backgroundMusic.mp3');
backgroundMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
backgroundMusic.play();
var move = new Audio('../sounds/move.mp3');
var winSound = new Audio('../sounds/winner.mp3');
var cheer = new Audio('../sounds/cheer.mp3');
var loser = new Audio('../sounds/loser.mp3');
var gameOver = new Audio('../sounds/gameOver.mp3');
var error = new Audio('../sounds/invalidMove.mp3');

//Access DOM element
var playerImg = document.getElementById("player");

// Create Player and Partner Objects
var brendan = {name: "Brendan",
               position: {x: 10, y: 181}
              };

var geo = {name: "Geovanna",
          position: {x: 530, y: 5}
          };

var ace = {name: "Ace",
           position: {x: 530, y: 181}
          };

var marco = {name: "Marco",
               position: {x: 530, y: 358}
              };

// Create Variables to Hold Brendan's Current X and Y position
var playerLeft = brendan.position.x;
var playerTop = brendan.position.y;

// Set Positions for Partner Divs based on Object values
playerDiv.style.left = playerLeft + "px";
playerDiv.style.top = playerTop + "px";
geovannaDiv.style.left = geo.position.x + "px";
geovannaDiv.style.top = geo.position.y + "px";
aceDiv.style.left = ace.position.x + "px";
aceDiv.style.top = ace.position.y + "px";
marcoDiv.style.left = marco.position.x + "px";
marcoDiv.style.top = marco.position.y + "px";

// Create Array to hold Partners
var friends = [geo, ace, marco];

// Select random partner and store to pairMatch Variable
var pairMatch = friends[randomPair()].name;

// Create Variable to hold the name of the closest partner
// Initially set to null will stay at null
// unless directly next to another player where it is assigned to be
// the value of the name of the closest player.
var closestPlayerValue = null;


// Runs every time Player is moved and returns value of closest partner
function closestPlayer() {
  if ((playerLeft == 430) && (playerTop == 4)){
    closestPlayerValue = geo.name;
  } else if ((playerLeft == 430) && (playerTop == 181)) {
    closestPlayerValue = ace.name;
  } else if ((playerLeft == 430) && (playerTop == 358)) {
    closestPlayerValue = marco.name;
  } else {
    closestPlayerValue = null;
  }
}

// used to generate a random number used to select random
// partner that must be chosen to win
function randomPair() {
  return Math.floor((Math.random() * 3) + 1) - 1;
};

// Maps key press events to desired behaviors
function keyReader(e){
  if(e.keyCode == 39) {
    if (playerLeft + 140 > 500) {
      error.play();
    } else {
      playerLeft += 140;
      playerDiv.style.left = playerLeft + "px";
      move.play();
      closestPlayer();
      console.log(playerLeft);
      console.log(closestPlayerValue);
    }
  }
  if(e.keyCode == 37) {
    if (playerLeft - 0 < 100) {
      error.play();
    } else {
      playerLeft -= 140;
      playerDiv.style.left = playerLeft + "px";
      move.play();
      closestPlayer();
      console.log(playerLeft);
      console.log(closestPlayerValue);
    }
  }
  if(e.keyCode == 40) {
    if (playerTop + 177 > 400) {
      error.play();
    } else {
      playerTop += 177;
      playerDiv.style.top = playerTop + "px";
      move.play();
      closestPlayer();
      console.log(playerTop);
      console.log(closestPlayerValue);
    }
  }
  if(e.keyCode == 38) {
    if (playerTop - 177 < 0) {
      error.play();
    } else {
      playerTop -= 177;
      playerDiv.style.top = playerTop + "px";
      move.play();
      closestPlayer();
      console.log(playerTop);
      console.log(closestPlayerValue);
    }
  }
  if(e.keyCode == 80) {
    if ((pairMatch == closestPlayerValue) && (closestPlayerValue =! null)){
      backgroundMusic.pause();
      winSound.play();
      room.style.display = "none";
      winner.style.display = "inline-block";
      cheer.play();
    } else if ((pairMatch != closestPlayerValue) && (closestPlayerValue != null)) {
      backgroundMusic.pause();
      room.style.display = "none";
      lose.style.display = "inline-block";
      gameOver.play();
    } else {
      loser.play();
    }

  }
  if(e.keyCode == 78) {
    location.reload();
  }

}

// Keydown Event trigger
document.onkeydown = keyReader;