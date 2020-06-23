'use strict';

Parameters.collection = [];
var days = [];
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
var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);
if(parameters){
  Parameters.collection = parameters;
}
// need to get date by calling new Date and parsing month date and year
// find table create row > attach cell with date > continue attaching parameters to date cell > reattach row to table
// push new data to local storage
var tableSection = document.getElementById();
tableSection.addEventListener('submit', handleSubmit);

function handleSubmit(){
  //when clicked submit this function should take the parameters and render the data onto a graph and to a table on the next html page.
  createTable();
  createGraph();
  var stringyParamData = JSON.stringify(Parameters.collection);
  localStorage.setItem('params', stringyParamData);
}
// TODO: create renderTable function (see below!)
// TODO: create renderGraph function

//---------- for chart --------------------
// add chart.js file to index
// copy and paste version of chart to use
function createGraph(){
// if data exist in locale storage pull data
// use submit button event listener to grab data entered by user
// populate chart with new data attached
  var nitDataset = [];
  var alkDataset = [];
  var calDataset = [];

  for (var i = 0; i < days.length; ){
    nitDataset.push(Parameters.collection[i].nitrate);
    alkDataset.push(Parameters.collection[i].alkalinity);
    calDataset.push(Parameters.collection[i].calcium);
  }
}

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

// var chartLabel = [];
// var chartData = [];

 function renderTheChart(){
//   console.log('render chart');
   }
//
//https://www.chartjs.org/docs/latest/charts/line.html

// var myLineChart = new Chart(ctx, {
//   type: 'line',
//   data: data,
//   options: options
// });


function createTable()
{
  //get table by id
  //create header row with days array
  //create row for each parameter

  //tableHeader();
  //fillTable();

  //create header
  var table = document.getElementById('potatoTable');
  console.log('table...', table);
  var createRow = document.createElement('tr');
  var create1stCell = document.createElement('th');
  create1stCell.textContent = 'Date:';
  createRow.appendChild(create1stCell);

  for(var i in days)
  {
    var createDataCell = document.createElement('th');
    console.log('days.date...', days[i].date);
    createDataCell.textContent = days[i].date;
    createRow.appendChild(createDataCell);
  }
  table.appendChild(createRow);
  //-----------------------------------------
  //fillTable
  //--------------- nitrates ----------------
  //var table = document.getElemtById('potatoTable');
  var createParRow = document.createElement('tr');
  var createParName = document.createElement('th');
  createParName.textContent = 'Nitrates:';
  createParRow.appendChild(createParName);

  for(var j in days)
  {
    var parDataCell =document.createElement('td');
    parDataCell.textContent = days[j].nitrate;
    createParRow.appendChild(parDataCell);
  }
  table.appendChild(createParRow);
  //----------- alkalinity ---------------------
  var createAlkRow = document.createElement('tr');
  var createAlkName = document.createElement('th');
  createAlkName.textContent = 'Alkalinity:';
  createAlkRow.appendChild(createAlkName);

  for(var k in days)
  {
    var parDataCell =document.createElement('td');
    parDataCell.textContent = days[k].alkalinity;
    createAlkRow.appendChild(parDataCell);
  }
  table.appendChild(createAlkRow);
  //-------------- calcium --------------------
  var creatCalRow = document.createElement('tr');
  var createParName = document.createElement('th');
  createParName.textContent = 'Calcium:';
  creatCalRow.appendChild(createParName);

  for(var m in days)
  {
    var parDataCell =document.createElement('td');
    parDataCell.textContent = days[m].calcium;
    creatCalRow.appendChild(parDataCell);
  }
  table.appendChild(creatCalRow);
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

  let today = new Date().toLocaleDateString()
  console.log(today);
  days.push(today);

}

var newParameter = new Parameters(5, 6, 7);


