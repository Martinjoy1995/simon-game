var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var started=true;

$(document).on("keydown",function(){
   
    if(started==true){
        
        nextSequence();
        started=false;
    }
 })

function nextSequence(){
    userClickedPattern=[];
    
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text("Level " +(level));
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
    
    
}
 
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 })
  function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
 }
 
  function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
 }

 function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        if(gamePattern.length===userClickedPattern.length){
            level++;
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
            $("#level-title").text("Game Over,Press any key to restart.");
        }, 200);
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    started=true;
    level=0;
}
 

 