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
  if (userClicksTotal === 24) {
    theContainer.removeEventListener('click', handleContainer);
    fillEachProductClicks();
    drawChart();
  } else if (event.target.id === 'thecontainer') {
    // console.log('not an image');
  } else {
    userClicksTotal++;
    var thisid = parseInt(event.target.id);
    theProducts[thisid].timesClicked ++;
    // console.log(userClicksTotal);
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

// test to a little local storage experiment

var testArrayOfNumbers = [1, 2, 3, 42, 15, 16, 88, 55];
localStorage.setItem('stringifiedTestArray', JSON.stringify(testArrayOfNumbers));
var retrievedTestArray = JSON.parse(localStorage.getItem(testArrayOfNumbers));
console.log('test array is: ' + testArrayOfNumbers);

// set up local storage clear button

// localStorage.clear;

// if (localStorage.testArrayOfNumbers) { alert('its a match'); };
//
// if (!localStorage.testArrayOfNumbers) { alert('nada null nothing dust'); }
//
// if (localStorage(testArrayOfNumbers)) { alert('testing the test'); }

// if (localStorage.getItem(testArrayOfNumbers) == true) {alert('there');}
// if (localStorage.getItem(testArrayOfNumbers) == false) {alert('not there');}

// someVariable = (localStorage['testArrayOfNumbers'] == 'true');
//
// if (!someVariable) {
//   // return false;
//   alert('false');
// } else {
//   // return true;
//   alert('true');
// };

// localStorage.clear();
//
// if (!'stringifiedTestArray') {
//   console.log('it is not there');
// } else {
//   console.log('it is there');
// }

// function canUCMe () {
//   someVariable = (localStorage['stringifiedTestArray'] == 'true');
//   if (!someVariable) {
//     alert('NADA');
//   } else {
//     alert('i see seomthing');
//   }
// }
//
// canUCMe();
//
// function resumeGame() {
//   if (!supportsLocalStorage()) { return false; }
//   gGameInProgress = (localStorage['halma.game.in.progress'] == 'true');
//   if (!gGameInProgress) { return false; }
//   gPieces = new Array(kNumPieces);
//   for (var i = 0; i < kNumPieces; i++) {
//     var row = parseInt(localStorage['halma.piece.' + i + '.row']);
//     var column = parseInt(localStorage['halma.piece.' + i + '.column']);
//     gPieces[i] = new Cell(row, column);
//   }
//   gNumPieces = kNumPieces;
//   gSelectedPieceIndex = parseInt(localStorage['halma.selectedpiece']);
//   gSelectedPieceHasMoved = localStorage['halma.selectedpiecehasmoved'] == 'true';
//   gMoveCount = parseInt(localStorage['halma.movecount']);
//   drawBoard();
//   return true;
// }
