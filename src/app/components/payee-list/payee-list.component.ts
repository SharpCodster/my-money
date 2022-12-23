import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryGroupService } from 'src/app/api/my-money/category-group.service';
import { CategoryService } from 'src/app/api/my-money/category.service';
import { PayeeService } from 'src/app/api/my-money/payee.service';
import { TagService } from 'src/app/api/my-money/tag.service';
import { Category } from 'src/app/core/models/category';
import { CategoryGroup } from 'src/app/core/models/category-group';
import { Payee } from 'src/app/core/models/payee';
import { Tag } from 'src/app/core/models/tag';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-payee-list',
  templateUrl: './payee-list.component.html',
  styleUrls: ['./payee-list.component.scss']
})
export class PayeeListComponent implements OnInit {

  constructor(
    private srvice: PayeeService,
    private router: Router) { }

  displayedColumns: string[] = ['name'];

  dataSource = new MatTableDataSource<Payee>();

  ngOnInit(): void {
    this.srvice.findAll$().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<Payee>(result.data);
      }
    );
  }

  goToDetails(row: Payee): void {
    console.log(row);
    this.router.navigate(['/Payees', row.id]);
  }

  create(): void {
    console.log("new");
    this.router.navigate(['/Payees/new']);
  }
}
