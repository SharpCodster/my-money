import { Component, OnInit,OnDestroy, Inject } from '@angular/core';
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountDetailsIconDialog, IconAndColorDialog } from './account-details-icon-dialog.component';
import { AccountType, AccountTypeLabelMapping } from '../../core/models/account-type';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent extends BaseDetailsComponent<Account> {

  tipi: Record<AccountType, string> = AccountTypeLabelMapping

  constructor(
    protected notifier: NotifierService,
    protected service: AccountService,
    protected route: ActivatedRoute,
    private router: Router,
    protected logger: LoggerService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) { 
      super("Account", notifier, service, route, logger);
      
      
    }

    openDialog(): void {

      const dialogRef = this.dialog.open(AccountDetailsIconDialog, {
        width: '250px',
        data: {
          icon: this.form.controls["icon"].value,
          color: this.form.controls['color'].value
        }
      });
  
      dialogRef.afterClosed().subscribe((result: IconAndColorDialog) => {
        console.log('The dialog was closed');
        if (result) {
          this.form.controls["icon"].setValue(result.icon);
          this.form.controls["color"].setValue(result.color);
        }
      });
    }

    protected createForm(): FormGroup { 

      let fileTypes = Object.values(AccountType);

      const form = new FormGroup({
        order: new FormControl(0),
        name: new FormControl("", [Validators.required]),
        isActive: new FormControl(true),
        icon: new FormControl("bank"),
        color: new FormControl('#c32af3'),
        type: new FormControl(1),
        accountType: new FormControl(AccountType.Bank)
      });

      this.enableValidationRefresh(form);

      return form;
    }

    protected getModelName(model: Account): string {
      return this.form.controls.name.value;
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


