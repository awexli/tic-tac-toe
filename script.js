const GameBoard = (() => {
  let _isXturn = true;
  let _turnNumber = 0;
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
    if (_boardSet[id] && _boardSet[id] != 1) {
      squareID.innerText = playerTurns();
      _boardSet[id]--;
      _turnNumber++;
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
          return console.log("x-victory!");
        }

        if (oCount === 3) {
          return console.log("o-victory!");
        }
      }
    }
  };

  return {
    getTurnNumber,
    renderBoard,
    markBoard,
    checkWinCondition
  };
})();


GameBoard.renderBoard();

document.addEventListener("click", e => {
  if (e.target.className == "square") {
    GameBoard.markBoard(e.target.id);
    if (GameBoard.getTurnNumber() >= 5) {
      GameBoard.checkWinCondition();
    }
  }
});

// check for win condition on the 5th turn
