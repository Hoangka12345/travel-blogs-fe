"use client";

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Stack,
    TextField,
    TextareaAutosize,
    Typography,
    styled,
} from "@mui/material";
import { useState } from "react";
import ImageSlider from "../images-slide.component";
import ImageShow from "../image-show.component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createBlogSchema } from "@/validations/create-blog.zod";
import createBlogAction from "@/actions/create-blog.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const TextArea = styled(TextareaAutosize)(
    ({ error }: { error: boolean | undefined }) => ({
        width: "100%",
        padding: "10px 12px",
        fontSize: "0.875rem",
        borderRadius: "4px",
        border: `1px solid ${error ? "red" : "#ced4da"}`,
        lineHeight: 1.5,
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        "&:focus": {
            outline: "none",
            borderColor: error ? "red" : "#80bdff",
            boxShadow: error ? "none" : "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    })
);

interface I_Content {
    name: string;
    label: string;
    required: boolean;
    type?: string;
}

const contents: I_Content[] = [
    { name: "address", label: "Địa điểm du lịch*", required: true },
    { name: "country", label: "Quốc gia", required: false },
    { name: "city", label: "Thành Phố", required: false },
    { name: "content", label: "nội dung nhận xét*", type: "text-area", required: true },
    { name: "images", label: "Hình ảnh", type: "file", required: false },
];

export default function CreateForm() {
    const router = useRouter();

    const [errs, setErrs] = useState({
        address: "",
        content: "",
    });
    const [imageSrc, setImageSrc] = useState<string[]>([]);
    const [openSLide, setOpenSlide] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const handleCloseSlide = () => setOpenSlide(false);
    const handleOpenSlide = (index: number) => {
        setOpenSlide(true);
        setImageIndex(index);
    };

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = createBlogSchema.safeParse({
            [name]: value,
        });

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            const fieldErrors = zodErrors[name as keyof typeof zodErrors];
            setErrs({
                ...errs,
                [name]: fieldErrors && fieldErrors[0],
            });
        } else {
            setErrs({
                ...errs,
                [name]: "",
            });
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setErrs({
            ...errs,
            [name]: "",
        });
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

    const handleCreateBlog = async (formData: FormData) => {
        const data = {
            address: formData.get("address"),
            content: formData.get("content"),
        };
        const validatedFields = createBlogSchema.safeParse(data);
        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            setErrs({
                address: zodErrors.address ? zodErrors.address[0] : "",
                content: zodErrors.content ? zodErrors.content[0] : "",
            });
        } else {
            try {
                formData.append("user", "6603f3347586cf97678ca0ba");
                const res = await createBlogAction(formData);
                if (!res.status) {
                    toast.error("Không thể tạo blog!");
                } else {
                    router.push("/");
                    toast.success("Blog của bạn đã được tạo!");
                }
            } catch (error) {}
        }
    };

    return (
        <>
            <Stack spacing={2} component={"form"} action={handleCreateBlog}>
                {contents.map((content) => (
                    <Box key={content.label} display={"flex"} alignItems={"center"}>
                        <Typography sx={{ width: "30%" }}>{content.label}:</Typography>
                        {content.type === "text-area" ? (
                            <FormControl
                                fullWidth
                                error={errs.content ? true : undefined}
                            >
                                <TextArea
                                    name={content.name}
                                    error={errs.content ? true : undefined}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                {errs.content && (
                                    <FormHelperText>{errs.content}</FormHelperText>
                                )}
                            </FormControl>
                        ) : content.type === "file" ? (
                            <>
                                <input
                                    name={content.name}
                                    accept="image/png, image/jpeg"
                                    style={{ display: "none" }}
                                    id="raised-button-file"
                                    multiple
                                    type={content.type}
                                    onChange={handleFileInputChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button
                                        variant="text"
                                        startIcon={<CloudUploadIcon />}
                                        component="span"
                                    >
                                        Chọn ảnh
                                    </Button>
                                </label>
                            </>
                        ) : (
                            <TextField
                                name={content.name}
                                size="small"
                                fullWidth
                                sx={{ flexGrow: 1 }}
                                error={
                                    content.name === "address" && errs.address
                                        ? true
                                        : false
                                }
                                helperText={
                                    content.name === "address" &&
                                    errs.address &&
                                    errs.address
                                }
                                onChange={(e) => {
                                    if (content.name === "address") {
                                        onChange(e);
                                    }
                                }}
                                onBlur={(e) => {
                                    if (content.name === "address") {
                                        onBlur(e);
                                    }
                                }}
                            />
                        )}
                    </Box>
                ))}

                {imageSrc[0] && (
                    <ImageShow images={imageSrc} handleOpenSlide={handleOpenSlide} />
                )}

                <Button fullWidth type="submit" variant="contained">
                    Tạo Blog
                </Button>
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
