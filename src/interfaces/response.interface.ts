export interface I_Response<T> {
    status: boolean,
    message?: string[] | string
    data?: T[] | T
}