import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { roleGuard } from '../core/guard/role.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Account',
    canActivate: [roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
