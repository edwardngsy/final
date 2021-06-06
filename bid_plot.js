// Build the URL for bidding points API
let url = `/.netlify/functions/course`

// Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)

// Ask for the json-formatted data from the response, wait for the data, store it in memory
let json = await response.json()

// Write the json-formatted data to the console in Chrome
console.log(json)

// get a reference to the newly created post comment button
let goButton = document.querySelector(`#courseName`)

// event listener for the go button
goButton.addEventListener(`click`, async function(event) {
  // ignore the default behavior
  event.preventDefault()

  // get a reference to the course name input
  let courseNameInput = document.querySelector(`#courseName`)

  // get the body of the comment
  let courseNameBody = courseNameInput.value

  // Build the URL for our posts API
  let url = `/.netlify/functions/create_comment?courseName=${courseNameBody}`

  // Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)

  // refresh the page
  location.reload()
})

// Grab a reference to the element with class name "stats" in memory
let headerDiv = document.querySelector(`.stats`)

// Store course in memory 
let course = json

// Create markup using the course data, insert into the "stats" element
headerDiv.innerHTML = `
<h2 class="font-bold">${course.number} - ${course.name}</h2>
<h3 class="font-bold">Historical average bidding points by phase</h3>
<div class='phase-stats flex'>
    <d1  class = "w-1/3">Phase I: 362</d1>
    <d2  class = "w-1/3">Phase II: 812</d2>
    <d3  class = "w-1/3">Phase III: 412</d3>
`


// Grab a reference to the element with class name "stats" in memory
let chartDiv = document.querySelector(`#myChart`)
