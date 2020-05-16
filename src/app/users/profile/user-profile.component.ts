import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../user';
import { AuthenticationService } from '../auth/authentication.service';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadPictureComponent } from '../upload-picture/upload-picture.component';


export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('notSame'));
    return (invalidParent);
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: IUser;
  updateUserForm: FormGroup;
  passwordUpdateForm: FormGroup;
  matcher = new PasswordErrorStateMatcher();
  editMode = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private passFormBuilder: FormBuilder,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserDetails;
    this.populateForm();

    this.passwordUpdateForm = this.passFormBuilder.group({
      oldPassword: ['', Validators.required],
      passwordGroup: this.passFormBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {validator: this.checkPasswords }),
    });
  }

  updateUser(): void {
    const updatedUser: IUser = {... this.user, ... this.updateUserForm.value };
    this.userService.updateUser(this.user.id, updatedUser).subscribe(
      user => {
        this.user = user;
        this.switchEditMode();
        this.populateForm();
        this.authService.getLoggedUserInfo(user.id);
      },
      err => console.log(err)
    );
  }

  updateProfilePicture(): void {
    const dialogRef = this.dialog.open(UploadPictureComponent, {
      // width: '250px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateUserPassword(): void {
    if (this.passwordUpdateForm.valid && this.passwordUpdateForm.touched) {
      const oldPassword = this.passwordUpdateForm.get('oldPassword').value;
      const newPassword = this.passwordUpdateForm.get('passwordGroup').value.password;
      this.userService.updateUserPassword(oldPassword, newPassword).subscribe(
        () => console.log('Password updated sucessfully.'),
        err => console.log(err)
      );
    }
  }

  switchEditMode(): void {
    this.editMode = !this.editMode;
  }

  checkPasswords(c: AbstractControl): { [key: string]: boolean} | null {
    const password = c.get('password').value;
    const confirmPassword = c.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  private populateForm(): void {
    this.updateUserForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
    });
  }
}
