import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
/*
import { ApiCallFailError, AppError, 
    
    BadRequestError, ForbiddenError, InternalServerError, 
    NotFoundError, UnauthorizedError } from '../error/app-error.models';
*/
import { AuthService } from '../core/auth/auth.service';
import { JsonHelper } from '../core/helpers/json.helper';
import { UrlHelperService } from '../core/helpers/url.helper';
import { LoggerService } from '../core/logger/log.service';
import { NotifierService } from '../core/notifier/notifier.service';
import { ConfigurationService } from '../core/configuration/configuration.service';
import { DownloadResult, UploadInfo, HttpStatusCode } from './api.model';

//import { ErrorDecoderService } from '../error/error-decoder.service';


@Injectable({
    providedIn: 'root'
})

export class ApiService {
  
    public get baseUrl(): string {
      return this.config.get().apiUrl;
    }
  
    constructor(
      private http: HttpClient,
      private urlHelper: UrlHelperService,
      private notifier: NotifierService,
      private authService: AuthService,
      //private oidcSecurityService: OidcSecurityService,
      private jsonHelperService: JsonHelper,
      //private errorDecoder: ErrorDecoderService,
      private log: LoggerService,
      protected config: ConfigurationService
    ) { }
  
    private getCommonHeaders(): { [key: string]: string; } {
        const token = this.authService.currentUserValue.token;

        return {
            'Authorization': `Bearer ${token}`,
            // Prevent IE11 caching GET call in Angular 2
            // ref: https://stackoverflow.com/a/44561162
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        };
    }
    
    private appendApiHeaders(headers: HttpHeaders, headersToAppend: { name: string, value: string | string[] }[] = []): HttpHeaders {
        
        const commonHeadersToAppend = this.getCommonHeaders();
        headers = <HttpHeaders>headers || new HttpHeaders();

        // set is immutable
        Object.keys(commonHeadersToAppend).forEach(name => {
            headers = headers.set(name, commonHeadersToAppend[name]);
        });

        headersToAppend.forEach(_ => {
            headers = headers.set(_.name, _.value);
        });

        return headers;
    }

    private buildUrl = (relativeUrl: string): string => `${this.baseUrl}/${this.urlHelper.trimLeadingSlash(relativeUrl)}`;
  
    public get$<T>(relativeUrl: string, parameters?: any): Observable<T> {
  
      const url = this.buildUrl(relativeUrl);
  
      const options = { headers: new HttpHeaders(), params: new HttpParams() };
      options.headers = this.appendApiHeaders(options.headers);
      options.params = this.appendParams(options.params, parameters);
  
      this.log.debug(`ApiService: executing GET ${url}`);
      this.notifier.busy();
  
      return this.http
        .get<T>(url, options)
        .pipe(
            map(res => this.jsonHelperService.clone(res)),
            // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
            tap(_ => this.log.debug(`ApiService: executed GET ${url} result`, _)),
            // Observable.throw is obsolete, replaced with throwError operator
            catchError(_ => throwError(this.handleError(url, 'GET', _))),
            finalize(() => this.notifier.unbusy())
        );
    }
  
    public getBlob$(relativeUrl: string, parameters?: any): Observable<Blob> {
        const url = this.buildUrl(relativeUrl);
  
        const options = { headers: new HttpHeaders(), params: new HttpParams(), responseType: <const>'blob' };
        options.headers = this.appendApiHeaders(options.headers);
        options.params = this.appendParams(options.params, parameters);
    
        this.log.debug(`ApiService: executing GETBLOB ${url}`);
        this.notifier.busy();
    
        return this.http
            .get(url, options)
            .pipe(
                // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
                tap(_ => this.log.debug(`ApiService: executed GETBLOB ${url} result`, _)),
                // Observable.throw is obsolete, replaced with throwError operator
                catchError(_ => throwError(this.handleError(url, 'GET', _))),
                finalize(() => this.notifier.unbusy())
        );
    }
  
    public post$<T>(relativeUrl: string, body?: any, parameters?: any): Observable<T> {
  
      const url = this.buildUrl(relativeUrl);
  
      const options = { headers: new HttpHeaders(), params: new HttpParams() };
      options.headers = this.appendApiHeaders(options.headers);
      options.params = this.appendParams(options.params, parameters);
  
      this.shiftDates(body);
  
      this.log.debug(`ApiService: executing POST ${url}`, body);
      this.notifier.busy();
  
      return this.http
        .post<T>(url, body, options)
        .pipe(
          map(res => this.jsonHelperService.clone(res)),
          // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
          tap(result => this.log.debug(`ApiService: executed POST ${url} result`, result)),
          // Observable.throw is obsolete, replaced with throwError operator
          catchError(_ => throwError(this.handleError(url, 'POST', _))),
          finalize(() => this.notifier.unbusy())
        );
    }
  
