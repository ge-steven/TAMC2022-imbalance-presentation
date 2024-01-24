function graphconfig_combigraph_cy2() {
	return cytoscape({
		  container: document.getElementById('comp-bigraph2-cy'),
		  elements: complete_bigraph_data2.elements,
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
			'control-point-distances': 0,
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

var compbigraph_cy2 = graphconfig_combigraph_cy2()

compbigraph_cy2.on('mouseover', 'node', function(e){
  var sel = e.target;
  highlight(sel, compbigraph_cy2);
});
compbigraph_cy2.on('mouseout', 'node', function(e){
  dehighlight(compbigraph_cy2);
});

compbigraph_cy2.on('mouseover', 'edge', function(e){
  var sel = e.target;
  sel.addClass('highlight');
});
compbigraph_cy2.on('mouseout', 'edge', function(e){
  var sel = e.target;
  sel.removeClass('highlight');
});

var compbigraph_anim2 = function(positionid) {
  compbigraph_cy2.layout(
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



Reveal.addEventListener('fragmentshown', function(event) {
  if (event.fragment.id === 'comp-bigraph2-cy') {
    compbigraph_cy2 = graphconfig_combigraph_cy2();
    compbigraph_cy2.resize();
    compbigraph_cy2.center();
  }
  if (event.fragment.id === 'comp-bigraph2-1') {
    compbigraph_anim2(2);
    //  var a = compbigraph_cy2.edges().animate({style: {  'control-point-distances': 50}}, {duration: 800},{queue: 1});
  }
  if (event.fragment.id === 'comp-bigraph2-2') {
    compbigraph_anim2(3);
    //  var a = compbigraph_cy2.edges().animate({style: {  'control-point-distances': 100}}, {duration: 800},{queue: 1});
  }
  if (event.fragment.id === 'comp-bigraph2-3') {
    compbigraph_anim2(4);
     var a = compbigraph_cy2.edges().animate({style: {  'control-point-distances': 100}}, {duration: 800},{queue: 1});
  }
});

Reveal.addEventListener('fragmenthidden', function(event) {
	if (event.fragment.id === 'comp-bigraph2-cy') {
	  compbigraph_cy2 = graphconfig_combigraph_cy2();
	  compbigraph_cy2.resize();
	  compbigraph_cy2.center();
	}
	if (event.fragment.id === 'comp-bigraph2-1') {
	  compbigraph_anim2(1);
	  //  var a = compbigraph_cy2.edges().animate({style: {  'control-point-distances': 50}}, {duration: 800},{queue: 1});
	}
	if (event.fragment.id === 'comp-bigraph2-2') {
	  compbigraph_anim2(2);
	  //  var a = compbigraph_cy2.edges().animate({style: {  'control-point-distances': 100}}, {duration: 800},{queue: 1});
	}
	if (event.fragment.id === 'comp-bigraph2-3') {
	  compbigraph_anim2(3);
	   var a = compbigraph_cy2.edges().animate({style: {  'control-point-distances': 0}}, {duration: 800},{queue: 1});
	}
  });
  