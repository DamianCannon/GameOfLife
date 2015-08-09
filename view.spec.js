/* jshint -W117 */
describe('Life game view', function() {    
    function initialiseDocument() {
        var doc;
        
        //<table id='grid'></table>
        var table = document.createElement('table');
        table.setAttribute('id', 'grid');
        
        //<button id='start'>Start</button>
        var start = document.createElement('button');
        start.setAttribute('id', 'start');
        
        //<button id='stop'>Stop</button>
        var stop = document.createElement('button');
        stop.setAttribute('id', 'stop');
        
        //<button id='clear'>Clear</button>
        var clear = document.createElement('button');
        clear.setAttribute('id', 'clear');
        
        doc = document.createDocumentFragment();
        doc.appendChild(table);
        doc.appendChild(start);
        doc.appendChild(stop);
        doc.appendChild(clear);
        
        return doc;
    }

    function getCountOfSelectedCells(grid) {
        var count = 0;
        grid.map(function(row) {
            return row.map(function(cell) {
                count += +cell;
            });
        });
        return count;
    }
    
    function convertTableIntoArray(table) {
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
        return grid;
    }
    
    it('should exist', function() {
        expect(Game.view).toBeDefined();
    });
    
    it('should initialise a table with 12 rows and 12 columns', function() {
        var view = Game.view;
        var doc = initialiseDocument();
        view.init(doc);
                
        var table = doc.querySelector('#grid');
        
        expect(table.rows.length).toBe(12);
        expect(table.rows[0].cells.length).toBe(12);
    });

    it('should have no selected cells when initialised', function() {
        var view = Game.view;
        var doc = initialiseDocument();
        view.init(doc);
                
        var table = doc.querySelector('#grid');
        var grid = convertTableIntoArray(table);
        
        expect(getCountOfSelectedCells(grid)).toBe(0);
    });
    
    it('should call newStateForGrid on model when start button clicked', function() {
        var view = Game.view;
        var doc = initialiseDocument();
        view.init(doc);

        spyOn(Game.model, 'newStateForGrid').and.callThrough();
        var button = doc.querySelector('#start');
        button.click();
        
        expect(Game.model.newStateForGrid).toHaveBeenCalled();
    });

    it('should move table on to next state when start button clicked', function() {
        var view = Game.view;
        var doc = initialiseDocument();
        view.init(doc);

        var table = doc.querySelector('#grid');
        table.rows[3].cells[3].children[0].checked = true;
        table.rows[4].cells[3].children[0].checked = true;
        table.rows[5].cells[3].children[0].checked = true;

        var startbutton = doc.querySelector('#start');
        startbutton.click();

        expect(table.rows[3].cells[3].children[0].checked).toBeFalsy();
        expect(table.rows[4].cells[2].children[0].checked).toBeTruthy();
        expect(table.rows[4].cells[3].children[0].checked).toBeTruthy();
        expect(table.rows[4].cells[4].children[0].checked).toBeTruthy();
        expect(table.rows[5].cells[3].children[0].checked).toBeFalsy();
    });

    it('should clear table when clear button clicked', function() {
        var view = Game.view;
        var doc = initialiseDocument();
        view.init(doc);

        var table = doc.querySelector('#grid');
        table.rows[3].cells[3].children[0].checked = true;
        table.rows[4].cells[3].children[0].checked = true;
        table.rows[5].cells[3].children[0].checked = true;

        var clearbutton = doc.querySelector('#clear');
        clearbutton.click();
        var grid = convertTableIntoArray(table);

        expect(getCountOfSelectedCells(grid)).toBe(0);
    });
    
});