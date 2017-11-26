var scores, roundScore, activePlayer, gamePlaying, lastDice, maxValue;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice1').style.display = 'block';
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice1').src = 'dice-' + dice + '.png';
        document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
        if(dice === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        if (dice !== 1 && dice2 !== 1) {
            lastDice = dice + dice2;
            roundScore += dice + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= maxValue){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else
            nextPlayer();
    }
});

function nextPlayer(){
    lastDice = 0;
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
} 

document.querySelector('.btn-new').addEventListener('click', init);

function init() { 
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    lastDice = 0;
    gamePlaying = true;

    if(document.getElementById("maxBodova").value == "")
        maxValue = 100;
    else
        maxValue = Number(document.getElementById("maxBodova").value);

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}