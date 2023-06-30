import { SerialPortBluetooth } from './communication/SerialPortBLE';
import { ClusterGeneral } from './communication/Cluster';
import { Message } from './communication/Message';

export default class Hexapod {
    bluetoothSerialPort: SerialPortBluetooth = undefined;
    constructor(portName: string = 'COM6') {
        this.bluetoothSerialPort = new SerialPortBluetooth(portName);
    }

    public connect(callback) {
        this.bluetoothSerialPort.connect((success) => {
            callback(success);
        });
    }

    public getVersion(callback) {
        this.bluetoothSerialPort.sendMessage(
            new Message().build(ClusterGeneral.VERSION),
            (message: Message) => {
                callback(message);
            }
        );
    }


    public startPeriodic() {
        this.bluetoothSerialPort.sendMessage(
            new Message().build(ClusterGeneral.START_PERIODIC),
            (message: Message) => {
            }
        );
    }


    public stopPeriodic() {
        this.bluetoothSerialPort.sendMessage(
            new Message().build(ClusterGeneral.STOP_PERIODIC),
            (message: Message) => {
            }
        );
    }
}