import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth-guard';
import { ShellComponent } from '../shell/shell/shell.component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AccountsListComponent } from '../components/account-list/account-list.component';
import { AccountDetailsComponent } from '../components/account-details/account-details.component';

import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedModule } from '../shared/shared.module';
// import { appRoutes } from '../core/models/app-routes';
// import { NavMenuComponent } from './nav-menu/nav-menu.component';
// import { WelcomeComponent } from '../shared/components/welcome/welcome.component';
// import { ConfirmEmailComponent } from '../shared/components/confirm-email/confirm-email.component';


const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [

      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'accounts', component: AccountsListComponent, canActivate: [AuthGuard] },
      { path: 'accounts/:id', component: AccountDetailsComponent, canActivate: [AuthGuard] },
      { path: 'accounts/new', component: AccountDetailsComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  declarations: [
    //NavMenuComponent,
    ShellComponent,
    DashboardComponent,
    AccountsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(shellRoutes),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
    //SharedModule
  ],
  exports: [
    RouterModule,
    ShellComponent,
    //SharedModule,
    //MatSnackBar,
  ]
})
export class ShellModule { }
