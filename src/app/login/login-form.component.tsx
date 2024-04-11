"use client";

import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Stack,
} from "@mui/material";
import loginAction from "@/actions/login.action";
import { loginFormSchema } from "@/validations/login-form.zod";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AppContext } from "@/providers/app-provider";
import { UserContext } from "@/providers/user-provider";
import { io } from "socket.io-client";
import { WebSocketContext } from "@/providers/socket.provider";

export default function LoginForm() {
    const router = useRouter();

    const { updateAccessToken, updateUserId } = useContext(AppContext);
    // const { socket } = useContext(WebSocketContext);

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = loginFormSchema.safeParse({
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

    const handleLogin = async (FormData: FormData) => {
        const data = {
            email: FormData.get("email"),
            password: FormData.get("password"),
        };

        const validatedFields = loginFormSchema.safeParse(data);
        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            setErrors({
                email: zodErrors.email ? zodErrors.email[0] : "",
                password: zodErrors.password ? zodErrors.password[0] : "",
            });
        } else {
            const res = await loginAction(data);
            if (res.status) {
                try {
                    const fetchToken = await fetch("/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(res.data),
                    });
                    if (fetchToken.status === 200) {
                        updateAccessToken({
                            access_token: res.data.access_token,
                            refresh_token: res.data.refresh_token,
                        });
                        console.log(">>>login userid: ", res.data.user._id);

                        updateUserId(res.data.user._id);
                        // if (socket) {
                        //     socket.connect();
                        //     socket.on("connection", (id) => {
                        //         console.log(id);
                        //     });
                        //     socket.emit("connection", res.data.user._id);
                        // }
                        router.push("/");
                    }
                } catch (error) {
                    throw error;
                }
            } else {
                toast.error("Tài khoản không hợp lệ!");
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
                        my: 8,
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
                        Sign in
                    </Typography>
                    <Stack
                        component="form"
                        spacing={3}
                        mt={2}
                        width={"100%"}
                        action={handleLogin}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onBlur={onBlur}
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            SIGN IN
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
}
