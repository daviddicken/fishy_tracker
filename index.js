'use strict';
Parameters.collection = [];
var days = [];
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
}

var formSection = document.getElementById('dataform');
formSection.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  //event.preventDefault();

  var theFormForN = parseFloat(event.target.nitrate.value);
  var theFormForA = parseFloat(event.target.alkalinity.value);
  var theFormForC = parseFloat(event.target.calcium.value);
  var theFormForM = parseFloat(event.target.magnesium.value);
  var theFormForS = parseFloat(event.target.salinity.value);
  var theFormForT = parseFloat(event.target.temperature.value);

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

  var dtx = document.getElementById('myChart2').getContext('2d');
  var productChart = new Chart(dtx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[1],
        data: alkDataset,
        backgroundColor: 'red',
        borderColor: 'red'
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

  var etx = document.getElementById('myChart3').getContext('2d');
  var productChart = new Chart(etx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[2],
        data: calDataset,
        backgroundColor: 'green',
        borderColor: 'green'
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

  var btx = document.getElementById('myChart4').getContext('2d');
  var productChart = new Chart(btx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[3],
        data: magDataset,
        backgroundColor: 'yellow',
        borderColor: 'yellow'
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

  var rtx = document.getElementById('myChart5').getContext('2d');
  var productChart = new Chart(rtx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[4],
        data: salDataset,
        backgroundColor: 'orange',
        borderColor: 'orange'
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

  var qtx = document.getElementById('myChart6').getContext('2d');
  var productChart = new Chart(qtx, {
    type: 'line',

    data: {
      labels: days,
      datasets: [{
        label: parametersForTable[5],
        data: tempDataset,
        backgroundColor: 'violet',
        borderColor: 'violet'
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

  let today = new Date().toLocaleDateString();
  this.today = today;
  days.push(today);
  Parameters.collection.push(this);

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

