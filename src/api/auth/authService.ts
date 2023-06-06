import { get, post } from "@/utils";
import { env } from "@/config";
import { RefreshTokenResponse, SignInRequest, SignInResponse } from ".";
import { getUser } from "@/config/globals";

const apiUrl = env.API_URL;

export const signIn = async ({
  username,
  password,
}: SignInRequest): Promise<SignInResponse> => {
  return (
    (await post<SignInResponse>(`${apiUrl}/auth/sign-in`, {
      username,
      password,
    })) || {
      token: "",
    }
  );
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const userId = getUser()?._id;

  return (
    (await get<RefreshTokenResponse>(
      `${apiUrl}/auth/refresh-token/${userId}`
    )) || {
      token: "",
    }
  );
};
