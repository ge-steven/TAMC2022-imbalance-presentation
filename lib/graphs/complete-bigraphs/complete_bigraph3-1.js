function graphconfig_combigraph_cy3_1(elementid) {
	return cytoscape({
		  container: document.getElementById(elementid),
		  elements: complete_bigraph_data3.elements,
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
		    fit: true,
		    positions: function(node){return node._private.data.position1}
		  }
		});
}

var compbigraph3_1_anim = function(index) {
	if(index < -100) {
		return
	}
	
	var layout = compbigraph_cy3_1.layout(
	  {
		name: 'preset',
		positions: function(node){return node._private.data["position1"]}, // map of (node id) => (position obj); or function(node){ return somPos; }
		zoom: undefined, // the zoom level to set (prob want fit = false if set)
		pan: undefined, // the pan level to set (prob want fit = false if set)
		fit: false, // whether to fit to viewport
		animate: true, // whether to transition the node positions
		animationDuration: 1, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
		ready: undefined, // callback on layoutready
		stop: undefined, // callback on layoutstop
		transform: function (node,  position ){ return compbigraph3_1_positionfunction(node, index); } // transform a given node position. Useful for changing flow direction in discrete layouts
	  }
	).start();

	layout.pon('layoutstop').then(function( event ){
		compbigraph3_1_anim(index-5);
	  });
}

var compbigraph3_1_anim_reverse = function(index) {
	if(index > 100) {
		return
	}

	var layout = compbigraph_cy3_1.layout(
	  {
		name: 'preset',
		positions: function(node){return node._private.data["position1"]}, // map of (node id) => (position obj); or function(node){ return somPos; }
		zoom: undefined, // the zoom level to set (prob want fit = false if set)
		pan: undefined, // the pan level to set (prob want fit = false if set)
		fit: false, // whether to fit to viewport
		animate: true, // whether to transition the node positions
		animationDuration: 1, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
		ready: undefined, // callback on layoutready
		stop: undefined, // callback on layoutstop
		transform: function (node,  position ){ return compbigraph3_1_positionfunction(node, index); } // transform a given node position. Useful for changing flow direction in discrete layouts
	  }
	).start();

	layout.pon('layoutstop').then(function( event ){
		compbigraph3_1_anim_reverse(index+5);
	  });
}

  var compbigraph3_1_positionfunction = function(node, index) {
	if(node._private.data.id != 5) {
		return node._private.data.position1
	} else {
		x = index+150
		y = parabolic_movement(index, 100, 100)
		return {x, y}
	}
  }

  var parabolic_movement = function(x, width, height){
	return ((x**2)-width**2)*(height * (1/(width**2)))
  }

function initialize_mouse(compbigraph_cy3_1) {
	compbigraph_cy3_1.on('mouseover', 'node', function(e){
	  var sel = e.target;
	  highlight(sel, compbigraph_cy3_1);
	});
	compbigraph_cy3_1.on('mouseout', 'node', function(e){
	  dehighlight(compbigraph_cy3_1);
	});

	compbigraph_cy3_1.on('mouseover', 'edge', function(e){
	  var sel = e.target;
	  sel.addClass('highlight');
	});
	compbigraph_cy3_1.on('mouseout', 'edge', function(e){
	  var sel = e.target;
	  sel.removeClass('highlight');
	});
}

var compbigraph_cy3_1;

Reveal.addEventListener('fragmentshown', function(event) {
  if (event.fragment.id === 'comp-bigraph3-1-cy') {
    compbigraph_cy3_1 = graphconfig_combigraph_cy3_1('comp-bigraph3-1-cy');
    initialize_mouse(compbigraph_cy3_1);
    compbigraph_cy3_1.zoom(1);
    compbigraph_cy3_1.center();
  }
  
  
  if (event.fragment.id === 'comp-bigraph3-1') {
	compbigraph3_1_anim(100);
  }
});

Reveal.addEventListener('fragmenthidden', function(event) {
	if (event.fragment.id === 'comp-bigraph3-1-cy') {
		compbigraph_cy3_1 = graphconfig_combigraph_cy3_1('comp-bigraph3-1-cy');
		initialize_mouse(compbigraph_cy3_1);
		compbigraph_cy3_1.zoom(1);
		compbigraph_cy3_1.center();
	}
	
	
	if (event.fragment.id === 'comp-bigraph3-1') {
		compbigraph3_1_anim_reverse(-100);
	}
  });
