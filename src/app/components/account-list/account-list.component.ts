import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from '../../api/my-money/account.service';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountsListComponent implements OnInit, AfterViewInit {

  constructor(
    private acountService: AccountService,
    private router: Router) { }

  displayedColumns: string[] = ['order', 'icon', 'name', 'type', 'isActive'];

  dataSource = new MatTableDataSource<Account>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.acountService.findAll$().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Account>(result);
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