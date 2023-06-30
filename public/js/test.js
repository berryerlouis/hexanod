import Message from './Message.js';

const socket = io();

$('#myButton').click(function (e) {
    socket.emit('buttonClick');
});


socket.on('messageApp', (message) => {
    $('#mytext').val(message + '\n' + $('#mytext').val());
});

socket.on('messageHexapod', (message) => {
    let mes = new Message(message);
    $('#mytext').val(message.type + '\n' + $('#mytext').val());
});
