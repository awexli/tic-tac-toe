const Game = (() => {
  // variables that must be reset
  const _board = {
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
  let _isXturn = true;
  let _turns = 0;
  let _hasWinner = false;
  // ========================= //
  let _gameStart = false;

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

  const markBoard = id => {
    const squareID = document.getElementById(`${id}`);
    id = parseInt(id);
    const playerTurns = () => {
      if (_isXturn) {
        _isXturn = false;
        return "x";
      } 
  
      _isXturn = true;
      return "o";
    };

    if (_board[id] === 2) {
      if (playerTurns() == "x") {
        squareID.innerText = "X";
        _board[id]++;
      } else {
        squareID.innerText = "O";
        _board[id]--;
      }
      _turns++;
    } else {
      console.log("Already Marked");
    }
  };

  const checkCondition = (playerVal) => {
    if (playerVal != 1 && playerVal != 3) {
      return console.error("Incorrect args for checkCondition()");
    }

    const findWin = (val, s1, s2, s3) => {
      if (_board[s1] === val && _board[s2] === val && _board[s3] === val) {
        _hasWinner = true;
        return true;
      }
      return false;
    };

    const combos = [
      0,1,2,
      3,4,5,
      6,7,8,
      0,3,6,
      1,4,7,
      2,5,8,
      0,4,8,
      2,4,6
    ];
    let foundWin = false;
    let s1 = 0,
        s2 = 1,
        s3 = 2;

    for (let i = 0; i < 9; i++) {
      foundWin = findWin(playerVal, combos[s1], combos[s2], combos[s3]);
      if (foundWin) { return true; }
      s1 += 3;
      s2 += 3;
      s3 += 3;
    }

    return false;
  };

  const reset = () => {
    for (const key in _board) {
      _board[key] = 2;
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
    modalTitle.innerText = `${player} Wins!`;
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
        displayModal.winner("X");
      }

      if (oWinner) {
        displayModal.winner("O");
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