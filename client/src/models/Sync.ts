import Axios, { AxiosResponse, AxiosPromise } from "axios";

export interface HasID {
  id?: number;
}

export class Sync<T extends HasID> {
  constructor(public rootUrl: string) {}

  fetch(id: number): Promise<T> {
    return new Promise((resolve, reject) => {
      Axios.get<AxiosResponse<T>>(`${this.rootUrl}/${id}`)
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  save = (data: T): Promise<T> => {
    const { id } = data;
    return new Promise((resolve, reject) => {
      let res: AxiosPromise;
      if (id) {
        res = Axios.put<AxiosResponse<T>>(`${this.rootUrl}/${id}`, data);
      } else {
        res = Axios.post<AxiosResponse<T>>(this.rootUrl, data);
      }
      res
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
