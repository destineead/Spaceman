/*----- constants -----*/


/*----- state variables -----*/
let secret_word;
let max_attempts;
let correct_guess;//count correct guesses
let incorrect_guess;// count incorrect guesses
let alphabet = ['a', 'b', 'c', 'd','e','f','g','h',
                'i','j','k','l','m','n','o','p','q'
                ,'r','s','t','u','v','w','x','y','z']
let spaces; // number of spaces in the word

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    secret_word = {

    };
    max_attempts = 7;
    correct_guess = {

    };
    incorrect_guess = {

    };
    alphabet = {

    };
    spaces = {

        ``
    }
render();
}