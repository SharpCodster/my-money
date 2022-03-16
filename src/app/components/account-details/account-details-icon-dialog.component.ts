import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IconAndColorDialog {
  icon: string,
  color: string
}

@Component({
    selector: 'account-details-icon-dialog',
    templateUrl: 'account-details-icon-dialog.component.html',
  })
  export class AccountDetailsIconDialog {

    material_icons = ['home',
    'account_circle',
    'delete',
    'shopping_cart',
    'favorite',
    'description',
    'lock',
    'verified',
    'paid',
    'shopping_bag',
    'trending_up',
    'credit_card',
    'account_balance',
    'account_balance_wallet',
    'work',
    'store',
    'savings',
    'receipt',
    'payment',
    'leaderboard',
    'view_in_ar',
    'card_giftcard',
    'timeline',
    'loyalty',
    'euro_symbol',
    'trending_down',
    'anchor',
    'rocket',
    'assured_workload',
    'local_offer',
    'lunch_dining'];

    data: IconAndColorDialog;

    constructor(
      public dialogRef: MatDialogRef<AccountDetailsIconDialog>,
      @Inject(MAT_DIALOG_DATA) data: IconAndColorDialog
    ) {
      this.data = data;
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    selected(matIcon: string): void {
      this.data.icon = matIcon;
    }

    save(): void {
      this.dialogRef.close(this.data);
    }

  }
