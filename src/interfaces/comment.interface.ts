export interface I_Comment {
    _id: string,
    user: {
        _id: string,
        fullName: string,
        avatar: string
    },
    content: string,
    createdAt: string
}