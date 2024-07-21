import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly TOKEN_IDENTIFIER: string = Environment.tokenIdentifier;

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_IDENTIFIER, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_IDENTIFIER);
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
