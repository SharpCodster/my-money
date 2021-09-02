import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggerService } from './core/logger/log.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MyMoney';

  constructor(
    private logger: LoggerService
    ) {

    this.logger.debug('AppComponent ctor!!')
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
