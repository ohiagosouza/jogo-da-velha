const button = document.getElementById('start');
const game = document.querySelectorAll('#game td');
let virtualBoard = [];
let playerTurn = '';

button.addEventListener('click', function () {
  button.innerText = 'Recomeçar'
  
})

function updateTitle() {
  const playerInput = document.getElementById(playerTurn);
  document.getElementById('playerTurn').innerText = ' ' + playerInput.value;
  const playerX = document.getElementById('player1').value;
  const playerO = document.getElementById('player2').value;

  console.log({ playerX, playerO });
}

function initializeGame() {
  virtualBoard = ['', '', '', '', '', '', '', '', ''];
  playerTurn = 'player1';
  document.querySelector('#play').innerHTML = '<h2>Agora é a vez de:<span id="playerTurn"></span></h2> ';
  updateTitle();

  game.forEach(function (element) {
    element.classList.remove('win');
    element.innerText = '';
    element.addEventListener('click', handleBoardClick);
  });
}

function handleBoardClick(event) {
  const regionClicked = event.currentTarget;
  const region = regionClicked.dataset.region;

  if (playerTurn === 'player1') {
    regionClicked.innerText = 'X';
    virtualBoard[region] = 'X';
  } else {
    regionClicked.innerText = 'O';
    virtualBoard[region] = 'O';
  }
  console.clear();
  console.table(virtualBoard);
  disableRegion(regionClicked);

  const winRegions = getWinRegion();
  if (winRegions.length > 0) {
    handleWin(winRegions)
  } else if (virtualBoard.flat().includes('')) {
    playerTurn = playerTurn === 'player1' ? 'player2' : 'player1';
    updateTitle();
  } else {
    document.getElementById('play').innerHTML = '<h2>EMPATE</h2>';
  }
}

function handleWin(regions){
  regions.forEach(function (region) {
    document.querySelector('[data-region="'+ region +'"]').classList.add('win')
  })
  const playerName = document.getElementById(playerTurn).value
  document.getElementById('play').innerHTML = '<h2>' + playerName + ' VENCEU!' + '</h2>'
}

function getWinRegion() {
  const winRegions = [];

  if (virtualBoard[0] && virtualBoard[0] === virtualBoard[1] && virtualBoard[0] === virtualBoard[2])
  winRegions.push('0', '1', '2');
  if (virtualBoard[3] && virtualBoard[3] === virtualBoard[4] && virtualBoard[3] === virtualBoard[5])
  winRegions.push('3', '4', '5');
  if (virtualBoard[6] && virtualBoard[6] === virtualBoard[7] && virtualBoard[6] === virtualBoard[8])
  winRegions.push('6', '7', '8');
  if (virtualBoard[0] && virtualBoard[0] === virtualBoard[3] && virtualBoard[0] === virtualBoard[6])
  winRegions.push('0', '3', '6');
  if (virtualBoard[1] && virtualBoard[1] === virtualBoard[4] && virtualBoard[1] === virtualBoard[7])
  winRegions.push('1', '4', '7');
  if (virtualBoard[2] && virtualBoard[2] === virtualBoard[5] && virtualBoard[2] === virtualBoard[8])
  winRegions.push('2', '5', '8');
  if (virtualBoard[0] && virtualBoard[0] === virtualBoard[4] && virtualBoard[0] === virtualBoard[8])
  winRegions.push('0', '4', '8');
  if (virtualBoard[2] && virtualBoard[2] === virtualBoard[4] && virtualBoard[2] === virtualBoard[6])
  winRegions.push('2', '4', '6');

  console.log(winRegions);
  return winRegions;
}

function disableRegion(element) {
  element.style.cursor = 'default';
  element.removeEventListener('click', handleBoardClick);
}

document.getElementById('start').addEventListener('click', initializeGame);
