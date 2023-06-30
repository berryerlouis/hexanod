import { MessageType, Clusters } from "./Cluster";
import { Message } from "./Message";

export class Protocol {

    private static HEADER = '0';
    private static NO_ERROR = 'OK';
    private static ERROR = 'KO';

    constructor() {
    }


    public static encode(message: Message): string {
        let messageToEncode = '<' + this.HEADER;
        messageToEncode += message.cluster.code;
        messageToEncode += message.command.code;
        messageToEncode += (!message.size ? '00' : message.size);
        if (message.params) {
            for (let param in message.params) {
                messageToEncode += param;
            }
        }
        messageToEncode += '>';
        return messageToEncode;
    }

    public static decode(data: string): Message | undefined {
        if (data.substring(0, 1) === "<" && data.substring(data.length - 1) === ">") {
            data = data.substring(1);
            data = data.substring(0, data.length - 1);

            let frame: Message = new Message();

            if (data === this.NO_ERROR) {
                frame.type = MessageType.ACK;
            }
            else if (data.substring(0, 2) === this.NO_ERROR) {
                frame.type = MessageType.NACK;
            }
            else {
                frame.type = MessageType.CLUSTER;
                data = data.substring(1);
                frame.cluster = Clusters.findClusterByCode(data.substring(0, 2));
                data = data.substring(2);
                frame.command = Clusters.findCommandByCode(frame.cluster, data.substring(0, 2));
                data = data.substring(2);
                frame.size = parseInt(data.substring(0, 2), 16);
                data = data.substring(2);

                if (frame.size > 0) {
                    frame.params = [];
                }

                for (let index = 0; index < frame.size; index++) {
                    frame.params.push(data.substring(0, 1));
                    data = data.substring(1);
                };

                if (data.length > 0) {
                    console.error('Erreur de decodage de trame !');
                }
            }
            return frame;
        }
        return undefined;
    }
}

