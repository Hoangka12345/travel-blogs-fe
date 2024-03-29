"use client";

import React, { useState } from "react";
import { Box, Button, Container, Grid, IconButton, styled } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CloseIcon from "@mui/icons-material/Close";

// const images = ["/imgs/img1.jpg", "/imgs/img2.jpg", "/imgs/img3.jpg", "/imgs/img4.jpg"];

const Slider = styled(Grid)(({ theme }) => ({
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: 500,
    display: "flex",
    justifyContent: "center",
}));

const Slide = styled("div")<{ active: boolean }>(({ theme, active }) => ({
    display: active ? "block" : "none", // Hiển thị hoặc ẩn dựa trên active
    float: "left",
    width: "auto",
    height: "100%",
    transition: "0.5s ease",
    // Thêm bất kỳ styles nào khác dựa trên active ở đây
}));

const ImageSlider = ({
    images,
    imageIndex,
    handleCloseSlide,
}: {
    images: string[];
    imageIndex: number;
    handleCloseSlide: () => void;
}) => {
    const [activeIndex, setActiveIndex] = useState(imageIndex);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box
            sx={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                zIndex: 1000,
            }}
        >
            <Box
                sx={{ position: "relative" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
                width={"100%"}
            >
                <Grid container justifyContent="center">
                    <Slider item xs={8}>
                        {images.map((image, index) => (
                            <Slide
                                key={index}
                                active={index === activeIndex ? true : false}
                            >
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </Slide>
                        ))}
                    </Slider>
                </Grid>
                <IconButton
                    size="large"
                    onClick={prevSlide}
                    style={{ position: "absolute", left: 0, color: "#fff" }}
                >
                    <ArrowCircleLeftIcon fontSize="large" />
                </IconButton>
                <IconButton
                    onClick={nextSlide}
                    style={{ position: "absolute", right: 0, color: "#fff" }}
                >
                    <ArrowCircleRightIcon fontSize="large" />
                </IconButton>
                <IconButton
                    onClick={handleCloseSlide}
                    style={{ position: "absolute", right: 0, top: 0, color: "#fff" }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ImageSlider;
