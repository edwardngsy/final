// allows us to use firebase
let firebase = require('./firebase')

// /.netlify/functions/posts
exports.handler = async function(event) {

  // // get the course name being requested
  // let courseName = event.queryStringParameters.courseName

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query to get the course information
  let courseQuery = await db.collection(`courses`).get()

  // retrieve the documents from the query
  let course = courseQuery.docs

  // get the id from the document
  let courseId = course.id

  // get the data from the document
  let courseData = course.data()

  // create an Object to be added to lambda
  let courseObject = {
    name: courseData.name,
    number: courseData.number,
  }

  console.log(courseObject)

  // set two new arraies as part of the course object
  courseObject.instructor = []
  courseObject.sections = []

  // get the bidding points for this course, wait for it to return, store in memory
   let sectionQuery = await db.collection(`section`).where(`courseId`, `==`, courseId).get()

  // get the documents from the query
  let section = sectionQuery.docs

  // loop through the section documents
  for (let i=0; i < section.length; i++) {
    // get the section id from the section document
    let sectionId = section[i].id
    let instructorId = section[i].instructorId
    // get the data from the section document
    let sectionData = section[i].data()

    // create an Object to be added to the comments Array of the post
    let sectionObject = {
      id: sectionId,
      quarter: sectionData.quarter,
      bidding1: sectionData.bidding1,
      bidding2: sectionData.bidding2,
      bidding3: sectionData.bidding3,
      tce: sectionData.tce,
      workload: sectionData.workload
    }

    // add the Object to the course
    courseObject.section.push(sectionObject)

    // get the instructor info for this course, wait for it to return, store in memory
    let instructorQuery = await db.collection(`instructor`).where(`instructorId`, `==`, instructorId).get()

    // retrieve the documents from the query
    let instructor = instructorQuery.docs

    // get the data from the document
    let instructorData = instructor.data()

    // create an Object to be added to the course object of our lambda
    let instructorObject = {
      name: instructorData.name
    }
    
    // add the Object to the section
    courseObject.instructor.push(instructorObject)

    // add the Object to the course
    courseObject.section.push(sectionObject)
  }
  
  console.log(courseObject)
  
  return {
    statusCode: 200,
    body: JSON.stringify(courseObject)
  }
}