export const roleNames = {
  SUPERVISOR: "supervisor",
  COLLABORATOR: "collaborator",
} as const;

export type RoleName = (typeof roleNames)[keyof typeof roleNames];

const permissions = {
  VIEW: "view",
  REPORT: "report",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export type Permission = (typeof permissions)[keyof typeof permissions];

export interface UserResponse {
  document_number: string;
  firt_name: string;
  last_name: string;
  role: {
    _id: string;
    name: RoleName;
    permissions: Permission[];
  };
  user: {
    _id: string;
    username: string;
  };
}

export interface User {
  _id: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  role: RoleName;
  permissions: Permission[];
}
