var thrdgrid1 = undefined;
var thrdgrid2 = undefined;
var thrdgrid3 = undefined;
var thrdgrid4 = undefined;

document.addEventListener("slidechanged", function(event) {
if (event.currentSlide.id === 'practical0') {
  if (thrdgrid1 == undefined) {
    thrdgrid1 = new Vivus('draw-graph-svg', { type: 'oneByOne', duration: 150, animTimingFunction: Vivus.LINEAR, file: 'images/graph.svg', reverseStack: true });
  } else {
    thrdgrid1.reset().play()
  }
}
if (event.currentSlide.id === 'practical5') {
  if (thrdgrid2 == undefined) {
    thrdgrid2 = new Vivus('draw-grid-svg1', { type: 'oneByOne', duration: 150, animTimingFunction: Vivus.LINEAR, file: 'images/grid1.svg', reverseStack: false });
  } else {
    thrdgrid2.reset().play()
  }
}
if (event.currentSlide.id === 'practical6') {
  if (thrdgrid3 == undefined) {
    thrdgrid3 = new Vivus('draw-grid-svg2', { type: 'oneByOne', duration: 150, animTimingFunction: Vivus.LINEAR, file: 'images/grid3.svg', reverseStack: false });
  } else {
    thrdgrid3.reset().play()
  }
}
if (event.currentSlide.id === 'practical7') {
  if (thrdgrid4 == undefined) {
    thrdgrid4 = new Vivus('draw-grid-svg3', { type: 'oneByOne', duration: 150, animTimingFunction: Vivus.LINEAR, file: 'images/grid5.svg', reverseStack: false });
  } else {
    thrdgrid4.reset().play()
  }
}
});