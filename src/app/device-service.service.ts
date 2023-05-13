import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DeviceService {
  protected basePath = 'https://localhost:44334';
  private readonly apiVersion = 'v1';
  constructor(
    protected httpClient: HttpClient
  ) {
  }

  public getCamera(): Observable<Array<any>> {
    let queryParameters = new HttpParams();
    let requestHeaders: HttpHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.append('Content-Type', 'application/json ');

    return this.httpClient.get<Array<any>>(
      `${this.basePath}/api/Device/camera`,
      {
        params: queryParameters,
        headers: requestHeaders
      }
    );
  }

  public getAC(): Observable<Array<any>> {
    let queryParameters = new HttpParams();
    let requestHeaders: HttpHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.append('Content-Type', 'application/json ');

    return this.httpClient.get<Array<any>>(
      `${this.basePath}/api/Device/ac`,
      {
        params: queryParameters,
        headers: requestHeaders
      }
    );
  }
  public getAlarm(): Observable<Array<any>> {
    let queryParameters = new HttpParams();
    let requestHeaders: HttpHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.append('Content-Type', 'application/json ');

    return this.httpClient.get<Array<any>>(
      `${this.basePath}/api/Device/alarm`,
      {
        params: queryParameters,
        headers: requestHeaders
      }
    );
  }
  public getLight(): Observable<Array<any>> {
    let queryParameters = new HttpParams();
    let requestHeaders: HttpHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.append('Content-Type', 'application/json ');

    return this.httpClient.get<Array<any>>(
      `${this.basePath}/api/Device/light`,
      {
        params: queryParameters,
        headers: requestHeaders
      }
    );
  }
  public getHistory(fromDate: Date | undefined, toDate: Date | undefined): Observable<Array<any>> {
    let queryParameters = new HttpParams();
    let requestHeaders: HttpHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.append('Content-Type', 'application/json ');
    if (fromDate) {
      queryParameters = queryParameters.set('fromDate', fromDate.toISOString());
    }
    else {
      queryParameters = queryParameters.set('fromDate', new Date().toISOString());
    }
    if (toDate) {
      queryParameters = queryParameters.set('toDate', toDate.toISOString());
    }
    else {
      queryParameters = queryParameters.set('toDate', new Date().toISOString());
    }
    return this.httpClient.get<Array<any>>(
      `${this.basePath}/api/Device/history`,
      {
        params: queryParameters,
        headers: requestHeaders
      }
    );
  }

}
