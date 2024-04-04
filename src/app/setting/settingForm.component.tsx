"use client";

import * as React from "react";
import {
    TextField,
    Button,
    Avatar,
    Box,
    Stack,
    Typography,
    CircularProgress,
} from "@mui/material";
import { UserContext } from "@/providers/user-provider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { settingSchema } from "@/validations/setting.zod";
import { toast } from "react-toastify";
import changePasswordAction from "@/actions/setting/password.action";
import changeAvatarAction from "@/actions/setting/avatar.action";
import { useRouter } from "next/navigation";

export default function SettingForm() {
    const router = useRouter();
    const { user, updateUser } = React.useContext(UserContext);

    const [avatar, setAvatar] = React.useState("");
    const [loadingAvatar, setLoadingAvatar] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = settingSchema.safeParse({
            [name]: value,
        });

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            const fieldErrors = zodErrors[name as keyof typeof zodErrors];
            setErrors({
                ...errors,
                [name]: fieldErrors && fieldErrors[0],
            });
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

    const handleUpdateAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!avatar) {
            toast.error("vui lòng chọn avatar mới!");
        } else {
            setLoadingAvatar(true);
            const res = await changeAvatarAction(formData);
            if (res.status) {
                toast.success(res?.message);
                updateUser({ ...user, avatar: avatar });
                router.push("/");
                setLoadingAvatar(false);
            } else {
                setLoadingAvatar(false);
                toast.error(Array.isArray(res.message) ? res.message[0] : res.message);
            }
        }
    };

    const handleUpdatePassword = async (formData: FormData) => {
        const data = {
            oldPassword: formData.get("oldPassword"),
            newPassword: formData.get("newPassword"),
            confirmPassword: formData.get("confirmPassword"),
        };

        const validatedFields = settingSchema.safeParse(data);
        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;

            setErrors({
                ...errors,
                oldPassword: zodErrors.oldPassword ? zodErrors.oldPassword[0] : "",
                newPassword: zodErrors.newPassword ? zodErrors.newPassword[0] : "",
                confirmPassword: zodErrors.confirmPassword
                    ? zodErrors.confirmPassword[0]
                    : "",
            });
        } else {
            const requesData = {
                oldPassword: String(data.oldPassword),
                newPassword: String(data.newPassword),
            };
            const res = await changePasswordAction(requesData);
            if (res.status) {
                toast.success(res?.message);
                router.push("/");
            } else {
                toast.error(Array.isArray(res.message) ? res.message[0] : res.message);
            }
        }
    };

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Stack spacing={5} alignItems={"center"}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={20}
                    component={"form"}
                    onSubmit={handleUpdateAvatar}
                >
                    <Avatar
                        sx={{ width: 300, height: 300 }}
                        src={avatar ? avatar : user?.avatar}
                        alt="avatar"
                    />
                    {loadingAvatar ? (
                        <CircularProgress />
                    ) : (
                        <Stack spacing={2}>
                            <Box>
                                <input
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    style={{ display: "none" }}
                                    id="raised-button-file"
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
                            </Box>
                            <Button fullWidth variant="contained" type="submit">
                                Lưu avatar
                            </Button>
                        </Stack>
                    )}
                </Box>

                <Stack
                    spacing={2}
                    width={"80%"}
                    component={"form"}
                    action={handleUpdatePassword}
                >
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h6">Old Password</Typography>
                        <TextField
                            // type="password"
                            name="oldPassword"
                            size="small"
                            sx={{ width: "70%" }}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword}
                        />
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h6">New Password</Typography>
                        <TextField
                            // type="password"
                            name="newPassword"
                            size="small"
                            sx={{ width: "70%" }}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword}
                        />
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h6">Confirm Password</Typography>
                        <TextField
                            // type="password"
                            name="confirmPassword"
                            size="small"
                            sx={{ width: "70%" }}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                    </Box>
                    <Button fullWidth variant="contained" type="submit">
                        Lưu thay đổi
                    </Button>
                </Stack>
            </Stack>
        </React.Suspense>
    );
}
