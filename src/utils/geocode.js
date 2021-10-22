const request = require('request')//require('request') also works since we're still inside the weather-app directory

// Geocoding: Process of converting address to coordinate pair
// Address -> lat/long -> weather
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGltaTI0IiwiYSI6ImNrdWxmMGJqaTEycTgzM282OGh6czI1N3kifQ.QyTXYYmuLmIEcx6FAUAyrg&limit=2`

    request({ url, json: true }, (error, response={}) => {
        const { body } = response
        const { body : {features} = {}} = response //Object destructuring lol. Visit /desktop/John Smilga JS Nuggets
        // const { features } = body
        if (error) {
            callback('Unable to connect to the location services!', undefined)
        } else if (features.length === 0) {
            callback('Invalid location detected. Try another search')
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}


module.exports = geocode //Note that this fxn can be accessed directly in app.js