'use strict';
Parameters.collection = [];

var parametersForTable = ['Date:','Nitrates:','Alkalinity:', 'Calcium:', 'Magnesium:', 'Salinity:', 'Temperature:'];

var stringyParameters = localStorage.getItem('params');
var parameters = JSON.parse(stringyParameters);

if (parameters) {
  Parameters.collection = parameters;
  document.getElementById('fishTable').innerHTML = '';
  createTable();
} else {
  createTable();
}

//------------ check if days since needs to be populated ----------------
var today = new Date().toLocaleDateString();
var fromStorage = localStorage.getItem('startDate');
var oldDate = JSON.parse(fromStorage);
console.log('oldDate....', oldDate);

if(oldDate)
{
  console.log('checked old date');
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
    console.log('set new date');
  }
}

//---------------------------------------------------

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
//---------------------------------------------
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
  this.today = today;
}
