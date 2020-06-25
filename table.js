'use strict';

var parametersForTable = ['Date:','Nitrates:','Alkalinity:', 'Calcium:', 'Magnesium:', 'Salinity:', 'Temperature:'];

var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);

if (parameters) {
  document.getElementById('fishTable').innerHTML = '';
  createTable();
}
//https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascrip
//------------ check if days since needs to be populated ----------------
var today = new Date().toLocaleDateString();
var fromStorage = localStorage.getItem('startDate');
var oldDate = JSON.parse(fromStorage);

if(oldDate)
{
  var timeDiff  = (new Date(today)) - (new Date(oldDate));
  var daysSince = timeDiff / (1000 * 60 * 60 * 24);
  document.getElementById('days').textContent = 'Days since last water change: ' + daysSince;
}else{
  document.getElementById('days').textContent = '';
}
//------------ Handle water change click --------------------

var waterChange = document.getElementById('waterchange');
waterChange = document.addEventListener('click', resetDay);
function resetDay(event)
{
  if(event.target.tagName === 'BUTTON')
  {
    var newDay = new Date().toLocaleDateString();
    var toStorage = JSON.stringify(newDay);
    localStorage.setItem('startDate', toStorage);
    document.getElementById('days').textContent = 'Days since last water change: 0';
  }
}
//----------------------------------------------
//------------------- Functions ----------------
function createTable()
{
  var paramsArrays = getParams();

  for(var i in parametersForTable)
  {
    fillParameterRow(parametersForTable[i], paramsArrays[i]);
  }
}
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
  var dateArray = [];

  for (var i in parameters)
  {
    nitArray.push(parameters[i].nitrate);
    alkArray.push(parameters[i].alkalinity);
    calArray.push(parameters[i].calcium);
    magArray.push(parameters[i].magnesium);
    salArray.push(parameters[i].salinity);
    tempArray.push(parameters[i].temp);
    dateArray.push(parameters[i].today);
  }
  return [dateArray, nitArray, alkArray, calArray, magArray, salArray, tempArray,];
}
//----------------------------------------------
function fillParameterRow(parameter, parameterArray)
{
  var table = createCell('fishTable', 'tr', 'th', parameter);

  for(var j = 0; j < parameterArray.length; j++)
  {
    createAndAttach(table[1], 'td', parameterArray[j]);
  }
  table[0].appendChild(table[1]);
}

