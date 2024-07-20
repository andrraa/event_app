import { Component } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { UserLoginRequest, UserLoginSuccess } from '../model/login.model';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private alert: AlertService,
    private form: FormBuilder,
    private login: LoginService,
    private router: Router,
    private storage: StorageService
  ) {}

  // Login
  loginForm: FormGroup = this.form.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  async onLogin() {
    const formData = this.loginForm.value;

    const request: UserLoginRequest = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const result: ApiResponse<UserLoginSuccess> = await this.login.login(
        request
      );

      if (result.data != null) {
        this.storage.setToken(result.data.token);

        this.alert.showToast({ icon: 'success', title: 'Login Success!' });

        this.router.navigateByUrl('/home/dashboard');
      }
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });
    }
  }
}
