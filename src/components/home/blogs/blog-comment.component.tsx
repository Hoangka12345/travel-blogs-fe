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
import { useContext, useEffect, useState } from "react";
import { I_Blog } from "@/interfaces/blog.interface";
import addCommentAction from "@/actions/comment/add-comment.action";
// import { socket } from "@/socket";
import { io } from "socket.io-client";
import { I_Comment } from "@/interfaces/comment.interface";
import moment from "moment";
import { AppContext } from "@/providers/app-provider";
import { UserContext } from "@/providers/user-provider";
import { socket } from "@/socket";
import addNotificationAction from "@/actions/notification/add-notification.action";

// const socket = io("http://localhost:5000", {
//     transports: ["websocket"],
// });

export default function BlogComment({
    blogId,
    commentList,
}: {
    blogId: string;
    commentList: I_Comment[];
}) {
    const { token } = useContext(AppContext);
    const { user } = useContext(UserContext);

    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<I_Comment[]>([]);

    const handleComment = async (formData: FormData) => {
        const content = String(formData.get("comment"));
        await addCommentAction(blogId, content);
        await addNotificationAction(
            `${user.fullName} đã comment bài blog của bạn`,
            blogId
        );
        setComment("");
    };

    useEffect(() => {
        setComments(commentList.reverse());
    }, [commentList]);

    useEffect(() => {
        socket.on("comment", (comment) => {
            const newComments = comment.reverse();
            setComments(newComments as I_Comment[]);
        });

        return () => {
            socket.off("comment");
        };
    }, []);

    return (
        <Stack sx={{ paddingY: 1 }} spacing={1}>
            {comments[0] ? (
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
                                <Typography fontWeight={600}>
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
                ))
            ) : (
                <></>
            )}

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
