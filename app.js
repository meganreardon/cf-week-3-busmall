// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
// note: need to get the USB gif and sweep png back in there

// global variables
var theProducts = [];
var userClicksTotal = 0;
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
function callCreateTheProducts() {
  for (var i = 0; i < theImageNames.length; i++) {
    var newone = new BusMallDisplay(theImageNames[i]);
  }
};

// creating the objects
callCreateTheProducts();

var randomNumber = 0;

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
  // console.log(randomOne + ' : ' + randomTwo + ' : ' + randomThree);
  return randomOne;
  return randomTwo;
  return randomThree;
}

getThreeRandomNumbers();

function randomImages() {
  getThreeRandomNumbers();
  theContainer.innerHTML = '<img src=' + theProducts[randomOne].imgPath + ' /><img src=' + theProducts[randomTwo].imgPath + ' /><img src=' + theProducts[randomThree].imgPath + ' />';
};

// turned on for testing, otherwise will be inside the event handler function
// randomImages();

// event handler
theContainer.addEventListener('click', handleContainer);

var upToTwentyFive = false;

function handleContainer(event) {
  if (upToTwentyFive === false) {
    console.log(event.target.id); // this will return which one you clicked on
    // if click is on container total click cound i--
    if (userClicksTotal === 24) {
      console.log(userClicksTotal);
      // this console logs 24 twice, why?
      upToTwentyFive = true;
    } else if (event.target.id === 'thecontainer') {
      // alert('container!');
      userClicksTotal--;
      console.log(userClicksTotal);
    } else {
      userClicksTotal++;
      console.log(userClicksTotal);
    }
    randomImages();
  }
}

// write full event handler, call three new random images at bottom of it
