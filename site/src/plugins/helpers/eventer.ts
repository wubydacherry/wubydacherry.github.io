export type EventerSubsciber<T> = (arg: T) => void;

export class Eventer<T> {
    subscribers: EventerSubsciber<T>[] = [];

    subscribe(subscriber: EventerSubsciber<T>) {
        this.subscribers.push(subscriber);
        return this.unsubscribe.bind(this, subscriber);
    }

    unsubscribe(subscriber: EventerSubsciber<T>) {
        this.subscribers = this.subscribers.filter((x) => x !== subscriber);
    }

    dispatch(arg: T) {
        this.subscribers.forEach((x) => x(arg));
    }
}
