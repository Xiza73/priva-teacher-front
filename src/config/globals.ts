import { User, UserResponse } from "@/interfaces";
import { getItemStorage, getStorage } from "@/utils";

export const getHeaders = () => {
  const token = getItemStorage("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getUser = (): User | undefined => {
  const userResponse = getStorage<UserResponse>("user");

  if (!userResponse) return;

  return {
    _id: userResponse.user._id,
    username: userResponse.user.username,
    firstName: userResponse.firt_name,
    lastName: userResponse.last_name,
    documentNumber: userResponse.document_number,
    role: userResponse.role.name,
    permissions: userResponse.role.permissions,
  };
};
