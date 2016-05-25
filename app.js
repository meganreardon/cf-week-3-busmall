// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'tentacle', 'unicorn', 'water-can', 'wine-glass'];

// global variables
var theProducts = [];
var eachProductClicks = [];
var userClicksTotal = 0;
var upToTwentyFive = false;
var randomNumber = 0;
var theContainer = document.getElementById('thecontainer');
var theResults = document.getElementById('theresults'); // prob don't need this

// constructor
function BusMallDisplay(imgName) {
  this.imgName = imgName;
  // nadia points out that this string below might now work, might need to split string above instead
  this.imgPath = 'images/' + imgName + '.jpg';
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  theProducts.push(this);
};

// creating the objects
function createTheProducts() {
  for (var i = 0; i < theImageNames.length; i++) {
    var newone = new BusMallDisplay(theImageNames[i]);
  }
}

createTheProducts();

// random number makeMyRandomNumber
function makeMyRandomNumber() {
  var min = 0;
  var max = theProducts.length - 1;
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

// get three random numbers
function getThreeRandomNumbers () {
  randomOne = makeMyRandomNumber();
  randomTwo = makeMyRandomNumber();
  while (randomTwo === randomOne) {
    randomTwo = makeMyRandomNumber();
  };
  randomThree = makeMyRandomNumber();
  while ((randomThree === randomOne) || (randomThree === randomTwo)) {
    randomThree = makeMyRandomNumber();
  }
}

// render three images and add to times displayed
function randomImages() {
  getThreeRandomNumbers();
  theContainer.innerHTML = '<img src=' + theProducts[randomOne].imgPath + ' id=' + randomOne + ' /><img src=' + theProducts[randomTwo].imgPath + ' id=' + randomTwo + ' /><img src=' + theProducts[randomThree].imgPath + ' id=' + randomThree + ' />';
  theProducts[randomOne].timesDisplayed ++;
  theProducts[randomTwo].timesDisplayed ++;
  theProducts[randomThree].timesDisplayed ++;
};

randomImages();

// event handler
theContainer.addEventListener('click', handleContainer);

function handleContainer(event) {
  if (upToTwentyFive === false) {
    if (userClicksTotal === 24) {
    // if (userClicksTotal === 24) {
      // set to 24 because it enters the loop one last time
      // note to self: fix this later
      upToTwentyFive = true;
      // here we show the chart
      fillEachProductClicks();
      drawChart();
    } else if (event.target.id === 'thecontainer') {
      userClicksTotal--;
    } else {
      userClicksTotal++;
      var thisid = parseInt(event.target.id);
      theProducts[thisid].timesClicked ++;
    }
    // TODO when I get to this point change if logic - if <= 25 then don't call to re-render images
    // step one: collapse images div
    // step two: render table - hopefully where images div has just diappeared
    randomImages();
  }
}

// pulled this from class notes
// data.datasets[0].data

// this pushes the clicks per product into an array for the chart
function fillEachProductClicks () {
  for (var i = 0; i < theImageNames.length; i++) {
    eachProductClicks.push(theProducts[i].timesClicked);
  }
}

// fillEachProductClicks();

var data = {
  labels: theImageNames,
  datasets: [
    {
      label: 'Times each product was clicked.',
      // label: null,
      backgroundColor: '#999999',
      hoverBackgroundColor: '#ff6600',
      data: eachProductClicks,
    }
  ]
};

function drawChart() {
  var forMarketing = document.getElementById('theresults').getContext('2d');
  clicksResultsChart = new Chart(forMarketing,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
}
