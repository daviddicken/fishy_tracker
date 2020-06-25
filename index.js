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
  event.preventDefault();

  var theFormForN = parseFloat(event.target.nitrate.value);
  var theFormForA = parseFloat(event.target.alkalinity.value);
  var theFormForC = parseFloat(event.target.calcium.value);
  var theFormForM = parseFloat(event.target.magnesium.value);
  var theFormForS = parseFloat(event.target.salinity.value);
  var theFormForT = parseFloat(event.target.temperature.value);


  //var newDayData = new Parameters(theFormForN, theFormForA, theFormForC);
  var newDayData = new Parameters(theFormForN, theFormForA, theFormForC, theFormForM, theFormForS, theFormForT);
  console.log('input constr: ', newDayData);

  var stringyParamData = JSON.stringify(Parameters.collection);
  localStorage.setItem('params', stringyParamData);
  createGraph();
}

function createGraph() {

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
  var colorArr = ['blue', 'red', 'green', 'yellow', 'orange', 'violet'];
  var paramDataArr = [nitDataset, alkDataset, calDataset, magDataset, salDataset, tempDataset];

  //gradientStroke came from: blog.vanilla.io/chart-js-tutorial-how-to-make-gradient-line-chart-af145e5c92f9
  for (var j = 0; j < paramDataArr.length; j++) {
    var qtx = document.getElementById(chartArr[j]).getContext('2d');
    var gradientStroke = qtx.createLinearGradient(500,0,100,0);
    gradientStroke.addColorStop(0, 'blue');
    gradientStroke.addColorStop(0.2, 'red');
    gradientStroke.addColorStop(0.4, 'green');
    gradientStroke.addColorStop(0.6, 'yellow');
    gradientStroke.addColorStop(0.8, 'orange');
    gradientStroke.addColorStop(1, 'violet');

    var productChart = new Chart(qtx, {
      type: 'line',

      data: {
        labels: shortDateArr,
        datasets: [{
          label: parametersForTable[j],
          data: paramDataArr[j],
          backgroundColor: colorArr[j],
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
function shortDate(){
  for (var i = 0; i < Parameters.collection.length; i++){
    var shortDateHold = days[i].substring(0,4);
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
  console.log('today..',today);
  this.today = today;
  days.push(today);
  Parameters.collection.push(this);
  console.log ('today: ', today);
}

// var newDay = new Date();
// Parameters.prototype.date = newDay;


// var newParameter = new Parameters(20, 9, 400); //1300 mag, 1.025 sal, 78 temp
// var newParameter2 = new Parameters(12, 8, 380);
// var newParameter3 = new Parameters(11, 7, 350);
// var newParameter4 = new Parameters(14, 10, 375);

// days[0] = '06/20/2020';
// days[1] = '06/21/2020';
// days[2] = '06/22/2020';
// days[3] = '06/23/2020';

//createGraph();
