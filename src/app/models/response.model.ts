export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface ApiErrorResponse<T> {
  code: number;
  message: string;
  errors?: T;
}
