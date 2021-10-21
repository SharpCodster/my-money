import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth-guard';
import { ShellComponent } from '../shell/shell/shell.component';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

// import { SharedModule } from '../shared/shared.module';
// import { appRoutes } from '../core/models/app-routes';
// import { NavMenuComponent } from './nav-menu/nav-menu.component';
// import { WelcomeComponent } from '../shared/components/welcome/welcome.component';
// import { ConfirmEmailComponent } from '../shared/components/confirm-email/confirm-email.component';

const featureModuleRoutes: Routes = [
  {
    path: 
    'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('../components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
//   {
//     path: appRoutes.detractionFiles,
//     canActivate: [AuthGuard],
//     loadChildren: () => import('../features/detraction-files/detraction-files.module').then(m => m.DetractionFilesModule)
//   },
//   {
//     path: appRoutes.settings,
//     canActivate: [AuthGuard],
//     loadChildren: () => import('../features/settings/settings.module').then(m => m.SettingsModule)
//   },
//   {
//     path: appRoutes.estimate,
//     canActivate: [AuthGuard],
//     loadChildren: () => import('../features/estimate/estimate.module').then(m => m.EstimateModule)
//   },
];

const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [

      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      //{ path: 'confirm-email', component: ConfirmEmailComponent },
      //{ path: 'welcome', component: WelcomeComponent },
      ...featureModuleRoutes
    ]
  }
];

@NgModule({
  declarations: [
    //NavMenuComponent,
    ShellComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(shellRoutes),
    //SharedModule,
    //MatSnackBar
  ],
  exports: [
    RouterModule,
    ShellComponent,
    //SharedModule,
    //MatSnackBar,
  ]
})
export class ShellModule { }
