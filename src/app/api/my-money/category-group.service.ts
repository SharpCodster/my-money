import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { BaseApi } from '../base-api';
import { UrlHelperService } from '../../core/helpers/url.helper';
import { CategoryGroup } from 'src/app/core/models/category-group';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService extends BaseApi<CategoryGroup> {

    constructor(
        apiService: ApiService,
        urlHelperService: UrlHelperService
        ) {
        super('CategoryGroups', apiService, urlHelperService);
    }

//   findAllCitiesByDistrictId$(id: number): Observable<City[]> {
//     let url = this.urlHelperService.combine(appRoutes.districts, id.toString());
//     url = this.urlHelperService.combine(url, 'cities');
//     return this.apiService.get$(url);
//   }

}
