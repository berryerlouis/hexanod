export default class Message {
    params;
    cluster;
    command;
    size;
    params;

    constructor(message) {
        this.type = message.type;
        this.cluster = message.cluster;
        this.command = message.command;
        this.size = message.size;
        this.params = message.params;
    }
};