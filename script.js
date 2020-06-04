'use strict';

const apiKey = 'bPde8upG6yrxHOSGybjxwHVhTQ6kdJiyPe9COluu'
const searchUrl = 'https://developer.nps.gov/api/v1/parks'

/* GET "https://developer.nps.gov/api/v1/parks?stateCode=NV&limit=10&api_key=bPde8upG6yrxHOSGybjxwHVhTQ6kdJiyPe9COluu" 
  -H "accept: application/json" */

$(document).ready(function() {
  console.log("Waiting for user input!");
})

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getParks(stateCode, limit=10) {
  const params = {
    stateCode: $('#js-search-term').val(),
    limit: $('#js-max-results').val(),
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

console.log(url);

  fetch(url)
      .then(response => {
       if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayDom(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayDom(responseJson, stateCode, limit) {
  console.log(responseJson);
  $('#results-list').empty();
  $('#js-error-message').empty();
  if (responseJson.total == 0) {
    $('#js-error-message').text(`No parks found, please try again.`);
  }
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<p><b>${responseJson.data[i].fullName}</b> <br> ${responseJson.data[i].description} <br> 
        <a href="${responseJson.data[i].url}" target="_blank">Visit Website</a></p>`
  )}
}

function processInput(){
   $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-search-term').val();
    if (stateCode.length < 2) {
    return $('#js-error-message').text(`Please enter a full state code.`);
}
    const limit = $('#js-max-results').val();
    getParks(stateCode, limit);
  });
}

$(processInput);
