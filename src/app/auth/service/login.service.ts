import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import {
  ProfileSuccess,
  UserLoginRequest,
  UserLoginSuccess,
} from '../model/login.model';
import { ApiResponse } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_BASE_URL: string = Environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // Login
  async login(
    request: UserLoginRequest
  ): Promise<ApiResponse<UserLoginSuccess>> {
    const API_LOGIN_URL: string = this.API_BASE_URL + '/users/login';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .post<ApiResponse<UserLoginSuccess>>(API_LOGIN_URL, request)
          .pipe(
            map((response: ApiResponse<UserLoginSuccess>) => {
              if (response.code === 200) {
                return response;
              }

              throw new Error(response.message);
            }),
            catchError((error: HttpErrorResponse) => {
              const errorResponse: ApiResponse<null> = {
                code: error.error.code,
                message: error.error.message,
              };

              return throwError(() => errorResponse);
            })
          )
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Profile
  async profile(): Promise<ApiResponse<ProfileSuccess>> {
    const API_PROFILE_URL: string = this.API_BASE_URL + '/users/profile';

    try {
      const result = await firstValueFrom(
        this.httpClient.get<ApiResponse<ProfileSuccess>>(API_PROFILE_URL).pipe(
          map((response: ApiResponse<ProfileSuccess>) => {
            if (response.code === 200) {
              return response;
            }

            throw new Error(response.message);
          }),
          catchError((error: HttpErrorResponse) => {
            const errorResponse: ApiResponse<null> = {
              code: error.error.code,
              message: error.error.message,
            };

            return throwError(() => errorResponse);
          })
        )
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async logout(): Promise<boolean> {
    const API_LOGOUT_URL: string = this.API_BASE_URL + '/users/logout';

    try {
      const result = await firstValueFrom(
        this.httpClient.delete<boolean>(API_LOGOUT_URL).pipe(
          map(() => {
            return true;
          }),
          catchError((error: HttpErrorResponse) => {
            const errorResponse: ApiResponse<null> = {
              code: error.error.code,
              message: error.error.message,
            };

            return throwError(() => errorResponse);
          })
        )
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
