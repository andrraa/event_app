export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginSuccess {
  token: string;
  expired_at: string;
}
