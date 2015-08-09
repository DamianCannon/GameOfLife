/* jshint -W117 */
describe('Life game model', function() {
    var model = Game.model;

    beforeEach(function() {
    });

    it('should exist', function() {
        expect(Game.model).toBeDefined();
    });

    describe('should count', function() {
        it('zero when cell has no live neighbours', function() {
            var cell = {neighbours: []};
            expect(model.countNeighbours(cell)).toBe(0);
        });

        it('one when cell has one live neighbour', function() {
            var cell = {neighbours: [true]};
            expect(model.countNeighbours(cell)).toBe(1);
        });

        it('two when cell has two live neighbours', function() {
            var cell = {neighbours: [true, true]};
            expect(model.countNeighbours(cell)).toBe(2);
        });

        it('two when cell has one dead and two live neighbours', function() {
            var cell = {neighbours: [true, false, true]};
            expect(model.countNeighbours(cell)).toBe(2);
        });

        it('three when cell has four dead and three live neighbours', function() {
            var cell = {neighbours: [false, true, false, true, false, true, false]};
            expect(model.countNeighbours(cell)).toBe(3);
        });

        it('eight when cell has eight live neighbours', function() {
            var cell = {neighbours: [true, true, true, true, true, true, true, true]};
            expect(model.countNeighbours(cell)).toBe(8);
        });

        it('zero when cell has eight dead neighbours', function() {
            var cell = {neighbours: [false, false, false, false, false, false, false, false]};
            expect(model.countNeighbours(cell)).toBe(0);
        });
    });
    
    describe('should return', function() {
        it('dead state when live cell has no live neighbours', function() {
            var cell = {state: true, neighbours: []};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('dead state when live cell has one live neighbour', function() {
            var cell = {state: true, neighbours: [true]};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('live state when live cell has two live neighbours', function() {
            var cell = {state: true, neighbours: [true, true]};
            expect(model.newStateForCell(cell)).toBe(true);
        });

        it('live state when live cell has three live neighbours', function() {
            var cell = {state: true, neighbours: [true, true, true]};
            expect(model.newStateForCell(cell)).toBe(true);
        });

        it('dead state when live cell has four live neighbours', function() {
            var cell = {state: true, neighbours: [true, true, true, true]};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('live state when live cell has four dead and three live neighbours', function()               {
            var cell = {state: true, neighbours: [false, true, false, true, false, true, false]};
            expect(model.newStateForCell(cell)).toBe(true);
        });

        it('dead state when live cell has eight live neighbours', function() {
            var cell = {state: true, neighbours: [true, true, true, true, true, true, true, true]};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('dead state when live cell has eight dead neighbours', function() {
            var cell = {state: true, neighbours: [false, false, false, false, false, false, false, false]};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('dead state when dead cell has no live neighbours', function() {
            var cell = {state: false, neighbours: []};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('dead state when dead cell has one live neighbour', function() {
            var cell = {state: false, neighbours: [true]};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('dead state when dead cell has two live neighbours', function() {
            var cell = {state: false, neighbours: [true, true]};
            expect(model.newStateForCell(cell)).toBe(false);
        });

        it('live state when dead cell has three live neighbours', function() {
            var cell = {state: false, neighbours: [true, true, true]};
            expect(model.newStateForCell(cell)).toBe(true);
        });

        it('same pattern when given a block still-life', function() {
            var inputGrid = [
               [false, false, false, false],
               [false, true, true, false],
               [false, true, true, false],
               [false, false, false, false]
            ];

            var outputGrid = model.newStateForGrid(inputGrid);

            // row 1
            expect(outputGrid[0][0]).toBe(false);
            expect(outputGrid[0][1]).toBe(false);
            expect(outputGrid[0][2]).toBe(false);
            expect(outputGrid[0][3]).toBe(false);

            // row 2
            expect(outputGrid[1][0]).toBe(false);
            expect(outputGrid[1][1]).toBe(true);
            expect(outputGrid[1][2]).toBe(true);
            expect(outputGrid[1][3]).toBe(false);

            // row 3
            expect(outputGrid[2][0]).toBe(false);
            expect(outputGrid[2][1]).toBe(true);
            expect(outputGrid[2][2]).toBe(true);
            expect(outputGrid[2][3]).toBe(false);

            // row 4
            expect(outputGrid[3][0]).toBe(false);
            expect(outputGrid[3][1]).toBe(false);
            expect(outputGrid[3][2]).toBe(false);
            expect(outputGrid[3][3]).toBe(false);        
        });

        it('next pattern when given a blinker oscillator', function() {
            var inputGrid = [
               [false, false, false, false, false],
               [false, false, false, false, false],
               [false, true, true, true, false],
               [false, false, false, false, false],
               [false, false, false, false, false]
            ];

            var outputGrid = model.newStateForGrid(inputGrid);

            // row 1
            expect(outputGrid[0][0]).toBe(false);
            expect(outputGrid[0][1]).toBe(false);
            expect(outputGrid[0][2]).toBe(false);
            expect(outputGrid[0][3]).toBe(false);
            expect(outputGrid[0][4]).toBe(false);

            // row 2
            expect(outputGrid[1][0]).toBe(false);
            expect(outputGrid[1][1]).toBe(false);
            expect(outputGrid[1][2]).toBe(true);
            expect(outputGrid[1][3]).toBe(false);
            expect(outputGrid[1][4]).toBe(false);

            // row 3
            expect(outputGrid[2][0]).toBe(false);
            expect(outputGrid[2][1]).toBe(false);
            expect(outputGrid[2][2]).toBe(true);
            expect(outputGrid[2][3]).toBe(false);
            expect(outputGrid[2][4]).toBe(false);

            // row 4
            expect(outputGrid[3][0]).toBe(false);
            expect(outputGrid[3][1]).toBe(false);
            expect(outputGrid[3][2]).toBe(true);
            expect(outputGrid[3][3]).toBe(false);
            expect(outputGrid[3][4]).toBe(false);

            // row 5
            expect(outputGrid[4][0]).toBe(false);
            expect(outputGrid[4][1]).toBe(false);
            expect(outputGrid[4][2]).toBe(false);
            expect(outputGrid[4][3]).toBe(false);
            expect(outputGrid[4][4]).toBe(false);
        });

        it('to original pattern when oscillating a blinker twice', function() {
            var inputGrid = [
               [false, false, false, false, false],
               [false, false, false, false, false],
               [false, true, true, true, false],
               [false, false, false, false, false],
               [false, false, false, false, false]
            ];

            var intermediateGrid = model.newStateForGrid(inputGrid);
            var outputGrid = model.newStateForGrid(intermediateGrid);

            // row 1
            expect(outputGrid[0][0]).toBe(false);
            expect(outputGrid[0][1]).toBe(false);
            expect(outputGrid[0][2]).toBe(false);
            expect(outputGrid[0][3]).toBe(false);
            expect(outputGrid[0][4]).toBe(false);

            // row 2
            expect(outputGrid[1][0]).toBe(false);
            expect(outputGrid[1][1]).toBe(false);
            expect(outputGrid[1][2]).toBe(false);
            expect(outputGrid[1][3]).toBe(false);
            expect(outputGrid[1][4]).toBe(false);

            // row 3
            expect(outputGrid[2][0]).toBe(false);
            expect(outputGrid[2][1]).toBe(true);
            expect(outputGrid[2][2]).toBe(true);
            expect(outputGrid[2][3]).toBe(true);
            expect(outputGrid[2][4]).toBe(false);

            // row 4
            expect(outputGrid[3][0]).toBe(false);
            expect(outputGrid[3][1]).toBe(false);
            expect(outputGrid[3][2]).toBe(false);
            expect(outputGrid[3][3]).toBe(false);
            expect(outputGrid[3][4]).toBe(false);

            // row 5
            expect(outputGrid[4][0]).toBe(false);
            expect(outputGrid[4][1]).toBe(false);
            expect(outputGrid[4][2]).toBe(false);
            expect(outputGrid[4][3]).toBe(false);
            expect(outputGrid[4][4]).toBe(false);
        });
    });
    
    it('should start game', function() {
       
        
        // expect 
    });
});