import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryGroupService } from 'src/app/api/my-money/category-group.service';
import { CategoryService } from 'src/app/api/my-money/category.service';
import { TagService } from 'src/app/api/my-money/tag.service';
import { TransactionService } from 'src/app/api/my-money/transaction.service';
import { Category } from 'src/app/core/models/category';
import { CategoryGroup } from 'src/app/core/models/category-group';
import { Tag } from 'src/app/core/models/tag';
import { Transaction } from 'src/app/core/models/transaction';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  constructor(
    private srvice: TransactionService,
    private router: Router) { }

  displayedColumns: string[] = ['valueDate', 'registrationDate', 'account', 'category', 'inflow', 'outflow', 'payee', 'notes', 'tags', 'isClosed'];

  dataSource = new MatTableDataSource<Transaction>();

  ngOnInit(): void {
    this.srvice.findAll$().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<Transaction>(result.data);
      }
    );
  }

  goToDetails(row: Transaction): void {
    console.log(row);
    this.router.navigate(['/Transactions', row.id]);
  }

  create(): void {
    console.log("new");
    this.router.navigate(['/Transactions/new']);
  }
}
