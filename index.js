'use strict';
Parameters.collection = [];
var parametersForTable = ['Nitrates:', 'Alkalinity:', 'Calcium:', 'Magnesium:', 'Salinity:', 'Temperature:'];
var nitDataset = [];
var alkDataset = [];
var calDataset = [];
var magDataset = [];
var salDataset = [];
var tempDataset = [];
var dateDataset = [];

var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);
//console.log('stingy returned...', parameters);

//---- create graph if data present -------
if (parameters) {
  Parameters.collection = parameters;
  createGraph();
} else {
  var x = document.getElementById('charts');
  x.style.display = 'none';
}
// ------ submit button magic ------------
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

  //--------search for date here ----------------------
  // get stringy from local storage
  //debugger;
  //return [dateArray, nitArray, alkArray, calArray, magArray, salArray, tempArray,];
  if (parameters)
  {
    var today = new Date().toLocaleDateString().slice(0, -2);
    // might not need the flag
    //var foundFlag = false;
    var paramArrays = getParams();
    var stringyParamData = '';

    for(var i in paramArrays[0])
    {
      if(paramArrays[0][i] === today)
      {
        //var matchFoundAt = i;
        //foundFlag = true;
        
        //----------- Idea --------------
        // can use paramArrays if match is found in [0][i]
        // then stepe through each array comparing and replacing at i location
        // ex: paramArrays[1][i], paramArrays[2][i], ect or
        // nested loop paramArray[j][i]
        // have to figure out how much is involved to rewite array and all
        // places Parameter.collection is called and wether it is 
        // worth it to replace all the code to make more dynamic
        //--------------------------------
        //-------------------------------

        //-------------------- Nitrate ---------
        if(!isNaN(theFormForN) && theFormForN !== '')
        {
          console.log('nitrate entered');
          Parameters.collection[i].nitrate = theFormForN;
        }
        //------------------- Alk --------------
        if(!isNaN(theFormForA) && theFormForA !== '')
        {
          console.log('alk entered');
          Parameters.collection[i].alkalinity = theFormForA;
        }
        //------------------ Cal --------------
        if(!isNaN(theFormForC) && theFormForC !== '')
        {
          console.log('calc entered');
          Parameters.collection[i].calcium = theFormForC;
        }
        //----------------- Mag ---------------
        if(!isNaN(theFormForM) && theFormForM !== '')
        {
          console.log('mag entered');
          Parameters.collection[i].magnesium = theFormForM;
        }
        //---------------- Sal ---------------
        if(!isNaN(theFormForS) && theFormForS !== '')
        {
          console.log('salinity entered');
          Parameters.collection[i].salinity = theFormForS;
        }
        //--------------- Temp ---------------
        if(!isNaN(theFormForT) && theFormForT !== '')
        {
          console.log('temp entered');
          Parameters.collection[i].temp = theFormForT;
        }
      }
    }
    // make function for saving to storage
    stringyParamData = JSON.stringify(Parameters.collection);
    localStorage.setItem('params', stringyParamData);
    createGraph();
  }else{
    // This was the original code in the handler function
    var newDayData = new Parameters(theFormForN, theFormForA, theFormForC, theFormForM, theFormForS, theFormForT);

    stringyParamData = JSON.stringify(Parameters.collection);
    localStorage.setItem('params', stringyParamData);
    createGraph();
  }


  // go through paramsFromStorage[0] for date comparison
  // search for todays date === today value in array
  // if match found save i as index of Parameters.collection that needs to be replaced
  // go through each theForm arrays and check if it is not a isNaN (if its a number)
  // if it is a number replace the parameter value on the array index i with value from theForm
  // then create and save a new stringy

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
    dateDataset.push(Parameters.collection[i].today);
  }

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
        labels: dateDataset,
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
// function shortDate() {
//   for (var i = 0; i < Parameters.collection.length; i++) {
//     var shortDateHold = days[i].substring(0, 4);
//     shortDateArr.push(shortDateHold);
//   }
// }

function getParams()
{
  var nitArray = [];
  var alkArray = [];
  var calArray = [];
  var magArray = [];
  var salArray = [];
  var tempArray = [];
  var dateArray = [];
  // changed parameters out for Parameters.collection
  for (var i in Parameters.collection)
  {
    nitArray.push(Parameters.collection[i].nitrate);
    alkArray.push(Parameters.collection[i].alkalinity);
    calArray.push(Parameters.collection[i].calcium);
    magArray.push(Parameters.collection[i].magnesium);
    salArray.push(Parameters.collection[i].salinity);
    tempArray.push(Parameters.collection[i].temp);
    dateArray.push(Parameters.collection[i].today);
  }
  return [dateArray, nitArray, alkArray, calArray, magArray, salArray, tempArray,];
}
//------------- Constructor ----------------
function Parameters(nitrate, alkalinity, calcium, magnesium, salinity, temp) {
  this.nitrate = nitrate;
  this.alkalinity = alkalinity;
  this.calcium = calcium;
  this.magnesium = magnesium;
  this.salinity = salinity;
  this.temp = temp;
  this.today = new Date().toLocaleDateString().slice(0, -2);
  Parameters.collection.push(this);
}
