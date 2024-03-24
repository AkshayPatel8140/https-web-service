import express from 'express'
import { getGitHubData } from '../controller/getGitHubData.js';

const githubClassSchedule = express.Router()
var classRoomData = []

// 1.GET (Fetch all data)
githubClassSchedule.get('/courses', async (req, res) => {
    classRoomData = await getGitHubData();
    res.json(classRoomData);
})

// 2.GET/POST with query param of /course
githubClassSchedule.get('/courses/:course/', async (req, res) => {
    classRoomData = await getGitHubData();
    const { course } = req.params
    let foundCourse = classRoomData.find(c => c.Course === course)
    if (foundCourse) {
        res.json(foundCourse)
    } else {
        res.status(404).json({ message: 'Course not found!! Please check the course make sure its all in uppercase, course are case sensitive' })
    }
})

// 3.GET/POST with query param of /online-course
githubClassSchedule.get('/online-courses', async (req, res) => {
    classRoomData = await getGitHubData();
    let onlineCourse = classRoomData.filter(c => c.Classroom.includes('Online'))
    if (onlineCourse) {
        res.json(onlineCourse)
    } else {
        res.status(404).json({ message: 'There are no online classes at the moment, Please connect to faculty!' })
    }
})

// 4.POST where the classrooms is assigned
githubClassSchedule.post('/classroom', async (req, res) => {
    classRoomData = await getGitHubData();
    const { course } = req.body
    if (!course) {
        return res.status(400).json({ message: 'Course is not provided' })
    }
    let courseObject = classRoomData.find(c => c.Course === course)
    res.json({ classroom: courseObject?.Classroom })
})


export default githubClassSchedule