const path = require('path')
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = 3000;

const publicDirectory = path.join( __dirname + '../../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index' ,{
        title: "Weather App" 
    })
})

app.get('/about', (req, res) => {
    res.render('about' ,{
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help' ,{
        title: "Help"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started on ' + port + ' port')
})