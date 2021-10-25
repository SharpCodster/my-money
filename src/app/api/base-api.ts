import { ApiService } from './api.service';
import { UrlHelperService } from '../core/helpers/url.helper';
import { Observable } from 'rxjs';

export class BaseApi<TModel> {

  constructor(
    protected baseUrl: string,
    protected apiService: ApiService,
    protected urlHelperService: UrlHelperService
  ) { }

  findAll$(): Observable<TModel[]> {
    const url = this.relativeApiUrl();
    return this.apiService.get$(url);
  }

  getData$(gridState: any) {
    const url = this.relativeApiUrl();
    return this.apiService.get$(url + '?' + this.toDataSourceRequestString(gridState));
  }

  getDataAssigned$(gridState: any) {
    const url = this.relativeApiUrl();
    return this.apiService.get$(url + '/queue?' + this.toDataSourceRequestString(gridState));
  }

  findById$(id: number): Observable<TModel> {
    const url = this.relativeApiUrl(id);
    return this.apiService.get$(url);
  }

  create$(item: TModel): Observable<TModel> {
    const url = this.relativeApiUrl();
    return this.apiService.post$<TModel>(url, item);
  }

  update$(id: number, item: TModel): Observable<TModel> {
    const url = this.relativeApiUrl(id);
    return this.apiService.put$<TModel>(url, item);
  }

  delete$(id: number): Observable<Object> {
    const url = this.relativeApiUrl(id);
    return this.apiService.delete$(url);
  }

  deleteMany$(ids: number[], parameters: any): Observable<Object> {
    const url = this.urlHelperService.combine(this.baseUrl, 'delete');
    const payload = {
      ids: ids
    };
    return this.apiService.post$(url, payload, parameters);
  }

  public buildRelativeUrl(...params: any[]): string {
    let url = '';
    params.forEach(segment => {
      url = this.urlHelperService.combine(url, segment.toString());
    });
    return url;
  }

  protected relativeApiUrl(...params: any[]): string {
    return this.buildRelativeUrl(this.baseUrl, ...params);
  }

  protected absoluteApiUrl(...params: any[]): string {
    const relativeApiUrl = this.buildRelativeUrl(...params);
    return this.urlHelperService.combine(this.apiService.baseUrl, relativeApiUrl);
  }


  private toDataSourceRequestString(gridState: any) {
      return "cacca";
  }
  
}
