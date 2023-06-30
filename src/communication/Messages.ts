import { Message } from "./Message";


export class Messages {
    private messages: Message[];
    private wait: boolean = false;

    constructor() {
        this.messages = [];
    }

    public enqueue(message: Message): void {
        this.messages.push(message);
    }

    public dequeue(): Message | undefined {
        return this.messages.shift();
    }

    public isEmpty(): boolean {
        return this.messages.length === 0;
    }

    public clear(): void {
        this.messages = [];
    }

    public size(): number {
        return this.messages.length;
    }

    public isWaiting(): boolean {
        return this.wait;
    }

    public doAction(): void {
        this.wait = true;
    }

    public actionDone(): void {
        this.wait = false;
    }

    public getCurrent(): Message {
        return this.messages[0];
    }
}
