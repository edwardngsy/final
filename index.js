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

    // Grab a reference to the element with class name "demo" in memory
    let courseDiv = document.querySelector(`.demo`)

    // Loop through the JSON data, for each Object representing a post:
    for (let i=0; i < json.length; i++) {
      // Store each object ("course") in memory
      let course = json[i]

      // Create some markup using the post data, insert into the "course" element
      courseDiv.insertAdjacentHTML(`beforeend`, `
      <tr class="border">
        <th>${course.name}</th>
        <th>${course.number}</th>
        <th>${course.instructor.name}</th>
        <th>${course.section.tce}</th>
        <th>${course.section.workload}</th>
        <th>${course.section.quarter}</th>
        <th>${course.section.bidding1}</th>
        <th>${course.section.bidding2}</th>
        <th>${course.section.bidding3}</th>
      </tr>
      `)
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