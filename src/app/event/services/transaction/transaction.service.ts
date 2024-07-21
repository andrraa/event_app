import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../models/response.model';
import {
  TransacationCreateSuccess,
  TransactionCreateRequest,
  TransactionExportRequest,
} from '../../../models/transaction.model';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly API_BASE_URL: string = Environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // Transaction List
  async transactions(): Promise<ApiResponse<TransacationCreateSuccess[]>> {
    const API_TRANSACTION_LIST_URL: string =
      this.API_BASE_URL + '/transactions';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<TransacationCreateSuccess[]>>(
            API_TRANSACTION_LIST_URL
          )
          .pipe(
            map((response: ApiResponse<TransacationCreateSuccess[]>) => {
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

  // Delete Transaction
  async delete(id: number): Promise<boolean> {
    const API_TRANSACTION_DELETE_URL: string =
      this.API_BASE_URL + '/transactions/delete/' + id;
    try {
      const result = await firstValueFrom(
        this.httpClient.delete<boolean>(API_TRANSACTION_DELETE_URL).pipe(
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

  // Create Transaction
  async create(
    request: TransactionCreateRequest
  ): Promise<ApiResponse<TransacationCreateSuccess>> {
    const API_CREATE_TRANSACTION_URL: string =
      this.API_BASE_URL + '/transactions/create';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .post<ApiResponse<TransacationCreateSuccess>>(
            API_CREATE_TRANSACTION_URL,
            request
          )
          .pipe(
            map((response: ApiResponse<TransacationCreateSuccess>) => {
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

  // Update Transaction
  async update(
    request: TransactionCreateRequest,
    id: number
  ): Promise<ApiResponse<TransacationCreateSuccess>> {
    const API_CREATE_TRANSACTION_URL: string =
      this.API_BASE_URL + '/transactions/update/' + id;

    try {
      const result = await firstValueFrom(
        this.httpClient
          .put<ApiResponse<TransacationCreateSuccess>>(
            API_CREATE_TRANSACTION_URL,
            request
          )
          .pipe(
            map((response: ApiResponse<TransacationCreateSuccess>) => {
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

  // Export Transaction
  export(request: TransactionExportRequest): Observable<Blob> {
    const API_EXPORT_URL: string = this.API_BASE_URL + '/reports/export';

    return this.httpClient.post(API_EXPORT_URL, request, {
      responseType: 'blob',
    });
  }
}
