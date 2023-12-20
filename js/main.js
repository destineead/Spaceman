/*----- constants -----*/
const MAX_ATTEMPTS = 7;
const WORDS = ['SPACE', 'GALAXY', 'PLANET','UNIVERSE','SOLAR SYSTEM', 'NEBULA', 
               'STAR', 'MOON', 'COMET','ASTEROID', 'INTERSTELLAR', 'CELESTIAL', 'COSMIC', 
               'SUPERNOVA','QUASAR', 'DARK MATTER', 'GRAVITY', 'ORBIT', 'SPACE', 'TELESCOPE','SPACECRAFT'];
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
  }
  render();
}

function render() {
  guessEl.innerText = guessWord;
  spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
}