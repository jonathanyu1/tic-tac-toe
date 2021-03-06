const gameBoard = (() => {
    // select dom element
    const boardContainer = document.querySelector('.boardContainer');
    const board=[];

    const createBoard = () =>{
        for (i=0;i<9;i++){
            const cell=document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}`;
            boardContainer.appendChild(cell);
            board[i]=cell;
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
    const resetScore = () => {
        score=0;
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
        resetScore,
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
    const playerOneName = document.querySelector('#playerOneName');
    const playerTwoName = document.querySelector('#playerTwoName');

    gameBoard.createBoard();
    const board = gameBoard.getBoard();
    const playerOne = player('X', 'Player One');
    const playerTwo = player('O', 'Player Two');

    const turnColorOn = (playerName, playerScore) =>{
        playerName.style.color = 'yellow';
        playerScore.style.color = 'yellow';
    }

    const turnColorOff = (playerName, playerScore) => {
        playerName.style.color = 'white';
        playerScore.style.color = 'white';
    }

    const checkWin = () => {
        let winMark = '';
        winCon.forEach((condition)=>{
            // check if matches win condition, and makes sure not empty 
            if (board[condition[0]].innerHTML !== '' 
            && (board[condition[0]].innerHTML===board[condition[1]].innerHTML 
            && board[condition[0]].innerHTML===board[condition[2]].innerHTML)){
                winMark = board[condition[0]].innerHTML;
            }
        });
        if (turn===10 && winMark===''){
            winMark='tie';
        }
        return winMark;
    };

    const resolveWin = () => {
        if (currMarkWinner==='X'){
            gameMessage.innerHTML=`${playerOne.getName()} wins! Play Again?`;
            playerOne.incrementScore();
            playerOneScore.innerHTML=playerOne.getScore();
            turnColorOn(playerOneName,playerOneScore);
            turnColorOff(playerTwoName,playerTwoScore);
        } else if (currMarkWinner==='O'){
            gameMessage.innerHTML=`${playerTwo.getName()} wins! Play Again?`;
            playerTwo.incrementScore();
            playerTwoScore.innerHTML=playerTwo.getScore();
            turnColorOn(playerTwoName,playerTwoScore);
            turnColorOff(playerOneName,playerOneScore);
        } else if (currMarkWinner==='tie'){
            gameMessage.innerHTML=`The game is a tie! Play Again?`;
            turnColorOff(playerOneName,playerOneScore);
            turnColorOff(playerTwoName,playerTwoScore);
        }
    }

    const cellListener = () => {
        board.forEach((cell)=>{
            cell.addEventListener('click', function(e){
                // prevent same cell from being clicked
                if (e.target.innerHTML !== '' || turn==10 || currMarkWinner!==''){
                    return;
                } else if (turn%2){
                    e.target.innerHTML=playerOne.getMark();
                    turn++;
                    gameMessage.innerHTML=`${playerTwo.getName()}'s turn`;
                    turnColorOn(playerTwoName,playerTwoScore);
                    turnColorOff(playerOneName,playerOneScore);
                } else {
                    e.target.innerHTML=playerTwo.getMark();
                    gameMessage.innerHTML=`${playerOne.getName()}'s turn`;
                    turn++;
                    turnColorOn(playerOneName,playerOneScore);
                    turnColorOff(playerTwoName,playerTwoScore);
                }
                // check win
                currMarkWinner = checkWin();
                resolveWin();
            });
        });
    }

    const resetScore = () => {
        playerOne.resetScore();
        playerOneScore.innerHTML=playerOne.getScore();
        playerTwo.resetScore();
        playerTwoScore.innerHTML=playerTwo.getScore();
    }

    const resetNames = () => {
        playerOne.setName('Player One');
        playerOneName.value='Player One';
        playerTwo.setName('Player Two');
        playerTwoName.value='Player Two';
    }    

    const changeName = (e, player) => {
        player.setName(e.target.value);
    }

    const clearBoard = () => {
        // 'Play Again' button
        gameBoard.clearBoard();
        // resets turn
        turn=1;
        // need to add event listeners from before
        gameMessage.innerHTML=`${playerOne.getName()}'s turn`;
        currMarkWinner='';
        cellListener();
        turnColorOn(playerOneName,playerOneScore);
        turnColorOff(playerTwoName,playerTwoScore);
    }

    const restartAll = () => {
        // 'Restart All' button
        resetNames();
        clearBoard();
        resetScore();
        turnColorOn(playerOneName,playerOneScore);
        turnColorOff(playerTwoName,playerTwoScore);
    }

    clearBoardBtn.addEventListener('click', clearBoard);
    restartAllBtn.addEventListener('click', restartAll);
    playerOneName.addEventListener('change', (e)=>{
        changeName(e,playerOne);
    });
    playerTwoName.addEventListener('change', (e)=>{
        changeName(e,playerTwo);
    });

    cellListener();

    return {};
})();
