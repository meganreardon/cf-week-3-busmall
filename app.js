// what we have to start with
var theImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// global variables
var theProducts = [];
var userClicksTotal = 0;
var theContainer = document.getElementById('the-container');

function BusMallDisplay(imgName) {
  this.imgName = imgName;
  // nadia points out that this string below might now work, might need to split string above instead
  this.imgPath = 'images/' + imgName + '.jpg';
  // this.imgPath = this.imgName + '.jpg';
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  theProducts.push(this);
};
//
// // this method pushes things to the global array theProducts[]
// BusMallDisplay.prototype.createTheProducts = function() {
//   // var addTheProducts = []
//   for (var i = 0; i < theImageNames.length; i++) {
//     var adder = [];
//     adder.push(this.imgName);
//     this.imgPath = this.imgName + '.jpg';
//     this.imgPath.push(adder);
//     this.timesDisplayed.push(adder);
//     this.timesClicked.push(adder);
//     console.log(adder);
//     adder.push(theProducts);
//   }
//   // addTheProducts.push(theProducts);
// };

// I NEED TO CREATE THE objects

// I NEED TO CALL THE METHOD createTheProducts

// create the objects

// function makeTheObjects() {
//   for (i = 0; i < theImageNames.length; i++) {
//     var theImageNames[i] = new BusMallDisplay(theImageNames[i]);
//   }
// }

// call the methosds

// var pikePlace = new CoffeeCarts('Pike Place Market', 14, 35, 1.2, 0.34);

function callCreateTheProducts() {
  for (var i = 0; i < theImageNames.length; i++) {
    // console.log('inside and i is: ' + i);
    // console.log(theImageNames[i]);
    var newone = new BusMallDisplay(theImageNames[i]);
  }
};

callCreateTheProducts();

// BusMallDisplay.prototype.createTheProducts = function() {
//   for (var i = 0; i < theImages.length; i++) {
//     this.imgName.push()
//   }
// };

// CoffeeCarts.prototype.calcBeansPerHour = function() {
//   var addAllBeansPerHour = [];
//   for (var i = 0; i < hours.length; i++) {
//     var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
//     pounds = Math.round( pounds * 10 ) / 10;
//     this.beansPerHour.push(pounds);
//     addAllBeansPerHour.push(pounds);
//   }
//   allBeansPerHour.push(addAllBeansPerHour);
// };
