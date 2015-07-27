
var display = document.getElementById("data");


orbit.get("/data/results", function () {
  var data = JSON.parse(this.response);
  console.log(data);
  var output = "";
  for (var i = 0, l = data.length; i < l; i ++) {
    output += "<p>Chromosome (#" + data[i].counter + ") [" + data[i].population.code + "] fitness:" + data[i].population.fitness + "</p>"
  }

  display.innerHTML = output;



});
