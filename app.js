// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'tentacle', 'unicorn', 'water-can', 'wine-glass'];

// global variables
var theProducts = [];
var eachProductClicks = [];
var eachProductDisplays = [];
var userClicksTotal = 0;
var upToTwentyFive = false;
var randomNumber = 0;
var theContainer = document.getElementById('thecontainer');

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
  // empty out array before filling it again
  eachProductDisplays = [];
  fillEachProductDisplays();
};

randomImages();

// event handler
theContainer.addEventListener('click', handleContainer);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function handleContainer(event) {
  if (userClicksTotal === 2) {
    theContainer.removeEventListener('click', handleContainer);
    // fillEachProductClicks(); // this fills the timesClicked array used for the chart
    // timesClickedToLS(); // this moves the timesClicked array into local storage
    // console.log(eachProductClicks);
    drawChart();
  } else if (event.target.id === 'thecontainer') {
    // console.log('not an image');
  } else {
    userClicksTotal++;
    var thisid = parseInt(event.target.id);
    theProducts[thisid].timesClicked ++;
    fillEachProductClicks(); // this fills the timesClicked array used for the chart
    timesClickedToLS(); // this moves the timesClicked array into local storage
    eachProductClicks = []; // empties out array after I've filled what needs to be filled
    randomImages();
  }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// pulled this from class notes
// data.datasets[0].data
// also: Sam suggested IFFE instead of any window events

// this pushes the clicks per product into an array for the chart
function fillEachProductClicks () {
  // empty out array works here too
  for (var i = 0; i < theImageNames.length; i++) {
    eachProductClicks.push(theProducts[i].timesClicked);
    // the below writes to local storage each time user clicks
    // localStorage.setItem('stringifiedClicks', JSON.stringify(eachProductClicks));
  }
}

// turn this back on
function fillEachProductDisplays () {
  // console.log('reach fill displays function');
  for (var i = 0; i < theImageNames.length; i++) {
    // console.log('i is ' + i);
    // console.log('times displayed i is ' + theProducts[i].timesDisplayed);
    eachProductDisplays.push(theProducts[i].timesDisplayed);
  }
}

// function here to put the timesClicked[] into LS
function timesClickedToLS() {
  localStorage.setItem('stringifiedClicks', JSON.stringify(eachProductClicks));
}

// function here to put the timesDisplayed[] into LS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// MAKE ME WORK DARNIT
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function timesDisplayedToLS () {
  localStorage.setItem('stringifiedDisplays', JSON.stringify(eachProductDisplays));
}

// function to put stringifiedClicks[] into the objects
// this will be our IFFE
function refillEachProductClicks() {
  if (localStorage) {
    retrievedTimesClicked = JSON.parse(localStorage.getItem('stringifiedClicks'));
    // console.log(retrievedTimesClicked);
    if (retrievedTimesClicked !== null) {
      // do
      for (var i = 0; i < theImageNames.length; i++) {
        theProducts[i].timesClicked = retrievedTimesClicked[i];
        // console.log(theProducts[i].timesClicked);
      }
    }
  }
}

// FIX ME
// function refillEachProductDisplays() {
//   if (localStorage) {
//     retrievedTimesDisplayed = JSON.parse(localStorage.getItem('stringifiedDisplays'));
//     console.log(retrievedTimesDisplayed);
//     for (var i = 0; i < theImageNames.length; i++) {
//       theProducts[i].timesDisplayed = retrievedTimesDisplayed[i];
//       console.log(theProducts[i].timesDisplayed);
//     }
//   }
// }

// TODO turn me back on and turn me into an IFFE
refillEachProductClicks();
// refillEachProductDisplays();

var data = {
  labels: theImageNames,
  datasets: [
    {
      label: 'Times each product was clicked.',
      backgroundColor: '#999999',
      hoverBackgroundColor: '#ff6600',
      data: eachProductClicks, // can I put a function call here?
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
