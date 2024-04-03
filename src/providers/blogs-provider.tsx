"use client";

import { I_Blog } from "@/interfaces/blog.interface";
import { ReactNode, createContext, useState } from "react";

const initialBlogs: I_Blog[] = [];

export const BlogContext = createContext({
    blogs: initialBlogs,
    updateBlogs: (blogs: I_Blog[]) => {},
});

export default function BlogProvider({ children }: { children: ReactNode }) {
    const [blogs, setBlogs] = useState<I_Blog[]>(initialBlogs);
    const updateBlogs = (newBlog: I_Blog[]) => setBlogs(newBlog);

    return (
        <BlogContext.Provider value={{ blogs, updateBlogs }}>
            {children}
        </BlogContext.Provider>
    );
}
