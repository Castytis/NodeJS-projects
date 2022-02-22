const request = require('request');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geoCode("Groningen", (error, data) =>{
    console.log(data)
})

forecast(20.800, 20.133, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

