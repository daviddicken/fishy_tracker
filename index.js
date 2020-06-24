'use strict';
Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:', 'Alkalinity:', 'Calcium:','Magnesium:', 'Salinity:', 'Temperature:'];


var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);
if (parameters) {
  Parameters.collection = parameters;
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

  var newDayData = new Parameters(theFormForN, theFormForA, theFormForC, theFormForM, theFormForS, theFormForT);

  var stringyParamData = JSON.stringify(Parameters.collection);
  localStorage.setItem('params', stringyParamData);
  createGraph();
}

function createGraph() {
  var nitDataset = [];
  var alkDataset = [];
  var calDataset = [];
  var magDataset = [];
  var salDataset = [];
  var tempDataset = [];
  console.log(Parameters.collection);
  for (var i = 0; i < days.length; i++) {
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
    magDataset.push(Parameters.collection[i].magnesium);
    salDataset.push(Parameters.collection[i].salinity);
    tempDataset.push(Parameters.collection[i].temperature);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var productChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[0],
        data: nitDataset,
        backgroundColor: 'blue',
        borderColor: 'blue'
      },
      {
        label: parametersForTable[1],
        data: alkDataset,
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: parametersForTable[2],
        data: calDataset,
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        label: parametersForTable[3],
        data: magDataset,
        backgroundColor: 'purple',
        borderColor: 'purple',
      },{
        label: parametersForTable[4],
        data: salDataset,
        backgroundColor: 'yellow',
        borderColor: 'yellow',
      },{
        label: parametersForTable[5],
        data: tempDataset,
        backgroundColor: 'orange',
        borderColor: 'orange',
      }]
    },
    options: {}
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

  // console.log(today);

  days.push(today);
}

var newParameter = new Parameters(5, 6, 7, 1300, 1.025, 79.8);
var newParameter2 = new Parameters(8, 9, 10, 1350, 1, 75);
var newParameter3 = new Parameters(11, 12, 13, 1000, 1.035, 77);
var newParameter4 = new Parameters(1, 2, 3, 1200, 1.011, 80);
