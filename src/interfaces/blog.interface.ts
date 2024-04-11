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
        fullName: string,
        avatar: string
    }
    comments: I_Comment[],
    reactionCount: number,
    commentCount: number,
    createdAt: string;
    isSaved?: boolean;
    isLiked?: boolean;
}