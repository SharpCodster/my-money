import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryGroupService } from 'src/app/api/my-money/category-group.service';
import { CategoryService } from 'src/app/api/my-money/category.service';
import { Category } from 'src/app/core/models/category';
import { CategoryGroup } from 'src/app/core/models/category-group';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(
    private srvice: CategoryService,
    private router: Router) { }

  displayedColumns: string[] = ['order', 'name', 'group'];

  dataSource = new MatTableDataSource<Category>();

  ngOnInit(): void {
    this.srvice.findAll$().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<Category>(result.data);
      }
    );
  }

  goToDetails(row: Category): void {
    console.log(row);
    this.router.navigate(['/Categories', row.id]);
  }

  create(): void {
    console.log("new");
    this.router.navigate(['/Categories/new']);
  }
}
