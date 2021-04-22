const request = require('request')

const geocode = (address, next) => {
    let access_token_geocoding = 'pk.eyJ1IjoiYXVzaHduIiwiYSI6ImNrbml1c3czZzByZWEydnBndjRpcnBiZjUifQ.YpL_oMWCHmpSwRKr7wF_4w'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token_geocoding}&limit=1`

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) next('Unable to Connect to Server', undefined)
        else if (body.features.length === 0) next('Could\'nt find location', undefined)
        else {
            next(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode