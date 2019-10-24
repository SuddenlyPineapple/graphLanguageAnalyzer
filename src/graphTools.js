function generateGraph(cy, text){
    var data = text.split(" ");
    data.forEach(function (word, index, arr) {
        if (word === "" || word == " ")
            arr.splice(index, 1);
    });

    data = data.filter(onlyUnique);

    data.forEach(function (word, index, arr) {
        arr[index] = word.split('')
    });

    //--- Generate Graph

    cy.elements().remove();

    var previous = {
        letter: '$',
        l_index: '$',
        index: '$',
        check: false
    };
    var check = false;
    var firstLetter = true;
    var filtering_saves = new Array();

    cy.add({
        group: 'nodes',
        data: {
            id: "start",
            tag: "start"
        }
    })

    data.forEach(function (word, index, arr) {
        previousRepeat = true;
        filtering_saves = new Array();

        word.forEach(function (letter, l_index, letters) {
            if(l_index > 0)
                var filtered = cy.$('node[tag = "' + letter + '"][l_index = ' + l_index + '][start = "' + letters[0] + '"][left = "' + letters[l_index-1] + '"]')
            else 
                var filtered = cy.$('node[tag = "' + letter + '"][l_index = ' + l_index + '][start = "' + letters[0] + '"]')

            var filtering_saves_new = new Array();
            var end = new Boolean;
            l_index == letters.length - 1 ? end = 1 : end = 0;
            
            //Checking if searched node exist and adding nodes to searched
            if (filtered[0] != undefined && l_index != 0 && previousRepeat) {

                filtered.forEach(function (element, i, collected) {
                    filtering_saves_new.push(element);
                });

                //Edge value incrementation
                var inc_edge = cy.edges('[id = "'+ 
                filtering_saves[0].data('tag') +
                "_" + letter +
                "_" + filtering_saves_new[0].data('index') +
                "_" + l_index +
                '"]');

                if(inc_edge[0] != undefined) {
                    var data_value = inc_edge[0].data('tag');
                    inc_edge[0].data('tag', data_value+1);
                    
                }

                filtering_saves = filtering_saves_new;

            } else if (filtered[0] != undefined && l_index == 0 && previousRepeat) {
                filtered.forEach(function (element, i, collected) {
                    filtering_saves_new.push(element);
                });
                filtering_saves = filtering_saves_new;
                
                
                //Edge value incrementation
                var inc_edge = cy.edges('[id = "'+ letter +'_start"]');
                var data_value = inc_edge[0].data('tag');
                inc_edge[0].data('tag', data_value+1);
                
            } else {
                filtering_saves = [];
                previousRepeat = false;
            }


            if (check = filtered.length != cy.collection().length &&
                previousRepeat == true) {

                previous.letter = filtering_saves[0].data('tag')
                previous.l_index = filtering_saves[0].data('l_index')
                previous.index = filtering_saves[0].data('index')
                previous.check = check

                if (end == 1) filtering_saves[0].data('end', 1);

            } else {
                previousRepeat = false;
                cy.add({
                    group: 'nodes',
                    data: {
                        id: letter + '_' + index + '_' + l_index,
                        tag: letter,
                        l_index: l_index,
                        index: index,
                        left: previous.letter,
                        right: letter,
                        start: letters[0],
                        end: end,
                        search: 0
                    }
                });
                if (l_index > 0) {
                    cy.add({
                        group: 'edges',
                        data: {
                            id: previous.letter + '_' + letter +
                                '_' + index + '_' + l_index,
                            left: previous.letter,
                            right: letter,
                            tag: 1,
                            source: previous.letter + '_' +
                                previous.index +
                                '_' + previous.l_index,
                            target: letter + '_' + index + '_' +
                                l_index,
                            search: 0
                        }
                    });
                    
                } else if (l_index == 0) {
                    cy.add({
                        group: 'edges',
                        data: {
                            id: letter + "_start",
                            left: "start",
                            right: letter,
                            tag: 1,
                            source: "start",
                            target: letter + '_' + index + '_' +
                                l_index,
                            search: 0
                        }
                    });
                }

                previous = { letter, l_index, index, check };
            
            }
        });
    });

    cy.layout({
        name: 'cose-bilkent'
    }).run();

}

function searchSubGraphSylabs(cy, text){
    if(text.length > 0)
        var serached = cy.nodes('[tag = "' + text[0] + '"]');
        serached.forEach( function(ele, i, eles){
            second = ele.neighborhood('[tag = "' + text[1] + '"][left = "' + text[0] + '"][l_index = ' + (ele.data('l_index') + 1 )+ ']');
            if(second.length > 0){
                second.forEach( function(ele1, i1, eles1){
                    console.log(ele, ele1);

                    ele.data('search', 1);
                    ele1.data('search', 1);

                    search_edge = ele.edgesWith(ele1);
                    search_edge.data('search', 1);
                });
            }
        });
}