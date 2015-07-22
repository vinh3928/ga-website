function Population (geneLength, fitness, size) {
  this.members = [];
  this.geneLength = geneLength;
  this.fitness = fitness;
  this.generationNumber = 0;
  while (size --) {
    var gene = new Gene();
    gene.random(this.geneLength);
    this.members.push(gene);
  }
}

Population.prototype.display = function () {
  var data = document.getElementById("data");
  data.innerHTML = "";
  data.innerHTML += ("<h2>Generation: " + this.generationNumber + "</h2>");
  data.innerHTML += ("<ul>");
  for (var i = 0; i < this.members.length; i ++) {
    data.innerHTML += ("<li>" + this.members[i].code + " (" + this.members[i].fitness + ")");
  }
  data.innerHTML += ("</ul>");
};

Population.prototype.sort = function () {
  this.members.sort(function (a, b) {
    return b.fitness - a.fitness;
  });
};

Population.prototype.generation = function () {
  for (var i = 0; i < this.members.length; i ++) {
    this.members[i].calcFitness(this.fitness);
  }
  this.sort();
  this.display();
  var children = this.members[0].mate(this.members[1]);
  children[0].mutate(0.1);
  children[1].mutate(0.1);
  this.members.splice(this.members.length - 2, 2, children[0], children[1]);
  for (i = 0; i < this.members.length; i ++) {
    if (this.members[i].code == this.fitness) {
      this.sort();
      this.display();
      return true;
    }
  }
  this.generationNumber ++;
};

function Gene (code) {
  //think this if is if code is given through birth or randomly generated
  if (code) this.code = code;
  else this.code = [];
  this.fitness = 0;
}


Gene.prototype.random = function (length) {
  while (length --) {
    this.code.push(Math.random().toFixed(3));
  }
};

Gene.prototype.mutate = function (chance) {
  if (Math.random() > chance) return;
  
  var upOrDown = Math.random() <= 0.5 ? -1 : 1;
  var index = Math.floor(Math.random() * this.code.length);
  // upOrDown moves the mutate character up or down 1
  // can use to mutate up or down by a certain stepsize
  var newMutate = (parseFloat(this.code[index]) + parseFloat(upOrDown*0.01)).toFixed(3);
  if (newMutate >= 1) {
    newMutate = 1;
  } else if (newMutate <= 0) {
    newMutate = 0;
  }
  var newGene = [];
  for (i = 0; i < this.code.length; i ++) {
    if (i === index) newGene.push(newMutate);
    else newGene.push(this.code[i]);
  }
  this.code = newGene;
};

Gene.prototype.mate = function(gene) {
  var pivot = Math.floor(this.code.length * Math.random());
  var child1 = this.code.slice(0, pivot).concat(gene.code.slice(pivot));
  var child2 = gene.code.slice(0, pivot).concat(this.code.slice(pivot));
  
  return [new Gene(child1), new Gene(child2)];
};

Gene.prototype.calcFitness = function(compareTo) {
  var score = prompt("rate this gene");
  this.fitness = score;
};

var counter = 0;
var fonts = {
  0: "Poiret One",
  1: "Lobster",
  2: "Shadows Into Light",
  3: "Open Sans",
  4: "Vollkorn",
  5: "Pacifico",
  6: "Orbitron",
  7: "Dancing Script",
  8: "Abril Fatface",
  9: "Bangers"
};
var display = {
  0: "inline",
  1: "inline-block",
  2: "block"
};
var floats = {
  0: "left",
  1: "right",
  2: "none"
}
var advert = document.getElementById("box"),
  header = document.getElementById("header"),
  footer = document.getElementById("footer"),
  article = document.getElementsByTagName("article"),
  h1 = document.getElementsByTagName("h1"),
  main = document.getElementById("main"),
  nav = document.getElementById("nav"),
  mainpic = document.getElementById("mainpic"),
  other = document.getElementsByClassName("other"),
  action = document.getElementById("action");

function advertBox (population) {
  var r = Math.floor(population.code[0] * 255);
  var g = Math.floor(population.code[1] * 255);
  var b = Math.floor(population.code[2] * 255);
  var fontSize = Math.floor(population.code[3] * 50);
  var fontFamily = fonts[Math.floor(population.code[4]*10)];
  var navDisplay = display[Math.floor(population.code[5]*3)];
  var navFloat = floats[Math.floor(population.code[6]*3)];
  var mainPicture = floats[Math.floor(population.code[7]*3)];
  var otherDisplay1 = display[Math.floor(population.code[8]*3)];
  var otherDisplay2 = display[Math.floor(population.code[9]*3)];
  var otherDisplay3 = display[Math.floor(population.code[10]*3)];
  advert.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  header.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  footer.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  article[0].style.backgroundColor = "rgb(" + (r + 100) + "," + (g + 50) + "," + (b + 100) + ")";
  main.style.fontSize = fontSize + "px";
  advert.style.fontSize = fontSize + "px";
  main.style.fontFamily = fontFamily;
  nav.style.display = navDisplay;
  nav.style.float = navFloat;
  mainpic.style.float = mainPicture;
  other[0].style.display = otherDisplay1;
  other[1].style.display = otherDisplay2;
  other[2].style.display = otherDisplay3;
}

orbit.get("/data/population.json", function () {
  var specimen = this.response
  if (specimen === "true") {
    var population = new Population(20, 100, 8);
    orbit.post("/data/population.json", population, function () {
    });
  } else {
    console.log(specimen)
    advertBox(specimen);
  }
});

advert.addEventListener("click", function (e) {
  advertBox();
});

