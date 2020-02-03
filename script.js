const GameBoard = (() => {
    const _boardID = [
        ['zero','one','two'],
        ['three','four','five'],
        ['six','seven','eight']
    ];

    const getBoardID = () => { return _boardID; };

    const renderBoard = () => {
        const divBoard = document.querySelector('#board');
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

    const markBoard = (id, className) => {
        const square = document.querySelector(`#${id}`);
        if (className == 'square') {
            for (let i = 0; i < _boardID.length; i++) {
                for (let j = 0; j < _boardID[i].length; j++) {
                    if (id == _boardID[i][j] && square.innerText == '') {
                        // if x turn
                        square.innerText = 'x';
                        // if o turn
                        console.log('marked');
                        break;
                    }
                }
            }
        }
    };

    return { 
        getBoardID, 
        renderBoard,
        markBoard
    };
})();

GameBoard.renderBoard();

document.addEventListener('click', e => {
    if (e.target.className == 'square') {
        GameBoard.markBoard(e.target.id, e.target.className);
    }
});

// check for win condition on the 5th turn