// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
// note: need to get the USB gif and sweep png back in there

// global variables
var theProducts = [];
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
function callCreateTheProducts() {
  for (var i = 0; i < theImageNames.length; i++) {
    var newone = new BusMallDisplay(theImageNames[i]);
  }
};

// creating the objects
callCreateTheProducts();

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
  theContainer.innerHTML = '<img src=' + theProducts[randomOne].imgPath + ' id= ' + randomOne + ' /><img src=' + theProducts[randomTwo].imgPath + ' id= ' + randomTwo + ' /><img src=' + theProducts[randomThree].imgPath + ' id= ' + randomThree + ' />';
  theProducts[randomOne].timesDisplayed ++;
  theProducts[randomTwo].timesDisplayed ++;
  theProducts[randomThree].timesDisplayed ++;
};

randomImages();

// event handler
theContainer.addEventListener('click', handleContainer);

function handleContainer(event) {
  if (upToTwentyFive === false) {
    // console.log(event);
    // console.log(event.target.id); // this will return which one you clicked on
    if (userClicksTotal === 24) {
      // this console logs the last click twice, which is why I've set it to 24
      // not to self: figure out why
      upToTwentyFive = true;
    } else if (event.target.id === 'thecontainer') {
      userClicksTotal--;
    } else {
      userClicksTotal++;
      console.log(event.target.id);
      var thisid = parseInt(event.target.id);
      theProducts[thisid].timesClicked ++;
    }
    randomImages();
  }
}
