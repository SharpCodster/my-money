import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
//import { NotificationService, Type } from '@progress/kendo-angular-notification';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/logger/log.service';
import { NotifierService } from '../../core/notifier/notifier.service';
import { NotificationEntry, NotificationEntryLevel } from '../../core/notifier/notifier';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  private destroyed$ = new Subject();

  loading: boolean;

  constructor(
    private logger: LoggerService,
    private notifier: NotifierService,
    private authService: AuthService,
    //private notification: NotificationService,
    private router: Router
  ) {
    this.logger.debug('AuthorizationGuard: ShellComponent ctor!!')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
    this.notifier.busy();

    this.notifier
      .isBusy$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        setTimeout(() => {
          this.loading = _;
          this.logger.info('ShellComponent, loading$: ' + this.loading);
        });
      });

    this.subscribeToNotifications();

    this.router.events.subscribe(
      e => {
        if (e instanceof NavigationStart) {
          this.notifier.busy();
        }
        if (e instanceof NavigationEnd) {
          this.notifier.unbusy();
        }
      }
    );

    this.notifier.unbusy();
  }

  ngOnDestroy(): void {

    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private subscribeToNotifications() {

    this.notifier
      .notification$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => this.handleNotificationEntry(_));
  }

  private handleNotificationEntry(entry: NotificationEntry): void {

    const displayTime = 250;
    const hideAfter = 5000;
    let type = NotificationEntryLevel[entry.level];
    type = type && type.toLowerCase();

    // this.notification.show({
    //   content: entry.message,
    //   cssClass: '',
    //   animation: { type: 'fade', duration: displayTime },
    //   position: { horizontal: 'center', vertical: 'top' },
    //   type: { style: this.getNotificationType(entry), icon: true },
    //   closable: false,
    //   hideAfter: hideAfter
    // })

    // this.snackBar.open('Cannonball!!', 'Splash', {
    //   horizontalPosition: 'right',
    //   verticalPosition: 'top',
    //   //duration: 10000
    // });

  }

  private getNotificationType(entry: NotificationEntry) {
    switch (entry.level) {
      case NotificationEntryLevel.Error:
        return 'error';
      case NotificationEntryLevel.Info:
        return 'info';
      case NotificationEntryLevel.Success:
        return 'success';
      case NotificationEntryLevel.Warning:
        return 'warning';
      default:
        return 'none';
    }
  }

}
