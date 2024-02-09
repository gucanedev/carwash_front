
export interface userLogin {
    UserName: string,
    Password: string
}

export interface UserResponse {
    message: string;
    token: string;
    userId: string,
    role: string,
    isSuccess: boolean
}