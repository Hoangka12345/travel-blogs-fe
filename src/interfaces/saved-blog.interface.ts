import { I_Blog } from "./blog.interface";

export interface I_SavedBlog {
    _id: string,
    user: string,
    blogs: I_Blog[]
}