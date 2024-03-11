import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Config } from './config';
import * as configJson from '../../../assets/config.json';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config | undefined = configJson;

  constructor() {}

  getConfigOriginCORS(): string {
    return this.config == undefined ? '' : this.config.allowCors;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log the error for debugging
      return of(result as T); // return an empty result or default value
    };
  }
}
