import { Command, Cluster, FrameType } from "./Cluster";


export class Frame {
    type?: string;
    cluster?: string;
    cmd?: string;
    size?: number;
    params?: Array<string>;
}

export class Protocol {

    private static HEADER = '0';
    private static NO_ERROR = 'OK';
    private static ERROR = 'KO';

    constructor() {
    }

    public static encode(cluster: Cluster, cmd: Command, size?: number, params?: Array<string>): string {
        return '<' + this.HEADER + cluster + cmd + (!size ? '00' : size) + '>';
    }

    public static decode(data: string): Frame | undefined {
        if (data.substring(0, 1) === "<" && data.substring(data.length - 1) === ">") {
            data = data.substring(1);
            data = data.substring(data.length - 1, 1);

            let frame: Frame = new Frame();

            if (data === this.NO_ERROR) {
                frame.type = FrameType.ACK;
            }
            else if (data.substring(0, 2) === this.NO_ERROR) {
                frame.type = FrameType.NACK;
                console.error('Erreur de trame : ' + data.substring(2));
            }
            else {
                frame.type = FrameType.CLUSTER;
                for (const cluster in Cluster) {
                    if (Cluster[cluster] === data.substring(0, 2)) {
                        data = data.substring(2);
                        frame.cluster = cluster;
                        break;
                    }
                };
                for (const cmd in Command) {
                    if (Command[cmd] === data.substring(0, 2)) {
                        data = data.substring(2);
                        frame.cmd = cmd;
                        break;
                    }
                };
                frame.size = parseInt(data.substring(0, 2));
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

