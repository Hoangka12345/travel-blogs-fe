"use client";

import Blog from "@/components/home/blogs/blog.component";
import { I_Blog } from "@/interfaces/blog.interface";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function BlogDetail({ id }: { id: string }) {
    const [blog, setBlog] = useState<I_Blog>({
        _id: "",
        address: "",
        country: "",
        city: "",
        content: "",
        images: [],
        user: {
            _id: "",
            firstName: "",
            lastName: "",
            avatar: "",
        },
        createdAt: "",
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/get-blog/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.statusCode === 200) {
                setBlog(data.data);
            }
        })();
    }, []);

    return (
        <Box>
            <Blog blog={blog} />
        </Box>
    );
}
