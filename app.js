//Values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Add listener for play again
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//Add listener for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        gameOver(true, `${winningNum}  is correct!`);
    }else {
        //Wrong number

        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Lost
            gameOver(false, `You lost, correct number was ${winningNum}`);
        } else {
            //Continue
            // Change border color
            guessInput.style.borderColor = 'red';
            // Clear Input
            guessInput.value = '';
            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Change border
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play again option
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get winning number
function getWinningNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
