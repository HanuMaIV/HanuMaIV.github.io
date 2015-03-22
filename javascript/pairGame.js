// Set Vars
//
// load sounds & set background music to loop using event listener.
var backgroundMusic = new Audio('../sounds/backgroundMusic.mp3');
backgroundMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
backgroundMusic.play();
var move = new Audio('../sounds/move.mp3');
var hintSound = new Audio('../sounds/hint.mp3');
var winSound = new Audio('../sounds/winner.mp3');
var cheer = new Audio('../sounds/cheer.mp3');
var loser = new Audio('../sounds/loser.mp3');
var gameOver = new Audio('../sounds/gameOver.mp3');
var error = new Audio('../sounds/invalidMove.mp3');

// Create Player and Partner Objects

// Main Character Object
var brendan = {name: "Brendan",
               position: {x: 10, y: 181}
              };

// Pairing Partner Objects
var geo = {name: "Geovanna",
          position: {x: "530px", y: "5px"},
          hint: "My Name Rhymes with Benihana"};

var ace = {name: "Ace",
          position: {x: "530px", y: "181px"},
          hint: "Highest Card in the Deck"};

var marco = {name: "Marco",
            position: {x: "530px", y: "358px"},
            hint: "I lived in France for Two Years"};

// Create Variables to Hold Brendan's Current X and Y position
var playerLeft = brendan.position.x;
var playerTop = brendan.position.y;

// Select random partner and store to pairMatch Variable
var pairMatch = randomPair();

// Create Variable to hold the name of the closest partner
// Initially set to null will stay at null
// unless directly next to another player where it is assigned to be
// the value of the name of the closest player.
var closestPlayerValue = null;

// variables to keep track if game has ended
// and if the hint has been shown
var gameEnded = false;
var hintShown = false;

// Access the DOM for Music On and Off Controls
var musicOff = document.getElementById("musicOff");
var musicOn = document.getElementById("musicOn");

// Functions
//
//
// generates a random number used to select random
// partner that must be chosen to win
function randomPair() {
  friends = [geo, ace, marco];
  randNum = Math.floor((Math.random() * 3) + 1) - 1;
  return friends[randNum];
};

// Returns a Pairing Partner name if close to a valid object
// if not close, null is returned
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

// Moves Character Right if it is a valid move
function moveRight() {
  if (playerLeft + 140 > 500) {
    error.play();
  } else {
    playerLeft += 140;
    playerDiv.style.left = playerLeft + "px";
    move.play();
  }
}

// Moves Character Left if it is a valid move
function moveLeft() {
  if (playerLeft - 0 < 100) {
    error.play();
  } else {
    playerLeft -= 140;
    playerDiv.style.left = playerLeft + "px";
    move.play();
  }
}

// Moves Character Up if it is a valid move
function moveUp() {
  if (playerTop - 177 < 0) {
    error.play();
  } else {
    playerTop -= 177;
    playerDiv.style.top = playerTop + "px";
    move.play();
  }
}

// Moves Character Down if it is a valid move
function moveDown() {
  if (playerTop + 177 > 400) {
    error.play();
  } else {
    playerTop += 177;
    playerDiv.style.top = playerTop + "px";
    move.play();
  }
}

// Shows Hint into div ID Hint
function showHint() {
  hintShown = true;
  hint.innerHTML = pairMatch.hint;
  hint.style.display = "inline-block";
  hintSound.play();
}

// Winning Game Sequence
function winGame() {
  backgroundMusic.pause();
  gameEnded = true;
  winSound.play();
  room.style.display = "none";
  winner.style.display = "inline-block";
  cheer.play();
}

//Game Over Losing Sequence
function loseGame() {
  backgroundMusic.pause();
  gameEnded = true;
  room.style.display = "none";
  lose.style.display = "inline-block";
  gameOver.play();
}

// Checks for a Valid Winner and calls winning or losing sequences
// if not near a pairing partner, an invalid sound it played.
function checkWinner() {
  if ((pairMatch.name == closestPlayerValue) && (closestPlayerValue =! null) && (gameEnded == false)) {
    winGame();
  } else if ((pairMatch != closestPlayerValue) && (closestPlayerValue != null) && (gameEnded == false)) {
    loseGame();
  } else {
    loser.play();
  }
}


// Maps key press events to desired behaviors
function keyReader(e){
  if (gameEnded == false) { // This prevents undesired key input if game has ended
    if(e.keyCode == 39) {
      moveRight();
    }
    if(e.keyCode == 37) {
      moveLeft();
    }
    if(e.keyCode == 40) {
      moveDown();
    }
    if(e.keyCode == 38) {
      moveUp();
    }
    if ((e.keyCode == 72) && (hintShown == false)) {
      showHint();
    }
    if (e.keyCode == 80) {
      closestPlayer();
      checkWinner();
    }
  }
  // outside of if statement These key inputs will run regardless if
  // game has ended or not.
  if((e.keyCode == 78) && (gameEnded == true)){
    location.reload();
  }
}

// Config Environment
//
//
// Set Absolute Positions for Player and Partner Divs based on Object values
// Set's Position for Main Character
playerDiv.style.left = playerLeft + "px";
playerDiv.style.top = playerTop + "px";

// Sets Positions for Pairing Partners
geovannaDiv.style.left = geo.position.x;
geovannaDiv.style.top = geo.position.y;
aceDiv.style.left = ace.position.x;
aceDiv.style.top = ace.position.y;
marcoDiv.style.left = marco.position.x;
marcoDiv.style.top = marco.position.y;

// Calls keyReader function on keyboard keydown event
document.onkeydown = keyReader;

// Prevents screen from scrolling when using arrow keys
// by changing the default action
window.addEventListener("keydown", function(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();}}, false);


// Event handlers for sound off and on
musicOff.style.cursor = 'pointer';
musicOff.onmouseover = function() {
  musicOff.style.color = '#443311';
}
musicOff.onmouseout = function() {
  musicOff.style.color = '#ffd6c0';
}
musicOff.onclick = function() {
    backgroundMusic.pause();
};

musicOn.style.cursor = 'pointer';
musicOn.onmouseover = function() {
  musicOn.style.color = '#443311';
}
musicOn.onmouseout = function() {
  musicOn.style.color = '#ffd6c0';
}
musicOn.onclick = function() {
  if (gameEnded == false) {
    backgroundMusic.play();
  }
};

//***Cheat Code*** Press H During Game For a Hint