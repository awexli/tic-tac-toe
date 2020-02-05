const Game = (() => {
  // variables that must be reset
  let _isXturn = true;
  let _turnNumber = 0;
  let _hasWinner = false;
  const _boardSet = {
    zero: 2,
    one: 2,
    two: 2,
    three: 2,
    four: 2,
    five: 2,
    six: 2,
    seven: 2,
    eight: 2
  };
  //===========================//

  const getHasWinner = () => {
    return _hasWinner;
  };

  const getTurnNumber = () => {
    return _turnNumber;
  };

  const renderBoard = () => {
    const divBoard = document.querySelector("#board");
    const boardTemplate = `
        <div id=row-1 class="row">
            <div id="zero" class="square"></div>
            <div id="one" class="square"></div>
            <div id="two" class="square"></div>
        </div>
        <div id=row-2 class="row">
            <div id="three" class="square"></div>
            <div id="four" class="square"></div>
            <div id="five" class="square"></div>
        </div>
        <div id=row-3 class="row">
            <div id="six" class="square"></div>
            <div id="seven" class="square"></div>
            <div id="eight" class="square"></div>
        </div>
        `;
    divBoard.innerHTML = boardTemplate;
  };

  const playerTurns = () => {
    if (_isXturn) {
      _isXturn = false;
      return "x";
    } 

    _isXturn = true;
    return "o";
  };

  const markBoard = id => {
    const squareID = document.querySelector(`#${id}`);
    if (_boardSet[id]) {
      if (_boardSet[id] != 1) {
        squareID.innerText = playerTurns();
      _boardSet[id]--;
      _turnNumber++;
      }
    } else {
      console.log("false");
    }
  };

  const _winConditions = [
    ["zero", "one", "two"],
    ["three", "four", "five"],
    ["six", "seven", "eight"],
    ["zero", "three", "six"],
    ["one", "four", "seven"],
    ["two", "five", "eight"],
    ["zero", "four", "eight"],
    ["two", "four", "six"],
  ];

  // could prob use a switch statement
  // in conjunction with _boardSet
  // plus 1 for x
  // minus 1 for o
  const checkWinCondition = () => {
    let xCount, oCount;
    for (let i = 0; i < _winConditions.length; i++) {
      xCount = 0;
      oCount = 0;
      for (let j = 0; j < _winConditions[i].length; j++) {
        const squareID = document.getElementById(`${_winConditions[i][j]}`);
        if (squareID.innerText == "x") {
          xCount++;
        }

        if (squareID.innerText == "o") {
          oCount++;
        }

        if (xCount === 3) {
          _hasWinner = true;
          return 1;
        }

        if (oCount === 3) {
          _hasWinner = true;
          return 2;
        }
      }
    }
  };

  const resetGame = () => {
    for (const key in _boardSet) {
      if (_boardSet[key] === 1) {
        _boardSet[key]++;
      }
    }
    _hasWinner = false;
    _isXturn = true;
    _turnNumber = 0;
    renderBoard();
  };

  return {
    getTurnNumber,
    getHasWinner,
    renderBoard,
    markBoard,
    checkWinCondition,
    resetGame
  };
})();

const displayModal = (() => {
  const modalButton = document.getElementById("modal-button");
  const modalTitle = document.getElementById("v-modal-label");

  const open = () => {
    modalButton.disabled = false;
    modalButton.click();
    modalButton.disabled = true;
  };

  const winner = (player) => {
    open();
    modalTitle.innerText = `${player} wins`;
  };
  
  const tie = () => {
    open();
    modalTitle.innerText = "It's a tie!";
  };

  return {winner, tie};
})();

document.addEventListener("click", e => {
  if (e.target.className == "square") {
    Game.markBoard(e.target.id);
    const turnNum = Game.getTurnNumber();
    if (turnNum >= 5) {
      const victor = Game.checkWinCondition();
      const hasWinner = Game.getHasWinner();

      if (victor === 1) {
        displayModal.winner("x");
      }

      if (victor === 2) {
        displayModal.winner("o");
      }

      if (turnNum === 9 && hasWinner == false) {
        displayModal.tie();
      }
    }
  }

  if (e.target.id == "reset-game") {
    Game.resetGame();
  }
});

Game.renderBoard();

/**
 * maybe make module that executes 
 * all necessary dom elements 
 * (ones being called a lot) 
 */