firebase.auth().onAuthStateChanged(async function(user) {
  
  // check to see if user is logged-in (i.e. user exists)
  if (user) {
  
    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
  
    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)
  
    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()
  
      // redirect to the home page
      document.location.href = `index.html`
    })

    // Build the URL for our posts API
    let url = `/.netlify/functions/course`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Create a variable for the course data
    let courses = json.courseinfo

    // // Get a reference to the "click me" button in memory
    // let goButton = document.querySelector(`.go`)

    // // Event listener for the "click me" button
    // goButton.addEventListener(`click`, async function(event) {

    // Loop through the JSON data, for each Object representing a post:
    for (let i=0; i < courses.length; i++) {

      // Create variables to store course related information in memory
      let courseName = courses[i].name
      let courseNumber = courses[i].number
      let courseInstructorName = courses[i].instructorName
      let sections = courses[i].section

      console.log(courseName)

      for (let j=0; j < sections.length; j++) {
        let tce = sections[j].tce
        let workload = sections[j].workload
        let quarter = sections[j].quarter
        let bidding1 = sections[j].bidding1
        let bidding2 = sections[j].bidding2
        let bidding3 = sections[j].bidding3

      // Grab a reference to the element with "table" in memory
      let table = document.querySelector(`table`)

      // Create some markup using the post data, insert into the "course" element
      table.insertAdjacentHTML(`beforeend`, `
      <tr class="border">
        <td>${courseName}</td>
        <td>${courseNumber}</td>
        <td>${courseInstructorName}</td>
        <td>${tce}</td>
        <td>${workload}</td>
        <td>${quarter}</td>
        <td>${bidding1}</td>
        <td>${bidding2}</td>
        <td>${bidding3}</td>
      </tr>
      `)}
    }

  } else {
    // user is not logged-in, so show login
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: `index.html` // where to go after we're done signing up/in
    }
  
    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)
    }
})