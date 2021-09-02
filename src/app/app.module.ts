import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Configuration } from './core/configuration/configuration';

import { environment } from './../environments/environment';

import { LoggerService } from './core/logger/log.service';
import { ConfigurationService } from './core/configuration/configuration.service';

export function onAppInit(
  logService: LoggerService,
  configurationService: ConfigurationService,
  http: HttpClient) {

    logService.info('APP INITIALIZER STARTING');
    
    const promise = new Promise((resolve, reject) => {

      http.get('/api/GetConfigUrl').toPromise().then(
        (resp: any) => {
          configurationService.init(resp.url).toPromise().then(
            (resp: Configuration) => {
              resolve(resp);
            }
          )
        }, (reason: any) => {
          configurationService.init(environment.configurationUrl).toPromise().then(
            (resp: Configuration) => {
              resolve(resp);
            }
          )
      });
    });

    return () => promise;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      deps: [LoggerService, ConfigurationService, HttpClient],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    private loggerService: LoggerService
  ) {
    this.loggerService.info('APP STARTING');
  }

}
