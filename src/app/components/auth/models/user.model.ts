
export interface UserModel {
    id?: number | undefined;
    email?: string | undefined;
    name?: string | undefined;
    role?: string | undefined;
    token?: string | undefined;
    toeknExpirationDate?: number | any;
}