import { Events } from "./Events";
import Axios, { AxiosResponse } from "axios";

export class Collection<T, K> {
  models: T[] = [];
  events: Events = new Events();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get emit() {
    return this.events.emit;
  }

  fetch(): void {
    Axios.get<AxiosResponse<K[]>>(this.rootUrl)
      .then((res: AxiosResponse) => {
        res.data.forEach((user) => this.models.push(this.deserialize(user)));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
