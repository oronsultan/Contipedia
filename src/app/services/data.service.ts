import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Idata } from '../../models/iData';

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    // return require('../../assets/data/data.json');
    return this.http.get<Idata[]>("../../assets/data/data.json");
  }

  updateDate() {
    // return this.http.put('' {data});
  }
}

// put ...
