'use strict';
Parameters.collection = [];
var days = [];
var parametersForTable = ['Nitrates:','Alkalinity:', 'Calcium:'];

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
  var nitrateArray = [];
  var alkalinityArray = [];
  var calciumArray = [];

  for (var i in days)
  {
    nitrateArray.push(Parameters.collection[i].nitrate);
    alkalinityArray.push(Parameters.collection[i].alkalinity);
    calciumArray.push(Parameters.collection[i].calcium);
  }
  return [nitrateArray, alkalinityArray, calciumArray];
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

createTable();
