'use strict';
Parameters.collection = [];
var days = [];
var shortDateArr = [];
var parametersForTable = ['Nitrates:', 'Alkalinity:', 'Calcium:', 'Magnesium:', 'Salinity:', 'Temperature:'];
var nitDataset = [];
var alkDataset = [];
var calDataset = [];
var magDataset = [];
var salDataset = [];
var tempDataset = [];

var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);

if (parameters) {
  Parameters.collection = parameters;
  createGraph();
} else {
  var x = document.getElementById('charts');
  x.style.display = 'none';
}

var formSection = document.getElementById('dataform');
formSection.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  // event.preventDefault();

  var theFormForN = parseFloat(event.target.nitrate.value);
  var theFormForA = parseFloat(event.target.alkalinity.value);
  var theFormForC = parseFloat(event.target.calcium.value);
  var theFormForM = parseFloat(event.target.magnesium.value);
  var theFormForS = parseFloat(event.target.salinity.value);
  var theFormForT = parseFloat(event.target.temperature.value);

  if (isNaN(theFormForN) || isNaN(theFormForA) || isNaN(theFormForC) || isNaN(theFormForM) || isNaN(theFormForS) || isNaN(theFormForT)){
    event.preventDefault();
    alert('Please enter a valid number.');
  }
  else{
    var newDayData = new Parameters(theFormForN, theFormForA, theFormForC, theFormForM, theFormForS, theFormForT);
    console.log('input constr: ', newDayData);

    var stringyParamData = JSON.stringify(Parameters.collection);
    localStorage.setItem('params', stringyParamData);
    createGraph();
  }
}

function createGraph() {
  var rgbArr = ['rgb(0,0,255)', 'rgb(255,0,0)', 'rgb(0,128,0)', 'rgb(255,255,0)', 'rgb(255,165,0)', 'rgb(238,130,238)'];
  var opacityArr = [', 0.7)', ', 0.4)', ', 0)'];
  var posLine = ['0', '0.5', '1'];

  for (var i = 0; i < Parameters.collection.length; i++) {
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
    magDataset.push(Parameters.collection[i].magnesium);
    salDataset.push(Parameters.collection[i].salinity);
    tempDataset.push(Parameters.collection[i].temp);

    days.push(Parameters.collection[i].today);
  }
  console.log('Parameter arr: ', Parameters.collection);
  shortDate();

  var chartArr = ['myChart', 'myChart2', 'myChart3', 'myChart4', 'myChart5', 'myChart6'];
  var paramDataArr = [nitDataset, alkDataset, calDataset, magDataset, salDataset, tempDataset];

  //gradientStroke came from: blog.vanilla.io/chart-js-tutorial-how-to-make-gradient-line-chart-af145e5c92f9
  for (var j = 0; j < paramDataArr.length; j++) {
    var qtx = document.getElementById(chartArr[j]).getContext('2d');
    var gradientStroke = qtx.createLinearGradient(500, 0, 100, 0);
    var gradientBackground = qtx.createLinearGradient(0, 0, 0, 450);

    gradientStroke.addColorStop(0, 'blue');
    gradientStroke.addColorStop(0.2, 'red');
    gradientStroke.addColorStop(0.4, 'green');
    gradientStroke.addColorStop(0.6, 'yellow');
    gradientStroke.addColorStop(0.8, 'orange');
    gradientStroke.addColorStop(1, 'violet');

    var currentArr = rgbArr[j];
    var firstStr = currentArr.slice(0, (rgbArr[j].length - 1));
    for (var k = 0; k < opacityArr.length; k++) {
      var secondStr = opacityArr[k];
      var newStr = firstStr + secondStr;
      gradientBackground.addColorStop(JSON.parse(posLine[k]), newStr);
    }


    var productChart = new Chart(qtx, {
      type: 'line',

      data: {
        labels: shortDateArr,
        datasets: [{
          label: parametersForTable[j],
          data: paramDataArr[j],
          // backgroundColor: colorArr[j],
          backgroundColor: gradientBackground,
          borderColor: gradientStroke
          // borderColor: colorArr[j],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

// shortDate function idea in part by w3 schools
function shortDate() {
  for (var i = 0; i < Parameters.collection.length; i++) {
    var shortDateHold = days[i].substring(0, 4);
    shortDateArr.push(shortDateHold);
  }
  console.log('date arr: ', shortDateArr);
}

function Parameters(nitrate, alkalinity, calcium, magnesium, salinity, temp) {
  this.nitrate = nitrate;
  this.alkalinity = alkalinity;
  this.calcium = calcium;
  //Stretch Goal
  this.magnesium = magnesium;
  this.salinity = salinity;
  this.temp = temp;

  let today = new Date().toLocaleDateString();
  console.log('today..', today);
  this.today = today;
  days.push(today);
  Parameters.collection.push(this);
  console.log('today: ', today);
}
