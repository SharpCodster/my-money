import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
//import { NotificationService, Type } from '@progress/kendo-angular-notification';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/logger/log.service';
import { NotifierService } from '../../core/notifier/notifier.service';
import { NotificationEntry, NotificationEntryLevel } from '../../core/notifier/notifier';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavigationToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();


  private destroyed$ = new Subject();

  loading: boolean;

  constructor(
    private logger: LoggerService,
    private authService: AuthService,
    private router: Router
  ) {
    this.logger.debug('NavigationToolbarComponent: ShellComponent ctor!!')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}