"use client";

import {
    Avatar,
    Box,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { I_Comment } from "@/interfaces/comment.interface";
import moment from "moment";
import { AppContext } from "@/providers/app-provider";
import { UserContext } from "@/providers/user-provider";
import { usePathname, useRouter } from "next/navigation";
import addCommentAction from "@/actions/comment/add-comment.action";
import addNotificationAction from "@/actions/notification/add-notification.action";
import { I_Blog } from "@/interfaces/blog.interface";

export default function BlogComment({
    blog,
    commentList = [],
    setCommentNumber,
}: {
    blog: I_Blog;
    commentList?: I_Comment[];
    setCommentNumber: Dispatch<SetStateAction<number>>;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const { token } = useContext(AppContext);
    const { user } = useContext(UserContext);
    // const { socket } = useContext(WebSocketContext);

    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<I_Comment[]>([]);

    const handleComment = async (formData: FormData) => {
        const content = String(formData.get("comment"));
        await addCommentAction(blog?._id, content);
        await addNotificationAction(
            blog?.user._id,
            `${user.fullName} đã comment bài blog của bạn!`,
            blog?._id
        );
        setComment("");
        setComments((prev) => [
            {
                user: { _id: user._id, avatar: user.avatar, fullName: user.fullName },
                _id: String(Math.random()),
                content: comment,
                createdAt: String(new Date()),
            },
            ...prev,
        ]);
        setCommentNumber((prev) => prev + 1);
    };

    useEffect(() => {
        if (pathname.includes("blog/")) {
            setComments(commentList);
        }
    }, [pathname, commentList]);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on("comment", (comment) => {
    //             const newComments = comment.reverse() as I_Comment[];
    //             setComments(newComments);
    //         });

    //         return () => {
    //             socket.off("comment");
    //         };
    //     }
    // }, []);

    const navigateToProfile = (userId: string) => {
        router.push(`/profile/${userId}`);
    };

    return (
        <Stack sx={{ paddingY: 1 }} spacing={1}>
            {comments[0] &&
                comments.map((comment) => (
                    <Box display={"flex"} alignItems={"start"} gap={1} key={comment?._id}>
                        <Avatar src={comment?.user.avatar} />
                        <Box
                            sx={{
                                paddingX: 2,
                                paddingY: 0.5,
                                borderRadius: 5,
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                            }}
                        >
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <Typography
                                    fontWeight={600}
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => navigateToProfile(comment?.user._id)}
                                >
                                    {comment?.user.fullName}
                                </Typography>
                                <Typography>-</Typography>
                                <Typography sx={{ fontSize: 10 }}>
                                    {moment(comment?.createdAt).fromNow()}
                                </Typography>
                            </Box>
                            <Typography>{comment?.content}</Typography>
                        </Box>
                    </Box>
                ))}

            <Box
                display={"flex"}
                alignItems={"start"}
                gap={1}
                component={"form"}
                action={handleComment}
            >
                {user.avatar ? <Avatar src={user?.avatar} /> : <Avatar>H</Avatar>}
                <OutlinedInput
                    value={comment}
                    name="comment"
                    fullWidth
                    size="small"
                    endAdornment={
                        <InputAdornment
                            position="end"
                            sx={{ pointerEvents: !comment ? "none" : "auto" }}
                        >
                            <IconButton size="small">
                                <SendIcon color={comment ? "primary" : "inherit"} />
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        borderRadius: 20,
                    }}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!token.access_token}
                />
            </Box>
        </Stack>
    );
}
