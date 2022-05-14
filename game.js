
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];


var started = false;
var level = 0;


// Check the keyboard input
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//  User choice
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});



// Function to check the answer
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over ");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }
}



// A function to randomly select a pattern flash the tile and play sound
function nextSequence(){
  userClickedPattern = [];


  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);
console.log(gamePattern);
}


// Function to play sound on a button click

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// Funtion to show animation for button click
function animatePress(currentColor){
      $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");}, 100);


}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
