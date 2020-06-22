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