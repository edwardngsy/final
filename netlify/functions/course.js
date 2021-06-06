// allows us to use firebase
let firebase = require('./firebase')

// /.netlify/functions/posts
exports.handler = async function(event) {

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query to get the course information
  let courseQuery = await db.collection(`courses`).get()

  // retrieve the documents from the query
  let course = courseQuery.docs

  // create an object with the course data to hold the return value from our lambda
  let returnValue = {}

  // set a new Array as part of the return value
  returnValue.courseinfo = []

  // loop through the post documents
  for (let i=0; i < course.length; i++) {
    // get the id from the document
    let courseId = course[i].id

    // get the data from the document
    let courseData = course[i].data()

    // create an Object to be added to lambda
    let courseObject = {
      name: courseData.name,
      number: courseData.number
    }

    courseObject.section = []

    // get the sections for this course, wait for it to return, store in memory
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
      let instructorQuery = await db.collection(`instructor`).doc(sectionData.instructorId).get()

      // retrieve the documents from the query
      let instructor = instructorQuery.data()

      // create an Object to be added to the course object of our lambda
      courseObject.instructorName = instructor.name
    }
    // add the Object to the course
    returnValue.courseinfo.push(courseObject)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}