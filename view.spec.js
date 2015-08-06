/* jshint -W117 */
describe('Life game view', function() {
    var view = Game.view;
    var doc;
    
    beforeEach(function() {
        var table = document.createElement('table');
        table.setAttribute('id', 'grid');
        doc = document.createDocumentFragment();
        doc.appendChild(table);
    });

    it('should exist', function() {
        expect(Game.view).toBeDefined();
    });
    
    it('should initialise a table with 12 rows and 12 columns', function() {
        view.init(doc.querySelector('#grid'));
                
        var table = doc.querySelector('#grid');
        
        expect(table.rows.length).toBe(12);
        expect(table.rows[0].cells.length).toBe(12);
    });

});