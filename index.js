'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'Sajeel') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})


app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
	    }
    }
    res.sendStatus(200)
})

const token = "EAAVERwDjW4sBALpZAQIJhq7s1ddZA3wdMI3uI4PJtFitGBNNXMDrZCoRnHjgsd3D8w7ESSUWWkyLNtMqVVG2QT7TZBGtYS9y1WcnEVYDWS5QZCGxsxLG3oDnM7MgwiVuimY1xCtZBd1IR1oRLY2dBCw03bJ5bsFNHgTHSrJSepogZDZD"



// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})