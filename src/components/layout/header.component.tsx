"use client";

import { useContext, useState } from "react";
import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { styled, alpha, createTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";
import { AppContext } from "@/providers/app-provider";
import { UserContext } from "@/providers/user-provider";
import getBlogBySearch from "@/actions/search.action";
import { BlogContext } from "@/providers/blogs-provider";
import getBlogBySearchWhenLogin from "@/actions/search-when-login.action";

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
    const { updateBlogs } = useContext(BlogContext);

    const onClickLogin = () => router.push("/login");

    const onClickProfile = () => router.push(`/profile/${user._id}`);

    const handleSearch = async (formData: FormData) => {
        const search = String(formData.get("search"));
        if (token.access_token) {
            const res = await getBlogBySearchWhenLogin(search, 1);

            if (res.status) {
                updateBlogs(res.data);
            }
        } else {
            const res = await getBlogBySearch(search, 1);
            if (res.status) {
                updateBlogs(res.data);
            }
        }
    };

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box component={"form"} action={handleSearch}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <TextField
                        name="search"
                        fullWidth
                        sx={{
                            "& .MuiInputBase-input": {
                                padding: theme.spacing(1, 1, 1, 5),
                            },
                        }}
                        size="small"
                        placeholder="Tìm kiếm địa điểm du lịch…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
            </Box>

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
                            sx={{ width: 35, height: 35, cursor: "pointer" }}
                            onClick={onClickProfile}
                        />
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            onClick={onClickProfile}
                            sx={{ cursor: "pointer" }}
                        >
                            <Typography component={"span"}>{user?.fullName}</Typography>
                        </Typography>
                    </>
                ) : (
                    <Stack direction={"row"} spacing={2}>
                        <Button
                            size="medium"
                            variant="outlined"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 600,
                            }}
                            onClick={onClickLogin}
                        >
                            {/* <LoginIcon /> */}
                            Đăng nhập
                        </Button>

                        <Button
                            size="medium"
                            variant="outlined"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 600,
                            }}
                            onClick={() => router.push("/register")}
                        >
                            {/* <LoginIcon /> */}
                            Đăng Ký
                        </Button>
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
