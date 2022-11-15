export enum Permission {
  READ,
  WRITE,
  DELETE,
  SHARE,
  UPLOAD_FILES,
}

export interface GroupInterface {
  id: string;
  name: string;
  permissions: Array<Permission>;
}