/* jshint -W117 */
describe('Life game', function() {
    describe('model', function() {
        beforeEach(function() {
            var model = Game.model;
        });

        it('should exist', function() {
            expect(Game.model).toBeDefined();
        });
        
    });
    
//    it('should say that live cell with fewer than two live neighbours dies', function() {
//        expect(true).toBe(true);
//    });
});