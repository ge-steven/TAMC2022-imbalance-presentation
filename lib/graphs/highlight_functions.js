
function highlight(sel, cy) {
    // // sel.addClass('selected');
    // sel.animate({style: {'background-color': 'green'}}, {duration: 1});
    // currentLabel = sel._private.data.label;
    // var neighbors = sel.outgoers().union(sel.incomers());
  
    // for (i = 0; i < neighbors.length; i++) {
    //   var neighborLabel = neighbors[i]._private.data.label;
    //   if(permutation[neighborLabel] !== undefined) {
    //     // neighbors[i].addClass('highlight');
    //     neighbors[i].animate({style: {'background-color': 'orange'}}, {duration: 1});
    //   } else {
    //     // neighbors[i].addClass('highlight');
    //     neighbors[i].animate({style: {'lineColor': 'blue'}}, {duration: 1});
    //   }
    // }
    cy.elements().difference(sel.outgoers().union(sel.incomers())).not(sel).addClass('semitransp');
  
    sel.addClass('selected').outgoers().union(sel.incomers()).not(sel).addClass('highlight');
  }
  
  function highlightLeft(sel, cy) {
      sel.addClass('selected');
      // sel.animate({style: {'background-color': 'green'}}, {duration: 200});
      currentLabel = sel._private.data.label;
      var neighbors = sel.outgoers().union(sel.incomers());
    
      for (i = 0; i < neighbors.length; i++) {
        var neighborLabel = neighbors[i]._private.data.label;
        if(permutation[neighborLabel] !== undefined) {
          if(permutation[currentLabel] > permutation[neighborLabel]) {
            neighbors[i].addClass('highlightLeft');
            // neighbors[i].animate({style: {'background-color': 'red'}}, {duration: 200});
          }
        } else {
          neighbors[i].addClass('highlight');
          // neighbors[i].animate({style: {'lineColor': 'blue'}}, {duration: 200});
        }
      }
      cy.elements().difference(sel.outgoers().union(sel.incomers())).not(sel).addClass('semitransp');
    }
  
  
    function highlightRight(sel, cy) {
      sel.addClass('selected');
      // sel.animate({style: {'background-color': 'green'}}, {duration: 200});
      currentLabel = sel._private.data.label;
      var neighbors = sel.outgoers().union(sel.incomers());
    
      for (i = 0; i < neighbors.length; i++) {
        var neighborLabel = neighbors[i]._private.data.label;
        if(permutation[neighborLabel] !== undefined) {
          if(permutation[currentLabel] < permutation[neighborLabel]) {
            neighbors[i].addClass('highlightRight');
            // neighbors[i].animate({style: {'background-color': 'blue'}}, {duration: 200});
          }
        } else {
            neighbors[i].addClass('highlight');
            // neighbors[i].animate({style: {'lineColor': 'blue'}}, {duration: 200});
        }
      }
      cy.elements().difference(sel.outgoers().union(sel.incomers())).not(sel).addClass('semitransp');
    }
  
  
  function highlightLeftRight(sel, cy) {
      sel.addClass('selected');
      // sel.animate({style: {'background-color': 'green'}}, {duration: 200});
      currentLabel = sel._private.data.label;
      var neighbors = sel.outgoers().union(sel.incomers());
    
      for (i = 0; i < neighbors.length; i++) {
        var neighborLabel = neighbors[i]._private.data.label;
        if(permutation[neighborLabel] !== undefined) {
          if(permutation[currentLabel] < permutation[neighborLabel]) {
            neighbors[i].addClass('highlightRight');
            // neighbors[i].animate({style: {'background-color': 'blue'}}, {duration: 200});
          } else {
            neighbors[i].addClass('highlightLeft');
            // neighbors[i].animate({style: {'background-color': 'red'}}, {duration: 200});
          }
        } else {
          neighbors[i].addClass('highlight');
          // neighbors[i].animate({style: {'lineColor': 'blue'}}, {duration: 200});
        }
      }
      cy.elements().difference(sel.outgoers().union(sel.incomers())).not(sel).addClass('semitransp');
    }
  
  function dehighlight(cy) {
    cy.elements().removeClass('selected');
    cy.elements().removeClass('semitransp');
    cy.elements().removeClass('highlightRight');
    cy.elements().removeClass('highlightLeft');
    cy.elements().removeClass('highlight');
    // cy.edges().animate({
    //   style: { lineColor: '#999999' }}, {duration: 1}
    // );
      
    // cy.nodes().animate({
    //   style: { backgroundColor: 'white' }}, 
    //   {duration: 1}
    //   );
  }