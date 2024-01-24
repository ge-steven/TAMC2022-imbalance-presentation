function graphconfig_combigraph_cy6() {
	return cytoscape({
		  container: document.getElementById('comp-bigraph6-cy'),
		  elements: complete_bigraph_data5.elements,
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

var compbigraph_cy6 = graphconfig_combigraph_cy6()

compbigraph_cy6.on('mouseover', 'node', function(e){
  var sel = e.target;
  highlight(sel, compbigraph_cy6);
});
compbigraph_cy6.on('mouseout', 'node', function(e){
  dehighlight(compbigraph_cy6);
});

compbigraph_cy6.on('mouseover', 'edge', function(e){
  var sel = e.target;
  sel.addClass('highlight');
});
compbigraph_cy6.on('mouseout', 'edge', function(e){
  var sel = e.target;
  sel.removeClass('highlight');
});

var compbigraph6_anim = function(positionid) {
  compbigraph_cy6.layout(
    {
      name: 'preset',
	  positions: function(node){return node._private.data["position" + positionid]}, // map of (node id) => (position obj); or function(node){ return somPos; }
      zoom: undefined, // the zoom level to set (prob want fit = false if set)
      pan: undefined, // the pan level to set (prob want fit = false if set)
      fit: true, // whether to fit to viewport
      animate: true, // whether to transition the node positions
      animationDuration: 800, // duration of animation in ms if enabled
      animationEasing: 'ease-in-out-sine', // easing of animation if enabled
      animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: undefined, // callback on layoutready
      stop: undefined, // callback on layoutstop
      transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
    }
  ).start();
}

var compbigraph6_anim_shiftl = function(pindex, nodeindex, width, height,xoffset, posid) {
	if(pindex < -width) {
		return
	}
	
	var layout = compbigraph_cy6.layout(
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

		// Somehow passing the position id breaks things in transform function
		transform: function (node,  position ){ return compbigraph6_positionfunction(node, pindex, nodeindex, width, height,xoffset); } // transform a given node position. Useful for changing flow direction in discrete layouts
	  }
	).start();

	// Somehow passing the position id (posid) breaks things in compbigraph6_anim_shiftl function
	layout.pon('layoutstop').then(function( event ){
		compbigraph6_anim_shiftl(pindex-5, nodeindex, width, height,xoffset);
	  });
}


var compbigraph6_anim_shiftr = function(pindex, nodeindex, width, height,xoffset, posid) {
	if(pindex > width) {
		return
	}
	
	var layout = compbigraph_cy6.layout(
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

		// Somehow passing the position id (posid) breaks things in transform function
		transform: function (node,  position ){ return compbigraph6_positionfunction(node, pindex, nodeindex, width, height,xoffset); } // transform a given node position. Useful for changing flow direction in discrete layouts
	  }
	).start();


	// Somehow passing the position id (posid) breaks things in compbigraph6_anim_shiftr function
	layout.pon('layoutstop').then(function( event ){
		compbigraph6_anim_shiftr(pindex+5, nodeindex, width, height,xoffset);
	  });
}

var compbigraph6_positionfunction = function(node, pindex, nodeindex, width, height,xoffset, posid) {
	if(node._private.data.id != nodeindex) {
		return node._private.data["position" + posid]
	} else {
		x = pindex+xoffset
		y = parabolic_movement(pindex, width, height)
		return {x, y}
	}
  }


Reveal.addEventListener('fragmentshown', function(event) {
  if (event.fragment.id === 'comp-bigraph6-cy') {
    compbigraph_cy6 = graphconfig_combigraph_cy6();
	initialize_mouse(compbigraph_cy6);
    compbigraph_cy6.zoom(0.9);
    compbigraph_cy6.center();
  }
  if (event.fragment.id === 'comp-bigraph6-1-cy') {
	compbigraph6_anim_shiftl(150, 11, 150, 100, 100, 1);
  }
  if (event.fragment.id === 'comp-bigraph6-2-cy') {
	compbigraph6_anim_shiftl(125, 10, 125, 100, 25, 2);
  }
  if (event.fragment.id === 'comp-bigraph6-3-cy') {
	compbigraph6_anim_shiftl(125, 9, 125, 100, -25, 3);
  }
  if (event.fragment.id === 'comp-bigraph6-4-cy') {
	compbigraph6_anim_shiftr(-125, 12, 125, 100, 625, 4);
  }
  if (event.fragment.id === 'comp-bigraph6-5-cy') {
	compbigraph6_anim_shiftr(-125, 13, 125, 100, 675, 5);
  }
  if (event.fragment.id === 'comp-bigraph6-6-cy') {
	compbigraph6_anim_shiftr(-125, 14, 125, 100, 725, 6);
  }
  if (event.fragment.id === 'comp-bigraph6-7-cy') {
	compbigraph6_anim(8)
  }
});

Reveal.addEventListener('fragmenthidden', function(event) {
	if (event.fragment.id === 'comp-bigraph6-cy') {
	  compbigraph_cy6 = graphconfig_combigraph_cy6();
	  initialize_mouse(compbigraph_cy6);
	  compbigraph_cy6.zoom(0.9);
	  compbigraph_cy6.center();
	}
	if (event.fragment.id === 'comp-bigraph6-1-cy') {
	  compbigraph6_anim_shiftr(-150, 11, 150, 100, 100, 2);
	}
	if (event.fragment.id === 'comp-bigraph6-2-cy') {
	  compbigraph6_anim_shiftr(-125, 10, 125, 100, 25, 3);
	}
	if (event.fragment.id === 'comp-bigraph6-3-cy') {
	  compbigraph6_anim_shiftr(-125, 9, 125, 100, -25, 4);
	}
	if (event.fragment.id === 'comp-bigraph6-4-cy') {
		compbigraph6_anim_shiftl(125, 12, 125, 100, 625, 5);
	}
	if (event.fragment.id === 'comp-bigraph6-5-cy') {
	  compbigraph6_anim_shiftl(125, 13, 125, 100, 675, 6);
	}
	if (event.fragment.id === 'comp-bigraph6-6-cy') {
	  compbigraph6_anim_shiftl(125, 14, 125, 100, 725, 7);
	}
	if (event.fragment.id === 'comp-bigraph6-7-cy') {
	  compbigraph6_anim(7)
	}
  });

  var parabolic_movement = function(x, width, height){
	return ((x**2)-width**2)*(height * (1/(width**2)))
  }