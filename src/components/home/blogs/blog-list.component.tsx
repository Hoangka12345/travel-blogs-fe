"use client";

import { Stack } from "@mui/material";
import Blog from "./blog.component";
import { useEffect, useState } from "react";
import { I_Blog } from "@/interfaces/blog.interface";

export default function BlogList() {
    const [blogs, setBlogs] = useState<I_Blog[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/get-blogs?page=1");
            const data = await res.json();

            if (data.statusCode === 200) {
                setBlogs(data.data);
            }
        })();
    }, []);

    return (
        <Stack spacing={2}>
            {blogs[0] && blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
        </Stack>
    );
}
