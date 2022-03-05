const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const message = e.target.elements.message.value
    
    socket.emit('sendMessage', message, (error) => {
        if (error){
            return console.log(error)
        }
        console.log('Delivered')
    })
})

document.querySelector('#share-location').addEventListener('click', () =>{
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        let location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        socket.emit('sendLocation', location, (acknowledge) => {
            console.log(acknowledge)
        })
    })
})