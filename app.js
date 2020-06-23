'use strict';

Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:','Alkalinity:', 'Calcium:'];

// fishy tracker app fill have a form to input data from user for parameters.
// store data to local storage
// send data to table on table.html page
// send data chart
// data wil be returned from user as a float value
// for chart on index just get 1 parameter for now date across the bottom
// ---------------- form -------------------
// feildset/ legend / labels / inputs
// use values from constructor for id tags nitrate, alkalinity, ect
// need submit button
// ---------- For table creation -------------
// TODO: create event listener for submit button
// TODO: if table data exist in local storage pull data
// var stringyParameters = localStorage.getItem('params');
// var parameters = JSON.parse(stringyParameters);
// if(parameters){
//   Parameters.collection = parameters;
// }
// need to get date by calling new Date and parsing month date and year
// find table create row > attach cell with date > continue attaching parameters to date cell > reattach row to table
// push new data to local storage

// var formSection = document.getElementById('dataform');
// formSection.addEventListener('submit', handleSubmit);


// function handleSubmit(event){
//   //when clicked submit this function should take the parameters and render the data onto a graph and to a table on the next html page.
//   event.preventDefault();
//   //createTable();
//   createGraph();
//   var theFormForN = event.target.nitrate.value;
//   var theFormForA = event.target.alkalinity.value;
//   var theFormForC = event.target.calcium.value;

//   var newDayData = new Parameters(theFormForN, theFormForA,theFormForC);

//   var stringyParamData = JSON.stringify(Parameters.collection);
//   localStorage.setItem('params', stringyParamData);
//   console.log('check: ', Parameters.collection);
// }
// TODO: create renderTable function (see below!)
// TODO: create Graph function

//---------- for chart --------------------
// add chart.js file to index
// copy and paste version of chart to use
// function createGraph(){
// // if data exist in locale storage pull data
// // use submit button event listener to grab data entered by user
// // populate chart with new data attached
//   var nitDataset = [];
//   var alkDataset = [];
//   var calDataset = [];

//   for (var i = 0; i < days.length; ){
//     nitDataset.push(Parameters.collection[i].nitrate);
//     alkDataset.push(Parameters.collection[i].alkalinity);
//     calDataset.push(Parameters.collection[i].calcium);
//   }
//   console.log('Check: ', nitDataset);
// }

// ------------ object constructor key pair values --------------------
// TODO: function Parameters()
// all float values:  html: input value text > js: .parseFloat
// this.date
// this.nitrate
// this.alkalinity
// this.calcium

// stretch:
// this.magnesium
// this.salinity
// this.temp

//======Line Graph/ Chart - can add details later=========
//=====Rendering Graph/ chart function - can change variable names for chart once data is available 

//
//https://www.chartjs.org/docs/latest/charts/line.html

// var myLineChart = new Chart(ctx, {
//   type: 'line',
//   data: data,
//   options: options
// });

//-----------------------------------------
// function createTable()
// {
//   createHeader();
//   var paramsArrays = getParams();

//   for(var i in parametersForTable)
//   {
//     fillParameterRow(parametersForTable[i], paramsArrays[i]);
//   }
// }
// //------------------------------------
// function createHeader()
// {
//   var table = createCell('fishTable', 'tr', 'th', 'Date:');

//   for(var i in days)
//   {
//     createAndAttach(table[1], 'th', days[i]);
//   }
//   table[0].appendChild(table[1]);
// }
// //-----------------------------------------
// function createCell(tableId, rowType, cellType, theText)
// {
//   var table = document.getElementById(tableId);
//   var newRow = document.createElement(rowType);
//   var newCell = document.createElement(cellType);
//   newCell.textContent = theText;
//   newRow.appendChild(newCell);

//   return [table, newRow];
// }
// //------------------------------------
// function createAndAttach(row,cellType, content)
// {
//   var nextCell = document.createElement(cellType);
//   nextCell.textContent = content;
//   row.appendChild(nextCell);
// }
// //--------------------------------------
// function getParams()
// {
//   var nitrateArray = [];
//   var alkalinityArray = [];
//   var calciumArray = [];

//   for (var i in days)
//   {
//     nitrateArray.push(Parameters.collection[i].nitrate);
//     alkalinityArray.push(Parameters.collection[i].alkalinity);
//     calciumArray.push(Parameters.collection[i].calcium);
//   }
//   return [nitrateArray, alkalinityArray, calciumArray];
// }
// //----------------------------------------------
// function fillParameterRow(parameter, parameterArray)
// {
//   var table = createCell('fishTable', 'tr', 'th', parameter);

//   for(var j in days)
//   {
//     createAndAttach(table[1], 'td', parameterArray[j]);
//   }
//   table[0].appendChild(table[1]);
// }
//-------------------------------------------------
// function Parameters(nitrate, alkalinity, calcium){
//   this.nitrate = nitrate;
//   this.alkalinity = alkalinity;
//   this.calcium = calcium;
//   //Stretch Goal
//   // this.magnesium = magnesium;
//   // this.salinity = salinity;
//   // this.temp = temp;
//   Parameters.collection.push(this);

//   let today = new Date().toLocaleDateString();

//   console.log(today);

//   days.push(today);
// }



// var newParameter = new Parameters(5, 6, 7);
// var newParameter2 = new Parameters(8, 9, 10);
// var newParameter3 = new Parameters(11, 12, 13);
// var newParameter3 = new Parameters(1, 2, 3);


//createTable();
