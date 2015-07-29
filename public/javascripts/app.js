function Population (geneLength, size, array) {
  this.members = [];
  this.geneLength = geneLength;
  this.goal = 0;
  this.generationNumber = 0;
  if (array) {
    this.members = array;
  } else {
    while (size --) {
      var gene = new Gene();
      gene.random(this.geneLength);
      this.members.push(gene);
    }
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
  this.sort();
  var sumOfProbability = 0;
  var newPool = [];

  var sumFitness = this.members.reduce(function (all, item) {
    return all + item.fitness;
  }, 0);

  for (i = 0; i < this.members.length; i ++) {
    this.members[i].lowProb = sumOfProbability;
    var probability = sumOfProbability + (this.members[i].fitness/sumFitness);
    this.members[i].highProb = probability;
    sumOfProbability = probability;
  }

  for (i = 0; i < this.members.length/2; i ++) {
    var mates = [];
    var number =  Math.random().toFixed(3);
    for (var j = 0; j < this.members.length; j ++) {
      if (number > this.members[j].lowProb && number < this.members[j].highProb) {
        mates.push(j);
      }
    }
    number =  Math.random().toFixed(3);
    for (j = 0; j < this.members.length; j ++) {
      if (number > this.members[j].lowProb && number < this.members[j].highProb) {
        mates.push(j);
      }
    }
    var children = this.members[mates[0]].mate(this.members[mates[1]]);
    for (j = 0; j < children.length; j ++) {
      children[j].mutate(0.1);
      newPool.push(children[j]);
    }
  }

  var newPopulation = new Population(11, 10, newPool);
  return newPopulation;

};

function Gene (code, fitness) {
  //think this if is if code is given through birth or randomly generated
  if (code) this.code = code;
  else this.code = [];
  if (fitness) this.fitness = fitness;
  else this.fitness = 0;
}


Gene.prototype.random = function (length) {
  while (length --) {
    this.code.push(Math.random().toFixed(3));
  }
};

Gene.prototype.mutate = function (chance) {
  if (Math.random() > chance) return;
  var index = Math.floor(Math.random() * this.code.length);
  // upOrDown moves the mutate character up or down 1
  // can use to mutate up or down by a certain stepsize
  var newMutate = Math.random().toFixed(3);
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

var specimen;
var startTime = Date.now();
var clickA = 0;
var clicking = 0;
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
};

var srcEleMain = ["/images/yosemite.jpg", "/images/cats.jpg", "/images/beers.jpg", "/images/hiking.jpg"];
var srcEleSec = ["/images/tree.jpg", "/images/smallcat.jpg", "/images/calmbeer.jpg", "/images/bwhiking.jpg"];


  var header = document.getElementById("header"),
  footer = document.getElementById("footer"),
  article = document.getElementsByTagName("article"),
  h1 = document.getElementsByTagName("h1"),
  main = document.getElementById("main"),
  nav = document.getElementById("nav"),
  mainpic = document.getElementById("mainpic"),
  treepic = document.getElementsByClassName("treepic"),
  titleMain = document.getElementById("title-main"),
  other = document.getElementsByClassName("other"),
  action = document.getElementById("action"),
  home = document.getElementById("home"),
  cats = document.getElementById("cats"),
  beer = document.getElementById("beer"),
  hiking = document.getElementById("hiking"),
  clickMe = document.getElementById("click-me");


home.addEventListener("click", function (e) {
  mainpic.setAttribute("src", "/images/yosemite.jpg");
  for (var i = 0, l = treepic.length; i < l; i ++) {
    treepic[i].setAttribute("src", "/images/tree.jpg");
  }
  titleMain.innerHTML = "Yosemite National Park.";
});

cats.addEventListener("click", function (e) {
  mainpic.setAttribute("src", "/images/cats.jpg");
  for (var i = 0, l = treepic.length; i < l; i ++) {
    treepic[i].setAttribute("src", "/images/smallcat.jpg");
  }
  titleMain.innerHTML = "Cats Are Fuzzy";
});

beer.addEventListener("click", function (e) {
  mainpic.setAttribute("src", "/images/beers.jpg");
  for (var i = 0, l = treepic.length; i < l; i ++) {
    treepic[i].setAttribute("src", "/images/calmbeer.jpg");
  }
  titleMain.innerHTML = "Taste The Golden Liquid";
});

hiking.addEventListener("click", function (e) {
  mainpic.setAttribute("src", "/images/hiking.jpg");
  for (var i = 0, l = treepic.length; i < l; i ++) {
    treepic[i].setAttribute("src", "/images/bwhiking.jpg");
  }
  titleMain.innerHTML = "Why Are We Hiking?";
});

clickMe.addEventListener("click", function (e) {
  var srcIndex = Math.floor(Math.random() * 4);
  mainpic.setAttribute("src", srcEleMain[srcIndex]);
  for (var i = 0, l = treepic.length; i < l; i ++) {
    treepic[i].setAttribute("src", srcEleSec[srcIndex]);
  }
  titleMain.innerHTML = "Random Fun!";
});

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
  header.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  footer.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  article[0].style.backgroundColor = "rgb(" + (r + 100) + "," + (g + 50) + "," + (b + 100) + ")";
  main.style.fontSize = fontSize + "px";
  main.style.fontFamily = fontFamily;
  nav.style.display = navDisplay;
  nav.style.float = navFloat;
  mainpic.style.float = mainPicture;
  other[0].style.display = otherDisplay1;
  other[1].style.display = otherDisplay2;
  other[2].style.display = otherDisplay3;
  main.style.visibility = "visible";
}

orbit.get("/data/population.json", function () {
  specimen = JSON.parse(this.response);
  if (specimen === false) {
    var population = new Population(11, 10);
    orbit.post("/data/newpopulation", population, function () {
      window.location = "/home";
    });
  } else if (specimen === true) {
// want to generate new population from existing population
    orbit.get("/data/getpopulation", function () {
      var data = JSON.parse(this.response);
      var array = [];
      for (var i = 0; i < data.length; i ++) {
        var gene = new Gene(data[i].population.code, data[i].population.fitness);
        array.push(gene);
      }
      var population = new Population(11, 10, array);
      var newPopulation = population.generation();
      orbit.post("/data/newpopulation", newPopulation, function () {
        window.location = "/home";

      });
    });

  } else {
    advertBox(specimen.population);
    orbit.post("/data/nextone", specimen, function () {
    });
  }
});

document.body.addEventListener('click', function (e) {
  if (e.target.tagName === "A") {
    clickA += 10;
  } else {
    clicking += 2;
  }
});

window.onbeforeunload = closingCode;

function closingCode(){
    var time = ((Date.now() - startTime)/1000);
    if (time > 300) {
      time = 300;
    }
    time += clickA + clicking;
    specimen.population.fitness = time;
    orbit.post("/data/updatefitness", specimen, function () {
    });
   return null;
}
