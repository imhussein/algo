import { Callback } from "./Events";
import { HasID } from "./Sync";

interface ModelAttributes<T> {
  set(update: T): void;
  get<K extends keyof T>(propName: K): T[K];
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): Promise<T>;
  save(data: T): Promise<T>;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  emit(eventName: string, data: any): void;
}

export class Model<T extends HasID> {
  emit = this.events.emit;
  on = this.events.on;
  get = this.attributes.get;

  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  set(update: T): void {
    this.attributes.set(update);
    this.emit("change", update);
  }

  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Can't fetch without id");
    }
    this.sync.fetch(id).then((props: T): void => {
      this.set(props);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((props: T) => {
      this.emit("save", props);
    });
  }
}
