import { I_Comment } from "./comment.interface";

export interface I_Blog {
    _id: string;
    address: string;
    country: string;
    city: string;
    content: string;
    images: string[];
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        avatar: string
    }
    createdAt: string;
    isSaved?: boolean;
    author?: string;
    comments: I_Comment[]
}