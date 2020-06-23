'use strict';
Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:','Alkalinity:', 'Calcium:'];


var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);
if(parameters){
  Parameters.collection = parameters;
}

var formSection = document.getElementById('dataform');
formSection.addEventListener('submit', handleSubmit);


function handleSubmit(event){
  //when clicked submit this function should take the parameters and render the data onto a graph and to a table on the next html page.
  event.preventDefault();
  
  var theFormForN = parseFloat(event.target.nitrate.value);
  var theFormForA = parseFloat(event.target.alkalinity.value);
  var theFormForC = parseFloat(event.target.calcium.value);

  var newDayData = new Parameters(theFormForN, theFormForA,theFormForC);

  var stringyParamData = JSON.stringify(Parameters.collection);
  localStorage.setItem('params', stringyParamData);
  console.log('check: ', Parameters.collection);
  //createTable();
  createGraph();
}

function createGraph(){
  // if data exist in locale storage pull data
  // use submit button event listener to grab data entered by user
  // populate chart with new data attached
  var nitDataset = [];
  var alkDataset = [];
  var calDataset = [];
  
  for (var i = 0; i < days.length; i++){
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
  }
  console.log('Check nitrate array ', nitDataset);

  var ctx = document.getElementById('myChart').getContext('2d');
  var productChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: parametersForTable,
      datasets: [{
        data: nitDataset,
        backgroundColor: 'blue',
        borderColor: 'blue'
      }]
    },
    options: {}
  });
}

function Parameters(nitrate, alkalinity, calcium){
  this.nitrate = nitrate;
  this.alkalinity = alkalinity;
  this.calcium = calcium;
  //Stretch Goal
  // this.magnesium = magnesium;
  // this.salinity = salinity;
  // this.temp = temp;
  Parameters.collection.push(this);

  let today = new Date().toLocaleDateString();

  console.log(today);

  days.push(today);
}
  
var newParameter = new Parameters(5, 6, 7);
var newParameter2 = new Parameters(8, 9, 10);
var newParameter3 = new Parameters(11, 12, 13);
var newParameter3 = new Parameters(1, 2, 3)