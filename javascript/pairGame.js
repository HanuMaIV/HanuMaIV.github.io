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
    var playerImg = document.getElementById("player");
    var map = document.getElementById("room");


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

    var friends = [geo, ace, marco];


    var closestPlayerValue = null;

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

    function randomPair() {
      return Math.floor((Math.random() * 3) + 1) - 1;
   };

   var pairMatch = friends[randomPair()].name;




    var playerLeft = brendan.position.x;
    var playerTop = brendan.position.y;

    playerDiv.style.left = playerLeft + "px";
    playerDiv.style.top = playerTop + "px";
    geovannaDiv.style.left = geo.position.x + "px";
    geovannaDiv.style.top = geo.position.y + "px";
    aceDiv.style.left = ace.position.x + "px";
    aceDiv.style.top = ace.position.y + "px";
    marcoDiv.style.left = marco.position.x + "px";
    marcoDiv.style.top = marco.position.y + "px";


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
            winSound.play();
            room.style.display = "none";
            winner.style.display = "inline-block";
            cheer.play();
          } else if ((pairMatch != closestPlayerValue) && (closestPlayerValue != null)) {
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



    document.onkeydown = keyReader;