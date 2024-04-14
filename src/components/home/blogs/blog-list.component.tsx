"use client";

import { CircularProgress, Pagination, Paper, Stack } from "@mui/material";
import Blog from "./blog.component";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "@/providers/app-provider";
import { BlogContext } from "@/providers/blogs-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SkenetonComponent from "@/components/skeneton.component";

export default function BlogList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { token } = useContext(AppContext);
    const { blogs, updateBlogs } = useContext(BlogContext);

    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const currentPage = useMemo(() => {
        const getPage = searchParams.get("page");
        if (getPage) {
            return getPage;
        }
        return 1;
    }, [searchParams]);

    const search = useMemo(() => {
        const getPage = searchParams.get("search");
        if (getPage) {
            return getPage;
        }
        return "";
    }, [searchParams]);

    const fetchBlogsApi = async (api: string) => {
        try {
            setLoading(true);
            const res = await fetch(api);
            const data = await res.json();
            if (data.statusCode === 200) {
                setLoading(false);
                setTotalPage(data.data?.pageNumber);
                updateBlogs(data.data?.blogs);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            setPage(Number(currentPage));
            if (token.access_token) {
                await fetchBlogsApi(
                    `/api/get-login-blogs?page=${currentPage}&search=${search}`
                );
            } else {
                await fetchBlogsApi(
                    `/api/get-blogs?page=${currentPage}&search=${search}`
                );
            }
        })();
    }, [token, currentPage, search]);

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

    return loading ? (
        <SkenetonComponent />
    ) : (
        <Stack spacing={2} mb={1}>
            {blogs[0] &&
                blogs.map((blog) => {
                    return <Blog key={blog._id} blog={blog} />;
                })}
            <Paper sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={totalPage}
                    page={page}
                    color="primary"
                    onChange={handleChangePagination}
                />
            </Paper>
        </Stack>
    );
}
