import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HighscoresService {

  private apiserver = "https://freebee.fun/cgi-bin/scores";
  private  url = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.apiserver);
  }

  public sendGet(endpoint: string) {
    return this.httpClient.get(this.url + endpoint);
  }
}
