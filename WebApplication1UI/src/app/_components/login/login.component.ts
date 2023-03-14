import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import config from 'src/assets/config.json';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ExtendedGetResult, FingerprintjsProAngularService, GetResult } from '@fingerprintjs/fingerprintjs-pro-angular';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin?: boolean;
  visitorId = 'Press "Identify" button to get visitorId';
  extendedResult?: GetResult | ExtendedGetResult;

  url = config.apiServer.url + '/api/authentication/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private fingerprintjsProAngularService: FingerprintjsProAngularService,
    private toastr: ToastrService) { }

  public login = async (form: NgForm) => {
    const data = await this.fingerprintjsProAngularService.getVisitorData();
    this.visitorId = data.visitorId;
    const credentials = JSON.stringify({...form.value, fingerprint: this.visitorId});
    this.http.post(this.url + "login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.toastr.success("Logged In successfully");
      this.router.navigate(["/product"]);
    }, err => {
      this.invalidLogin = true;
    });

  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  // async onIdentifyButtonClick() : Promise<void> {
  //   // Get the visitor identifier when you need it.
  //   const data = await this.fingerprintjsProAngularService.getVisitorData();
  //   this.visitorId = data.visitorId;
  //   this.extendedResult = data;
  //   console.log(this.visitorId)
  //   console.log(this.extendedResult)
  // }

}