import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryGroupService } from 'src/app/api/my-money/category-group.service';
import { CategoryGroup } from 'src/app/core/models/category-group';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-category-group-list',
  templateUrl: './category-group-list.component.html',
  styleUrls: ['./category-group-list.component.scss']
})
export class CategoryGroupListComponent implements OnInit {

  constructor(
    private srvice: CategoryGroupService,
    private router: Router) { }

  displayedColumns: string[] = ['order', 'name'];

  dataSource = new MatTableDataSource<CategoryGroup>();

  ngOnInit(): void {
    this.srvice.findAll$().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<CategoryGroup>(result.data);
      }
    );
  }

  goToDetails(row: Account): void {
    console.log(row);
    this.router.navigate(['/CategoryGroups', row.id]);
  }

  create(): void {
    console.log("new");
    this.router.navigate(['/CategoryGroups/new']);
  }
}
