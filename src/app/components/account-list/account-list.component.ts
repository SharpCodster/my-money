import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from '../../api/my-money/account.service';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  constructor(
    private acountService: AccountService,
    private router: Router) { }

  displayedColumns: string[] = ['name', 'balanceSheetType', 'cashFlowType', 'isActive'];

  dataSource = new MatTableDataSource<Account>();

  ngOnInit(): void {
    this.acountService.findAll$().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<Account>(result.data);
      }
    );
  }

  goToDetails(row: Account): void {
    console.log(row);
    this.router.navigate(['/accounts', row.id]);
  }

  create(): void {
    console.log("new");
    this.router.navigate(['/accounts/new']);
  }
}
