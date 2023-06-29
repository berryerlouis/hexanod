
export enum FrameType {
    ACK = 'ACK',
    NACK = 'NACK',
    CLUSTER = 'CLUSTER',
}

export enum Cluster {
    GENERAL = '00',
    BEHAVIOR = '01',
    IMU = '02',
    DETECTION = '03',
    SERVOS = '04',
    LEG = '05',
    DISPLAY = '06',
    HEAD = '07',
}

export enum Command {
    GENERAL_VERSION = '00',
    GENERAL_START_PERIODIC = '01',
    GENERAL_STOP_PERIODIC = '02',
}
