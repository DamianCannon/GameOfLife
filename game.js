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
    countNeighbours: function (cell) {

        var liveNeighbours = cell.neighbours.filter(function (neighbour) {
            if (neighbour) {
                return neighbour;
            }
        });

        return liveNeighbours.length;
    },

    newStateForCell: function (cell) {
        var countOfLiveNeighbours = this.countNeighbours(cell);

        switch (countOfLiveNeighbours) {
            case 2:
                if (cell.state) {
                    return true;
                } else {
                    return false;
                }
            case 3:
                return true;
            default:
                return false;
        }
    },

    newStateForGrid: function (grid) {
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

Game.view = {
    // initialisation
    init: function (doc) {
        var me = this;
        var size = 12;
        var table = doc.querySelector('#grid');
        me.buttons = {
            start: doc.querySelector('#start'),
            stop: doc.querySelector('#stop'),
            clear: doc.querySelector('#clear')
        };

        if (table !== null) {
            for (var row = 0; row < size; row++) {
                var tablerow = document.createElement('tr');

                for (var col = 0; col < size; col++) {
                    var cell = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';

                    cell.appendChild(checkbox);
                    tablerow.appendChild(cell);
                }

                table.appendChild(tablerow);
            }



            me.buttons.stop.hidden = true;

            me.buttons.start.addEventListener('click', function () {
                me.buttons.start.hidden = true;
                me.buttons.stop.hidden = false;
                changeTableToNextState();
                me.timer = setInterval(function () {
                    changeTableToNextState();
                }, 1000);
            });

            me.buttons.stop.addEventListener('click', function () {
                me.buttons.start.hidden = false;
                me.buttons.stop.hidden = true;
                clearInterval(me.timer);
            });

            me.buttons.clear.addEventListener('click', function () {
                for (var row = 0; row < table.rows.length; row++) {
                    for (var col = 0; col < table.rows[row].cells.length; col++) {
                        table.rows[row].cells[col].childNodes[0].checked = false;
                    }
                }
            });
        }

        function changeTableToNextState() {
            var grid = [];
            for (var row = 0; row < table.rows.length; row++) {
                var newRow = [];
                for (var col = 0; col < table.rows[row].cells.length; col++) {
                    var cell = table.rows[row].cells[col];
                    var state = cell.childNodes[0].checked;
                    newRow.push(state);
                }
                grid.push(newRow);
            }

            var result = Game.model.newStateForGrid(grid);

            for (var trow = 0; trow < result.length; trow++) {
                for (var tcol = 0; tcol < result[trow].length; tcol++) {
                    if (result[trow][tcol]) {
                        table.rows[trow].cells[tcol].childNodes[0].checked = true;
                    } else {
                        table.rows[trow].cells[tcol].childNodes[0].checked = false;
                    }
                }
            }
        }
    }
};

Game.view.init(window.document);
