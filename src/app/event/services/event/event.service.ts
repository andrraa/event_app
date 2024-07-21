import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { ApiResponse } from '../../../models/response.model';
import { EventCreateSuccess } from '../../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_BASE_URL: string = Environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // Create
  async create(request: FormData): Promise<ApiResponse<EventCreateSuccess>> {
    const API_CREATE_EVENT_URL: string = this.API_BASE_URL + '/events/create';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .post<ApiResponse<EventCreateSuccess>>(API_CREATE_EVENT_URL, request)
          .pipe(
            map((response: ApiResponse<EventCreateSuccess>) => {
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

  // Event List
  async events(): Promise<ApiResponse<EventCreateSuccess[]>> {
    const API_EVENT_LIST_URL: string = this.API_BASE_URL + '/events';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<EventCreateSuccess[]>>(API_EVENT_LIST_URL)
          .pipe(
            map((response: ApiResponse<EventCreateSuccess[]>) => {
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

  // Delete Event
  async delete(id: string): Promise<boolean> {
    const API_DELETE_EVENT_URL: string =
      this.API_BASE_URL + '/events/delete/' + id;

    try {
      const result = await firstValueFrom(
        this.httpClient.delete(API_DELETE_EVENT_URL).pipe(
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

  // Update Event
  async update(
    id: number,
    request: FormData
  ): Promise<ApiResponse<EventCreateSuccess>> {
    const API_UPDATE_EVENT_URL: string =
      this.API_BASE_URL + '/events/update/' + id;

    try {
      const result = await firstValueFrom(
        this.httpClient
          .post<ApiResponse<EventCreateSuccess>>(API_UPDATE_EVENT_URL, request)
          .pipe(
            map((response: ApiResponse<EventCreateSuccess>) => {
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
