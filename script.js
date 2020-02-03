const GameBoard = (() => {
  const _boardID = [
    ["zero", "one", "two"],
    ["three", "four", "five"],
    ["six", "seven", "eight"]
  ];

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

  const getBoardID = () => {
    return _boardID;
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

  const markBoard = id => {
    const squareID = document.querySelector(`#${id}`);
    if (_boardSet[id] && _boardSet[id] != 1) {
      // if player x turn
      squareID.innerText = "x";
      // if player o turn

      _boardSet[id]--;
      console.log(_boardSet);
    } else {
      console.log("false");
    }
  };

  return {
    getBoardID,
    renderBoard,
    markBoard
  };
})();

GameBoard.renderBoard();

document.addEventListener("click", e => {
  if (e.target.className == "square") {
    GameBoard.markBoard(e.target.id);
  }
});

// check for win condition on the 5th turn
