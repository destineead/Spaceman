/*----- constants -----*/
const MAX_ATTEMPTS = 7;
const WORDS = ['SPACE', 'GALAXY', 'PLANET'];

/*----- state variables -----*/
let secretWord;
let guessWord;
let incorrectGuesses; // array to hold incorrect letters

/*----- cached elements  -----*/
const guessEl = document.querySelector('footer');

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[rndIdx];
  guessWord = '_'.repeat(secretWord.length);
  incorrectGuesses = [];

  render();
}

function render() {
  guessEl.innerText = guessWord;
}