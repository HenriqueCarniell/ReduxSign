import UserType from "./user-type"

export const LoginUser = (payload?: string) => ({
    type: UserType.Login,
    payload
});