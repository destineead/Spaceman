/*----- constants -----*/
const MAX_ATTEMPTS = 7;
const WORDS = ['SPACE', 'GALAXY', 'PLANET'];
const SPRITE_WIDTH = 504;

/*----- state variables -----*/
let secretWord;
let guessWord;
let incorrectGuesses; // array to hold incorrect letters

/*----- cached elements  -----*/
const guessEl = document.querySelector('footer');
const spacemanEl = document.getElementById('spaceman');

/*----- event listeners -----*/
document.querySelector('aside').addEventListener('click', handleGuess);


/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[rndIdx];
  guessWord = '_'.repeat(secretWord.length);
  incorrectGuesses = [];

  render();
}

function handleGuess(evt) {
  console.log(evt.target.innerText)

}

function render() {
  guessEl.innerText = guessWord;
  spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
}