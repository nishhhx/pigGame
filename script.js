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

const diceImg = function (diceRoll) {
  switch (diceRoll) {
    case '1':
      return 'dice-1.png';
    case '2':
      return 'dice-2.png';
    case '3':
      return 'dice-3.png';
    case '4':
      return 'dice-4.png';
    case '5':
      return 'dice-5.png';
    case '6':
      return 'dice-6.png';
  }
};

const switchToPlayer1 = function () {
  current_2.textContent = 0;
  player_2.classList.remove('player--active');
  player_1.classList.add('player--active');
};

const switchToPlayer2 = function () {
  current_1.textContent = 0;
  player_1.classList.remove('player--active');
  player_2.classList.add('player--active');
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  const diceNumber = String(diceRoll());
  dice.src = diceImg(diceNumber);
  dice.classList.remove('hidden');
  if (player_1.classList.contains('player--active')) {
    if (diceNumber === '1') {
      switchToPlayer2();
    } else {
      current_1.textContent = String(
        Number(current_1.textContent) + Number(diceNumber)
      );
    }
  } else if (player_2.classList.contains('player--active')) {
    if (diceNumber === '1') {
      switchToPlayer1();
    } else {
      current_2.textContent = String(
        Number(current_2.textContent) + Number(diceNumber)
      );
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (player_1.classList.contains('player--active')) {
    if (score_1.textContent < 100) {
      score_1.textContent = String(
        Number(score_1.textContent) + Number(current_1.textContent)
      );
      if (score_1.textContent < 100) switchToPlayer2();
    }
    if (score_1.textContent >= 100) {
      player_name_1.classList.add('player--winner');
      player_1.classList.add('player--winner');
      document.querySelector('#winner--0').classList.remove('hidden');
    }
  } else if (player_2.classList.contains('player--active')) {
    if (score_2.textContent < 100) {
      score_2.textContent = String(
        Number(score_2.textContent) + Number(current_2.textContent)
      );
      if (score_2.textContent < 100) switchToPlayer1();
    }
    if (score_2.textContent >= 100) {
      player_name_2.classList.add('player--winner');
      player_2.classList.add('player--winner');
      document.querySelector('#winner--1').classList.remove('hidden');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
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
});
