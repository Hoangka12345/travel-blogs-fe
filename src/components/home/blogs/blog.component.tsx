"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SmsIcon from "@mui/icons-material/Sms";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

import BlogComment from "./blog-comment.component";
import ImageSlider from "@/components/images-slide.component";
import ImageShow from "@/components/image-show.component";
import { I_Blog } from "@/interfaces/blog.interface";
import moment from "moment";
import { useRouter } from "next/navigation";
import addReactionAction from "@/actions/reaction/add-reaction.action";
import { AppContext } from "@/providers/app-provider";
import { toast } from "react-toastify";
import removeReactionAction from "@/actions/reaction/remove-reaction.action";
import { I_Comment } from "@/interfaces/comment.interface";
import saveBlogAction from "@/actions/saved-blogs/save-blog.action";
import addNotificationAction from "@/actions/notification/add-notification.action";
import { UserContext } from "@/providers/user-provider";
import { WebSocketContext } from "@/providers/socket.provider";

const StackReaction = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(0.8)} ${theme.spacing(4)}`,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
        cursor: "pointer",
    },
}));

export default function Blog({ blog }: { blog: I_Blog }) {
    const router = useRouter();

    const { token } = useContext(AppContext);
    const { user } = useContext(UserContext);
    // const { socket } = useContext(WebSocketContext);

    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [likeNumber, setLikeNumber] = useState<number>(0);
    const [commentNumber, setCommentNumber] = useState<number>(0);
    const [commentList, setCommentList] = useState<I_Comment[]>([]);
    const [openSLide, setOpenSlide] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on("comment", (comment) => {
    //             const newCommentNumber = comment.length;
    //             setCommentNumber(newCommentNumber as number);
    //         });

    //         socket.on("reaction", (totalReactions) => {
    //             setLikeNumber(totalReactions);
    //         });

    //         return () => {
    //             socket.off("comment");
    //             socket.off("reaction");
    //         };
    //     }
    // }, []);

    useEffect(() => {
        (async () => {
            if (blog._id) {
                const res = await fetch(`/api/get-comments-reactions/${blog._id}`);
                const data = await res.json();

                if (data.statusCode === 200) {
                    setLikeNumber(data.data.reactionNumber);
                    setCommentNumber(data.data.commentNumber);
                    setCommentList(data.data.comments);
                    setIsLike(() => (blog.isLike ? true : false));
                    setIsSaved(() => (blog.isSaved ? true : false));
                }
            }
        })();
    }, [blog]);

    // convert date to time ago using moment
    const timeAgo = useMemo(() => {
        const createdTime = new Date(blog.createdAt);
        return moment(createdTime).fromNow();
    }, [blog.createdAt]);

    const handleCloseSlide = () => setOpenSlide(false);
    const handleOpenSlide = (index: number) => {
        setOpenSlide(true);
        setImageIndex(index);
    };

    // navigate to profile page
    const onClickProfile = () => {
        if (blog.user._id) {
            router.push(`/profile/${blog.user._id}`);
        }
    };

    // handle click to like button
    const handleReaction = async (formData: FormData) => {
        if (!token.access_token) {
            toast.error("bạn cần đăng nhập để like bài blog");
        } else {
            if (!isLike) {
                const res = await addReactionAction(blog._id);
                if (res.status) {
                    await addNotificationAction(
                        `${user.fullName} đã like bài viết của bạn!`,
                        blog?._id
                    );
                    setIsLike(true);
                    setLikeNumber((prev) => prev + 1);
                }
            } else {
                const res = await removeReactionAction(blog._id);
                if (res.status) {
                    setIsLike(false);
                    setLikeNumber((prev) => prev - 1);
                }
            }
        }
    };

    // handle click to saved blog icon
    const handleSaveBlog = async () => {
        if (!token.access_token) {
            toast.error("bạn cần đăng nhập để lưu bài blog");
        } else {
            if (!isSaved) {
                const res = await saveBlogAction(blog._id);
                if (res.status) {
                    setIsSaved(true);
                }
            }
        }
    };

    return (
        <Paper sx={{ paddingTop: 1, paddingX: 1 }}>
            {/* name */}
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <ListItem>
                    <ListItemAvatar sx={{ cursor: "pointer" }} onClick={onClickProfile}>
                        <Avatar src={blog.user.avatar && blog.user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        onClick={onClickProfile}
                        sx={{ cursor: "pointer" }}
                        primary={blog?.user.fullName}
                        secondary={timeAgo}
                    />
                </ListItem>
                <Tooltip title={!isSaved ? "lưu blog" : "đã lưu"}>
                    <Box component={"span"}>
                        <IconButton disabled={isSaved} onClick={handleSaveBlog}>
                            {isSaved ? (
                                <BookmarkAddedOutlinedIcon />
                            ) : (
                                <BookmarkAddOutlinedIcon />
                            )}
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
            {/* main content */}
            <Stack spacing={1}>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Địa điểm du lịch:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.address && blog.address}
                    </Typography>
                </Box>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Quốc gia:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.country && blog.country}
                    </Typography>
                </Box>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Thành phố:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.city && blog.city}
                    </Typography>
                </Box>
                <Box>
                    <Typography component={"span"} fontWeight={600} marginRight={1}>
                        Nội dung nhận xét:
                    </Typography>
                    <Typography component={"span"} textAlign={"justify"}>
                        {blog.content && blog.content}
                    </Typography>
                </Box>
            </Stack>
            {/* show images */}
            <ImageShow
                images={blog.images ? blog.images : []}
                handleOpenSlide={handleOpenSlide}
            />
            {/* show reaction */}
            <Box paddingX={1} sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingY={2}
                >
                    <Stack direction={"row"} spacing={0.5}>
                        {isLike ? (
                            <ThumbUpAltIcon color="primary" />
                        ) : (
                            <ThumbUpOffAltIcon />
                        )}
                        <Typography>{likeNumber}</Typography>
                    </Stack>

                    <Link
                        sx={{
                            cursor: "pointer",
                            color: "rgba(0, 0, 0, 0.7)",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        {commentNumber} bình luận
                    </Link>
                </Box>

                <Divider />

                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    paddingY={1}
                >
                    <Box component={"form"} action={handleReaction}>
                        <Button color="inherit" type="submit">
                            {isLike ? (
                                <ThumbUpAltIcon color="primary" />
                            ) : (
                                <ThumbUpOffAltIcon />
                            )}
                            <Typography ml={1}>Thích</Typography>
                        </Button>
                    </Box>

                    <StackReaction direction={"row"} spacing={1}>
                        <SmsIcon />
                        <Typography>Bình luận</Typography>
                    </StackReaction>
                </Box>

                <Divider />

                <BlogComment
                    blogId={blog._id}
                    commentList={commentList}
                    setCommentNumber={setCommentNumber}
                />
            </Box>

            {/* show image slide when user click to an image of blog */}
            {openSLide && (
                <ImageSlider
                    images={blog.images ? blog.images : []}
                    imageIndex={imageIndex}
                    handleCloseSlide={handleCloseSlide}
                />
            )}
        </Paper>
    );
}
