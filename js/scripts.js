var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

setGameElements();

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Again';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'Player\'s name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }

}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    checkGameFinish();
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
	winnerFlag = '';

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        computerResultElem.innerHTML = "Lose!";
        winnerFlag = player.name;
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        playerResultElem.innerHTML = "Lose!";
        winnerFlag = 'Computer';
        computer.score++;
    } else {
    	playerResultElem.innerHTML = "Draw!";
    	computerResultElem.innerHTML = "Draw!";
    }

}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score + '/10';
    playerPointsElem.style.width = (player.score * 10) + '%';
    computerPointsElem.innerHTML = computer.score + '/10';
    computerPointsElem.style.width = (computer.score * 10) + '%';
}

function checkGameFinish() {
	if (player.score === 10 || computer.score === 10) {
		var str = "The winner is: " + winnerFlag.toUpperCase();
		openModal(str);
		gameState = 'ended';
		player.score = computer.score = 0;
		setGameElements();
	}
}

// Get the modal
var modal = document.getElementById('js-myModal'),
	modalBody = document.getElementById('js-modalBody'),
	close = document.getElementsByClassName("close")[0];

function openModal (msg) {
    modal.style.display = "block";
    modalBody.innerHTML = msg;
}

close.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}