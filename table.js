'use strict';
Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:','Alkalinity:', 'Calcium:','Magnesium:','Salinity','Temperature:'];

function createTable()
{
  createHeader();
  var paramsArrays = getParams();

  for(var i in parametersForTable)
  {
    fillParameterRow(parametersForTable[i], paramsArrays[i]);
  }
}
//------------------------------------
function createHeader()
{
  var table = createCell('fishTable', 'tr', 'th', 'Date:');

  for(var i in days)
  {
    createAndAttach(table[1], 'th', days[i]);
  }
  table[0].appendChild(table[1]);
}
//-----------------------------------------
function createCell(tableId, rowType, cellType, theText)
{
  var table = document.getElementById(tableId);
  var newRow = document.createElement(rowType);
  var newCell = document.createElement(cellType);
  newCell.textContent = theText;
  newRow.appendChild(newCell);

  return [table, newRow];
}
//------------------------------------
function createAndAttach(row,cellType, content)
{
  var nextCell = document.createElement(cellType);
  nextCell.textContent = content;
  row.appendChild(nextCell);
}
//--------------------------------------
function getParams()
{
  var nitArray = [];
  var alkArray = [];
  var calArray = [];
  var magArray = [];
  var salArray = [];
  var tempArray = [];

  for (var i in days)
  {
    nitArray.push(Parameters.collection[i].nitrate);
    alkArray.push(Parameters.collection[i].alkalinity);
    calArray.push(Parameters.collection[i].calcium);
    magArray.push(Parameters.collection[i].magnesium);
    salArray.push(Parameters.collection[i].salinity);
    tempArray.push(Parameters.collection[i].temp);
  }
  return [nitArray, alkArray, calArray, magArray, salArray, tempArray];
}
//----------------------------------------------
function fillParameterRow(parameter, parameterArray)
{
  var table = createCell('fishTable', 'tr', 'th', parameter);

  for(var j in days)
  {
    createAndAttach(table[1], 'td', parameterArray[j]);
  }
  table[0].appendChild(table[1]);
}

function Parameters(nitrate, alkalinity, calcium, magnesium, salinity, temp){
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

var newParameter = new Parameters(5, 6, 7, 1200, 1.025, 78);
var newParameter2 = new Parameters(8, 9, 10, 1300, 1.020, 80);
createTable();
