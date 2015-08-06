/* This is an implementation of Conway's Game of Life
   See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
   
   Rules of the game are:
   
   1 - Any live cell with fewer than two live neighbours dies, as if caused by under-population.
   2 - Any live cell with two or three live neighbours lives on to the next generation.
   3 - Any live cell with more than three live neighbours dies, as if by overcrowding.
   4 - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
/* jshint -W117 */
/* jshint -W086 */
if (typeof Game === 'undefined') {
    Game = {};
}

Game.model = {
    countNeighbours: function(cell) {
        
        var liveNeighbours = cell.neighbours.filter(function(neighbour) {
            if (neighbour) {
                return neighbour;
            }
        });
        
        return liveNeighbours.length;
    },
    
    newStateForCell: function(cell) {
        var countOfLiveNeighbours = this.countNeighbours(cell);
        
        switch(countOfLiveNeighbours) {
            case 2:
                if (cell.state) {
                    return true;
                }
                else {
                    return false;
                }
            case 3:
                return true;
            default:
                return false;
        }
    },
    
    newStateForGrid: function(grid) {
        var result = [];
        
        for (var row = 0; row < grid.length; row++) {
            var newRow = [];

            for (var col = 0; col < grid[row].length; col++) {
                // get current cell
                var currentCell = {};
                currentCell.state = grid[row][col];
                currentCell.neighbours = [];
                
                // get neighbours for cell in array
                for (var innerRow = row - 1; innerRow <= row + 1; innerRow++) {
                    if (grid[innerRow] !== undefined) {
                        for (var innerCol = col - 1; innerCol <= col + 1; innerCol++) {
                            if (grid[innerRow][innerCol] !== undefined && (innerRow !== row || innerCol !== col)) {
                                currentCell.neighbours.push(grid[innerRow][innerCol]);
                            }
                        }
                    }
                }
                
                // get new state for cell
                var newState = this.newStateForCell(currentCell);
                
                // set state of cell in output
                newRow.push(newState);
            }
            
            result.push(newRow);
        }
        
        return result;
    }
};