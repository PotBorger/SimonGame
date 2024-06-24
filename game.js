var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;
var result = true;
    
$(document).keypress(function(){
        if (!started){
            nextSequence();
            started = !started;
        }
    }
)

function checkAnswer(currentLevel){
    if (userClickedPattern.length === currentLevel){
        for (i = 0; i < userClickedPattern.length; i ++){
            if (userClickedPattern[i] !== gamePattern[i]){
                result = false;
                break;
            }
        }
        if(result === true){        
        setTimeout(() => {
            nextSequence();
        }, 1000);        
        userClickedPattern = [];
    }
    else{
        console.log("lose");
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200); 
        $("h1").html("con chó ngu si");
        setTimeout(function (){
            startOver();
        },2000);
       
    }
    }
    
} 
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    result = true;
    $("h1").html("Press A Key to Start");

}

function nextSequence(){
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  
}

$(".btn").click(function(){
    if (started){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
}})

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
