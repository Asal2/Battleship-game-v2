//Author: Nnamdi Nwanze
//Purpose: create a gamePlay object that controls game play for a Battleship game

var gamePlay = {
    Battleship: Object.create(battleship),

//gets then returns the username
    getUsername: function () {
        var currentURL = window.location + "";
        var splitURL = currentURL.split("=");
        return splitURL[1];
    },
//uses  Battleship member to setup and start a game
    playGame: function () {
        this.reset();
    },
// If all ships are marked, it adds a “Game over” message to the message div.
    isGameOver: function () {
        var gameOverCount=0;
        for (let i = 0; i < allVessels.length; i++) {
            gameOverCount += allVessels[i].getHits()-1;
        }
        gameOverCount++;
        if (gameHits===0){
            addMessage("<br>*******************************");
            addMessage("Enemy Fleet Vanquished!");
            addMessage("*******************************");
        }
    },
// Resets the game board, resets the message div and starts a new game
    reset: function () {
        clearMessages();
        creatHTMLTable();
        this.Battleship.initialize();
        this.Battleship.createShips();
    }
};

var username = gamePlay.getUsername();
setUsername(username);
gamePlay.playGame();
