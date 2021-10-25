import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from './core/logger/log.service';
import { NotifierService } from './core/notifier/notifier.service';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MyMoney';

  constructor(
    private logger: LoggerService,
    private authService: AuthService,
    private router: Router,
    private notifier: NotifierService
    ) {

    this.logger.debug('AppComponent ctor!!')
  }
  
  ngOnInit() {

    this.logger.info('AppComponent, checking authentication...');

    this.authService.isLoggedIn().then((isAuthenticated: boolean) => {

      if (window.location.pathname !== '/login') {
        this.write('redirect', window.location.pathname);
      }

      if (isAuthenticated) {
        this.navigateToStoredEndpoint();
      } else {
        this.router.navigate(['/login']);
      }
    });

    this.notifier.unbusy();
  }

  ngOnDestroy(): void {
  }

  private navigateToStoredEndpoint() {
    const path = this.read('redirect');

    if (!path || this.router.url === path) {
      return;
    }

    if (path.toString().includes('/unauthorized')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
