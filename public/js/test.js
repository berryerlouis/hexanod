import { Message, MessageType, Cluster, ClusterGeneral } from './Message.js';
import { Console } from './Console.js';

const socket = io();
const console = new Console('console')

$('#myButton').click(function (e) {
    socket.emit('buttonClick');
});


socket.on('messageApp', (message) => {
    $('#console').val(message + '\n' + $('#console').val());
});

socket.on('messageHexapod', (message) => {
    console.addMessage(message);
    if (message.type === MessageType.CLUSTER) {
        if (message.cluster.name === Cluster.GENERAL) {
            if (message.command.name === ClusterGeneral.VERSION) {
                $('#hexanod-version').text(message.params[0] + '.' + message.params[1]);
            }
        }
    }
    else {

    }
});
