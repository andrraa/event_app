export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginSuccess {
  token: string;
  expired_at: string;
}

export interface ProfileSuccess {
  id: number;
  full_name: string;
  username: string;
  role: {
    role_id: number;
    role_name: string;
  };
}
