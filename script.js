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

const player = (mark, name) => {
    let score=0;
    const incrementScore = () => {
        score++;
    }
    const getScore = () => score;
    const getMark = () => mark;
    const setName = (newName) =>{
        name = newName;
    }
    const getName = () => name;
    return {
        getMark,
        getScore,
        incrementScore,
        setName,
        getName
    }
};

const game = (() => {
    // initialize board, players
    let turn=1;
    let currMarkWinner='';
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
    const gameMessage = document.querySelector('.gameMessage');
    const clearBoardBtn = document.querySelector('#clear');
    const restartAllBtn = document.querySelector('#restart');
    const playerOneScore = document.querySelector('.playerOneScore');
    const playerTwoScore = document.querySelector('.playerTwoScore');

    gameBoard.createBoard();
    const board = gameBoard.getBoard();
    const playerOne = player('X', 'Player One');
    const playerTwo = player('O', 'Player Two');
    // console.log(playerOne.setName('jon'));
    // console.log(playerOne.getName());
    // console.log(playerOne.getMark());
    // console.log(playerTwo.getMark());
    // console.log(playerOne.getScore());
    // console.log(playerTwo.getScore());
    // console.log(playerOne.incrementScore());
    // console.log(playerOne.getScore());

    const checkWin = () => {
        console.log(board);
        let winMark = '';
        winCon.forEach((condition)=>{
            // check if matches win condition, and makes sure not empty 
            if (board[condition[0]].innerHTML !== '' 
            && (board[condition[0]].innerHTML===board[condition[1]].innerHTML 
            && board[condition[0]].innerHTML===board[condition[2]].innerHTML)){
                console.log(`winner is ${board[condition[0]].innerHTML}`);
                winMark = board[condition[0]].innerHTML;
            }
        });
        return winMark;
    };

    const resolveWin = () => {
        if (currMarkWinner==='X'){
            gameMessage.innerHTML=`${playerOne.getName()} wins! Play Again?`;
            playerOne.incrementScore();
            playerOneScore.innerHTML=playerOne.getScore();
        } else if (currMarkWinner==='O'){
            gameMessage.innerHTML=`${playerTwo.getName()} wins! Play Again?`;
            playerTwo.incrementScore();
            playerTwoScore.innerHTML=playerTwo.getScore();
        }

    }

    const cellListener = () => {
        board.forEach((cell)=>{
            cell.addEventListener('click', function(e){
                console.log(e.target);
                // prevent same cell from being clicked
                if (e.target.innerHTML !== '' || turn==10 || currMarkWinner!==''){
                    console.log('cannot');
                    return;
                } else if (turn%2){
                    e.target.innerHTML=playerOne.getMark();
                    turn++;
                    console.log('X');
                    gameMessage.innerHTML=`${playerTwo.getName()}'s turn`;
                } else {
                    e.target.innerHTML=playerTwo.getMark();
                    gameMessage.innerHTML=`${playerOne.getName()}'s turn`;
                    turn++;
                    console.log('O');
                }
    
                console.log('turn '+turn);
                // check win
                currMarkWinner = checkWin();
                console.log(currMarkWinner+' winner');
                resolveWin();
            });
        });
    }


    const clearBoard = () => {
        // clear board, reset turns
        console.log('hi clear board');
        gameBoard.clearBoard();
        // need to add event listeners from before
        turn=1;
        gameMessage.innerHTML=`${playerOne.getName()}'s turn`;
        currMarkWinner='';
        cellListener();
    }

    clearBoardBtn.addEventListener('click', clearBoard);

    cellListener();

    
    return {
        checkWin
    };
})();
