import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryGroupService } from 'src/app/api/my-money/category-group.service';
import { CategoryService } from 'src/app/api/my-money/category.service';
import { TagService } from 'src/app/api/my-money/tag.service';
import { Category } from 'src/app/core/models/category';
import { CategoryGroup } from 'src/app/core/models/category-group';
import { Tag } from 'src/app/core/models/tag';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  constructor(
    private srvice: TagService,
    private router: Router) { }

  displayedColumns: string[] = ['name'];

  dataSource = new MatTableDataSource<Tag>();

  ngOnInit(): void {
    this.srvice.findAll$().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<Tag>(result.data);
      }
    );
  }

  goToDetails(row: Tag): void {
    console.log(row);
    this.router.navigate(['/Tags', row.id]);
  }

  create(): void {
    console.log("new");
    this.router.navigate(['/Tags/new']);
  }
}
