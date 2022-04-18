const socket = io();
let user;
const chatMessage = document.getElementById("chatMessage")
swal.fire({
    title:"Nombre de usuario",
    input:"text",
    text:"Escribe el nombre con el que te conocerán..",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Necesito que escribas un nombre más largo.."
    }}).then(result =>{
        user = result.value
        socket.emit("registered", user)
    })


socket.on("newUser", (data) => {
    Swal.fire({
        icon:"success",
        text:"Un nuevo manco ha entrado al chat.",
        toast: true,
        position: "top-right"
    })
})
socket.on("log", data => {
    let log = document.getElementById("log")
    let messages = ""
    data.forEach(message => {
        messages = messages+ `<strong>${message.user} dice: </strong>${message.message} <br>`
        log.innerHTML = messages;
    });
})

chatMessage.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
        if (chatMessage.value.trim().length > 0 ) {
            socket.emit("message", {user, message:chatMessage.value.trim()})
            chatMessage.value = ""
        }
    }
})