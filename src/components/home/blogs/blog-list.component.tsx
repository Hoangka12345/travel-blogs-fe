"use client";

import { Stack } from "@mui/material";
import Blog from "./blog.component";
import { useContext, useEffect, useState } from "react";
import { I_Blog } from "@/interfaces/blog.interface";
import { AppContext } from "@/providers/app-provider";

export default function BlogList() {
    const { token } = useContext(AppContext);

    const [blogs, setBlogs] = useState<I_Blog[]>([]);

    useEffect(() => {
        const fetchApi = async (api: string) => {
            try {
                const res = await fetch(api);
                const data = await res.json();

                if (data.statusCode === 200) {
                    const newBlogs = data.data.map((item: I_Blog) => ({
                        ...item,
                        comments: item.comments.reverse(),
                    }));

                    setBlogs(newBlogs);
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
