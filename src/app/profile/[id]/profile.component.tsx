"use client";

import { Avatar, Box, Pagination, Paper, Stack, Typography } from "@mui/material";
import { I_User } from "@/interfaces/user.interface";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import Blog from "../../../components/home/blogs/blog.component";
import { I_Blog } from "@/interfaces/blog.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppContext } from "@/providers/app-provider";

export default function Profile({ id }: { id: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { token } = useContext(AppContext);

    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [user, setUser] = useState<I_User>();
    const [blogs, setBlogs] = useState<I_Blog[]>([]);

    const currentPage = useMemo(() => {
        const getPage = searchParams.get("page");
        if (getPage) {
            return getPage;
        }
        return 1;
    }, [searchParams]);

    const fetchBlogsApi = async (api: string) => {
        const res = await fetch(api, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (data.statusCode === 200) {
            console.log(data.data?.pageNumber);

            setUser(data.data.user);
            setTotalPage(data.data?.pageNumber);
            setBlogs(data.data?.blogs);
        }
    };

    useEffect(() => {
        (async () => {
            setPage(Number(currentPage));
            if (token.access_token) {
                await fetchBlogsApi(`/api/profile-login/${id}?page=${currentPage}`);
            } else {
                await fetchBlogsApi(`/api/profile/${id}?page=${currentPage}`);
            }
        })();
    }, [token, currentPage]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleChangePagination = async (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        router.push(pathname + "?" + createQueryString("page", value.toString()));
    };

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
                <Stack spacing={2} mb={1}>
                    {blogs && blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
                    <Paper sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                        <Pagination
                            count={totalPage}
                            page={page}
                            color="primary"
                            onChange={handleChangePagination}
                        />
                    </Paper>
                </Stack>
            ) : currentPage === 1 && blogs.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography color={"red"} variant="h4">
                        Người dùng chưa đăng tải blog nào!
                    </Typography>
                </Paper>
            ) : (
                <Paper sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                    <Pagination
                        count={totalPage}
                        page={page}
                        color="primary"
                        onChange={handleChangePagination}
                    />
                </Paper>
            )}
        </Box>
    );
}
