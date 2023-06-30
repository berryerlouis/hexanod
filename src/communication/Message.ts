import { Cluster, Clusters, Command, MessageType } from "./Cluster";

export class Message {
    type?: MessageType;
    cluster?: Cluster;
    command?: Command;
    size?: number;
    params?: Array<string>;
    callback?: (data: Message) => void;
    constructor() {

    }

    build(command: string, params?: Array<string>): Message {
        this.cluster = Clusters.findClusterByCommandName(command);
        this.command = Clusters.findCommandByCommandName(command);
        if (params !== undefined) {
            this.size = params.length;
            this.params = params;
        }
        return this;
    }

    toString(): string {
        let message: string = '';
        if (this.type === MessageType.ACK) {
            message = MessageType.ACK;
        }
        else if (this.type === MessageType.NACK) {
            message = MessageType.NACK;
        }
        else {
            message += this.cluster.name;
            message += '->' + this.command.name;
            if (this.size) {
                message += ' ' + this.size;
                message += ' {';
                for (let index = 0; index < this.size; index++) {
                    message += ' ' + this.params[index];
                }
                message += ' }'
            }

        }
        return message;
    }
}