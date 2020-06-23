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
// create event listener for submit button
// if table data exist in local storage pull data
// need to get date by calling new Date and parsing month date and year
// find table create row > attach cell with date > continue attaching parameters to date cell > reattach row to table
// push new data to local storage
var tableSection = document.getElementById();
tableSection.addEventListener('submit', handleSubmit);

function handleSubmit(){
  //when clicked submit this function should take the parameters and render the data onto a graph and to a table on the next html page.
}
// TO DO: create renderTable function
// TO DO: create renderGraph function


//---------- for chart --------------------
// add chart.js file to index
// copy and paste version of chart to use
// if data exist in locale storage pull data
// use submit button event listener to grab data entered by user
// populate chart with new data attached
// ------------ object constructor key pair values --------------------
// function Parameters()
// all float values:  html: input value text > js: .parseFloat
// this.date
// this.nitrate
// this.alkalinity
// this.calcium

// stretch:
// this.magnesium
// this.salinity
// this.temp

function getNitrates()
{
  var nitrateArray = [];

  for(var i = 0; i < days.length; i++)
  {
    nitrateArray.push(Parameters.collection[i].nitrate);
  }
  return nitrateArray;
}
//--------------------------------------------------------------
function getAlkalinity()
{
  var alkalinityArray = [];

  for(var i = 0; i < days.length; i++)
  {
    alkalinityArray.push(Parameters.collection[i].alkalinity);
  }
  return alkalinityArray;
}
//---------------------------------------------------------------
function getCalcium()
{
  var calciumArray = [];

  for(var i = 0; i < days.length; i++)
  {
    calciumArray.push(Parameters.collection[i].calcium);
  }
  return calciumArray;
}
//---------------------------------------------------------------
function fillParameterRow(parameter, table, parameterArray)
{
  var createParRow = document.createElement('tr');
  var createParName = document.createElement('th');
  createParName.textContent = parameter;
  createParRow.appendChild(createParName);

  for(var j in days)
  {
    var parDataCell = document.createElement('td');
    parDataCell.textContent = parameterArray[j];
    createParRow.appendChild(parDataCell);
  }
  table.appendChild(createParRow);
}
//------------------------------------------------------
function createHeader()
{
  var table = document.getElementById('fishTable');
  var createRow = document.createElement('tr');
  var create1stCell = document.createElement('th');
  create1stCell.textContent = 'Date:';
  createRow.appendChild(create1stCell);

  for(var i in days)
  {
    var createDataCell = document.createElement('th');
    createDataCell.textContent = days[i];
    createRow.appendChild(createDataCell);
  }
  table.appendChild(createRow);

  return table;
}
//---------------------------------------------------------
function createTable()
{
  var table = createHeader();
  var nitratesArray = getNitrates();
  var calciumArray = getCalcium();
  var alkalinityArray = getAlkalinity();
  fillParameterRow('Nitrates:', table, nitratesArray);
  fillParameterRow('Calcium:', table, calciumArray);
  fillParameterRow('Alkalinity:', table, alkalinityArray);
}
//----------------------------------------------------------
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
createTable();

