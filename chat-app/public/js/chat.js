const socket = io()
const $messageForm = document.querySelector('#message-form')
const $sendButton = document.querySelector('button')
const $messageInput = $messageForm.querySelector('input')
const $shareLocationButton = document.querySelector('#share-location')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (locationUrl) => {
    console.log(locationUrl)
    const html = Mustache.render(locationTemplate, {
        location: locationUrl.url,
        createdAt: moment(locationUrl.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $sendButton.setAttribute('disabled', 'disabled')
    
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message , (error) => {
        $sendButton.removeAttribute('disabled')
        $messageInput.value = ''
        $messageInput.focus()

        if (error){
            return console.log(error)
        }
        console.log('Delivered')
    })
})

$shareLocationButton.addEventListener('click', () =>{
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    $shareLocationButton.setAttribute('disabled', 'disabled')
    
    navigator.geolocation.getCurrentPosition((position) => {
        let location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        socket.emit('sendLocation', location, (acknowledge) => {
            $shareLocationButton.removeAttribute('disabled')
            console.log(acknowledge)
        })
    })
})