import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../auth/service/login.service';
import { AlertService } from '../services/alert/alert.service';
import { ApiResponse } from '../models/response.model';
import { ProfileSuccess } from '../auth/model/login.model';
import { Navigation } from '../models/navigation.model';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent {
  constructor(
    private alert: AlertService,
    private login: LoginService,
    private router: Router,
    private storage: StorageService
  ) {
    if (this.userData == null || this.navigationData == null) {
      this.profile();
    }
  }

  // Profile
  userData: ProfileSuccess | null | undefined = null;

  async profile() {
    try {
      const result: ApiResponse<ProfileSuccess> = await this.login.profile();

      if (result.code == 200 && result.data != undefined) {
        this.userData = result.data;
        this.navigationData = this.generateNavigation(
          result.data?.role.role_name
        );
      }
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });
    }
  }

  navigationData: Navigation[] = [];

  private generateNavigation(role: string): Navigation[] {
    const navigation: Navigation[] = [];

    if (role === 'Admin') {
      navigation.push(
        {
          icon: 'fas fa-fire',
          path: '/event/main',
          title: 'Event',
        },
        {
          icon: 'fas fa-ticket',
          path: '/event/ticket',
          title: 'Ticket',
        },
        {
          icon: 'fas fa-file',
          path: '/event/transaction',
          title: 'Transaction',
        }
      );
    }

    if (role === 'Inputer') {
      navigation.push(
        {
          icon: 'fas fa-fire',
          path: '/event/main',
          title: 'Event',
        },
        {
          icon: 'fas fa-ticket',
          path: '/event/ticket',
          title: 'Ticket',
        }
      );
    }

    if (role == 'Viewer') {
      navigation.push({
        icon: 'fas fa-file',
        path: '/event/transaction',
        title: 'Transaction',
      });
    }

    return navigation;
  }

  // Logout
  async logout() {
    try {
      const result: boolean = await this.login.logout();

      if (result) {
        this.storage.clearStorage();
        this.router.navigateByUrl('/auth/login');

        this.alert.showToast({
          icon: 'success',
          title: 'Logout successfully!',
        });
      }
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });
    }
  }
}
