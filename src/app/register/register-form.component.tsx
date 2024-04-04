"use client";

import * as React from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    CssBaseline,
    Paper,
    Grid,
    Link,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LockOutlined } from "@mui/icons-material";
import { registerFormSchema } from "@/validations/register-form.zod";
import registerAction from "@/actions/register.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface I_registerField {
    name: string;
    type: string;
    label: string;
}

interface IErrors {
    [key: string]: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const registerFields: I_registerField[] = [
    { name: "firstName", label: "First name", type: "text" },
    { name: "lastName", label: "Last name", type: "text" },
    { name: "dateOfBirth", label: "Date of birth", type: "date" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "confirmPassword", label: "Confirm Password", type: "text" },
];

export default function RegisterForm() {
    const router = useRouter();
    const [errors, setErrors] = React.useState<IErrors>({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [avatar, setAvatar] = React.useState<string>();

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = registerFormSchema.safeParse({
            [name]: name === "dateOfBirth" ? new Date(value) : value,
        });

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            const fieldErrors = zodErrors[name as keyof typeof zodErrors];
            setErrors(
                (prev) =>
                    ({
                        ...prev,
                        [name]: fieldErrors && fieldErrors[0],
                    } as IErrors)
            );
        } else {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatar(reader.result as string);
            };
        }
    };

    const handleRegister = async (formData: FormData) => {
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            dateOfBirth: new Date(String(formData.get("dateOfBirth"))),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        const validatedFields = registerFormSchema.safeParse(data);
        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;

            setErrors({
                ...errors,
                firstName: zodErrors.firstName ? zodErrors.firstName[0] : "",
                lastName: zodErrors.lastName ? zodErrors.lastName[0] : "",
                dateOfBirth: zodErrors.dateOfBirth ? zodErrors.dateOfBirth[0] : "",
                email: zodErrors.email ? zodErrors.email[0] : "",
                password: zodErrors.password ? zodErrors.password[0] : "",
                confirmPassword: zodErrors.confirmPassword
                    ? zodErrors.confirmPassword[0]
                    : "",
            });
        } else {
            formData.delete("confirmPassword");
            const res = await registerAction(formData);
            if (res.status) {
                router.push("login");
                toast.success("Bạn đã đăng ký tài khoản thành công! ");
            } else {
                toast.error(
                    res.message?.[0] ? res.message?.[0] : "Không thể đăng ký tài khoản!"
                );
            }
        }
    };

    return (
        <Grid
            container
            component="main"
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
        >
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 3,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        action={handleRegister}
                    >
                        <Grid container spacing={2}>
                            {registerFields.map((field) => (
                                <Grid item xs={6} key={field.name}>
                                    {field.type === "date" ? (
                                        <TextField
                                            type={field.type}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label={field.label}
                                            name={field.name}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={errors.dateOfBirth ? true : false}
                                            helperText={errors.dateOfBirth}
                                        />
                                    ) : (
                                        <TextField
                                            type={field.type}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label={field.label}
                                            name={field.name}
                                            error={errors[field.name] ? true : false}
                                            helperText={errors[field.name]}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                        />
                                    )}
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Box display={"flex"} alignItems={"center"} gap={6}>
                                    <>
                                        <input
                                            name="avatar"
                                            accept="image/png, image/jpeg"
                                            style={{ display: "none" }}
                                            id="raised-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleChangeAvatar}
                                        />
                                        <label htmlFor="raised-button-file">
                                            <Button
                                                variant="text"
                                                component="span"
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Choose your avatar
                                            </Button>
                                        </label>
                                    </>
                                    {avatar && (
                                        <Image
                                            src={avatar}
                                            width={90}
                                            height={90}
                                            style={{ borderRadius: 10 }}
                                            alt="avatar"
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                        >
                            SIGN UP
                        </Button>
                        <Grid container>
                            <Grid item xs={12}>
                                <Link
                                    href="/login"
                                    variant="body2"
                                    sx={{ float: "right" }}
                                >
                                    {"Bạn đã có tài khoản? Đăng nhập"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
