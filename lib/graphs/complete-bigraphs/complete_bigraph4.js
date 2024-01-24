function graphconfig_combigraph_cy4() {
	return cytoscape({
		  container: document.getElementById('comp-bigraph4-cy'),
		  elements: complete_bigraph_data4.elements,
		  style: [
		    {
		      selector: 'node',
		      style: {
			'label': 'data(label)',
			'text-valign': 'center',
			'text-halign': 'center',
			'font-family': "Helvetica,Arial,sans-serif",
			'background-color': 'data(backgroundColor1)',
			'border-width': 4,
			'border-color': 'black',
			'width' : 40,
			'height': 40
		      }
		    },
		    {
		      selector: 'edge',
		      style: {
			'control-point-distances': 155,
			'control-point-weights': 0.5,
			'edge-distances': 'node-position',
			'curve-style': 'unbundled-bezier'
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
		    fit: false,
		    positions: function(node){return node._private.data.position1}
		  }
		});
}

var compbigraph_cy4 = graphconfig_combigraph_cy4()

compbigraph_cy4.on('mouseover', 'node', function(e){
  var sel = e.target;
  highlight(sel, compbigraph_cy4);
});
compbigraph_cy4.on('mouseout', 'node', function(e){
  dehighlight(compbigraph_cy4);
});

compbigraph_cy4.on('mouseover', 'edge', function(e){
  var sel = e.target;
  sel.addClass('highlight');
});
compbigraph_cy4.on('mouseout', 'edge', function(e){
  var sel = e.target;
  sel.removeClass('highlight');
});

var compbigraph4_anim1 = function(positionid) {
  compbigraph_cy4.layout(
    {
      name: 'preset',
	  positions: function(node){return node._private.data["position" + positionid]}, // map of (node id) => (position obj); or function(node){ return somPos; }
      zoom: undefined, // the zoom level to set (prob want fit = false if set)
      pan: undefined, // the pan level to set (prob want fit = false if set)
      fit: true, // whether to fit to viewport
      animate: true, // whether to transition the node positions
      animationDuration: 1000, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: undefined, // callback on layoutready
      stop: undefined, // callback on layoutstop
      transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
    }
  ).start();
}


Reveal.addEventListener('fragmentshown', function(event) {
  if (event.fragment.id === 'comp-bigraph4-cy') {
    compbigraph_cy4 = graphconfig_combigraph_cy4();
	initialize_mouse(compbigraph_cy4);
    compbigraph_cy4.zoom(0.9);
    compbigraph_cy4.center();
  }
  if (event.fragment.id === 'comp-bigraph4-1-cy') {
	highlight(compbigraph_cy4.nodes()[12], compbigraph_cy4);
  }
});

Reveal.addEventListener('fragmenthidden', function(event) {
	if (event.fragment.id === 'comp-bigraph4-cy') {
	  compbigraph_cy4 = graphconfig_combigraph_cy4();
	  initialize_mouse(compbigraph_cy4);
	  compbigraph_cy4.zoom(0.9);
	  compbigraph_cy4.center();
	}
	if (event.fragment.id === 'comp-bigraph4-1-cy') {
		dehighlight(compbigraph_cy4);
	}
  });
  