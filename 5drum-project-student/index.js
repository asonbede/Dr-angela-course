const buttonElement = document.querySelector("button");
const drumButtons = document.querySelectorAll(".drum");

//play audio function
const playSound = (audioPath) => {
  const sounObject = new Audio(audioPath);
  sounObject.play();
};

//make sound function
const makeSound = (key) => {
  switch (key) {
    case "w":
      playSound("./sounds/tom-1.mp3");
      break;

    case "a":
      playSound("./sounds/tom-2.mp3");
      break;

    case "s":
      playSound("./sounds/tom-3.mp3");
      break;
    case "d":
      playSound("./sounds/tom-4.mp3");
      break;
    case "j":
      playSound("./sounds/snare.mp3");
      break;

    case "k":
      playSound("./sounds/crash.mp3");
      break;
    case "l":
      playSound("./sounds/kick-bass.mp3");
      break;

    default:
      console.log(key);
      break;
  }
};

//add class for animation
const buttonAnimation = (currentKey) => {
  const activation = document.querySelector(`.${currentKey}`);
  //add pressed class to the active user
  activation.classList.add("pressed");
  //remove the class after 100 ms
  setTimeout(function () {
    activation.classList.remove("pressed");
  }, 100);
};

//Detecting button press
const drumButtonsLength = drumButtons.length;
console.log({ drumButtonsLength });
for (let i = 0; i < drumButtonsLength; i++) {
  drumButtons[i].addEventListener("click", function (params) {
    const buttonText = this.innerHTML;
    console.log({ buttonText });
    makeSound(buttonText);
    buttonAnimation(buttonText);
  });
}

//Detecting keyboard press
document.addEventListener("keypress", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});
