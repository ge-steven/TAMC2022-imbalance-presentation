let chained_comp_bigraph1_cy_nodes_opacities = [ 	[1,1,0,0,1,1,0,0,0,0],
					[0,1,1,0,0,0,1,1,1,0],
					[0,0,0,1,0,0,0,0,1,1],
					[1,1,1,1,1,1,1,1,1,1],
					[1,1,0.25,0.25,1,1,0.25,0.25,0.25,0.25],
					[1,1,0.25,0.25,1,1,1   ,0.25,0.25,0.25],
					[1,1,0.25,0.25,1,1,1   ,0.25,0.25,0.25]];
					
let chained_comp_bigraph1_cy_edges_opacities = [ 	[1,1,1,1,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,1,1,1,1,1,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,1,1,0],
					[1,1,1,1,1,1,1,1,1,1,1,1,0],
					[1,1,1,1,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0],
					[1,1,1,1,1,   0.25,0.25,0.25,0.25,0.25,0.25,0.25,0],
					[1,1,1,1,1,   0.25,0.25,0.25,0.25,0.25,0.25,0.25,1]];

let chained_comp_bigraph1_cy = cytoscape({
  container: document.getElementById('chained-comp-bigraph1-cy'),
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

chained_comp_bigraph1_cy.edges()[chained_comp_bigraph1_cy.edges().length-1].animate({
		css: {'opacity': 0,
  		      'lineColor' : 'red'}
		},{
		duration: 1
		}
	);

chained_comp_bigraph1_cy.on('mouseover', 'node', function(e){
  var sel = e.target;
  highlight(sel, chained_comp_bigraph1_cy);
});
chained_comp_bigraph1_cy.on('mouseout', 'node', function(e){
  dehighlight(chained_comp_bigraph1_cy);
});

chained_comp_bigraph1_cy.on('mouseover', 'edge', function(e){
  var sel = e.target;
  sel.addClass('highlight');
});
chained_comp_bigraph1_cy.on('mouseout', 'edge', function(e){
  var sel = e.target;
  sel.removeClass('highlight');
});

var chained_comp_bigraph1_cy_anim = function(id) {
  var i;
  for(i = 0; i < chained_comp_bigraph1_cy_nodes_opacities[id].length; i++){
	  chained_comp_bigraph1_cy.nodes()[i].animate({
	  	css: {
	  		'opacity': chained_comp_bigraph1_cy_nodes_opacities[id][i]
	  		}
	  	},{
	  	duration: 1000
	  	}
	  );
  }
  for(i = 0; i < chained_comp_bigraph1_cy_edges_opacities[id].length; i++){
  	var css_content;
  	
  	if(i == chained_comp_bigraph1_cy_edges_opacities[id].length - 1) {
  		css_content = {'opacity': chained_comp_bigraph1_cy_edges_opacities[id][i],
  				'lineColor' : 'red'};
  	} else {
  		css_content = {'opacity': chained_comp_bigraph1_cy_edges_opacities[id][i]};
  	}
  
	chained_comp_bigraph1_cy.edges()[i].animate({
		css: css_content
		},{
		duration: 1000
		}
	);
  }
}


var bigraph1_bb = chained_comp_bigraph1_cy.bubbleSets();
var bigraph1_edges = [chained_comp_bigraph1_cy.edges().slice(0, 4), chained_comp_bigraph1_cy.edges().slice(4, 10), chained_comp_bigraph1_cy.edges().slice(10, 12)]
var bigraph1_nodes = [bigraph1_edges[0].connectedNodes(), bigraph1_edges[1].connectedNodes(), bigraph1_edges[2].connectedNodes()]


Reveal.addEventListener('fragmenthidden', function(event) { 
  if (event.fragment.id === 'chained-comp-bigraph1-1') {
    bigraph1_bb.getPaths()[0].remove()
    bigraph1_bb.destroy()
  }
  if (event.fragment.id === 'chained-comp-bigraph1-2') {
    bigraph1_bb.getPaths()[1].remove()
  }
  if (event.fragment.id === 'chained-comp-bigraph1-3') {
    bigraph1_bb.getPaths()[2].remove()
  }
  if (event.fragment.id === 'chained-comp-bigraph1-cy') {
    chained_comp_bigraph1_cy.resize()
    chained_comp_bigraph1_cy.zoom(1.15);
    chained_comp_bigraph1_cy.center();
  }
});

Reveal.addEventListener('fragmentshown', function(event) { 
  if (event.fragment.id === 'chained-comp-bigraph1-1') {
    bigraph1_bb.destroy();
    bigraph1_bb = chained_comp_bigraph1_cy.bubbleSets();
    bigraph1_bb.addPath(bigraph1_nodes[0], bigraph1_edges[0], null, {
      drawPotentialArea: true,
      virtualEdges: true,
      style: {
        fill: 'rgba(255, 0, 0, 0.2)',
        stroke: 'red',
      },
    });
  }
  if (event.fragment.id === 'chained-comp-bigraph1-2') {
    bigraph1_bb.addPath(bigraph1_nodes[1], bigraph1_edges[1], null, {
      drawPotentialArea: true,
      virtualEdges: true,
      style: {
        fill: 'rgba(0, 255, 0, 0.2)',
        stroke: 'green',
      },
    });
  }
  if (event.fragment.id === 'chained-comp-bigraph1-3') {
    bigraph1_bb.addPath(bigraph1_nodes[2], bigraph1_edges[2], null, {
      drawPotentialArea: true,
      virtualEdges: true,
      style: {
        fill: 'rgba(0, 0, 255, 0.2)',
        stroke: 'blue',
      },
    });
  }
  if (event.fragment.id === 'chained-comp-bigraph1-cy') {
    chained_comp_bigraph1_cy.resize();
    chained_comp_bigraph1_cy.zoom(1.15);
    chained_comp_bigraph1_cy.center();
  }
});
