'use strict';
Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:', 'Alkalinity:', 'Calcium:', 'Magnesium:','Salinity:','Tempurature:'];

var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);

if (parameters) {
  Parameters.collection = parameters;

  var nitDataset = [];
  var alkDataset = [];
  var calDataset = [];
  var magDataset = [];
  var salDataset = [];
  var tempDataset = [];

  for (var i = 0; i < Parameters.collection.length; i++) {
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
    magDataset.push(Parameters.collection[i].magnesium);
    salDataset.push(Parameters.collection[i].salinity);
    tempDataset.push(Parameters.collection[i].temp);
  }

  createGraph();
}

var formSection = document.getElementById('dataform');
formSection.addEventListener('submit', handleSubmit);
// lines 29-31 work and populate data for first click, but if I dont refresh it shows a stagnant value
nitDataset = [];
alkDataset = [];
calDataset = [];
magDataset = [];
salDataset = [];
tempDataset = [];

function handleSubmit(event) {
  event.preventDefault();

  var theFormForN = parseFloat(event.target.nitrate.value);
  var theFormForA = parseFloat(event.target.alkalinity.value);
  var theFormForC = parseFloat(event.target.calcium.value);
  var theFormForM = parseFloat(event.target.magnesium.value);
  var theFormForS = parseFloat(event.target.salinity.value);
  var theFormForT = parseFloat(event.target.temperature.value);


  var newDayData = new Parameters(theFormForN, theFormForA, theFormForC, theFormForM, theFormForS, theFormForT);

  for (var i = 0; i < Parameters.collection.length; i++) {
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
    magDataset.push(Parameters.collection[i].magnesium);
    salDataset.push(Parameters.collection[i].salinity);
    tempDataset.push(Parameters.collection[i].temp);
  }

  var stringyParamData = JSON.stringify(Parameters.collection);
  localStorage.setItem('params', stringyParamData);

  createGraph();
}

function createGraph() {

  var ctx = document.getElementById('myChart').getContext('2d');
  var productChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[0],
        data: nitDataset,
        // backgroundColor: 'blue',
        borderColor: 'blue'
      },
      {
        label: parametersForTable[1],
        data: alkDataset,
        // backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: parametersForTable[2],
        data: calDataset,
        // backgroundColor: 'green',
        borderColor: 'green',
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
function Parameters(nitrate, alkalinity, calcium, magnesium, salinity, temp) {
  this.nitrate = nitrate;
  this.alkalinity = alkalinity;
  this.calcium = calcium;
  //Stretch Goal
  this.magnesium = magnesium;
  this.salinity = salinity;
  this.temp = temp;
  Parameters.collection.push(this);

  let today = new Date().toLocaleDateString();

  days.push(today);
}
var newDay = new Date();
Parameters.prototype.date = newDay;

//var newParameter = new Parameters(5, 6, 7, 1300, 1.025, 80);
//var newParameter2 = new Parameters(8, 9, 10, 1250, 1.020, 78);
// var newParameter3 = new Parameters(11, 12, 13);
// var newParameter4 = new Parameters(1, 2, 3);
