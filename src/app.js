const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serrve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'retro'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'retro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help page',
        name: 'retro'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address '
        })
    }

    geocode(req.query.address, (err, data) => {
        if (err) return res.send({
            err
        })

        forecast(data, (err, {
            location,
            weather_desc,
            temperature,
            precip
        }) => {
            if (err) return res.send({
                err
            })
            res.send({
                forecast: `${weather_desc}. It is currently ${temperature} degrees out. There is ${precip}% chance of rain.`,
                location: location,
                temperature,
                precip,
                address: req.query.address
            })
        })
    })



})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message404: 'Help article not Found !',
        name: 'retro'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message404: 'Page not Found !',
        name: 'retro'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})