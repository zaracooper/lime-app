import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { HeaderService } from 'src/app/core/components/header/header.service';
import { CustomerService } from 'src/app/data/services/customer.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmedPassword: ['', [Validators.required]]
  }, { validators: this.matchPasswords });

  @ViewChild(FormGroupDirective) sufDirective: FormGroupDirective | undefined;

  constructor(
    private _customer: CustomerService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._header.setHeaderButtonsVisibility(false);
  }

  matchPasswords(signupGroup: AbstractControl): ValidationErrors | null {
    const password = signupGroup.get('password')?.value;
    const confirmedPassword = signupGroup.get('confirmedPassword')?.value;

    return password == confirmedPassword ? null : { differentPasswords: true };
  }

  get password() { return this.signupForm.get('password'); }

  get confirmedPassword() { return this.signupForm.get('confirmedPassword'); }

  signup() {
    const customer = this.signupForm.value;

    this._customer.createCustomer(
      customer.email,
      customer.password,
      customer.firstName,
      customer.lastName
    ).subscribe(
      () => {
        this.signupForm.reset();
        this.sufDirective?.resetForm();

        this._snackBar.open('Account successfully created. You will be redirected in 5 seconds.', 'Close', { duration: 5000 });

        setTimeout(() => this._router.navigateByUrl('/'), 6000);
      },
      err => this._snackBar.open('There was a problem creating your account.', 'Close', { duration: 5000 })
    );
  }
}
