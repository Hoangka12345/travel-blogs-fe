"use client";

import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { I_User } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import moment from "moment";
import Blog from "../../../components/home/blogs/blog.component";
import { I_Blog } from "@/interfaces/blog.interface";

export default function Profile({ id }: { id: string }) {
    const [user, setUser] = useState<I_User>();
    const [blogs, setBlogs] = useState<I_Blog[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/profile/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (data.statusCode === 200) {
                console.log(data);

                setUser(data.data.user);
                setBlogs(data.data.blogs);
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
                                {user?.fullName}
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
                                {user?.email}
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

            {blogs.length > 0 ? (
                <Stack spacing={2}>
                    {blogs && blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
                </Stack>
            ) : (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography color={"red"} variant="h4">
                        Người dùng chưa đăng tải blog nào!
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}
