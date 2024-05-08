import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnDestroy {
  user: any;
  department: string = '';
  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    address: new FormControl(''),
    department: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
  });

  constructor(
    private _dialogService: DialogService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig
  ) {
    this.user = this._config.data.user;
    this.department = this._config.data.department;
  }

  ngOnInit() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    } else {
      this.userForm.get('department')?.setValue(this.department);
    }
  }

  reset() {
    this.userForm.reset();
  }

  addUser() {
    console.log(this.userForm.valid);
    if (this.userForm.valid) {
      console.log(this._ref);
      this._ref?.close(this.userForm.value);
    }
  }

  ngOnDestroy() {
    if (this._ref) {
      this._ref.close();
    }
  }
}
