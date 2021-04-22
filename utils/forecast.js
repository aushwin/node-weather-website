const request = require('request')


const forecast = ({
    lattitude,
    longitude,
    location
}, next) => {
    let access_token_weatherstack = '6b28c391e0507e7f6d0b351358916da0'
    const url = `http://api.weatherstack.com/current?access_key=${access_token_weatherstack}&query=${lattitude},${longitude}`

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) next('Unable to Connect to Server', undefined)
        else if (body.error) next('Unable to fetch information')
        else {
            next(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                precip: body.current.precip,
                location,
            })
        }
    })

}

module.exports = forecast