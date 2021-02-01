const game = (() => {

    return {
        
    };
})();


const gameBoard = (() => {
    // select dom element
    const boardContainer = document.getElementsByClassName('boardContainer');
    const createGrid = () =>{
        for (i=0;i<9;i++){
            console.log(i);
            const cell=document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}`;
            boardContainer[0].appendChild(cell);
        }
    }
    const removeCells = () =>{
        while (boardContainer.hasChildNodes()){
            gridContainer.removeChild(gridContainer.lastChild);
        }
    }
    const clearGrid = () =>{
        // delete grid and recreate
        removeCells();
        createGrid();
    }
    return {
        boardContainer: boardContainer[0],
        createGrid,
        clearGrid
    }

})();

const player = () => {

};


// global calls to objects

gameBoard.createGrid();