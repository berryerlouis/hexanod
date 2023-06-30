import { SerialPort } from 'serialport';
import { Protocol } from './Protocol';
import { Clusters, MessageType } from './Cluster';
import { Messages } from './Messages';
import { Message } from './Message';

export class SerialPortBluetooth extends Messages {
    portName: string;
    baudRate: number;
    port: SerialPort | null;
    buffer: string;

    public callbackRead: ((data: Message) => void) | undefined;

    public constructor(portName: string, baudRate = 115200) {
        super();
        this.portName = portName;
        this.baudRate = baudRate;
        this.port = null;
        this.buffer = '';
        new Clusters();
        setInterval(() => {
            if (!this.isWaiting()) {
                let message: Message = this.getCurrent();
                if (message) {
                    this.doAction();
                    this.write(message);
                }
            }
        }, 10);
    }

    public connect(callback: (success: boolean) => void) {
        if (!this.port) {
            this.port = new SerialPort({ path: this.portName, baudRate: this.baudRate });

            this.port.on('open', () => {
                if (callback) {
                    callback(true);
                }
            });

            this.port.on('data', (data) => {
                this.buffer += data.toString();

                const startMarker = "<";
                const endMarker = ">";
                const frames = this.buffer.split(endMarker);
                if (this.buffer.endsWith(endMarker)) {
                    frames.pop();

                    for (const frameData of frames) {
                        if (frameData.startsWith(startMarker)) {
                            const frame: Message = Protocol.decode(frameData + endMarker);
                            if (frame) {
                                console.log("<= " + frame.toString());
                                const sentMessage = this.getCurrent();
                                if (sentMessage && sentMessage.callback) {
                                    sentMessage.callback(frame);
                                    if (frame.type !== MessageType.CLUSTER) {
                                        this.actionDone();
                                        this.dequeue();
                                    }
                                }
                                else {
                                    console.error('ffff')
                                }
                                if (this.callbackRead) {
                                    this.callbackRead(frame);
                                }
                                this.buffer = this.buffer.substring((frameData + endMarker).length);
                            }
                            else {
                                console.error('Erreur de split de trame !');
                            }
                        }
                        else {
                            this.buffer = this.buffer.substring((frameData + endMarker).length);
                        }
                    }
                }
            });

            this.port.on('error', (err) => {
                if (callback) {
                    callback(false);
                }
            });
        }
        else {
            if (this.port.isOpen) {
                callback(true);
            }
        }
    }

    public read(callback: (data: Message) => void) {
        this.callbackRead = callback;
    }

    public sendMessage(message: Message, callback: (data: Message) => void) {
        message.callback = callback;
        this.enqueue(message);
    }

    public disconnect() {
        if (!this.port) {
            return;
        }

        this.port.close((err) => {
            if (err) {
                console.error('Erreur lors de la fermeture du port série :', err.message);
            } else {
                console.log(`Déconnexion du port ${this.portName}`);
                this.port = null;
            }
        });
    }

    private write(message: Message) {
        if (!this.port) {
            return;
        }

        this.port.write(Protocol.encode(message), (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture des données :', err.message);
            } else {
                console.log('=> ' + message.toString());
            }
        });
    }
}