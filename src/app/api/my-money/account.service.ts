import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { BaseApi } from '../base-api';
import { Account } from '../../core/models/account';
import { UrlHelperService } from '../../core/helpers/url.helper';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApi<Account> {

    constructor(
        apiService: ApiService,
        urlHelperService: UrlHelperService
        ) {
        super('Accounts', apiService, urlHelperService);
    }

//   findAllCitiesByDistrictId$(id: number): Observable<City[]> {
//     let url = this.urlHelperService.combine(appRoutes.districts, id.toString());
//     url = this.urlHelperService.combine(url, 'cities');
//     return this.apiService.get$(url);
//   }

}
