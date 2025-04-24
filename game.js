var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var gameOver= false;

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var rand = Math.floor(Math.random() * 4);
    var randomColour = buttonColors[rand];
    gamePattern.push(randomColour);

    flash(randomColour);
    playSound(randomColour);
    
}

function flash(color) {
    var selected = $("#" + color);
    selected.fadeOut();
    selected.fadeIn();
}

function playSound(color) {
    sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function animatePressed(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


$(".btn").click(function (e) {
    var userChosenColour = $(this).attr("id");

    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePressed(userChosenColour);

    check(userClickedPattern.length-1);
});


function check (level){
    if(gamePattern[level] == userClickedPattern[level]){
        console.log("success");

        if(gamePattern.length == userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
        started = false;
    }
}

//Starting Game

$(document).on("keypress", function(){
    if(!started){
        nextSequence();
    }
});

function startOver(){
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
}