/*----- constants -----*/
const MAX_ATTEMPTS = 6;
const WORDS = ['SPACE', 'GALAXY', 'PLANET','UNIVERSE','SOLAR SYSTEM', 'NEBULA', 
               'STAR', 'MOON', 'COMET','ASTEROID', 'INTERSTELLAR', 'CELESTIAL', 'COSMIC', 
               'SUPERNOVA','QUASAR', 'DARK MATTER', 'GRAVITY', 'ORBIT', 'SPACE', 'TELESCOPE','SPACECRAFT'];
const SPRITE_WIDTH = 504;
const MSG_LOOKUP = {
  null: '',
  'W': '💫YOU WIN💫',
  'L': 'TRY AGAIN',
}
const sounds = {
  clickSnd: 'sounds/click.mp3',
  winSnd:'',
  loseSnd:'', 
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
const keyboardBtns = document.querySelectorAll('aside > button');
const player = new Audio();

/*----- event listeners -----*/
document.querySelector('aside').addEventListener('click', handleGuess);
document.getElementById('msg').addEventListener('click', init);

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
  playAudio('clickSnd');
  getWinner();
  render();
}

function getWinner() {
  if (guessWord === secretWord) {
    winner = 'W';
    playAudio('winSnd');
  } else if (guessWord !== secretWord && remainingAttempts > 0) {
    winner = null;
  } else {
    winner = 'L';
    playAudio('loseSnd');
  }
} 

function playAudio(sound) {
  player.src = sounds[sound];
  player.play();
  player.volume = .5;
}

function renderMessage() {
  msgEl.innerHTML = MSG_LOOKUP[winner];
}

function renderBtns() {
  keyboardBtns.forEach(function(btn) {
    const letter = btn.innerText;
    if (incorrectGuesses.includes(letter)) {
      btn.disabled = true;
    } else if (guessWord.includes(letter)) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  });
}

function render() {
  guessEl.innerText = guessWord;
  spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
  renderMessage();
  renderBtns();
}
