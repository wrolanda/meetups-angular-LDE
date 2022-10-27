import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'meetups-angular-LDE';

  loading$ = this.loadingService.loading$;

  public get isAdmin() {
    return this.authService.isAdmin;
  }

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService
  ) {}
}
