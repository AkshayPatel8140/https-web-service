const express = require('express')
const data = require('../database/class-schedule.json')
const classSchedule = express.Router()

console.log(data, 'this is our data')

// Our routes/endpoints/curd Operation

// 1.GET (Fetch all data)
classSchedule.get('/courses', (req, res) => {
    // no Request because there is no request from the client side
    /// just sent the data which is needed in the case it's "data"
    res.json(data)
})

// 2.GET/POST with query param of /course
classSchedule.get('/courses/:course/', (req, res) => {
    const { course } = req.params
    let foundCourse = data.find(c => c.Course === course)
    if (foundCourse) {
        res.json(foundCourse)
    } else {
        res.status(404).json({ message: 'Course not found!! Please check the course make sure its all in uppercase, course are case sensitive' })
    }
})

/*
1.GET (Fetch all data)
2.GET/POST with query param of /course
3.GET/POST with query param of /online-course
4.POST where the classrooms is assigned
5.PUT to update the classrooms/ change the classroom
6.DELETE one of the course
*/


module.exports = classSchedule