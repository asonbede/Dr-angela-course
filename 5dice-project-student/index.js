//select elements
const image = document.querySelectorAll(".dice img");
const playerImage = document.querySelectorAll(".players-image img");
const title = document.querySelector("h1");
const button1 = document.querySelector(".player1-button");
const button2 = document.querySelector(".player2-button");
const Figure1 = document.querySelector("#figure1");
const Figure2 = document.querySelector("#figure2");
const mainContainer = document.querySelector("#main-container");
const player1ImageInput = document.querySelector("#player1-change-image-input");
player2ImageInput = document.querySelector("#player2-change-image-input");

const displayResult = document.querySelector(".display-result");
const figure1Label = document.querySelector("#figure1 label");
const figure2Label = document.querySelector("#figure2 label");
let randomNumberTwo;
let randomNumberOne;
let counter = 0;
let counter2 = 0;

//array of objects
const playersData = [
  // {
  //   gameNo:1,plyer1Score:3,player2Score:2,player1Total:5,player2Total:7,winner:player1/player2
  // }
];
const dataObj = {};

function collectPlayersData(dataObj) {
  return dataObj;
}

//determine overall winner
function overallWinner(obj) {
  if (obj.player1Total > obj.player2Total) {
    return "Player1";
  } else if (obj.player2Total > obj.player1Total) {
    return "Player2";
  } else {
    return "Draw";
  }
}

//Create result display table
function resultTableGenerator() {
  //construct table head
  const tableHead = `<thead>
    <tr>
      <th>Game</th>
      <th>Player1</th>
      <th>Player2 </th>
      <th>Winner</th>
    </tr>
  </thead>`;

  //construct table body
  let tableBodyArr = playersData.map((item) => {
    const bodyItems = `<tr>
    <td>${item.gameNo} </td>
    <td>${item.player1Score} </td>
    <td>${item.player2Score} </td>
    <td>${item.winner} </td>
    </tr>`;
    return bodyItems;
  });

  //convert map result to string
  tableBodyStr = tableBodyArr.join("");
  tableBodyStr = `<tbody>${tableBodyStr}</tbody>`;

  // //construct table footer
  const lastRowDataObj = playersData[playersData.length - 1];

  const footerItem = `<tfoot><tr>
                     <th>Total</th>
                     <td>${lastRowDataObj.player1Total}</td>
                     <td>${lastRowDataObj.player2Total}</td>
                     <td>Overal Winner: ${overallWinner(lastRowDataObj)}</td>
                     </tr> </tfoot>`;
  //Return complete table
  const completeTable = `<table>${tableHead}${tableBodyStr}${footerItem}</table>`;
  //append the table to the Dom at result display div
  document.querySelector(".display-result").innerHTML = completeTable;
}

//check winner
function checkWinner(counter) {
  if (randomNumberOne > randomNumberTwo) {
    title.innerHTML = `Player one wins game ${counter}`;
    figure1Label.classList.remove("do-not-show");
    figure2Label.classList.remove("do-not-show");
    figure1Label.classList.add("do-not-show");
    figure2Label.classList.add("do-not-show");
    mainContainer.classList.remove("container-by-js");
    mainContainer.classList.add("container-by-js");
    figure1.classList.remove("winner");
    figure1.classList.remove("loser");
    figure2.classList.remove("winner");
    figure2.classList.remove("loser");
    figure1.classList.add("winner");
    figure2.classList.add("loser");
    // displayResult.classList.remove("margin-on-left");
    // displayResult.classList.add("margin-on-left");
    return "Player one";
  } else if (randomNumberTwo > randomNumberOne) {
    title.innerHTML = `Player two wins game ${counter}`;
    figure1Label.classList.remove("do-not-show");
    figure2Label.classList.remove("do-not-show");
    figure1Label.classList.add("do-not-show");
    figure2Label.classList.add("do-not-show");
    mainContainer.classList.remove("container-by-js");
    mainContainer.classList.add("container-by-js");
    figure1.classList.remove("winner");
    figure1.classList.remove("loser");
    figure2.classList.remove("winner");
    figure2.classList.remove("loser");
    figure2.classList.add("winner");
    figure1.classList.add("loser");
    return "Player two";
  } else {
    title.innerHTML = `Game ${counter} is drawn`;
    mainContainer.classList.remove("container-by-js");
    figure1Label.classList.remove("do-not-show");
    figure2Label.classList.remove("do-not-show");

    figure1.classList.remove("loser");
    figure2.classList.remove("loser");
    figure1.classList.remove("winner");
    figure2.classList.remove("winner");
    return "Draw";
  }
}

