import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UrlHelperService } from '../helpers/url.helper';
import { LoggerService } from '../logger/log.service';
import { Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private isInitialized: boolean = false;
  private configuration: Configuration | null = null;

  constructor(
    private http: HttpClient,
    private urlHelper: UrlHelperService,
    private logger: LoggerService
  ) {
  }

  public init(configurationUrl: string): Observable<Configuration> {
    this.logger.debug('Initializing ConfigurationService...');

    return this
      .http
      .get<Configuration>(configurationUrl)
      .pipe(
        map(result => {
          this.configuration = this.createConfiguration(result);
          this.logger.info('ConfigurationService successfully initialized.', this.configuration);
          this.isInitialized = true;
          return this.configuration;
        }));
  }

  public get() {
    if (!this.isInitialized) {
      throw Error('Configuration Service is not yet initialized. Call init() before get().');
    }
    return this.configuration;
  }

  private createConfiguration(result: Configuration): Configuration {
    return {
      apiUrl: this.urlHelper.trimTrailingSlash(result.apiUrl),
      loginUrl: this.urlHelper.trimTrailingSlash(result.loginUrl) 
    };
  }
}
