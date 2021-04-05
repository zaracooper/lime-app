import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CoreModule } from './core/core.module';
import { AuthenticationService } from './core/authentication/authentication.service';
import { OptionsInterceptor } from './core/interceptor/options.interceptor';
import { CartModule } from './modules/cart/cart.module';
import { Logger } from './core/services/logger.service';
import { CheckoutModule } from './modules/checkout/checkout.module';


function getSession(authService: AuthenticationService) {
  authService.getClientSession().subscribe(
    () => { },
    err => new Logger('App initialization').warn('Failed to get session.', err));
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    ProductsModule,
    CartModule,
    CoreModule,
    CheckoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OptionsInterceptor,
      multi: true
    }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: getSession,
    //   multi: true,
    //   deps: [AuthenticationService]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