    public put$<T>(relativeUrl: string, body?: any, parameters?: any): Observable<T> {
  
      const url = this.buildUrl(relativeUrl);
  
      const options = { headers: new HttpHeaders(), params: new HttpParams() };
      options.headers = this.appendApiHeaders(options.headers);
      options.params = this.appendParams(options.params, parameters);
  
      this.shiftDates(body);
  
      this.log.debug(`ApiService: executing PUT ${url}`, body);
      this.notifier.busy();
  
      return this.http
        .put<T>(url, body, options)
        .pipe(
          map(res => this.jsonHelperService.clone(res)),
          // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
          tap(result => this.log.debug(`ApiService: executed PUT ${url} result`, result)),
          // Observable.throw is obsolete, replaced with throwError operator
          catchError(_ => throwError(this.handleError(url, 'PUT', _))),
          finalize(() => this.notifier.unbusy())
        );
    }
  
    public patch$<T>(relativeUrl: string, body?: any, parameters?: any): Observable<T> {
  
      const url = this.buildUrl(relativeUrl);
  
      const options = { headers: new HttpHeaders(), params: new HttpParams() };
      options.headers = this.appendApiHeaders(options.headers);
      options.params = this.appendParams(options.params, parameters);
  
      this.log.debug(`ApiService: executing PATCH ${url}`, body);
      this.notifier.busy();
  
      return this.http
        .patch<T>(url, body, options)
        .pipe(
          map(res => this.jsonHelperService.clone(res)),
          // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
          tap(result => this.log.debug(`ApiService: executed PATCH ${url} result`, result)),
          // Observable.throw is obsolete, replaced with throwError operator
          catchError(_ => throwError(this.handleError(url, 'PATCH', _))),
          finalize(() => this.notifier.unbusy())
        );
    }
  
    public delete$(relativeUrl: string, parameters?: any): Observable<Object> {
  
      const url = this.buildUrl(relativeUrl);
  
      const options = { headers: new HttpHeaders(), params: new HttpParams() };
      options.headers = this.appendApiHeaders(options.headers);
      options.params = this.appendParams(options.params, parameters);
  
      this.log.debug(`ApiService: executing DELETE ${url}`);
      this.notifier.busy();
  
      return this.http
        .delete(url, options)
        .pipe(
          // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
          tap(result => this.log.debug(`ApiService: executed DELETE ${url} result`, result)),
          // Observable.throw is obsolete, replaced with throwError operator
          catchError(_ => throwError(this.handleError(url, 'DELETE', _))),
          finalize(() => this.notifier.unbusy())
        );
    }
  
    public download$(relativeUrl: string, parameters?: any): Observable<DownloadResult> {
  
      const url = this.buildUrl(relativeUrl);
      const options = this.createDownloadOptions();
  
      options.headers = this.appendApiHeaders(<HttpHeaders>options.headers);
      options.params = this.appendParams(<HttpParams>options.params, parameters);
  
      this.log.debug(`ApiService: executing DOWNLOAD ${url}`);
      this.notifier.busy();
  
      return this.http
        .get(url, options)
        .pipe(
          // for tap reference: https://angular.io/tutorial/toh-pt6#tap-into-the-observable
          tap(result => this.log.debug(`ApiService: executed DOWNLOAD ${url} result`, result)),
          map(result => <DownloadResult>{ fileName: this.getFileNameFromReponse(result), content: result.body }),
          catchError((e: any) => this.parseBlobForError(url, 'GET', e)),
          tap(result => {
            if (result.error) {
              throw result.error;
            }
          }),
          finalize(() => this.notifier.unbusy())
        );
    }
  

    private appendParams(httpParams: HttpParams, parameters?: any, prefix?: string): HttpParams {
  
        if (!parameters) { return httpParams; }
    
        Object.keys(parameters).forEach(key => {
    
          const value = parameters[key];
          const paramName = `${prefix || ''}${key}`;
    
          if (value === undefined || value === null) { return; }
    
          if (this.isSimpleType(value)) {
    
            httpParams = httpParams.append(paramName, this.formatParamValue(value));
            return;
          }

          if (value instanceof Array) {
            Object.keys(value).forEach((arrayValue: string, index: number) => {
                // TODO TEST!
                let test = value[index];
                httpParams = this.appendParams(httpParams, test, `${paramName}[${index}].`);
            });
    
            return;
          }
    
          httpParams = this.appendParams(httpParams, value, `${paramName}.`);
        });
    
        return httpParams;
      }






  
    private isPrimitive(key: any) {
      return key !== Object(key);
    }
  
    // public handleInsertSucceded(resourceName: string, result: any): void {
    //   this.notifier.success(`${resourceName} inserted with success.`);
    // }
  
    // public handleInsertFailed(err: AppError): any {
    //   const message = this.errorDecoder.decodeError(err);
    //   this.notifier.error(`Insert failed: ${message}`);
    // }
  
    // public handleUpdateSucceded(resourceName: string, result: any): void {
    //   this.notifier.success(`${resourceName} updated with success.`);
    // }
  
    // public handleUpdateFailed(err: AppError): any {
    //   const message = this.errorDecoder.decodeError(err);
    //   this.notifier.error(`Update failed: ${message}`);
    // }
  
    // public handleDeleteSucceded(resourceName: string): void {
    //   this.notifier.success(`${resourceName} deleted with success.`);
    // }
  
