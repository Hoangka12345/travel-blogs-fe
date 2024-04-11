import { I_Blog } from "./blog.interface";

export interface I_User {
    _id: string,
    fullName: string,
    avatar: string,
    dateOfBirth: string,
    email: string,
    createdAt: string,
    blogs: I_Blog[]
}