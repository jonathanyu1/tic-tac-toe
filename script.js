const gameBoard = (() => {
    // select dom element
    const boardContainer = document.querySelector('.boardContainer');
    const board=[];

    const createBoard = () =>{
        for (i=0;i<9;i++){
            console.log(i);
            const cell=document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}`;
            boardContainer.appendChild(cell);
            board[i]=cell;
            // cell.addEventListener('click', function(e){
            //     console.log(e.target);
            // });
        }
    }

    const getBoard = () =>{
        return board;
    }

    const removeCells = () =>{
        while (boardContainer.hasChildNodes()){
            boardContainer.removeChild(boardContainer.lastChild);
        }
    }
    const clearBoard = () =>{
        // delete board and recreate
        removeCells();
        createBoard();
    }
    return {
        boardContainer: boardContainer,
        createBoard,
        clearBoard,
        getBoard
    }
})();

const player = (mark) => {
    const getMark = () => mark;
    return {
        getMark
    }
};

const game = (() => {
    // initialize board, players
    let turn=1;
    const winCon = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    gameBoard.createBoard();
    const board = gameBoard.getBoard();

    const playerOne = player('X');
    const playerTwo = player('O');
    console.log(playerOne.getMark());
    console.log(playerTwo.getMark());

    const checkWin = () => {
        console.log(board);
        winCon.forEach((condition)=>{
            // console.log(condition);
            // console.log(condition[0]);
            // console.log(condition[1]);
            // console.log(condition[2]);
            // check if matches win condition, and makes sure not empty 
            if (board[condition[0]].innerHTML !== '' 
            && (board[condition[0]].innerHTML===board[condition[1]].innerHTML 
            && board[condition[0]].innerHTML===board[condition[2]].innerHTML)){
                console.log(`winner is ${board[condition[0]].innerHTML}`);
            }
        });
    };

    board.forEach((cell)=>{
        cell.addEventListener('click', function(e){
            console.log(e.target);
            // prevent same cell from being clicked
            if (e.target.innerHTML !== ''){
                console.log('cannot');
                return;
            }
            if (turn%2){
                e.target.innerHTML=playerOne.getMark();
                console.log('X');
            } else {
                e.target.innerHTML=playerTwo.getMark();
                console.log('O');
            }
            turn++;
            console.log(turn);
            // check win
            checkWin();
        });
    });

    return {

    };
})();
