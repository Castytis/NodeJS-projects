const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
    + encodeURIComponent(address) 
    + '.json?access_token=pk.eyJ1Ijoia2FzdHl0aXMiLCJhIjoiY2s5YTc3aWl3MDV0YTNuczdqdmdzd3F6eCJ9.YMbCyrrOPeh8FYPkTiLVrg&limit=1'

    request({ url: url, json: true}, (err, res) =>{
        if (err){
            callback('Unable to connect to location service.')
        } else if (res.body.features.length === 0){
            callback('Unable to find location.')
        } else {
            callback(undefined, {
                latitude:  res.body.features[0].center[0],
                longitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;