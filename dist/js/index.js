const gameBoard = {
  level: 0,
  counter: 0,
  gameSequence: [],
  playerSequence: [],
  colors: ["#red", "#blue", "#green", "#yellow"],
  sound: {
    red: new Audio("./assets/sounds/red.mp3"),
    blue: new Audio("./assets/sounds/blue.mp3"),
    green: new Audio("./assets/sounds/green.mp3"),
    yellow: new Audio("./assets/sounds/yellow.mp3"),
    wrong: new Audio("./assets/sounds/wrong.mp3")
  }
};

// Start Game On Play Button
$(".gameplay__button").click(function() {
  console.log("Start Button Clicked...");
  $(".gameplay__button").css("display", "none");
  $(".gameplay__stats").removeClass("isHidden");
  $(".level-label").text("Level");
  newGame();
});

//Starts A New Game

function newGame() {
  // Ensure Reset
  gameReset();
}

function gameReset() {
  gameBoard.level = 0;
  gameBoard.gameSequence = [];
  gameBoard.playerSequence = [];
  nextLevel();
}

function nextLevel() {
  $(".gameplay-btn").attr("disabled", "disabled");
  gameBoard.level++;
  console.log(`Current level is: ${gameBoard.level}`);
  $(".level").text(gameBoard.level.toString());
  levelSequence(gameBoard.gameSequence);
}

function levelSequence(arr) {
  // Get Current Sequence
  newSequence = [...gameBoard.gameSequence];

  // Add One Random Color
  randomColor = Math.floor(Math.random() * 4);
  newSequence.push(gameBoard.colors[randomColor]);

  gameBoard.gameSequence = newSequence;
  $(".gameplay-btn").removeAttr("disabled", "disabled");
  $(".gameplay-btn").addClass("isPointer");
  console.log(gameBoard.gameSequence);
  playSequence(gameBoard.gameSequence);
}

/* Interval and Timeout Solution from https://medium.com/front-end-weekly/create-simon-game-in-javascript-d53b474a7416 */

function playSequence(arr) {
  var i = 0;
  var moves = setInterval(function() {
    showPlayer(arr[i]);
    i++;
    if (i >= arr.length) {
      clearInterval(moves);
    }
  }, 600);

  clearPlayer();
}

function clearPlayer() {
  gameBoard.playerSequence = [];
}

function showPlayer(currentColor) {
  console.log(currentColor);
  let soundColor = currentColor.slice(1);
  console.log(soundColor);
  $("#" + soundColor).addClass("glow");
  gameBoard.sound[soundColor].play();
  setTimeout(function() {
    $("#" + soundColor).removeClass("glow");
  }, 300);
}

$(".gameplay-btn").click(function() {
  let buttonClicked =
    "#" +
    $(this)
      .closest("div")
      .attr("id");
  console.log("The id of the parent div is: " + buttonClicked);

  gameBoard.playerSequence.push(buttonClicked);

  checkSequence(buttonClicked);
});

function checkSequence(answer) {
  console.log("In check sequence: " + answer);
  console.log(gameBoard.gameSequence.length);
  console.log(gameBoard.playerSequence.length);
  console.log(gameBoard.counter);

  if (
    gameBoard.playerSequence[gameBoard.counter] ==
      gameBoard.gameSequence[gameBoard.counter] &&
    gameBoard.counter == gameBoard.gameSequence.length - 1
  ) {
    showPlayer(answer);
    gameBoard.counter = 0;
    nextLevel();
  } else if (
    gameBoard.playerSequence[gameBoard.counter] ==
    gameBoard.gameSequence[gameBoard.counter]
  ) {
    gameBoard.counter++;
    return showPlayer(answer);
  } else {
    gameBoard.sound.wrong.play();
    setTimeout(function() {
      endGame();
    }, 800);
  }

}

function endGame() {
  // location.reload();
  $(".gameplay__stats").removeClass("isHidden");
  $(".level-label").text("Game");
  $(".level").text("Over!");
  $(".gameplay__button").css("display", "flex");
  $(".gameplay__button i").removeClass("fa-play");
  $(".gameplay__button i").addClass("fa-redo");
}
