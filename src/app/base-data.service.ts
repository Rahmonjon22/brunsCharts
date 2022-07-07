import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BaseDataService {

  baseUrl: string='';
  constructor(private http: HttpClient) {

    this.baseUrl = environment.baseUrl;
  }

  makeGetCall(path: string): Observable<any> {

    return this.http.get(this.constructUrl(path))
  }

  private constructUrl(path: string) {
    return this.baseUrl + path;
  }
}
