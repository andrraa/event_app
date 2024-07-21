import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { ApiResponse } from '../../models/response.model';
import {
  CategoryUtilitySuccess,
  EventUtilitySuccess,
  ProvinceUtilitySuccess,
  RoleUtilitySuccess,
} from '../../models/utility.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private readonly API_BASE_URL: string = Environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // Events
  async events(): Promise<ApiResponse<EventUtilitySuccess[]>> {
    const API_EVENTS_URL: string = this.API_BASE_URL + '/utilities/events';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<EventUtilitySuccess[]>>(API_EVENTS_URL)
          .pipe(
            map((response: ApiResponse<EventUtilitySuccess[]>) => {
              return response;
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

  // Categories
  async categories(): Promise<ApiResponse<CategoryUtilitySuccess[]>> {
    const API_CATEGORY_URL: string =
      this.API_BASE_URL + '/utilities/categories';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<CategoryUtilitySuccess[]>>(API_CATEGORY_URL)
          .pipe(
            map((response: ApiResponse<CategoryUtilitySuccess[]>) => {
              return response;
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

  // Provinces
  async provinces(): Promise<ApiResponse<ProvinceUtilitySuccess[]>> {
    const API_PROVINCE_URL: string = this.API_BASE_URL + '/utilities/provinces';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<ProvinceUtilitySuccess[]>>(API_PROVINCE_URL)
          .pipe(
            map((response: ApiResponse<ProvinceUtilitySuccess[]>) => {
              return response;
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

  // Roles
  async roles(): Promise<ApiResponse<RoleUtilitySuccess[]>> {
    const API_ROLES_URL: string = this.API_BASE_URL + '/utilities/roles';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<RoleUtilitySuccess[]>>(API_ROLES_URL)
          .pipe(
            map((response: ApiResponse<RoleUtilitySuccess[]>) => {
              return response;
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
