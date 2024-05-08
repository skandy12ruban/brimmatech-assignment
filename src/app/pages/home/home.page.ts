import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { groupBy } from 'lodash';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AddUserComponent } from './components/add-user/add-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  title = 'Home Page';

  dataSource: any = [];
  isDataLoading: boolean = false;

  displayedColumns = ['id', 'name', 'department', 'position'];

  constructor(
    private _httpClient: HttpClient,
    private _dialogService: DialogService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.isDataLoading = true;
    this._httpClient.get('/api/users').subscribe((data: any) => {
      this.dataSource = data;
      this.isDataLoading = false;
    });
  }

  addUser(department?: string, user?: any, index?: number) {
    const ref = this._dialogService.open(AddUserComponent, {
      header: user ? 'Edit User' : 'Add User',
      width: '70%',
      data: {
        user: user,
        department: department,
      },
    });

    ref.onClose.subscribe((data: any) => {
      if (data) {
        this.isDataLoading = true;
        if (user) {
          this._httpClient
            .patch(`/api/users/${user.id}`, data)
            .subscribe((response: any) => {
              this.dataSource = this.dataSource.map((value: any, i: number) =>
                value.id === data.id ? data : value
              );
              console.log(this.dataSource);
              this.isDataLoading = false;
            });
        } else {
          this._httpClient.post('/api/users', data).subscribe((response: any) => {
            this.dataSource = [...this.dataSource, data];
            this.isDataLoading = false;
          });
        }
      }
    });
  }

  updateUser(user: any, index: number) {
    this.addUser(user.department, user, index);
  }

  deleteUser(user: any, index: number) {
    this._confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._httpClient
          .delete(`/api/users/${user.id}`)
          .subscribe((data: any) => {
            this.dataSource = this.dataSource.filter(
              (value: any, i: number) => i !== index
            );
          });
      },
      reject: () => {},
    });
  }
}