//create a random between 1 and 6
const getRndomNumber = () => Math.floor(Math.random() * 6) + 1;

//when player one plays
button1.addEventListener("click", function (params) {
  button2.disabled = false;
  randomNumberOne = getRndomNumber();
  //construct source image for player1
  const randomImageSource1 = `images/dice${randomNumberOne}.png`;

  //set the source attribute of image one
  image[0].setAttribute("src", randomImageSource1);

  title.innerHTML = "Player one plays, now player 2 should play";

  //disable button so that it won't be clicked again until the opponent has click
  this.disabled = true;
  counter = counter + 1;
  if (counter % 2 === 0) {
    counter2 = counter2 + 1;
    //player1 total

    const collectedData = collectPlayersData({
      gameNo: counter2,
      player1Score: randomNumberOne,
      player2Score: randomNumberTwo,
      player1Total:
        counter2 === 1
          ? randomNumberOne
          : playersData
              .map((item) => item.player1Score)
              .reduce((acc, num) => acc + num, randomNumberOne),
      player2Total:
        counter2 === 1
          ? randomNumberTwo
          : playersData
              .map((item) => item.player2Score)
              .reduce((acc, num) => acc + num, randomNumberTwo),
      winner: checkWinner(counter2),
    });
    playersData.push(collectedData);
    checkWinner(counter2);
    resultTableGenerator();
    console.log(playersData);
  }
});

//when player two plays
button2.addEventListener("click", function () {
  button1.disabled = false;
  randomNumberTwo = getRndomNumber();
  //construct source image for player2
  const randomImageSource2 = `images/dice${randomNumberTwo}.png`;

  //set the source attribute of image two
  image[1].setAttribute("src", randomImageSource2);

  title.innerHTML = "Player two plays, now player 1 should play";

  //disable button so that it won't be clicked again until the opponent has click
  this.disabled = true;
  counter = counter + 1;
  if (counter % 2 === 0) {
    counter2 = counter2 + 1;
    const collectedData = collectPlayersData({
      gameNo: counter2,
      player1Score: randomNumberOne,
      player2Score: randomNumberTwo,
      player1Total:
        counter2 === 1
          ? randomNumberOne
          : playersData
              .map((item) => item.player1Score)
              .reduce((acc, num) => acc + num, randomNumberOne),
      player2Total:
        counter2 === 1
          ? randomNumberTwo
          : playersData
              .map((item) => item.player2Score)
              .reduce((acc, num) => acc + num, randomNumberTwo),
      winner: checkWinner(counter2),
    });
    playersData.push(collectedData);
    console.log(playersData);
    checkWinner(counter2);
    resultTableGenerator();
  }
});

//change player2 picture
player2ImageInput.addEventListener("change", function (params) {
  console.log("size", "srcObject" in player2ImageInput);
  const fileName = player2ImageInput.value.split("\\");
  const filePath = `images\\${fileName[fileName.length - 1]}`;
  console.log({ filePath });
  playerImage[1].setAttribute("src", filePath);
});

//change player1 picture
player1ImageInput.addEventListener("change", function (params) {
  console.log(player1ImageInput.value);
  const fileName = player1ImageInput.value.split("\\");
  const filePath = `images\\${fileName[fileName.length - 1]}`;
  console.log({ filePath });
  playerImage[0].setAttribute("src", filePath);
});
