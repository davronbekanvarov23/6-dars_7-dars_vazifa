import words from "./data.js";
const randomWord = document.getElementById("random__word");
const randomWordinput = document.getElementById("random_word_input");

const score = document.getElementById("user__score");
const userTime = document.getElementById("user__time");
const modal = document.getElementById("modal");
const modalStart = document.getElementById("modal-start");
const btnRetry = document.getElementById("retry-btn");
const btnStart = document.getElementById("btn-start");
const overlay = document.getElementById("overlay");
const result = document.getElementById("result");

let globalWord;
let time = 10;
let level = "easy";
function randomWordGenerator() {
  const randomNumber = Math.trunc(Math.random() * words.length);
  randomWord.textContent = words[randomNumber];
  // console.log(words[randomNumber])
  globalWord = words[randomNumber];
}

randomWordGenerator();
let counter = 0;
btnStart.addEventListener("click", () => {
  modalStart.classList.add("hidden");
  overlay.classList.add("hidden");
  randomWordinput.focus();
  let inter = setInterval(() => {
    time--;

    userTime.textContent = `${time}s`;
    if (time == 0) {
      clearInterval(inter);
      modal.classList.remove("hidden");
    }
    if (time >= 7) {
      userTime.parentElement.style.color = " green";
    } else if (time < 7 && time >= 4) {
      userTime.parentElement.style.color = " gold";
      document.body.style = `box-shadow: 0px 2px 42px 7px rgba(254,236,15,0.75) inset;
        -webkit-box-shadow: 0px 2px 42px 7px rgba(254,236,15,0.75) inset;
        -moz-box-shadow: 0px 2px 42px 7px rgba(254,236,15,0.75) inset;`;
    } else if (time < 4) {
      userTime.parentElement.style.color = " red";
      document.body.style = `box-shadow: 0px 2px 42px 7px rgba(254,15,49,0.75) inset;
        -webkit-box-shadow: 0px 2px 42px 7px rgba(254,15,49,0.75) inset;
        -moz-box-shadow: 0px 2px 42px 7px rgba(254,15,49,0.75) inset;`;
    }
  }, 1000);
});
randomWordinput.addEventListener("input", () => {
  if (randomWordinput.value == globalWord) {
    randomWordGenerator();
    randomWordinput.value = "";
    counter++;
    score.textContent = counter;
    result.textContent = counter;
    if (level == "easy") {
      time += 7;
    } else if (level == "medium") {
      time += 5;
    } else {
      time += 3;
    }
  }
});
userTime.parentElement.style.color = " green";

btnRetry.addEventListener("click", () => {
  modal.classList.add("hidden");
  location.reload(true);
});

const changeLevel = document.getElementById("change_level");

changeLevel.addEventListener("change", () => {
  level = changeLevel.value;
});
