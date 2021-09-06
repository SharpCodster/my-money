
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationAppState, NotificationEntry, NotificationEntryLevel } from './notifier';

@Injectable({
    providedIn: 'root'
})
export class NotifierService {

    private notificationSubject$ = new Subject<NotificationEntry>();
    private appStateSubject$ = new BehaviorSubject<NotificationAppState>(null);

    notification$ = this.notificationSubject$.asObservable();
    appState$ = this.appStateSubject$.asObservable();
    isBusy$ = this.appState$.pipe(
        map(_ => _ === NotificationAppState.Busy)
    );

    constructor() {
        this.appStateSubject$.next(NotificationAppState.Ready);
    }

    busy() {
        this.appStateSubject$.next(NotificationAppState.Busy);
    }

    unbusy() {
        this.appStateSubject$.next(NotificationAppState.Ready);
    }

    success(message: string) {
        this.notificationSubject$.next({ level: NotificationEntryLevel.Success, message: message });
    }

    info(message: string) {
        this.notificationSubject$.next({ level: NotificationEntryLevel.Info, message: message });
    }

    warning(message: string) {
        this.notificationSubject$.next({ level: NotificationEntryLevel.Warning, message: message });
    }

    error(message: string) {
        this.notificationSubject$.next({ level: NotificationEntryLevel.Error, message: message });
    }
}
