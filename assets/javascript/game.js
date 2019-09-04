var charArray = [

    bulbusaur = {
        name: "Bulbusaur",
        hp: 200,
        ap: 7,
        cap: 18,
        image: "assets/images/bulbasaur.png"
    },

    charmander = {
        name: "Charmander",
        hp: 130,
        ap: 12,
        cap: 25,
        image: "assets/images/charmander.png"
    },

    squirtle = {
        name: "Squirtle",
        hp: 150,
        ap: 10,
        cap: 22,
        image: "assets/images/squirtle.png"
    },

    pikachu = {
        name: "Pikachu",
        hp: 120,
        ap: 15,
        cap: 28,
        image: "assets/images/pikachu.png"
    }

];

function set(char, area) {
    var charDiv = $("<div class='character' id='" + char.name + "'/div>");
    var charName = $("<p>").text(char.name);
    var charSprite = $("<img>").attr("src", char.image);
    var charHP = $("<p>").text(char.hp);

    charDiv.append(charName).append(charSprite).append(charHP);

    $(area).append(charDiv);

    if (area === "#character-select") {
        charDiv.addClass("select");
    }
    else {
        charDiv.removeClass("select");
    }

    if (area === "#enemies") {
        charDiv.addClass("enemy");
    }
};

for (var i = 0; i < charArray.length; i++) {
    set(charArray[i], "#character-select");
}

var charPicked = false;
var enemyPicked = false;
var myEnemies = [];
var userCharacter;
var myOpponent;
var wins = 0;
var round = 0;
//add more variables as I see what I need

$(document).on("click", ".select", function () {
    if (charPicked === false) {
        var click = $(this).attr("id");
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name === click) {
                set(charArray[i], "#your-character");
                userCharacter = charArray[i];
            }
            else {
                myEnemies.push(charArray[i]);
                set(charArray[i], "#enemies");
            }   
        }
        $("#character-select").empty();
        charPicked = true;
    }
});

$(document).on("click", ".enemy", function (){
    var opponentIndex
    if (enemyPicked === false) {
        $("#enemies").empty();
        var click = $(this).attr("id");
        for (var i = 0; i < myEnemies.length; i++) {
            if (myEnemies[i].name === click) {
                set(myEnemies[i], "#defender");
                myOpponent = myEnemies[i];
                opponentIndex = i;
            }
            else {
                set(myEnemies[i], "#enemies");
            }
        }
        myEnemies.splice(opponentIndex,1);
        enemyPicked = true; 
    }
});

$(document).on("click", "#attack-button", function (){
    if (enemyPicked === true){
        $("#attack-info").empty();
        $("#attack-info").text("You attacked " + myOpponent.name + " for " + (userCharacter.ap + (userCharacter.ap*round)) + " damage.");
        myOpponent.hp = (myOpponent.hp - (userCharacter.ap + (userCharacter.ap * round)));

        if (myOpponent.hp > 0){
            $("#defender").empty();
            set(myOpponent, "#defender");
            $("#defense-info").text(myOpponent.name + " attacked you for " + myOpponent.cap + " damage.");
            userCharacter.hp = userCharacter.hp - myOpponent.cap;
            $("#your-character").empty();
            set(userCharacter, "#your-character");

            if (userCharacter.hp <= 0){
                $("#attack-button").remove();
                $("#attack-info").text("Please refresh the page to try again!");
            }
        }
        else {
            $("#defender").empty();
            enemyPicked = false;
            wins++;
            if (wins === 3){
                $("#defense-info").empty();
                $("#attack-button").remove();
                $("#attack-info").text("YOU WON! Refresh to try other characters.");
            }
            else {
                $("#defense-info").text(myOpponent.name + " was defeated select another opponent!");
            }
        }

    }
    else {
        $("#attack-info").empty();
        $("#attack-info").text("Please select a character.")
    }
    round++;
});

