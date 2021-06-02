'use strict';

const player_name_1 = document.querySelector('#name--0');
const player_name_2 = document.querySelector('#name--1');
const player_1 = document.querySelector('.player--0');
const player_2 = document.querySelector('.player--1');
const current_1 = document.querySelector('#current--0');
const current_2 = document.querySelector('#current--1');
const score_1 = document.querySelector('#score--0');
const score_2 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

const diceRoll = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_1.classList.toggle('player--active');
  player_2.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current_1.textContent = 0;
  current_2.textContent = 0;
  score_1.textContent = 0;
  score_2.textContent = 0;

  dice.classList.add('hidden');

  player_1.classList.add('player--active');
  player_2.classList.remove('player--active');

  player_1.classList.remove('player--winner');
  player_name_1.classList.remove('player--winner');
  player_2.classList.remove('player--winner');
  player_name_2.classList.remove('player--winner');

  document.querySelector('#winner--0').classList.add('hidden');
  document.querySelector('#winner--1').classList.add('hidden');
};

init();

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    const diceNumber = diceRoll();
    dice.src = `images/dice-${diceNumber}.png`;
    dice.classList.remove('hidden');
    if (diceNumber === 1) {
      switchPlayer();
    } else {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    if (scores[activePlayer] < 100) {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] < 100) switchPlayer();
    }
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .getElementById(`name--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`#winner--${activePlayer}`)
        .classList.remove('hidden');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', init);
