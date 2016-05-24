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

// put an image inside of the container

// TURN ME BACK ON IF NEEDED
// theContainer.innerHTML = '<img src=' + theProducts[2].imgPath + ' />' + '<img src=' + theProducts[3].imgPath + ' />';

// create a random number

// create min and max vaules and random number
// var minNumber = 0;
// var maxNumber = theProducts.length - 1; // fix this with thing mentioned in class

var randomNumber = 0;

function makeMyRandomNumber() {
  var min = 0;
  var max = theProducts.length - 1;
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
  // console.log(randomNumber);
}

// get three different random numbers

// function threeRandomNumbers () {
//   // for loop to get three random numbers
//   // check to see if new random number is the same as any current random numbers
//   // these three numbers will make the three images
// };
//
// threeRandomNumbers();

function randomImages() {
  makeMyRandomNumber();
  // console.log(randomNumber);
  // render a random image on the page
  theContainer.innerHTML = '<img src=' + theProducts[randomNumber].imgPath + ' />';
};

// loop
function getThreeRandomNumbers () {
  var randomOne = makeMyRandomNumber();
  var randomTwo = makeMyRandomNumber();
  while (randomTwo === randomOne) {
    randomTwo = makeMyRandomNumber();
  };
  var randomThree = makeMyRandomNumber();
  while ((randomThree === randomOne) || (randomThree === randomTwo)) {
    randomThree = makeMyRandomNumber();
  }
  console.log(randomOne + ' : ' + randomTwo + ' : ' + randomThree);
}

getThreeRandomNumbers();

  // make number
  // if - first number then go against
  // if - second number then check against fist number and go again -- if is same i--
  // if - third number check against first and second, if is same i-- and go again
  // check to see if number is equal

// TURN ME BACK ON
// randomImages();

// var thElement = document.createElement('th');
// thElement.textContent = Math.ceil(perDayTotal);
// trElement.appendChild(thElement);

// put a random image up on the page inside of theContainer

// event handler
theContainer.addEventListener('click', handleContainer);

function handleContainer(event) {
  console.log(event.target.id); // this will return which one you clicked on
}

// write full event handler, call three new random images at bottom of it
