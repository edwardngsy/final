window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "go" button
  let goButton = document.querySelector(`.go`)

  // When the "go" button is clicked:
  goButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the course number
    let numberInput = document.querySelector(`#courseNum`)

    // - Get the user-entered location from the element's value
    let courseNumber = numberInput.value

    // Build the URL for bidding points API
    let url = `/.netlify/functions/bidding?courseNum=${courseNum}`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Store course in memory 
    let course = json

    // Grab a reference to the element with class name "stats" in memory
    let headerDiv = document.querySelector(`.stats`)

    // Create markup using the course data, insert into the "stats" element
    headerDiv.innerHTML = `
      <h2 class="font-bold">${course.number} - ${course.name}</h2>
      <h3 class="font-bold">Historical average bidding points by phase</h3>
      <div class='phase-stats flex'>
      <d1  class = "w-1/3">Phase I: ${course.averagebidding1}</d1>
      <d2  class = "w-1/3">Phase II: ${course.averagebidding2}</d2>
      <d3  class = "w-1/3">Phase III: ${course.averagebidding3}</d3>
    `

    // Grab a reference to the element with class name "stats" in memory
    let chartDiv = document.querySelector(`#myChart`)

    // Create markup using the course data, insert into the "chart" element
    chartDiv.innerHTML = `
    <script>
    // X value - quarter
    var xValues = ["2019 Fall","2020 Winter","2020 Spring","2020 Fall","2021 Winter","2021 Spring"];

    // Y value - bidding point by phase
    new Chart("myChart", {
      type: "line",
      data: {
      labels: xValues,
      datasets: [{ 
        data: [200,154,188,300,167,223],
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
        label: "Phase I"  
      }, { 
        data: [658,700,659,578,800,737],
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        label: "Phase II"
      }, { 
        data: [300,267,344,146,100,400],
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
        label: "Phase III"
      }]
    },
      options: {
        legend: {display: true, position: 'bottom'}
      }
    });
    </script>

    `
  })
})
