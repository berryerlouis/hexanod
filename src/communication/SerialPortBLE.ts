import { SerialPort } from 'serialport';
import { Frame, Protocol } from './Protocol';

export class SerialPortBLE {
    portName: string;
    baudRate: number;
    port: SerialPort | null;
    buffer: string;

    constructor(portName: string, baudRate = 115200) {
        this.portName = portName;
        this.baudRate = baudRate;
        this.port = null;
        this.buffer = '';
    }

    connect() {
        this.port = new SerialPort({ path: this.portName, baudRate: this.baudRate });

        this.port.on('open', () => {
            console.log(`Connexion établie sur le port ${this.portName}`);
        });

        this.port.on('data', (data) => {
            this.buffer += data.toString();
            if (this.buffer.substring(this.buffer.length - 1) === ">") {
                console.log('Reception des données :', this.buffer);
                for (let index = 0; index < this.buffer.split('>').length; index++) {
                    let frame: Frame = Protocol.decode(this.buffer.split('>')[index] + '>');
                    if (frame) {
                        if (this.handleData) {
                            this.handleData(frame);
                        }
                        this.buffer = '';
                    }
                }
            }


        });

        this.port.on('error', (err) => {
            console.error('Erreur de communication :', err.message);
        });
    }

    read(callback: (data: Frame) => void) {
        this.handleData = callback;
    }

    write(data: string) {
        if (!this.port) {
            console.error('Le port série n\'est pas connecté.');
            return;
        }

        this.port.write(data, (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture des données :', err.message);
            } else {
                console.log('Ecriture des données :', data);
            }
        });
    }

    disconnect() {
        if (!this.port) {
            console.error('Le port série n\'est pas connecté.');
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

    handleData: ((data: Frame) => void) | undefined;
}