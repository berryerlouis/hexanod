export class Clusters {
    private static clusters: Array<Cluster> = [];

    constructor() {
        Clusters.clusters.push(
            new Cluster(
                ClusterName.GENERAL, '00',
                [
                    new Command(ClusterGeneral.VERSION, '00'),
                    new Command(ClusterGeneral.START_PERIODIC, '01'),
                    new Command(ClusterGeneral.STOP_PERIODIC, '02')
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.BEHAVIOR, '01',
                [
                    new Command(ClusterBehavior.GET_POSITION, '00'),
                    new Command(ClusterBehavior.SET_POSITION, '01'),
                    new Command(ClusterBehavior.SET_ROTATION_TRANSLATION, '02'),
                    new Command(ClusterBehavior.SET_WALK, '03'),
                    new Command(ClusterBehavior.GET_WALK, '04'),
                    new Command(ClusterBehavior.SET_GROUND_SIZE, '05'),
                    new Command(ClusterBehavior.GET_GROUND_SIZE, '06'),
                    new Command(ClusterBehavior.SET_ELEVATION, '07'),
                    new Command(ClusterBehavior.GET_ELEVATION, '08'),
                    new Command(ClusterBehavior.SET_FEELING, '09'),
                    new Command(ClusterBehavior.GET_FEELING, '0A'),
                    new Command(ClusterBehavior.SET_SPEED, '0B'),
                    new Command(ClusterBehavior.GET_SPEED, '0C'),
                    new Command(ClusterBehavior.SET_AMPLITUDE, '0D'),
                    new Command(ClusterBehavior.GET_AMPLITUDE, '0E'),
                    new Command(ClusterBehavior.SET_DIRECTION, '0F'),
                    new Command(ClusterBehavior.GET_DIRECTION, '10'),
                    new Command(ClusterBehavior.START_SCAN, '11')
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.IMU, '02',
                [
                    new Command(ClusterImu.GET_THRESHOLD, '00'),
                    new Command(ClusterImu.SET_THRESHOLD, '01'),
                    new Command(ClusterImu.GET_ROLL_PITCH_YAW, '02'),
                    new Command(ClusterImu.GET_ROLL, '03'),
                    new Command(ClusterImu.GET_PITCH, '04'),
                    new Command(ClusterImu.GET_YAW, '05')
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.DETECTION, '03',
                [
                    new Command(ClusterDetection.ULTRASON_GET_THRESHOLD, '00'),
                    new Command(ClusterDetection.ULTRASON_SET_THRESHOLD, '01'),
                    new Command(ClusterDetection.ULTRASON_GET_DISTANCE, '02'),
                    new Command(ClusterDetection.LAZER_GET_THRESHOLD, '03'),
                    new Command(ClusterDetection.LAZER_SET_THRESHOLD, '04'),
                    new Command(ClusterDetection.LAZER_GET_DISTANCE, '05')
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.SERVOS, '04',
                [
                    new Command(ClusterServo.STATUS_SERVO, '00'),
                    new Command(ClusterServo.ENABLE_SERVO, '01'),
                    new Command(ClusterServo.SERVO_READ, '02'),
                    new Command(ClusterServo.SERVO_WRITE, '03'),
                    new Command(ClusterServo.SERVO_MIN_READ, '04'),
                    new Command(ClusterServo.SERVO_MIN_WRITE, '05'),
                    new Command(ClusterServo.SERVO_MAX_READ, '06'),
                    new Command(ClusterServo.SERVO_MAX_WRITE, '07'),
                    new Command(ClusterServo.SERVO_READ_ALL, '08')
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.LEG, '05',
                [
                    new Command(ClusterLeg.GET_LEG_XYZ, '00'),
                    new Command(ClusterLeg.SET_LEG_XYZ, '01'),
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.DISPLAY, '06',
                [
                ]
            )
        );
        Clusters.clusters.push(
            new Cluster(
                ClusterName.HEAD, '07',
                [
                ]
            )
        );
    }



    public static findClusterByCommandName(command: string): Cluster | undefined {
        let clusterFound: Cluster;
        Clusters.clusters.forEach(cluster => {
            cluster.commands.forEach(cmd => {
                if (command === cmd.name) {
                    clusterFound = cluster;
                }
            });
        });
        return clusterFound;
    }

    public static findClusterByCode(code: string): Cluster | undefined {
        const clusterFound = Clusters.clusters.find(cluster => cluster.code === code);
        return clusterFound;
    }

    public static findCommandByCommandName(command: string): Command | undefined {
        let commandFound: Command;
        Clusters.clusters.forEach(cluster => {
            cluster.commands.forEach(cmd => {
                if (command === cmd.name) {
                    commandFound = cmd;
                }
            });
        });
        return commandFound;
    }

    public static findCommandByCode(cluster: Cluster, code: string): Command | undefined {
        const commandFound = cluster.commands.find(command => command.code === code);
        return commandFound;
    }
}


export class Cluster {
    code: string;
    name: ClusterName;
    commands: Array<Command>;
    constructor(name: ClusterName, code: string, commands: Array<Command>) {
        this.name = name;
        this.code = code;
        this.commands = commands;
    }
}

export class Command {
    code: string;
    name: ClusterCommand;
    constructor(name: ClusterCommand, code: string) {
        this.name = name;
        this.code = code;
    }
}



export enum MessageType {
    ACK = 'ACK',
    NACK = 'NACK',
    CLUSTER = 'CLUSTER',
}

export enum ClusterName {
    GENERAL = 'GENERAL',
    BEHAVIOR = 'BEHAVIOR',
    IMU = 'IMU',
    DETECTION = 'DETECTION',
    SERVOS = 'SERVOS',
    LEG = 'LEG',
    DISPLAY = 'DISPLAY',
    HEAD = 'HEAD'
}

export enum ClusterGeneral {
    VERSION = 'VERSION',
    START_PERIODIC = 'START_PERIODIC',
    STOP_PERIODIC = 'STOP_PERIODIC'
}

export enum ClusterBehavior {
    GET_POSITION = 'GET_POSITION',
    SET_POSITION = 'SET_POSITION',
    SET_ROTATION_TRANSLATION = 'SET_ROTATION_TRANSLATION',
    SET_WALK = 'SET_WALK',
    GET_WALK = 'GET_WALK',
    SET_GROUND_SIZE = 'SET_GROUND_SIZE',
    GET_GROUND_SIZE = 'GET_GROUND_SIZE',
    SET_ELEVATION = 'SET_ELEVATION',
    GET_ELEVATION = 'GET_ELEVATION',
    SET_FEELING = 'SET_FEELING',
    GET_FEELING = 'GET_FEELING',
    SET_SPEED = 'SET_SPEED',
    GET_SPEED = 'GET_SPEED',
    SET_AMPLITUDE = 'SET_AMPLITUDE',
    GET_AMPLITUDE = 'GET_AMPLITUDE',
    SET_DIRECTION = 'SET_DIRECTION',
    GET_DIRECTION = 'GET_DIRECTION',
    START_SCAN = 'START_SCAN',
}

export enum ClusterImu {
    GET_THRESHOLD = 'GET_THRESHOLD',
    SET_THRESHOLD = 'SET_THRESHOLD',
    GET_ROLL_PITCH_YAW = 'GET_ROLL_PITCH_YAW',
    GET_ROLL = 'GET_ROLL',
    GET_PITCH = 'GET_PITCH',
    GET_YAW = 'GET_YAW'
}

export enum ClusterDetection {
    ULTRASON_GET_THRESHOLD = 'ULTRASON_GET_THRESHOLD',
    ULTRASON_SET_THRESHOLD = 'ULTRASON_SET_THRESHOLD',
    ULTRASON_GET_DISTANCE = 'ULTRASON_GET_DISTANCE ',
    LAZER_GET_THRESHOLD = 'LAZER_GET_THRESHOLD',
    LAZER_SET_THRESHOLD = 'LAZER_SET_THRESHOLD',
    LAZER_GET_DISTANCE = 'LAZER_GET_DISTANCE'
}

export enum ClusterServo {
    STATUS_SERVO = 'STATUS_SERVO',
    ENABLE_SERVO = 'ENABLE_SERVO',
    SERVO_READ = 'SERVO_READ',
    SERVO_WRITE = 'SERVO_WRITE',
    SERVO_MIN_READ = 'SERVO_MIN_READ',
    SERVO_MIN_WRITE = 'SERVO_MIN_WRITE',
    SERVO_MAX_READ = 'SERVO_MAX_READ',
    SERVO_MAX_WRITE = 'SERVO_MAX_WRITE',
    SERVO_READ_ALL = 'SERVO_READ_ALL'
}

export enum ClusterLeg {
    GET_LEG_XYZ = 'GET_LEG_XYZ',
    SET_LEG_XYZ = 'SET_LEG_XYZ',
}

export enum ClusterDisplay {
}

export enum ClusterHead {
}

export type ClusterCommand = ClusterGeneral | ClusterBehavior | ClusterImu | ClusterDetection | ClusterServo | ClusterLeg | ClusterDisplay | ClusterHead;



