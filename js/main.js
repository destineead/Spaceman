/*----- constants -----*/
const MAX_ATTEMPTS = 6;
const WORDS = ['SPACE', 'GALAXY', 'PLANET','UNIVERSE','SOLAR SYSTEM', 'NEBULA', 
               'STAR', 'MOON', 'COMET','ASTEROID', 'INTERSTELLAR', 'CELESTIAL', 'COSMIC', 
               'SUPERNOVA','QUASAR', 'DARK MATTER', 'GRAVITY', 'ORBIT', 'SPACE', 'TELESCOPE','SPACECRAFT'];
const SPRITE_WIDTH = 504;
// audio?
const MSG_LOOKUP = {
  null: '',
  'W': 'YOU DID IT!',
  'L': 'TRY AGAIN!',
}

/*----- state variables -----*/
let secretWord;
let guessWord;
let incorrectGuesses; // array to hold incorrect letters
let winner;
let remainingAttempts;

/*----- cached elements  -----*/
const guessEl = document.querySelector('footer');
const spacemanEl = document.getElementById('spaceman');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.querySelector('aside').addEventListener('click', handleGuess);
// document.querySelector('section').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  winner = null;
  secretWord = WORDS[rndIdx];
  guessWord = '_'.repeat(secretWord.length);
  incorrectGuesses = [];
  remainingAttempts = parseInt(MAX_ATTEMPTS); 
  render();
}

// In response to user interaction, update all impacted state, then call render
// we update all impacted state, then finally call render()
function handleGuess(evt) {
  const letter = evt.target.innerText;
  //guards
  if (letter.length !== 1) return;
  if (secretWord.includes(letter)) {
    // Correct guess - update guessWord
    let newGuess = '';
    for (let i = 0; i < secretWord.length; i++) {
      newGuess += secretWord.charAt(i) === letter ? letter : guessWord.charAt(i);
    }
    guessWord = newGuess;
  } else {
    // Incorrect guess - update incorrectGuesses
    incorrectGuesses.push(letter);
    remainingAttempts--;
  }
  getWinner();
  render();
}

function renderMessage() {
  // msgEl.style.visibility = winner === null ? 'hidden' : 'visible';
  msgEl.innerHTML = MSG_LOOKUP[winner];
}

function getWinner() {
  if (guessWord === secretWord) {
    winner = 'W';
  } else if (guessWord !== secretWord && remainingAttempts > 0) {
    winner = null;
  } else {
    winner = 'L';
  }
} 

function renderBtn() {


}

function render() {
  guessEl.innerText = guessWord;
  spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
  renderMessage();
}
