'use strict';

const apiKey = 'bPde8upG6yrxHOSGybjxwHVhTQ6kdJiyPe9COluu'
const searchUrl = 'https://developer.nps.gov/api/v1/parks'

/* GET "https://developer.nps.gov/api/v1/parks?stateCode=NV&limit=10&api_key=bPde8upG6yrxHOSGybjxwHVhTQ6kdJiyPe9COluu" 
  -H "accept: application/json" */

$(document).ready(function() {
  console.log("Waiting for user input!");
  processInput();
})

function getParks(stateCode, limit=10) {
 fetch(searchUrl + '?stateCode=' + stateCode + '&limit=' + limit + "&api_key=" + apiKey)
   .then(response => response.json())
   .then(responseJson => {
    displayDom(responseJson);
  }).catch(error => alert("Sorry, something went wrong"))
}

function displayDom(responseJson, stateCode, limit) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<p><b>${responseJson.data[i].fullName}</b> <br> ${responseJson.data[i].description} <br> 
      <a href="${responseJson.data[i].url}">Visit Website</a></p>`
  )};
}

function processInput(){
   $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParks(stateCode, limit);
  });
}
