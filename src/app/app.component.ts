import { Component } from '@angular/core';
import { ConfigService } from './services/configuration/config.service';
import { AuthService } from './services/security/authentication/auth.service';
import { VKMContext } from './services/security/authentication/auth-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  textContent: string = 'Esperando datos de sesión...';
  isContextFound: boolean = false;
  Context: VKMContext | undefined;

  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authentication();
  }

  private authentication(): void {
    this.authService.listenForAuthentication();
    this.authService.contextReceivedObservable.subscribe((data) => {
      this.isContextFound = data;
      const ses = sessionStorage.getItem('context');
      if (!(ses === null || ses === undefined)) {
        this.Context = JSON.parse(ses);
        this.textContent = JSON.stringify(this.Context, null, 2);
      }
    });
  }
}
