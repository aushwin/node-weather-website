console.log('Client side js file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    const location = search.value
    fetch(`/weather?address=${location}`, {
        mode: 'no-cors'
    }).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = 'Loading'
            if (data.err) {
                console.log(data.err)
                messageOne.textContent = data.err
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

})