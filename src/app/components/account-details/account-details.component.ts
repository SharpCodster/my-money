import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BaseApi } from '../../api/base-api';
import { NotifierService } from '../../core/notifier/notifier.service';
import { LoggerService } from '../../core/logger/log.service';
import { Account } from '../../core/models/account';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BaseDetailsComponent } from '../../shared/components/base-detail.component';
import { AccountService } from 'src/app/api/my-money/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent extends BaseDetailsComponent<Account> {

  constructor(
    protected notifier: NotifierService,
    protected service: AccountService,
    protected route: ActivatedRoute,
    private router: Router,
    protected logger: LoggerService,
    private fb: FormBuilder
    ) { 
      super("Account", notifier, service, route, logger);

    }

  
    protected createForm(): FormGroup {
      
/*
order: number,
    name: string,
    isActive: boolean,
    icon: string,
    color: string,
    type: AccountType
*/

      const form = new FormGroup({
        order: new FormControl(0),
        name: new FormControl("", [Validators.required]),
        isActive: new FormControl(true),
        icon: new FormControl("bank"),
        color: new FormControl('#c32af3'),
        type: new FormControl(1),
      });

      this.enableValidationRefresh(form);

      return form;
    }

    protected getModelName(model: Account): string {
      return "cacca";
    }
    protected navigateToDetail(id: number): void {
      this.router.navigate(['accounts', id ]);
    }
    protected navigateToList(): void {
      this.router.navigate(['accounts']);
    }
    

    getErrorMessage() {
      if (this.form.controls.name.hasError('required')) {
        return 'You must enter a value';
      }
  
      return "error";//this.form.controls.hasError('email') ? 'Not a valid email' : '';
    }
}
