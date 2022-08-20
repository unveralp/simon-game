var start=true;
 $(document).on("keydown", function(event) {
   if(start===true){
      nextSequence();
      start=false;
   }

 });
var userClickedPattern=[];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
function nextSequence() {
  level++;
  userClickedPattern=[];
  $("#level-title").html("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  audio.play();

}

$(".btn").on("click", function() {
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));

});

function makeSound(buttonInnerHtml) {

  switch (buttonInnerHtml) {
    case "red":

      var audio = new Audio("sounds/red.mp3");
      $("#red").fadeOut(100).fadeIn(100);
      audio.play();
      break;
    case "blue":

      var audio = new Audio("sounds/blue.mp3");
      $("#blue").fadeOut(100).fadeIn(100);
      audio.play();
      break;
    case "green":

      var audio = new Audio("sounds/green.mp3");
      $("#green").fadeOut(100).fadeIn(100);
      audio.play();
      break;
    case "yellow":

      var audio = new Audio("sounds/yellow.mp3");
      $("#yellow").fadeOut(100).fadeIn(100);
      audio.play();
      break;
    default:
  }
}
function animatePress(currentColour){
   $("#"+ currentColour).addClass("pressed");
   setTimeout(function(){
     $("#"+ currentColour).removeClass("pressed")
   },100);
 }

 function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      var count=0;
      for(var i=0;i<gamePattern.length;i++){
        if(userClickedPattern[i]===gamePattern[i]){
          count++;
        }
      }
      if(count===gamePattern.length){
        console.log("success");
        setTimeout(function(){
          nextSequence();
        },1000)

      }
    }
    else{
      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function(){
       $("body").removeClass("game-over");
      },100);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
 }
 function startOver(){
  level = 0;
  gamePattern = [];
  start = true;
}
