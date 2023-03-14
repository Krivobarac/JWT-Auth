import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { HomepageComponent } from 'src/app/_pages/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { ProductsComponent } from './_pages/products/products.component';
import { FingerprintjsProAngularModule } from '@fingerprintjs/fingerprintjs-pro-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("jwt"),
        allowedDomains: ["localhost:7292"],
        disallowedRoutes: [],
        // skipWhenExpired: true
      }
    }),
    FingerprintjsProAngularModule.forRoot({
      loadOptions: {
        apiKey: "rtqoh06UdNEKMnK4j0Ms",
        region: "eu"
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
