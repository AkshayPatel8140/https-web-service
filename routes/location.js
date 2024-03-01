const express = require('express')
const data = require('../database/class-schedule.json')
const location = express.Router()
const fs = require('fs')


// 1.GET (Fetch all data)
location.get('/user-location', (req, res) => {
    console.log(req)
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('user-agent')

    let data = {
        userIp: userIp,
        userDevice: userDevice
    }
    res.json(data)
})



module.exports = location