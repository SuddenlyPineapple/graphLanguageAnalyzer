$(function () {
    var cy = cytoscape({
        container: document.getElementById('cy'),
        wheelSensitivity: 1,
        style: [{
            selector: 'node',
            style: {
                shape: 'ellipse',
                'background-color': 'grey',
                label: 'data(tag)'
            }
        }, {
            selector: 'edge',
            style: {
                'label': 'data(tag)', // maps to data.label
                'line-color': 'aqua',
                'width': 2,
                'curve-style': 'bezier',
                'target-arrow-shape': 'vee',
                'target-arrow-color': 'aqua'
            }
        }, {
            selector: "node[l_index = 0]",
            style: {
                shape: 'hexagon',
                'background-color': 'red',
                label: 'data(tag)'
            }
        }, {
            selector: "node[end = 1]",
            style: {
                shape: 'tag',
                'background-color': 'blue',
                label: 'data(tag)'
            }
        }, {
            selector: 'node[id = "start"]',
            style: {
                shape: 'star',
                'background-color': 'green',
                label: 'data(tag)'
            }
        }, {
            selector: 'node[search = 1]',
            style: {
                'background-color': 'black',
            }
        }, {
            selector: 'edge[search = 1]',
            style: {
                'line-color': 'purple',
                'target-arrow-color': 'purple'
            }
        }]
    });

    $("form").submit(function (e) {
        e.preventDefault();
    });

    $("#analyzeIt").on("click", function () {
        var text = $("#toAnalyze").val();
        
        //--- Cleaning Data
        text = cleanInput(text);
        generateGraph(cy, text);
    });

    $("#analyzeCrap").on("click", function () {
        var text = $("#toAnalyze").val();
        
        //--- Cleaning Data
        generateGraph(cy, text);
    });

    $("#analyzeEnteredSylabs").on("click", function () {
        var text = $("#analyzeSylabsTextbox").val();
        
        //----------------------------------------START Refreshing to fecator
        var ref = $("#toAnalyze").val();
        //--- Cleaning Data
        ref = cleanInput(ref);
        generateGraph(cy, ref);
        //----------------------------------------END Refreshing to fecator

        //--- Cleaning Data
        searchFor = cleanInput(text);
        searchSubGraphSylabs(cy, searchFor);
    });

    $("#analyzeEnteredSylabsSpecial").on("click", function () {
        var text = $("#analyzeSylabsTextbox").val();
        
        //----------------------------------------START Refreshing to fecator
        var ref = $("#toAnalyze").val();
        generateGraph(cy, ref);
        //----------------------------------------END Refreshing to fecator

        //--- Cleaning Data
        searchFor = cleanInput(text);
        searchSubGraphSylabs(cy, searchFor);
    });

    cy.on('tap', function(event){
        // target holds a reference to the originator
        // of the event (core or element)
        var evtTarget = event.target;
        console.log("Clicked:", evtTarget);
        
    });

});