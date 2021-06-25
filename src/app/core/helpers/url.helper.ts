import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {

  public readonly baseUrl: string;

  constructor() {

    this.baseUrl = '';
  }

  public trimTrailingSlash = (url: string): string => url && url.replace(/\/$/, '');

  public trimLeadingSlash = (url: string): string => url && url.replace(/^\//, '');

  public combine(url: string, segment: string): string {

    url = this.trimTrailingSlash(url || '');
    segment = this.trimLeadingSlash(segment || '');

    const combinedUrl = `${url}/${segment}`;

    return this.trimTrailingSlash(combinedUrl);
  }

  public combineAll(...params: any[]): string {
    let url = '';
    params.forEach(segment => {
      url = this.combine(url, segment.toString());
    });
    return url;
  }
}