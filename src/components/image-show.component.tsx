"use client";

import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";

const Img = styled("img")(({ theme }) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));

const BoxOpacity = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    zIndex: 1,
}));

export default function ImageShow({
    images,
    handleOpenSlide,
}: {
    images: string[];
    handleOpenSlide: (index: number) => void;
}) {
    const restImages = useMemo(() => {
        return images.slice(3);
    }, [images]);

    const setXs = (images: string[], index: number): number => {
        if (index === 0) {
            return 12;
        } else if (index === 1 && !images[2]) {
            return 12;
        } else {
            return 6;
        }
    };

    return (
        <Grid container spacing={0.5}>
            {images.slice(0, 3).map((image, index) => {
                const xs = setXs(images, index);
                return (
                    <Grid item xs={xs} key={index} maxHeight={500}>
                        <Box
                            onClick={() => handleOpenSlide(index)}
                            sx={{
                                height: images[1] ? 245 : 500,
                                ...(index === 2 && {
                                    position: "relative",
                                    width: "100%",
                                }),
                                cursor: "pointer",
                            }}
                        >
                            {index === 2 && images[3] && (
                                <BoxOpacity>
                                    <Typography variant="h5" fontWeight={600}>
                                        +{restImages.length}
                                    </Typography>
                                </BoxOpacity>
                            )}
                            <Img src={image} alt="" />
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
}
