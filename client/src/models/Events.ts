export type Callback = (data: any) => void;

interface IEvent {
  [key: string]: Callback[];
}

export class Events {
  private events: IEvent = {};

  on = (eventName: string, callback: Callback): void => {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  };

  emit = (eventName: string, data: any): void => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback: Callback): void => {
        callback(data);
      });
    }
  };
}
