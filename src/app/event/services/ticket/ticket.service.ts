import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../models/response.model';
import {
  TicketCreateRequest,
  TicketCreateSuccess,
} from '../../../models/ticket.model';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly API_BASE_URL: string = Environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // Create Ticket
  async create(
    request: TicketCreateRequest
  ): Promise<ApiResponse<TicketCreateSuccess>> {
    const API_TICKET_CREATE_URL: string = this.API_BASE_URL + '/tickets/create';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .post<ApiResponse<TicketCreateSuccess>>(
            API_TICKET_CREATE_URL,
            request
          )
          .pipe(
            map((response: ApiResponse<TicketCreateSuccess>) => {
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

  // List Tickets
  async tickets(): Promise<ApiResponse<TicketCreateSuccess[]>> {
    const API_LIST_TICKET_URL: string = this.API_BASE_URL + '/tickets';

    try {
      const result = await firstValueFrom(
        this.httpClient
          .get<ApiResponse<TicketCreateSuccess[]>>(API_LIST_TICKET_URL)
          .pipe(
            map((response: ApiResponse<TicketCreateSuccess[]>) => {
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

  // Delete Ticket
  async delete(id: number): Promise<boolean> {
    const API_DELETE_TICKET_URL: string =
      this.API_BASE_URL + '/tickets/delete/' + id;

    try {
      const result = await firstValueFrom(
        this.httpClient.delete<boolean>(API_DELETE_TICKET_URL).pipe(
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

  // Update Ticket
  async update(
    request: TicketCreateRequest,
    id: number
  ): Promise<ApiResponse<TicketCreateSuccess>> {
    const API_UPDATE_TICKET_URL: string =
      this.API_BASE_URL + '/tickets/update/' + id;

    try {
      const result = await firstValueFrom(
        this.httpClient
          .put<ApiResponse<TicketCreateSuccess>>(API_UPDATE_TICKET_URL, request)
          .pipe(
            map((response: ApiResponse<TicketCreateSuccess>) => {
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
