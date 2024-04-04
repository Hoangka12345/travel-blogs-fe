"use client";

import { CircularProgress, Stack } from "@mui/material";
import Blog from "./blog.component";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/app-provider";
import { BlogContext } from "@/providers/blogs-provider";

export default function BlogList() {
    const { token } = useContext(AppContext);
    const { blogs, updateBlogs } = useContext(BlogContext);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchApi = async (api: string) => {
            try {
                setLoading(true);
                const res = await fetch(api);
                const data = await res.json();
                if (data.statusCode === 200) {
                    setLoading(false);
                    updateBlogs(data.data);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        (async () => {
            if (token.access_token) {
                await fetchApi("/api/get-login-blogs?page=1");
            } else {
                await fetchApi("/api/get-blogs?page=1");
            }
        })();
    }, [token]);

    return loading ? (
        <CircularProgress />
    ) : (
        <Stack spacing={2}>
            {blogs[0] &&
                blogs.map((blog) => {
                    return <Blog key={blog._id} blog={blog} />;
                })}
        </Stack>
    );
}
