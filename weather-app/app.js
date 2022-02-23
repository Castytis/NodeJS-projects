const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

let location = process.argv[2];

if (location){
    geoCode(location, (error, { latitude, longitude, location} = {}) =>{
        if (error){
            console.log(error)
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(location)
                    console.log(forecastData)
                }
            })
        }
    })
} else {
    console.log("Location not provided.")
}