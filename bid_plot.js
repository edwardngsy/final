// Build the URL for our posts API
let url = `/.netlify/functions/biddingpoints`

// Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)

// Ask for the json-formatted data from the response, wait for the data, store it in memory
let json = await response.json()

// Write the json-formatted data to the console in Chrome
console.log(json)

// Grab a reference to the element with class name "stats" in memory
let postsDiv = document.querySelector(`.stats`)