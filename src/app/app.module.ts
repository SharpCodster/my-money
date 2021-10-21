import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Configuration } from './core/configuration/configuration';

import { environment } from './../environments/environment';

import { LoggerService } from './core/logger/log.service';
import { ConfigurationService } from './core/configuration/configuration.service';
import { LoginPageComponent } from './components/login-page/login-page.component';

import {  ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';

import { AuthService } from './core/auth/auth.service';

import { ShellModule } from './shell/shell.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export function onAppInit(
  logService: LoggerService,
  configurationService: ConfigurationService,
  http: HttpClient,
  authService: AuthService) {

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

const routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    //AppRoutingModule,
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true
      }
    ),
    ShellModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      deps: [LoggerService, ConfigurationService, HttpClient, AuthService],
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor,
      multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    private loggerService: LoggerService
  ) {
    this.loggerService.info('APP STARTING');
  }

}
