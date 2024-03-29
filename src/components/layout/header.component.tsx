"use client";

import { useContext, useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { styled, alpha, createTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";
import { AppContext } from "@/providers/app-provider";
import { UserContext } from "@/providers/user-provider";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
    flexGrow: 1,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const theme = createTheme();

export default function HeaderLayout() {
    const router = useRouter();
    const { token } = useContext(AppContext);
    const { user } = useContext(UserContext);

    const onClickLogin = () => router.push("/login");

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <TextField
                    fullWidth
                    sx={{
                        "& .MuiInputBase-input": { padding: theme.spacing(1, 1, 1, 5) },
                    }}
                    size="small"
                    placeholder="Search Blog…"
                    inputProps={{ "aria-label": "search" }}
                />
            </Search>

            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"end"}
                gap={1.5}
                width={"50%"}
            >
                {token.access_token ? (
                    <>
                        <NotificationsIcon />
                        <Avatar
                            alt="avatar"
                            src={user.avatar ? user.avatar : "/imgs/img1.jpg"}
                            sx={{ width: 35, height: 35 }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                            <Typography component={"span"}>
                                {user.lastName && user.lastName}{" "}
                            </Typography>
                            <Typography component={"span"}>
                                {user.firstName && user.firstName}
                            </Typography>
                        </Typography>
                    </>
                ) : (
                    <>
                        <Button
                            size="large"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 600,
                            }}
                            onClick={onClickLogin}
                        >
                            <LoginIcon />
                            Đăng nhập
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}
