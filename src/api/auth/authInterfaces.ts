import { User } from "@/interfaces";

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user?: User;
}

export interface RefreshTokenResponse {
  token: string;
}
