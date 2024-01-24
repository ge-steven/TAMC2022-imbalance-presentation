let cy1 = cytoscape({
  container: document.getElementById('graph1-cy'),
  elements: data.elements,
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
        selector: 'node.highlightRight',
        style: {
            'background-color': 'blue'
        }
    },
    {
        selector: 'node.highlightLeft',
        style: {
            'background-color': 'red'
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

cy1.on('mouseover', 'node', function(e){
  var sel = e.target;
  highlight(sel, cy1);
});
cy1.on('mouseout', 'node', function(e){
  dehighlight(cy1);
});

cy1.on('mouseover', 'edge', function(e){
  var sel = e.target;
  sel.addClass('highlight');
});
cy1.on('mouseout', 'edge', function(e){
  var sel = e.target;
  sel.removeClass('highlight');
});

var layoutanimation = function(i) {
  return cy1.layout(
    {
      name: 'preset',
      positions: function(node){return node._private.data["position" + i]}, // map of (node id) => (position obj); or function(node){ return somPos; }
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

var cytoEventHandler = function(event) {
  if(event.fragment.id === undefined) {

  }
  else if (event.fragment.id == 'graph1-cy') {
    cy1.resize();
    cy1.fit();
    layoutanimation(1);
  }
  else if (event.fragment.id == 'graph22-cy') {
    layoutanimation(2);
    cy1.edges()
      .animate({
        style: {  'control-point-distances': 200}
      }, {
        duration: 800,
        complete: undefined
      });
  }
  else if (event.fragment.id == 'graph32-cy') {
    highlight(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph33-cy') {
    dehighlight(cy1);
    highlightLeft(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph42-cy') {
    dehighlight(cy1);
    highlightRight(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph52-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph62-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[7], cy1);
  }
  else if (event.fragment.id == 'graph63-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[0], cy1);
  }
  else if (event.fragment.id == 'graph64-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[9], cy1);
  }
  else if (event.fragment.id == 'graph65-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[2], cy1);
  }
  else if (event.fragment.id == 'graph71-cy') {
    dehighlight(cy1);
  }
  else if (event.fragment.id == 'graph72-cy') {
    layoutanimation(3)
    .pon('layoutstop')
    .then(function(event) {
      document.getElementById("graph72-cy").innerHTML = "$I(\\pi_2) = 30$";
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      layoutanimation(4)
      .pon('layoutstop')
      .then(function(event) {
        document.getElementById("graph72-cy").innerHTML = "$I(\\pi_3) = 24$";
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        layoutanimation(2)
        .pon('layoutstop')
        .then(function(event) {
          document.getElementById("graph72-cy").innerHTML = "$I(\\pi^*) = 16$";
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          layoutanimation(5)
        })
      })
    });
  }
  else if (event.fragment.id == 'graph82-cy') {
    document.getElementById("graph72-cy").innerHTML = "$I(\\pi^*) = 16 = I(G)$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
}

Reveal.addEventListener('fragmentshown', cytoEventHandler);

var cytoEventHandlerBack = function(event) {
  if(event.fragment.id === undefined) {

  }
  else if (event.fragment.id == 'graph1-cy') {
    cy1.resize();
    cy1.fit();
    layoutanimation(1);
  }
  else if (event.fragment.id == 'graph22-cy') {
    layoutanimation(1);
    cy1.edges()
      .animate({
        style: {  'control-point-distances': 0}
      }, {
        duration: 800,
        complete: function(){
          console.log('Animation complete');
        }
      });
  }
  else if (event.fragment.id == 'graph32-cy') {
    dehighlight(cy1);
  }
  else if (event.fragment.id == 'graph33-cy') {
    dehighlight(cy1);
    highlight(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph42-cy') {
    dehighlight(cy1);
    highlightLeft(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph52-cy') {
    dehighlight(cy1);
    highlightRight(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph62-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[10], cy1);
  }
  else if (event.fragment.id == 'graph63-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[7], cy1);
  }
  else if (event.fragment.id == 'graph64-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[0], cy1);
  }
  else if (event.fragment.id == 'graph65-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[9], cy1);
  }
  else if (event.fragment.id == 'graph71-cy') {
    dehighlight(cy1);
    highlightLeftRight(cy1.elements()[2], cy1);
  }
  else if (event.fragment.id == 'graph72-cy') {
    document.getElementById("graph72-cy").innerHTML = "$I(\\pi_1) = 36$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    dehighlight(cy1);
    layoutanimation(2)
  }
  else if (event.fragment.id == 'graph82-cy') {
    document.getElementById("graph72-cy").innerHTML = "$I(\\pi^*) = 16$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
}


Reveal.addEventListener('fragmenthidden', cytoEventHandlerBack);
