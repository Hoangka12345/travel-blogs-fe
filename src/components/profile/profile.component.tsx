"use client";

import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { I_User } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import moment from "moment";
import Blog from "../home/blogs/blog.component";

export default function Profile({ id }: { id: string }) {
    const [user, setUser] = useState<I_User>();

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/profile/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.statusCode === 200) {
                setUser(data.data);
            }
        })();
    }, []);

    return (
        <Box width={"75%"} mb={1}>
            <Paper sx={{ paddingX: 10, paddingY: 5, mb: 3 }}>
                <Box display={"flex"} alignItems={"center"} gap={10}>
                    <Avatar
                        sx={{ width: 200, height: 200, flexGrow: 1 }}
                        src={user?.avatar ? user.avatar : "/imgs/img.jpg"}
                    />
                    <Stack spacing={2} width={"80%"}>
                        <Box>
                            <Typography
                                component={"span"}
                                fontWeight={600}
                                marginRight={1}
                            >
                                Họ và tên:
                            </Typography>
                            <Typography component={"span"} textAlign={"justify"}>
                                {user?.lastName &&
                                    user?.firstName &&
                                    `${user.lastName} ${user.firstName}`}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                component={"span"}
                                fontWeight={600}
                                marginRight={1}
                            >
                                Ngày sinh:
                            </Typography>
                            <Typography component={"span"} textAlign={"justify"}>
                                {user?.dateOfBirth &&
                                    moment(user.dateOfBirth).format("DD-MM-YYYY")}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                component={"span"}
                                fontWeight={600}
                                marginRight={1}
                            >
                                Email:
                            </Typography>
                            <Typography component={"span"} textAlign={"justify"}>
                                {user?.email && user.email}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                component={"span"}
                                fontWeight={600}
                                marginRight={1}
                            >
                                Ngày tham gia:
                            </Typography>
                            <Typography component={"span"} textAlign={"justify"}>
                                {user?.createdAt &&
                                    moment(user.createdAt).format("DD-MM-YYYY")}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            <Stack spacing={2}>
                {user?.blogs &&
                    user.blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
            </Stack>
        </Box>
    );
}
