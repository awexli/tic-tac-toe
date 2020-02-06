const Game = (() => {
  // variables that must be reset
  let _isXturn = true;
  let _turns = 0;
  let _hasWinner = false;
  let _gameStart = false;
  const _boardSet2 = {
    0: 2,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2
  };

  const startBoard = () => {
    const divBoard = document.querySelector("#board");
    const boardTemplate = `
        <div id=row-1 class="row">
            <div id="zero" class="square">T</div>
            <div id="one" class="square">I</div>
            <div id="two" class="square">C</div>
        </div>
        <div id=row-2 class="row">
            <div id="three" class="square">T</div>
            <div id="four" class="square">A</div>
            <div id="five" class="square">C</div>
        </div>
        <div id=row-3 class="row">
            <div id="six" class="square">T</div>
            <div id="seven" class="square">O</div>
            <div id="eight" class="square">E</div>
        </div>
        `;
    divBoard.innerHTML = boardTemplate;
  };

  const renderBoard = () => {
    const divBoard = document.querySelector("#board");
    const boardTemplate = `
        <div id=row-1 class="row">
            <div id="0" class="square"></div>
            <div id="1" class="square"></div>
            <div id="2" class="square"></div>
        </div>
        <div id=row-2 class="row">
            <div id="3" class="square"></div>
            <div id="4" class="square"></div>
            <div id="5" class="square"></div>
        </div>
        <div id=row-3 class="row">
            <div id="6" class="square"></div>
            <div id="7" class="square"></div>
            <div id="8" class="square"></div>
        </div>
        `;
    divBoard.innerHTML = boardTemplate;
    _gameStart = true;
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
    const squareID = document.getElementById(`${id}`);
    id = parseInt(id);
    if (_boardSet2[id] < 3 && _boardSet2[id] > 1) {
      if (playerTurns() == "x") {
        squareID.innerText = "x";
        _boardSet2[id]++;
      } else {
        squareID.innerText = "o";
        _boardSet2[id]--;
      }
      _turns++;
    } else {
      console.log("Game hasn't started");
    }
  };

  const checkCondition = (pCount) => {
    if (pCount != 1 && pCount != 3) {
      return console.error("Incorrect args for checkCondition()");
    }

    if (_boardSet2[0] === pCount &&
        _boardSet2[1] === pCount &&
        _boardSet2[2] === pCount
      ) {
        return true;
      }
    if (_boardSet2[3] === pCount &&
        _boardSet2[4] === pCount &&
        _boardSet2[5] === pCount
      ) {
        return true;
      }
    if (_boardSet2[6] === pCount &&
        _boardSet2[7] === pCount &&
        _boardSet2[8] === pCount
      ) {
        return true;
      }
    if (_boardSet2[0] === pCount &&
        _boardSet2[3] === pCount &&
        _boardSet2[6] === pCount
      ) {
        return true;
      }
    if (_boardSet2[1] === pCount &&
        _boardSet2[4] === pCount &&
        _boardSet2[7] === pCount
      ) {
        return true;
      }
    if (_boardSet2[2] === pCount &&
        _boardSet2[5] === pCount &&
        _boardSet2[8] === pCount
      ) {
        return true;
      }
    if (_boardSet2[0] === pCount &&
        _boardSet2[4] === pCount &&
        _boardSet2[8] === pCount
      ) {
        return true;
      }
    if (_boardSet2[2] === pCount &&
        _boardSet2[4] === pCount &&
        _boardSet2[6] === pCount
      ) {
        return true;
      }
    return false;
  };

  const reset = () => {
    for (const key in _boardSet2) {
      _boardSet2[key] = 2;
    }
    _hasWinner = false;
    _isXturn = true;
    _turns = 0;
    renderBoard();
  };

  const started = () => {
    return _gameStart;
  };

  const hasWinner = () => {
    return _hasWinner;
  };

  const turnNumber = () => {
    return _turns;
  };

  return {
    startBoard,
    renderBoard,
    markBoard,
    checkCondition,
    reset,
    started,
    hasWinner,
    turnNumber
  };
})();

const displayModal = (() => {
  const modalButton = document.getElementById("modal-button");
  const modalTitle = document.getElementById("v-modal-label");

  const openModal = () => {
    modalButton.disabled = false;
    modalButton.click();
    modalButton.disabled = true;
  };

  const winner = (player) => {
    openModal();
    modalTitle.innerText = `${player} wins`;
  };
  
  const tie = () => {
    openModal();
    modalTitle.innerText = "It's a tie!";
  };

  return {winner, tie};
})();

document.addEventListener("click", e => {
  if (e.target.className == "square") {
    Game.markBoard(e.target.id);
    const turnNum = Game.turnNumber();
    if (turnNum >= 5) {
      const xWinner = Game.checkCondition(3);
      const oWinner = Game.checkCondition(1);
      const hasWinner = Game.hasWinner();

      if (xWinner) {
        displayModal.winner("x");
      }

      if (oWinner) {
        displayModal.winner("o");
      }

      if (turnNum > 8 && !hasWinner) {
        displayModal.tie();
      }
    }
  }

  if (e.target.id == "start-game") {
    Game.renderBoard();
    e.target.disabled = true;
  }

  if (e.target.id == "reset-game") {
    Game.reset();
  }
});

Game.startBoard();

/**
 * maybe make module that executes 
 * all necessary dom elements 
 * (ones being called a lot) 
 */