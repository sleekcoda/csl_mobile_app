export interface RequestResponse {
    status: string;
    message: string;
    data: any;
}

export interface RequestResponseOfItems {
    item1: number;
    item2: string;
    item3: any;
}

export interface RequestResponseError{
    error: string;
    header: any;
    message: string;
    name: string;
    statusText: string;
    ok: boolean;
    status: number;
}

export interface LoginResponse{
    token: string,
    expiresIn: string,
}

