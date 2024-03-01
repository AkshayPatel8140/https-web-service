const express = require('express')
const data = require('../database/class-schedule.json')
const classSchedule = express.Router()
const fs = require('fs')

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

// 3.GET/POST with query param of /online-course
classSchedule.get('/online-courses', (req, res) => {
    let onlineCourse = data.filter(c => c.Classroom.includes('Online'))
    if (onlineCourse) {
        res.json(onlineCourse)
    } else {
        res.status(404).json({ message: 'There are no online classes at the moment, Please connect to faculty!' })
    }
})

// 4.POST where the classrooms is assigned
classSchedule.post('/classroom', (req, res) => {
    const { course } = req.body
    if (!course) {
        return res.status(400).json({ message: 'Course is not provided' })
    }
    let courseObject = data.find(c => c.Course === course)
    res.json({ classroom: courseObject?.Classroom })
})

// 5.PUT to update the classrooms/ change the classroom
classSchedule.put('/update/:course', (req, res) => {
    const { course } = req.params;
    const { newInstructor, token } = res.body;

    //Token === admin
    if (token === 'admin') {
        const index = data.findIndex(c => c.Course === course)

        data[index].Instructor = newInstructor;
        const filePath = path.join(__dirname, 'updated-class-schedule.json', 'class-schedule')
        fs.writeFileSync(filePath, JSON.stringify)

        res.json({ message: 'Instructor Updated!!' })
    }
})

// 6.DELETE one of the course



module.exports = classSchedule