import { SerialPortBLE } from './communication/SerialPortBLE';
import { Frame, Protocol } from './communication/Protocol';
import { Command, Cluster } from './communication/Cluster';

export class Hexapod {
    constructor() {

    }

    public connect() {
        const bluetoothSerialPort = new SerialPortBLE("COM7");
        bluetoothSerialPort.connect();
        bluetoothSerialPort.write(Protocol.encode(Cluster.GENERAL, Command.GENERAL_VERSION));
        bluetoothSerialPort.read((data: Frame) => {
            console.log(data.type);
        });
    }
}