const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=874307797ccfec28a5e6e79b5d9a4c76&query='
    + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (err, { body}) => {
        if (err){
            callback('Unable to connect to location service.')
        } else if (body.error){
            callback('Unable to find location.')
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] 
                + ". It is currently " 
                + body.current.temperature 
                + " degrees outside. Feels like " 
                + body.current.feelslike
                 + " degrees outside.")
        }
    })
}

module.exports = forecast;