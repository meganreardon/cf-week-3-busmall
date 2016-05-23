// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

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

theContainer.innerHTML = '<img src=' + theProducts[2].imgPath + ' />' + '<img src=' + theProducts[3].imgPath + ' />';

// create a random number

// create min and max vaules and random number
// var minNumber = 0;
// var maxNumber = theProducts.length - 1; // fix this with thing mentioned in class

function makeMyRandomNumber() {
  var min = 0;
  var max = theProducts.length - 1;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
  // console.log(randomNumber);
}

function randomImages() {
  var gimmeRandomNumber = makeMyRandomNumber();
  console.log(gimmeRandomNumber);
  // render a random image on the page
  theContainer.innerHTML = '<img src=' + theProducts[gimmeRandomNumber].imgPath + ' />';
};

randomImages();

// var thElement = document.createElement('th');
// thElement.textContent = Math.ceil(perDayTotal);
// trElement.appendChild(thElement);

// put a random image up on the page inside of theContainer
