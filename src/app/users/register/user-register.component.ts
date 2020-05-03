import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registerUserForm: FormGroup;
  matcher = new PasswordErrorStateMatcher();
  validationErrors = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {validator: this.checkPasswords }),
    });
  }

  checkPasswords(c: AbstractControl): { [key: string]: boolean} | null {
    const password = c.get('password').value;
    const confirmPassword = c.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  registerUser(): void {
    if (this.registerUserForm.valid && this.registerUserForm.touched) {
      const user = {
        username: this.registerUserForm.get('username').value,
        email: this.registerUserForm.get('email').value,
        firstName: this.registerUserForm.get('firstName').value,
        lastName: this.registerUserForm.get('lastName').value,
        password: this.registerUserForm.get('passwordGroup').value.password,
      };

      this.userService.createUser(user).subscribe(
        createdUser => {
          console.log(createdUser);
          this.router.navigateByUrl('/login');
        },
        err => console.log = err
      );
    } else {
      this.validationErrors = true;
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/home');
  }

}
