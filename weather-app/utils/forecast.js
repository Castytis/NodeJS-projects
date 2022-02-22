const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=874307797ccfec28a5e6e79b5d9a4c76&query='
    + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true}, (err, res) => {
        if (err){
            callback('Unable to connect to location service.')
        } else if (res.body.error){
            callback('Unable to find location.')
        } else {
            callback(undefined, 
                res.body.current.weather_descriptions[0] 
                + ". It is currently " 
                + res.body.current.temperature 
                + " degrees outside. Feels like " 
                + res.body.current.feelslike
                 + " degrees outside.")
        }
    })
}

module.exports = forecast;