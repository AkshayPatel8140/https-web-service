const express = require('express')
const studentData = require('../database/student-info.json')
const students = express.Router()
useragent = require('express-useragent');

const getUserIp = (req) => {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress
}
const getUserDevice = (req) => {
    let source = req.headers['user-agent'];
    let ua = useragent.parse(source);
    return (ua.platform != 'unknown') ? ua.platform : ua.browser
}


// 1. GET  / to retrieve all the student-info
students.get('/student-info', (req, res) => {
    let responseData = {
        userIp: getUserIp(req),
        userDevice: getUserDevice(req),
        studentsData: studentData,
    }
    res.json(responseData)
})

// 2. POST /to retrieve your information based on 'student-id'
students.post('/student', (req, res) => {
    const { studentId } = req.body
    const studentObject = studentData.find(s => s.student_id == studentId)
    let responseData = {
        userIp: getUserIp(req),
        userDevice: getUserDevice(req),
        studentData: studentObject,
    }
    if (studentObject) {
        res.json({ ...responseData, message: 'Student founded' })
    } else {
        res.status(404).json({ ...responseData, message: `Student not found with the given Student ID = ${studentId}` })
    }
})

// 3. POST /to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
students.post('/studentList-by-course', (req, res) => {
    const { course } = req.body;
    const studentsList = studentData.filter(s => { return s.courses.find(c => c.course_id.includes(course)) != undefined });
    let responseData = {
        userIp: getUserIp(req),
        userDevice: getUserDevice(req),
        studentList: studentsList.map(s => s.student_id)
    }

    if (studentsList.length == 0) {
        res.status(404).json({ ...responseData, message: `In the given course ${course} currently not any student enrolled!!` })
    } else {
        res.json({ ...responseData, message: 'List of students found!!' })
    }
})

// 4. POST /to retrieve who has taken the courses you have taken except CS548. (Hint: Pass your student-id  for example for Rahel its CS522, find out who has taken this course) one of the logic could be this 
students.post('/studentList-by-same-course', (req, res) => {
    const { studentId } = req.body;
    const responseData = { userIp: getUserIp(req), userDevice: getUserDevice(req), courses: [] }
    const studentObject = studentData.find(s => s.student_id === studentId);
    let studentList = []


    if (studentObject) {
        for (let i = 0; i < studentObject?.courses?.length; i++) {
            const course = studentObject?.courses[i];
            if (course.course_id != 'CS548') {
                studentList = studentData.filter(s => { return s.courses.some(c => c.course_id != 'CS548' && c.course_id.includes(course.course_id)) })
                responseData.courses.push({ ...course, studentList: studentList.map(s => s.student_id) })
            }
        }
        res.json(responseData)

    } else {
        res.status(404).json({ ...responseData, message: `Student not found with the given Student ID = ${studentId}` })
    }
})


module.exports = students