"use client";

import {
    Box,
    Button,
    Stack,
    TextField,
    TextareaAutosize,
    Typography,
    styled,
} from "@mui/material";
import { useState } from "react";
import ImageSlider from "../images-slide.component";
import ImageShow from "../image-show.component";

const TextArea = styled(TextareaAutosize)(({ theme }) => ({
    width: "100%",
    padding: "10px 12px",
    fontSize: "0.875rem",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    lineHeight: 1.5,
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    "&:focus": {
        outline: "none",
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
}));

const contents = [
    "Địa điểm du lịch",
    "Quốc gia",
    "Thành Phố",
    "nội dung nhận xét",
    "Hình ảnh",
];

export default function CreateForm() {
    const [imageSrc, setImageSrc] = useState<string[]>([]);
    const [openSLide, setOpenSlide] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const handleCloseSlide = () => setOpenSlide(false);
    const handleOpenSlide = (index: number) => {
        setOpenSlide(true);
        setImageIndex(index);
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageSrc([]);
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            Array.from(fileList).forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImageSrc((prev) => [...prev, reader.result as string]);
                };
            });
        }
    };

    return (
        <>
            <Stack spacing={2}>
                {contents.map((content, index) => (
                    <Box key={content} display={"flex"} alignItems={"center"}>
                        <Typography sx={{ width: "30%" }}>{content}:</Typography>
                        {index === 3 ? (
                            <TextArea />
                        ) : index === 4 ? (
                            <>
                                <input
                                    accept="image/png, image/jpeg"
                                    style={{ display: "none" }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleFileInputChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span">
                                        Chọn ảnh
                                    </Button>
                                </label>
                            </>
                        ) : (
                            <TextField size="small" fullWidth sx={{ flexGrow: 1 }} />
                        )}
                    </Box>
                ))}

                {imageSrc[0] && (
                    <ImageShow images={imageSrc} handleOpenSlide={handleOpenSlide} />
                )}
            </Stack>
            {openSLide && (
                <ImageSlider
                    images={imageSrc}
                    imageIndex={imageIndex}
                    handleCloseSlide={handleCloseSlide}
                />
            )}
        </>
    );
}
