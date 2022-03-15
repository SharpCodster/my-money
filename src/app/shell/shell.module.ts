import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth-guard';
import { ShellComponent } from '../shell/shell/shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SiNoPipe } from '../shared/pipes/si-no';

import { NavigationToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AccountsListComponent } from '../components/account-list/account-list.component';
import { AccountDetailsComponent } from '../components/account-details/account-details.component';
import { AccountDetailsIconDialog } from '../components/account-details/account-details-icon-dialog.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxColorsModule } from 'ngx-colors';

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
    //ColorDirective,
    SiNoPipe,
    ShellComponent,
    NavigationToolbarComponent,
    DashboardComponent,
    AccountsListComponent,
    AccountDetailsComponent,
    AccountDetailsIconDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(shellRoutes),
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    FlexLayoutModule,
    NgxColorsModule

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
