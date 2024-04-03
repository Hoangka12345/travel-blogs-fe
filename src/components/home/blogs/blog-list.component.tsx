"use client";

import { Stack } from "@mui/material";
import Blog from "./blog.component";
import { useContext, useEffect } from "react";
import { AppContext } from "@/providers/app-provider";
import { BlogContext } from "@/providers/blogs-provider";

export default function BlogList() {
    const { token } = useContext(AppContext);
    const { blogs, updateBlogs } = useContext(BlogContext);

    useEffect(() => {
        const fetchApi = async (api: string) => {
            try {
                const res = await fetch(api);
                const data = await res.json();
                if (data.statusCode === 200) {
                    updateBlogs(data.data);
                }
            } catch (error) {
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

    return (
        <Stack spacing={2}>
            {blogs[0] &&
                blogs.map((blog) => {
                    return <Blog key={blog._id} blog={blog} />;
                })}
        </Stack>
    );
}
