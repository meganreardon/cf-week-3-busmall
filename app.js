
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'tentacle', 'unicorn', 'water-can', 'wine-glass'];

var theProducts = [];
var eachProductClicks = [];
var eachProductDisplays = [];
var productPopularity = [];
var userClicksTotal = 0;
var upToTwentyFive = false;
var randomNumber = 0;
var theContainer = document.getElementById('thecontainer');

function BusMallDisplay(imgName) {
  this.imgName = imgName;
  this.imgPath = 'images/' + imgName + '.jpg';
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  theProducts.push(this);
}

function createTheProducts() {
  for (var i = 0; i < theImageNames.length; i++) {
    var newone = new BusMallDisplay(theImageNames[i]);
  }
}

createTheProducts();

// fills the timesDislayed properties from local storage when page loads
var refillEachProductDisplays = (function() {
  if (localStorage) {
    retrievedTimesDisplayed = JSON.parse(localStorage.getItem('stringifiedDisplays'));
    if (retrievedTimesDisplayed !== null) {
      for (var i = 0; i < theImageNames.length; i++) {
        theProducts[i].timesDisplayed = retrievedTimesDisplayed[i];
      }
    }
  }
  // eachProductClicks = []; // empties out array to get ready to use
}());

function makeMyRandomNumber() {
  var min = 0;
  var max = theProducts.length - 1;
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

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
  eachProductDisplays = []; // empty out before filling again
  getThreeRandomNumbers();
  theContainer.innerHTML = '<img src=' + theProducts[randomOne].imgPath + ' id=' + randomOne + ' /><img src=' + theProducts[randomTwo].imgPath + ' id=' + randomTwo + ' /><img src=' + theProducts[randomThree].imgPath + ' id=' + randomThree + ' />';
  theProducts[randomOne].timesDisplayed ++;
  theProducts[randomTwo].timesDisplayed ++;
  theProducts[randomThree].timesDisplayed ++;
  fillEachProductDisplays();
  timesDisplayedToLS(); // moves times displayed into local storage
}

randomImages();

// event handler
theContainer.addEventListener('click', handleContainer);

function handleContainer(event) {
  if (userClicksTotal >= 24) {
  // if (userClicksTotal === 24) {
    theContainer.removeEventListener('click', handleContainer);
    console.log('about to draw chart, eachProductClicks is at: ' + eachProductClicks);
    drawChart();
    console.log('after drawing chart, eachProductClicks is at: ' + eachProductClicks);

  } else if (event.target.id === 'thecontainer') {
  } else {
    userClicksTotal++;
    var thisid = parseInt(event.target.id);
    eachProductClicks = []; // empties out array after I've filled what needs to be filled
    theProducts[thisid].timesClicked ++;
    fillEachProductClicks(); // fills the timesClicked array used for the chart
    timesClickedToLS(); // moves the timesClicked array into local storage
    randomImages();
  }
}

// pushes the clicks/displays per product into array for the chart/local storage
function fillEachProductClicks () {
  for (var i = 0; i < theImageNames.length; i++) {
    eachProductClicks.push(theProducts[i].timesClicked);
  }
}

function fillEachProductDisplays () {
  for (var i = 0; i < theImageNames.length; i++) {
    eachProductDisplays.push(theProducts[i].timesDisplayed);
  }
}

// puts times clicked/displayed into local storage
function timesClickedToLS() {
  localStorage.setItem('stringifiedClicks', JSON.stringify(eachProductClicks));
}

function timesDisplayedToLS () {
  localStorage.setItem('stringifiedDisplays', JSON.stringify(eachProductDisplays));
}

// refills timesClicked properties from local storage
function refillEachProductClicks() {
  if (localStorage) {
    retrievedTimesClicked = JSON.parse(localStorage.getItem('stringifiedClicks'));
    if (retrievedTimesClicked !== null) {
      for (var i = 0; i < theImageNames.length; i++) {
        theProducts[i].timesClicked = retrievedTimesClicked[i];
      }
    }
  }
}

refillEachProductClicks();

// function to calculate times clicked divided by times displayed
// note: not used on page but was part of the assignment
function calcProductPopulaity() {
  for (var i = 0; i < theImageNames.length; i++) {
    var popularity = Math.round((theProducts[i].timesClicked / theProducts[i].timesDisplayed) * 10 ) / 10;
    productPopularity.push(popularity);
  }
}

calcProductPopulaity();

// chart rendering below
var data = {
  labels: theImageNames,
  datasets: [
    {
      // data: eachProductClicks,
      label: 'Times each product was clicked.',
      backgroundColor: '#999999',
      hoverBackgroundColor: '#ff6600', // this was orig
      data: eachProductClicks, // this was orig w/ comma
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
