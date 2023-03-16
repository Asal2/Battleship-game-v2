///Author: Nnamdi Nwanze
//Purpose: create a listeners that listens for clicks for a Battleship game
const asciMinusum = 65; // asci value variable

const serverLink = "http://ncnwanze.faculty.noctrl.edu/battleshipcoord.php"; // remote sever link which gives random status, x and y coordinates 
//addEventListeners to listen for user clicks on the game board and then take the appropriate actions.
document.querySelector("#gametable").addEventListener("click", (e) => {
  const tableElement = e.target;
  if (tableElement !== null && tableElement.tagName.toLowerCase() === "td") {
    if (e.target.innerHTML === "") {
      var style = gamePlay.Battleship.makeMove([
        e.target.parentNode.rowIndex - 1,
        e.target.cellIndex,
      ]);
      addClass(e.target, style);
      if (style === "missed") changeText(tableElement, style);
      else changeText(tableElement, style[0].toUpperCase());
      gamePlay.isGameOver();
    } else {
      addMessage("You already clicked there");
    }
  }
});

//addEventListeners to listen for restart button which restarts the game.
document.querySelector("#resetButton").addEventListener("click", (e) => {
  //Reset Game
  gamePlay.reset();
});

//addEventListeners to listen for user clicks on the game board and then take the appropriate actions and using XMLHTTPREQUEST
document.querySelector("#XMLHttp-btn").addEventListener("click", (e) => {
  let xhr = new XMLHttpRequest();
  xhr.open("Get", serverLink);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var getObject = JSON.parse(xhr.responseText);
      console.log(getObject);
      // getting x and y coordinate from the JSON object
      var xcord = getObject.content.xcoordinate;
      var ycord = getObject.content.ycoordinate;
      getTableMove(xcord, ycord);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      alert("Please try again");
      addMessage("Please click the button again!!!");
      addMessage("");
    }};
});

//addEventListeners to listen for user clicks on the game board and then take the appropriate actions and using JQUERY
document.querySelector("#JQuery-btn").addEventListener("click", (e) => {
  $.get(serverLink, (data) => {
    console.log(data);
    // getting x and y coordinate from the JSON object
    var xcord = data.content.xcoordinate;
    var ycord = data.content.ycoordinate;
    getTableMove(xcord, ycord);
  }).fail((err) => {
    alert("Please try again");
    addMessage("Please click the button again!!!");
    addMessage("");
  });
});

//addEventListeners to listen for user clicks on the game board and then take the appropriate actions and using fetch
document.querySelector("#fetch-btn").addEventListener("click", (e) => {
  fetch(serverLink)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // getting x and y coordinate from the JSON object
      var xcord = data.content.xcoordinate;
      var ycord = data.content.ycoordinate;
      getTableMove(xcord, ycord);
    })
    .catch((err) => {
      alert("Please try again");
      addMessage("Please click the button again!!!");
      addMessage("");
    });
});

//get the coordinates from the XMLHttp-btn, JQuery-btn and fetch-btn button and calls getRemoteMove and the move and the table elements
function getTableMove(xcord, ycord) {
    // Calls the getRemoteMove method and returns the move i.e miss, hit or sunk
  var move = battleship.getRemoteMove(xcord, ycord);
  console.log(move);
  var xco = xcord.charCodeAt(0) - asciMinusum;
  // get the table element form the id gametable
  var getTable = document.getElementById("gametable").rows[ycord].cells[xco];
  console.log(getTable);
  addClass(getTable, move);
  changeText(getTable, move);
}
