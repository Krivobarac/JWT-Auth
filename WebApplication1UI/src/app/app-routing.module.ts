import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { authGuard } from './_guards/auth-guard';
import { pageRestrictionGuard } from './_guards/page-restriction';
import { HomepageComponent } from './_pages/homepage/homepage.component';
import { ProductsComponent } from './_pages/products/products.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'product', component: ProductsComponent, canActivate: [authGuard, pageRestrictionGuard], data: [{roles: ['Manager']}] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
