class Message {
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

class MessageType {
    static ACK = 'ACK';
    static CLUSTER = 'CLUSTER';
}

class Cluster {
    static GENERAL = 'GENERAL';
    static BEHAVIOR = 'BEHAVIOR';
    static IMU = 'IMU';
    static DETECTION = 'DETECTION';
    static SERVOS = 'SERVOS';
    static LEG = 'LEG';
    static DISPLAY = 'DISPLAY';
    static HEAD = 'HEAD';
}

class ClusterGeneral {
    static VERSION = 'VERSION';
    static START_PERIODIC = 'START_PERIODIC';
    static STOP_PERIODIC = 'STOP_PERIODIC';
}

export { Message, MessageType, Cluster, ClusterGeneral };