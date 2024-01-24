let chained_comp_bigraph4_cy_nodes_opacities = [ 	[1,1,0,0,1,1,0,0,0,0],
					[0,1,1,0,0,0,1,1,1,0],
					[0,0,0,1,0,0,0,0,1,1],
					[1,1,1,1,1,1,1,1,1,1],
					[1,1,0.25,0.25,1,1,0.25,0.25,0.25,0.25],
					[1,1,0.25,0.25,1,1,1   ,0.25,0.25,0.25],
					[1,1,0.25,0.25,1,1,1   ,0.25,0.25,0.25]];
					
let chained_comp_bigraph4_cy_edges_opacities = [ 	[1,1,1,1,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,1,1,1,1,1,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,1,1,0],
					[1,1,1,1,1,1,1,1,1,1,1,1,0],
					[1,1,1,1,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0],
					[1,1,1,1,1,   0.25,0.25,0.25,0.25,0.25,0.25,0.25,0],
					[1,1,1,1,1,   0.25,0.25,0.25,0.25,0.25,0.25,0.25,1]];

          
function graphconfig_chained_comp_bigraph4() {
  let chained_comp_bigraph4_cy =  cytoscape({
    container: document.getElementById('chained-comp-bigraph4-cy'),
    elements: chained_comp_bipartite_graph_data.elements,
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'fontSize': '0.5em',
          'fontFamily': 'Helvetica, Arial, sans-serif',
          'fontWeight': 'bold',
          'background-color': 'data(backgroundColor1)',
          'border-width': 4,
          'border-color': 'black',
          'width' : 40,
          'height': 40
        }
      },
      {
        selector: ':parent',
        css: {
          'text-valign': 'top',
          'text-halign': 'center',
        }
      },
      {
        selector: 'edge',
        style: {
          'opacity': 'data(opacity1)'
        }
      },
      {
          selector: 'node.selected',
          style: {
              'background-color': 'green'
          }
      },
      {
          selector: 'node.highlight',
          style: {
              'background-color': 'orange'
          }
      },
      {
          selector: 'node.semitransp',
          style:{ 'opacity': '0.5' }
      },
      {
          selector: 'edge.highlight',
          style: { 'mid-target-arrow-color': '#FFF', lineColor: 'blue' }
      },
      {
          selector: 'edge.semitransp',
          style:{ 'opacity': '0.2' }
      }
    ],
    layout: {
      name: 'preset',
      fit: true,
      positions: function(node){return node._private.data.position1}
    }
  });

  chained_comp_bigraph4_cy.edges()[chained_comp_bigraph4_cy.edges().length-1].animate({
		css: {'opacity': 0,
  		      'lineColor' : 'red'}
		},{
		duration: 1
		}
	);

  chained_comp_bigraph4_cy.on('mouseover', 'node', function(e){
    var sel = e.target;
    highlight(sel, chained_comp_bigraph4_cy);
  });
  chained_comp_bigraph4_cy.on('mouseout', 'node', function(e){
    dehighlight(chained_comp_bigraph4_cy);
  });

  chained_comp_bigraph4_cy.on('mouseover', 'edge', function(e){
    var sel = e.target;
    sel.addClass('highlight');
  });
  chained_comp_bigraph4_cy.on('mouseout', 'edge', function(e){
    var sel = e.target;
    sel.removeClass('highlight');
  });

  var chained_comp_bigraph4_cy_anim = function(id) {
    var i;
    for(i = 0; i < chained_comp_bigraph4_cy_nodes_opacities[id].length; i++){
      chained_comp_bigraph4_cy.nodes()[i].animate({
        css: {
          'opacity': chained_comp_bigraph4_cy_nodes_opacities[id][i]
          }
        },{
        duration: 1000
        }
      );
    }
    for(i = 0; i < chained_comp_bigraph4_cy_edges_opacities[id].length; i++){
      var css_content;
      
      if(i == chained_comp_bigraph4_cy_edges_opacities[id].length - 1) {
        css_content = {'opacity': chained_comp_bigraph4_cy_edges_opacities[id][i],
            'lineColor' : 'red'};
      } else {
        css_content = {'opacity': chained_comp_bigraph4_cy_edges_opacities[id][i]};
      }
    
    chained_comp_bigraph4_cy.edges()[i].animate({
      css: css_content
      },{
      duration: 1000
      }
    );
    }
  }


  var bigraph4_bb = chained_comp_bigraph4_cy.bubbleSets();
  var bigraph4_edges = [chained_comp_bigraph4_cy.edges().slice(0, 4), chained_comp_bigraph4_cy.edges().slice(4, 10), chained_comp_bigraph4_cy.edges().slice(10, 12)]
  var bigraph4_nodes = [bigraph4_edges[0].connectedNodes(), bigraph4_edges[1].connectedNodes(), bigraph4_edges[2].connectedNodes()]

  bigraph4_bb.addPath(bigraph4_nodes[0], bigraph4_edges[0], null, {
    drawPotentialArea: true,
    virtualEdges: true,
    style: {
      fill: 'rgba(255, 0, 0, 0.2)',
      stroke: 'red',
    },
  });
  bigraph4_bb.addPath(bigraph4_nodes[1], bigraph4_edges[1], null, {
    drawPotentialArea: true,
    virtualEdges: true,
    style: {
      fill: 'rgba(0, 255, 0, 0.2)',
      stroke: 'green',
    },
  });
  bigraph4_bb.addPath(bigraph4_nodes[2], bigraph4_edges[2], null, {
    drawPotentialArea: true,
    virtualEdges: true,
    style: {
      fill: 'rgba(0, 0, 255, 0.2)',
      stroke: 'blue',
    },
  });

  return chained_comp_bigraph4_cy
}


var chained_comp_bigraph4_cy = undefined

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'chained-comp-bigraph4') {
    Reveal.nextFragment();
  }
});


Reveal.addEventListener('fragmenthidden', function(event) { 
  if (event.fragment.id === 'chained-comp-bigraph4-0') {
    Reveal.prev()
  }
  if (event.fragment.id === 'chained-comp-bigraph4-1') {
    dehighlight(chained_comp_bigraph4_cy);
  }
  if (event.fragment.id === 'chained-comp-bigraph4-2') {
    dehighlight(chained_comp_bigraph4_cy);
    highlight(chained_comp_bigraph4_cy.nodes()[1], chained_comp_bigraph4_cy);
  }
  if (event.fragment.id === 'chained-comp-bigraph4-3') {
    dehighlight(chained_comp_bigraph4_cy);
    highlight(chained_comp_bigraph4_cy.nodes()[8], chained_comp_bigraph4_cy);
  }
});

Reveal.addEventListener('fragmentshown', function(event) { 
  if (event.fragment.id === 'chained-comp-bigraph4-0') {
    chained_comp_bigraph4_cy = graphconfig_chained_comp_bigraph4();
    chained_comp_bigraph4_cy.resize();
    chained_comp_bigraph4_cy.zoom(1.15);
    chained_comp_bigraph4_cy.center();
  }
  if (event.fragment.id === 'chained-comp-bigraph4-1') {
    highlight(chained_comp_bigraph4_cy.nodes()[1], chained_comp_bigraph4_cy);
  }
  if (event.fragment.id === 'chained-comp-bigraph4-2') {
    dehighlight(chained_comp_bigraph4_cy);
    highlight(chained_comp_bigraph4_cy.nodes()[8], chained_comp_bigraph4_cy);
  }
  if (event.fragment.id === 'chained-comp-bigraph4-3') {
    dehighlight(chained_comp_bigraph4_cy);
  }
});
