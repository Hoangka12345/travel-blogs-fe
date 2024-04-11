"use client";

import Blog from "@/components/home/blogs/blog.component";
import { I_Blog } from "@/interfaces/blog.interface";
import { AppContext } from "@/providers/app-provider";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const initialBlog = {
    _id: "",
    address: "",
    country: "",
    city: "",
    content: "",
    images: [],
    user: {
        _id: "",
        fullName: "",
        avatar: "",
    },
    comments: [],
    reactionCount: 0,
    commentCount: 0,
    createdAt: "",
};

export default function BlogDetail({ id }: { id: string }) {
    const { token } = useContext(AppContext);

    const [blog, setBlog] = useState<I_Blog>(initialBlog);

    useEffect(() => {
        const fetchGetBlog = async (api: string) => {
            const res = await fetch(api, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.statusCode === 200) {
                console.log(data);

                setBlog(data.data);
            }
        };

        (async () => {
            if (token.access_token) {
                await fetchGetBlog(`/api/get-login-blog/${id}`);
            } else {
                await fetchGetBlog(`/api/get-blog/${id}`);
            }
        })();
    }, []);

    return (
        <Box>
            <Blog blog={blog} />
        </Box>
    );
}
