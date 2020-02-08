const Game = (() => {
  // variables that must be reRender
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
  let _againstAi = false;
  let _aiTurn = false;
  // ========================= //
  let _gameStart = false;

  const startBoard = () => {
    const divBoard = document.querySelector("#board");
    const startButton = document.querySelector("#start-game");
    const PvAIButton = document.querySelector("#ai-game");
    const boardTemplate = `
        <div id=row-1 class="row">
            <div class="cell">T</div>
            <div id="one" class="cell">I</div>
            <div class="cell">C</div>
        </div>
        <div id=row-2 class="row">
            <div class="cell">T</div>
            <div id="four" class="cell">A</div>
            <div class="cell">C</div>
        </div>
        <div id=row-3 class="row">
            <div class="cell">T</div>
            <div id="seven" class="cell">O</div>
            <div class="cell">E</div>
        </div>
        `;
    divBoard.innerHTML = boardTemplate;
    
    startButton.disabled = false;
    PvAIButton.disabled = false;
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
      if (isAgainstAi) _aiTurn = true;
      if (playerTurns() == "x") {
        squareID.innerText = "X";
        _board[id]++;
      } else {
        squareID.innerText = "O";
        _board[id]--;
      }
      _turns++;
    } else {
      if (isAgainstAi) _aiTurn = false;
    }
   
  };

  const checkBoard = (playerVal) => {
    if (playerVal != 1 && playerVal != 3) {
      return console.error("Incorrect args for checkBoard()");
    }

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
    let sq1 = 0, sq2 = 1, sq3 = 2;

    const findWin = (val, sq1, sq2, sq3) => {
      const sqOneMarked = _board[sq1] === val;
      const sqTwoMarked = _board[sq2] === val;
      const sqThreeMarked = _board[sq3] === val;
      if (sqOneMarked && sqTwoMarked && sqThreeMarked) {
        _hasWinner = true;
        return true;
      }
      return false;
    };

    const nextCombo = () => {
      sq1 += 3;
      sq2 += 3;
      sq3 += 3;
    };

    for (let i = 0; i < 9; i++) {
      foundWin = findWin(playerVal, combos[sq1], combos[sq2], combos[sq3]);

      if (foundWin) { 
        return true; 
      }
      
      nextCombo();
    }

    return false;
  };

  const reRender = (isRematch) => {
    _hasWinner = false;
    _isXturn = true;
    _turns = 0;

    for (const key in _board) {
      _board[key] = 2;
    }

    if (isRematch) {
      _aiTurn = false;
      renderBoard();
    } else {
      _againstAi = false;
      _aiTurn = false;
      startBoard();
    }
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

  const board = () => {
    return _board;
  };

  const isAgainstAi = () => {
    return _againstAi;
  };

  const playAi = isAiPlaying => {
    _againstAi = isAiPlaying;
  };

  const isAiTurn = () => {
    return _aiTurn;
  };
  
  const setAiTurn = isAiTurn => {
    _aiTurn = isAiTurn;
  };

  return {
    startBoard,
    renderBoard,
    markBoard,
    checkBoard,
    reRender,
    started,
    hasWinner,
    turnNumber,
    board,
    isAgainstAi, 
    playAi,
    setAiTurn,
    isAiTurn
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

  return { winner, tie };
})();

const handleClick = (() => {
  const cells = e => {
    let square = e;
    
    
    Game.markBoard(square);
    const turnNum = Game.turnNumber();
    if (turnNum >= 4) {
      const xWinner = Game.checkBoard(3);
      const oWinner = Game.checkBoard(1);
      const hasWinner = Game.hasWinner();

      if (xWinner) { displayModal.winner("X"); }

      if (oWinner) { displayModal.winner("O"); }

      if (turnNum > 8 && !hasWinner) { displayModal.tie(); }
    }
  };

  
  const buttons = e => {
    const startButton = document.querySelector("#start-game");
    const PvAIButton = document.querySelector("#ai-game");
    let isRematch;
    if (e.target.id == "start-game") {
      Game.renderBoard();
      card.cardBody(0);
      Game.playAi(false);
      e.target.disabled = true;
      PvAIButton.disabled = true;
    }
  
    if (e.target.id == "rematch") {
      isRematch = true;
      Game.reRender(isRematch);
    }
  
    if (e.target.matches(".reset")) {
      isRematch = false;
      Game.reRender(isRematch);
      card.resetCard();
    }

    if (e.target.id == "ai-game") {
      Game.playAi(true);
      isRematch = false;
      Game.renderBoard();
      card.cardBody(1);
      e.target.disabled = true;
      startButton.disabled = true;
    }
  };
  
  return {
    cells, 
    buttons
  };
})();

const ai = (() =>  {
  const random = (validMoves) => {
    const min = 0;
    const max = validMoves.length-1;
    const randomMove = Math.floor(Math.random() * (max - min + 1)) + min;
    return validMoves[randomMove];
  };
  
  const makeMove = () => {
    const available = [];
    const board = Game.board();
    for (let key in board) {
      if (board[key] === 2) {
        available.push(key);
      }
    }
    
    const move = random(available);
    handleClick.cells(move);
  };

  return { makeMove };
})();

const card = (() => {
  const cardInfo = document.querySelector(".card-text");
  const cardTitle = document.querySelector(".card-title");
  const defaultInfo = "Be the first player to get three in a row. Play against a friend or the AI!";
  const aiInfo = "This AI should be pretty easy to beat!";

  const cardBody = (mode) => {
    if (mode === 0) {
      cardTitle.innerText = "PvP Mode";
      cardInfo.innerText = defaultInfo;
    }

    if (mode === 1) {
      cardTitle.innerText = "PvAI Mode";
      cardInfo.innerText = aiInfo;
    }
    
  };
  
  const resetCard = () => {
    cardTitle.innerText = "About";
    cardInfo.innerText = defaultInfo;
  };

  return {resetCard, cardBody};
})();

class Players {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

}

document.addEventListener("click", e => {
  if (e.target.className == "square") {
    if (!Game.isAgainstAi()) {
      handleClick.cells(e.target.id);
    }
    
    if (!Game.hasWinner() && Game.isAgainstAi()) {
      if (!Game.isAiTurn()) {
        handleClick.cells(e.target.id);
      }
      if (!Game.hasWinner() && Game.isAiTurn()) {
        ai.makeMove();
        Game.setAiTurn(false);
      }
    }
  }

  if (e.target.matches(".btn")) {
    handleClick.buttons(e);
  }
 
}, false);

Game.startBoard();