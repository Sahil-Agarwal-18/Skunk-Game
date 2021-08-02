"use strict";
// So I will assign variables to my scores. I will do so using their IDs
// These are 2 different methods which I have used
// El stands for element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0"); // even let can be used but no point since only 1 fixed element will be selected
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const rollEl = document.querySelector(".btn--roll");
const newEl = document.querySelector(".btn--new");
const holdEl = document.querySelector(".btn--hold");

let diceroll = 0; // Just an initialsing value
let scores = [0, 0]; // this had to be turned to let is all
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  // $(`#current--${activePlayer}`).textContent = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// I can use text content and directly set values using the variable names
// This is the purpose behind assigning these elements to the variables in JavaScript

// starting conditions for the game
score0El.textContent = "0";
score1El.textContent = "0";
diceEl.classList.add("hidden"); // So this is very cool. // I can add a seperate class and its properties to my element
// diceEl.classList.remove('hidden'); // This works as intended. It will bring back the dice by removing the new class and all its properties as a result

// rolling the dice
rollEl.addEventListener("click", function () {
  if (playing) {
    // First a random dice role must be generated
    diceroll = Math.trunc(Math.random() * 6) + 1;
    //alert(diceroll); // this works - 6 different numbers are displayed as and when required

    // Next that dice role must be displayed
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceroll}.png`; // if and else if statements did not work here

    // Check if the dice role is 1 and then switch to the next player
    if (diceroll !== 1) {
      currentScore += diceroll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }

  // else another random dice role must be generated
});

holdEl.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the score is 50 then finish the game
    // I will try to let the user enter a score of their choice tomorrow
    // It will be interesting
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } //or switch to the other player
    else {
      switchPlayer();
    }
  }
});
// fix tomorrow morning
newEl.addEventListener("click", function () {
  //alert("Hello"); // Okay so this works
  diceroll = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  diceEl.classList.add("hidden");
  score0El.textContent = "0";
  score1El.textContent = "0";
  current0El.textContent = "0";
  current1El.textContent = "0";
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove("player--winner");
  // The above lines are not working the way they should
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  playing = true;
});
