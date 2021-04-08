import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) { }

  login() {
    const credentials = this.loginForm.value;

    this._authService.login(
      credentials.email,
      credentials.password
    ).subscribe(
      () => this._router.navigateByUrl('/'),
      err => {
        this._snackBar.open(
          'Login failed. Check your login credentials.',
          'Close',
          { duration: 6000 });

        this.loginForm.patchValue({ password: '' });
      }
    );
  }
}
