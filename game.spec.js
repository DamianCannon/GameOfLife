/* jshint -W117 */
describe('Life game', function() {
    describe('model', function() {
        var model = Game.model;

        beforeEach(function() {
        });

        it('should exist', function() {
            expect(Game.model).toBeDefined();
        });
        
        it('should count zero when cell has no live neighbours', function() {
            var cell = {neighbours: []};
            expect(model.countNeighbours(cell)).toBe(0);
        });

        it('should count one when cell has one live neighbour', function() {
            var cell = {neighbours: [true]};
            expect(model.countNeighbours(cell)).toBe(1);
        });
    
        it('should count two when cell has two live neighbours', function() {
            var cell = {neighbours: [true, true]};
            expect(model.countNeighbours(cell)).toBe(2);
        });

        it('should count two when cell has one dead and two live neighbours', function() {
            var cell = {neighbours: [true, false, true]};
            expect(model.countNeighbours(cell)).toBe(2);
        });
    
        it('should count three when cell has four dead and three live neighbours', function() {
            var cell = {neighbours: [false, true, false, true, false, true, false]};
            expect(model.countNeighbours(cell)).toBe(3);
        });

        it('should count eight when cell has eight live neighbours', function() {
            var cell = {neighbours: [true, true, true, true, true, true, true, true]};
            expect(model.countNeighbours(cell)).toBe(8);
        });
        
        it('should count zero when cell has eight dead neighbours', function() {
            var cell = {neighbours: [false, false, false, false, false, false, false, false]};
            expect(model.countNeighbours(cell)).toBe(0);
        });
        
    });
    
});