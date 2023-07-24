import { MessageType } from './Message.js';
export class Console {
    console = undefined;

    constructor(idConsole) {
        this.console = $('#' + idConsole);
    }

    addText(text) {
        this.console.val(text + '\n' + this.console.val());
    }

    addMessage(message) {
        if (message.type === MessageType.CLUSTER) {
            let consoleMessage = message.type + ': ' + message.cluster.name + ' => ' + message.command.name;
            if (message.params.length > 0) {
                consoleMessage += '[';
                message.params.forEach(element => {
                    consoleMessage += element + ',';
                });
                consoleMessage = consoleMessage.substring(0, consoleMessage.length - 1);
                consoleMessage += ']';
            }
            this.addText(consoleMessage);
        }
    }

    clear() {
        this.console.val('');
    }
}