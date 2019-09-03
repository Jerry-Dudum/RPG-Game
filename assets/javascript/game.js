var charArray = [

    bulbusaur = {
        name: "Bulbusaur",
        hp: 200,
        ap: 10,
        cap: 6,
        image: "assets/images/bulbasaur.png"
    },

    charmander = {
        name: "Charmander",
        hp: 150,
        ap: 18,
        cap: 10,
        image: "assets/images/charmander.png"
    },

    squirtle = {
        name: "Squirtle",
        hp: 180,
        ap: 15,
        cap: 12,
        image: "assets/images/squirtle.png"
    },

    pikachu = {
        name: "Pikachu",
        hp: 120,
        ap: 20,
        cap: 30,
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

    if (area === "#your-character") {
        charDiv.addClass("player");
    }

    if (area === "#enemies") {
        charDiv.addClass("enemy");
    }

    if (area === "#defender") {
        charDiv.addClass("opponent");
    }
};

for (var i = 0; i < charArray.length; i++) {
    set(charArray[i], "#character-select");
}

var charPicked = false;
var enemyPicked = false;
var myEnemies = []
//add more variables as I see what I need

$(document).on("click", ".select", function () {
    if (charPicked === false) {
        var click = $(this).attr("id");
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name === click) {
                set(charArray[i], "#your-character");
                charPicked = charArray[i];
            }
            else {
                myEnemies.push(charArray[i]);
                set(charArray[i], "#enemies");
            }   
        }
        $("#character-select").empty();
        charPicked = true;
    }
})