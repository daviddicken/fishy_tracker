'use strict';
Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:', 'Alkalinity:', 'Calcium:'];


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

  var newDayData = new Parameters(theFormForN, theFormForA, theFormForC);
  console.log(newDayData);

  var stringyParamData = JSON.stringify(Parameters.collection);
  localStorage.setItem('params', stringyParamData);
  createGraph();
}

function createGraph() {
  var nitDataset = [];
  var alkDataset = [];
  var calDataset = [];
  console.log(Parameters.collection);
  for (var i = 0; i < days.length; i++) {
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
  }
  // console.log('Check nitrate array ', nitDataset);
  // console.log('Check alkaline array ', alkDataset);
  // console.log('Check calcium array ', calDataset);

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
      }]
    },
    options: {}
  });
}

function Parameters(nitrate, alkalinity, calcium) {
  this.nitrate = nitrate;
  this.alkalinity = alkalinity;
  this.calcium = calcium;
  //Stretch Goal
  // this.magnesium = magnesium;
  // this.salinity = salinity;
  // this.temp = temp;
  Parameters.collection.push(this);

  let today = new Date().toLocaleDateString();

  // console.log(today);

  days.push(today);
}

var newParameter = new Parameters(5, 6, 7);
var newParameter2 = new Parameters(8, 9, 10);
var newParameter3 = new Parameters(11, 12, 13);
var newParameter4 = new Parameters(1, 2, 3);
