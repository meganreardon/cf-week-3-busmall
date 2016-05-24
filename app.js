// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'tentacle', 'unicorn', 'water-can', 'wine-glass'];
// note: need to get the USB gif and sweep png back in there

// global variables
var theProducts = [];
var eachProductClicks = []; // this is a test array
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
// TODO rename this function, don't need call, can run right away
function callCreateTheProducts() {
  for (var i = 0; i < theImageNames.length; i++) {
    var newone = new BusMallDisplay(theImageNames[i]);
  }
};

// creating the objects
callCreateTheProducts();

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
    if (userClicksTotal === 4) {
    // if (userClicksTotal === 24) {
      // set to 24 because it enters the loop one last time
      // note to self: fix this later
      upToTwentyFive = true;
      // here we show the chart
      fillEachProductClicks(); // this is here for testing for the moment
      drawChart();
    } else if (event.target.id === 'thecontainer') {
      userClicksTotal--;
    } else {
      userClicksTotal++;
      // console.log(userClicksTotal);
      // console.log(event.target.id);
      var thisid = parseInt(event.target.id);
      theProducts[thisid].timesClicked ++;
    }
    // TODO when I get to this point change if logic - if <= 25 then don't call to re-render images
    randomImages();
  }
}

// pulled this from class notes, need to use somewhere
// data.datasets[0].data

// make array of times clicked just for the chart
// var eachProductClicks = [];
//
function fillEachProductClicks () {
  for (var i = 0; i < theImageNames.length; i++) {
    console.log(i + 'can u c me?');
    // var filler = 0;
    // filler = theProducts[i].timesClicked;
    // console.log('var filler is currently: ' + filler);
    // console.log(theProducts[i].timesClicked);
    // eachProductClicks.push(filler);
    eachProductClicks.push(theProducts[i].timesClicked)
  }
}

// fillEachProductClicks();

// all below here for chartjs part of this project
var data = {
  labels: theImageNames,
  datasets: [
    {
      data: 1, // NEED TO PUT PUT ALL THE CLICKS HERE
      backgroundColor: [
        '#999999'
      ],
      hoverBackgroundColor: [
        'red'
      ]
    }]
};

function drawChart() {
  var ctx = document.getElementById('theresults').getContext('2d');
  songChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
}
