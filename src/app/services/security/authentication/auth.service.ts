import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/config.service';
import { VKMContext } from './auth-interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public context: VKMContext | undefined;
  private origin: string = '';
  private contextReceivedSubject = new Subject<boolean>();

  constructor(private configService: ConfigService) {
    this.origin = configService.getConfigOriginCORS();
  }

  public listenForAuthentication(): void {
    this.setSessionContextUndefined();
    this.addListenerForAuthMessage();
  }

  public authenticate(context: VKMContext | undefined): boolean {
    this.setSessionContextData(context);
    return true;
  }

  get contextReceivedObservable(): Observable<boolean> {
    return this.contextReceivedSubject.asObservable();
  }

  private addListenerForAuthMessage(): void {
    window.addEventListener('message', (event) => {
      console.log(event);
      try {
        this.context = JSON.parse(event.data);
        this.authenticate(this.context);
        this.contextReceivedSubject.next(true);
      } catch (error) {
        // Por ahora nada
      }
    });
  }

  private setSessionContextUndefined(): void {
    this.context = undefined;
    sessionStorage.setItem('context', '');
  }

  private setSessionContextData(context: VKMContext | undefined): void {
    const contextToString = JSON.stringify(context);
    sessionStorage.setItem('context', contextToString);
  }
}
