"use client";

import { useState } from "react";
import {
    Avatar,
    Box,
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
import ImageIcon from "@mui/icons-material/Image";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SmsIcon from "@mui/icons-material/Sms";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

import BlogComment from "./blog-comment.component";
import ImageSlider from "@/components/images-slide.component";
import ImageShow from "@/components/image-show.component";

const StackReaction = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(0.8)} ${theme.spacing(4)}`,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
        cursor: "pointer",
    },
}));

const images = ["/imgs/img1.jpg", "/imgs/img2.jpg", "/imgs/img3.jpg", "/imgs/img4.jpg"];

export default function Blog() {
    const [contents, setContents] = useState([
        { title: "Địa điểm du lịch", content: "" },
        { title: "Quốc gia", content: "" },
        { title: "Thành Phố", content: "" },
        { title: "nội dung nhận xét", content: "" },
    ]);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [likeNumber, setLikeNumber] = useState<number>(1);
    const [openSLide, setOpenSlide] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const handleCloseSlide = () => setOpenSlide(false);
    const handleOpenSlide = (index: number) => {
        setOpenSlide(true);
        setImageIndex(index);
    };

    return (
        <Paper sx={{ paddingTop: 1, paddingX: 1 }}>
            {/* name */}
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Phan Bảo Hoàng" secondary="Jan 9, 2014" />
                </ListItem>
                <Tooltip title={isSaved ? "đã lưu" : "lưu blog"}>
                    <IconButton>
                        {isSaved ? (
                            <BookmarkAddedOutlinedIcon />
                        ) : (
                            <BookmarkAddOutlinedIcon />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            {/* main content */}
            <Stack spacing={1}>
                {contents.map((content) => (
                    <Box key={content.title}>
                        <Typography component={"span"} fontWeight={600} marginRight={1}>
                            {content.title}:
                        </Typography>
                        <Typography component={"span"} textAlign={"justify"}>
                            {content.content}
                        </Typography>
                    </Box>
                ))}
            </Stack>
            {/* show images */}
            <ImageShow images={images} handleOpenSlide={handleOpenSlide} />
            {/* show reaction */}
            <Box paddingX={1} sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingY={2}
                >
                    <Stack direction={"row"} spacing={0.5} sx={{ cursor: "pointer" }}>
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
                        5 bình luận
                    </Link>
                </Box>

                <Divider />

                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    paddingY={1}
                >
                    <StackReaction
                        direction={"row"}
                        spacing={1}
                        onClick={() => {
                            setIsLike(!isLike);
                            !isLike
                                ? setLikeNumber((prev) => prev + 1)
                                : setLikeNumber((prev) => prev - 1);
                        }}
                    >
                        {isLike ? (
                            <ThumbUpAltIcon color="primary" />
                        ) : (
                            <ThumbUpOffAltIcon />
                        )}
                        <Typography>Thích</Typography>
                    </StackReaction>

                    <StackReaction direction={"row"} spacing={1}>
                        <SmsIcon />
                        <Typography>Bình luận</Typography>
                    </StackReaction>
                </Box>

                <Divider />

                <BlogComment />
            </Box>

            {/* show image slide when user click to an image of blog */}
            {openSLide && (
                <ImageSlider
                    images={images}
                    imageIndex={imageIndex}
                    handleCloseSlide={handleCloseSlide}
                />
            )}
        </Paper>
    );
}
