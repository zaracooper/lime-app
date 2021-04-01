import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]),
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class AuthModule { }