    // public handleDeleteFailed(err: AppError): any {
    //   const message = this.errorDecoder.decodeError(err);
    //   this.notifier.error(`Delete failed: ${message}`);
    // }
  
    
    private isSimpleType(value: any): boolean {
  
      switch (typeof value) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'number':
          return true;
      }
  
      if (value instanceof Date) { return true; }
  
      return false;
    }
  
    private formatParamValue(value: any) {
  
      if (value instanceof Date) {
        return value.toISOString();
      }
  
      // todo: format date, etc... for querystring
      return `${value}`;
    }
  
    private createDownloadOptions(): {
      headers?: HttpHeaders | { [header: string]: string | string[]; };
      observe: 'response';
      params?: HttpParams | { [param: string]: string | string[]; };
      reportProgress?: boolean;
      responseType: 'blob';
      withCredentials?: boolean;
    } {
      // workaround needed to force typescript to accept the cast to the correct overload
      // of the http get method
      return {
        headers: new HttpHeaders(),
        params: new HttpParams(),
        observe: 'response',
        responseType: 'blob'
      };
    }
  
    private getFileNameFromReponse(response: HttpResponse<Blob>): string {
  
      let fileName = 'downloadedContent';
      const disposition = response.headers.get('Content-Disposition');
      if (disposition) {
  
        const fileNameRegex = /.*filename="?([^"]*)"?;.*/;
        const matches = fileNameRegex.exec(disposition);
  
        if (matches != null && matches[1]) {
          fileName = matches[1];
        }
      }
  
      return fileName;
    }
  
  
    private handleError(url: string, verb: string, err: any): any {
  
      this.log.error(`ApiService: error ${err.status} executing ${verb} ${url}`, err);
      return this.decodeError(err);
    
    }
  
    public decodeError(err: any): any {
  
      const message = this.getErrorMessage(err);
      const error = err.error || {};
  
      switch (err.status) {
  
        // An HTTP response code of 0 indicates that the AJAX request was cancelled.
        // This can happen either from a timeout, XHR abortion or a firewall stomping on the request.
        // A timeout is common, it means the request failed to execute within a specified time.
        case 0: {
          this.log.error(`ApiService: error converted to ApiCallFailError`);
          return { message: message };
        }
  
        case HttpStatusCode.BAD_REQUEST: {
          this.log.error(`ApiService: error converted to BadRequestError`);
          return { key: error.key, data: error.data, message: message};
        }
  
        case HttpStatusCode.UNAUTHORIZED: {
          this.log.error(`ApiService: error converted to UnauthorizedError`);
          return { message: message };
        }
  
        case HttpStatusCode.FORBIDDEN: {
          this.log.error(`ApiService: error converted to ForbiddenError`);
          return { message: message };
        }
  
        case HttpStatusCode.NOT_FOUND: {
          this.log.error(`ApiService: error converted to NotFoundError`);
          return { message: message };
        }
  
        case HttpStatusCode.INTERNAL_SERVER_ERROR: {
          this.log.error(`ApiService: error converted to InternalServerError`);
          return { message: message };
        }
  
        default: {
          this.log.error(`ApiService: error code ${err.status} converted generic to ApiCallFailError`);
          return { message: message };
        }
      }
    }
  
    private getErrorMessage(err: any): string {
  
      const error = err.error;
  
      if (!error) {
        return err.message;
      }
  
      if (typeof (error) === 'string') {
        return error;
      }
  
      return error.message || err.message;
    }
  
    // Parse the error from blob to string since on download the
    // "responseType: blob" forces a conversion of the error string to blob.
    // See:
    // https://stackoverflow.com/questions/48500822/how-to-handle-error-for-response-type-blob-in-httprequest
    private parseBlobForError(url: string, verb: string, error: any): Observable<DownloadResult> {
  
      const _self = this;
      const rdr = new FileReader();
      const observable = new Observable<DownloadResult>(observer => {
        rdr.onloadend = (e) => {
          error.error = rdr.result;
  
          // Since we need to pass the error as if it was data, and an Observable.throw gets swallowed
          // we need an horrible hack to manually intercept the error in the success method of the subscriber in upload.service.ts
          observer.next(<DownloadResult>{ error: _self.handleError(url, verb, error) });
          observer.complete();
        };
      });
      rdr.readAsText(error.error);
      return observable;
    }
  
  
    private shiftDates(object: any) {
      if (object === null || object === undefined) {
        return object;
      }
  
      if (typeof object !== 'object') {
        return object;
      }
  
      for (const key of Object.keys(object)) {
        const value = object[key];
        if (value instanceof Date) {
          object[key] = new Date(
            Date.UTC(
              value.getFullYear(),
              value.getMonth(),
              value.getDate(),
              value.getHours(),
              value.getMinutes(),
              value.getSeconds()
            ));
        } else if (typeof value === 'object') {
          this.shiftDates(value);
        }
      }
    }
  }
  
//   @Injectable({
//     providedIn: 'root'
//   })
//   export class IdentityApiService extends ApiService {
  
//     public get baseUrl(): string {
  
//       return this.config.get().identityApiUrl;
//     }
  
//   }
  