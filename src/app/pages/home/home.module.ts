import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
  declarations: [
    HomePage,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputGroupAddonModule,
    InputGroupModule,
    ProgressSpinnerModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  providers: [DialogService, ConfirmationService],
  exports: []
})
export class HomeModule {}
