
orbit.get("/data/results", function () {
  var data = JSON.parse(this.response);
  var output = [];
  var fitnessRange = [];
  for (var i = 0, l = data.length; i < l; i ++) {
    var code = data[i].population.code;
    code.push(data[i].population.fitness);
    fitnessRange.push(data[i].population.fitness);
    output.push(code);
  }
  dimensions = ["red value", "green value", "blue value",
                "font size", "font family", "nav display",
                "nav position", "pic position", "para1 position",
                "para2 position", "para3 position", "fitness"];
  var filteredData = [];
  output.forEach( function (e,j) { 
    var temp ={};
    dimensions.forEach ( function (d,i) {
        temp[d] = e[i];
    });
    filteredData.push(temp);
  });

  var low = fitnessRange.reduce(function (prev, item) {
    return prev < item ? prev : item;
  });

  var high = fitnessRange.reduce(function (all, item) {
    return all > item ? all : item;
  }, 0);


var color_set = d3.scale.linear()
  .domain([low, high])
  .range(["steelblue", "red"])
  .interpolate(d3.interpolateLab);

var example = d3.select("#example")
  .style({
    width: 100 + "%",
    height: 500 + "px"
  });

var pc = d3.parcoords()("#example")
  .data(filteredData)
  .render()
  .createAxes()
  .reorderable()
  .brushMode("1D-axes")
  .interactive();

  update_colors(d3.keys(filteredData[0])[11]);

 // click label to activate coloring
  pc.svg.selectAll(".dimension")
    .on("click", update_colors)
    .selectAll(".label")
      .style("font-size", "14px"); // change font sizes of selected lable

  function update_colors(dimension) { 
    // change the fonts to bold
   pc.svg.selectAll(".dimension")
      .style("font-weight", "normal")
      .filter(function(d) { return d == dimension; })
        .style("font-weight", "bold");

    // change color of lines
    // set domain of color scale
    var values = pc.data().map(function(d){return parseFloat(d[dimension])}); 
    color_set.domain([d3.min(values), d3.max(values)]);
    
    // change colors for each line
    pc.color(function(d){return color_set([d[dimension]])}).render();
  };    
});



//var dataArray = [20, 40, 50, 60];

//var width = 500;
//var height = 500;

//var widthScale = d3.scale.linear()
  //.domain([0, 60])
  //.range([0, width]);

//var color = d3.scale.linear()
  //.domain([0, 60])
  //.range(["red", "pink"]);

//var axis = d3.svg.axis()
  //.scale(widthScale);

//var canvas = d3.select("body")
  //.append("svg")
  //.attr("width", width)
  //.attr("height", height)
  //.append("g")
  //.attr("transform", "translate(20, 0)");

//var bars = canvas.selectAll("rect")
  //.data(dataArray)
  //.enter()
    //.append("rect")
    //.attr("width", function(d) {return widthScale(d);})
    //.attr("height", 50)
    //.attr("fill", function(d) {return color(d);})
    //.attr("y", function(d, i) {return i * 100;});

//canvas.append("g")
  //.attr("transform", "translate(0, 400)")
  //.call(axis);

