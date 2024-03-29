"use client";

import { ReactNode, createContext, useState } from "react";

interface I_Blog {
    _id: string;
    address: string;
    country: string;
    city: string;
    content: string;
    images: string[];
}

const initialBlogs: I_Blog[] = [];

export const BlogContext = createContext({
    blogs: initialBlogs,
    updateBlogs: (blogs: I_Blog[]) => {},
});

export default function BlogProvider({ children }: { children: ReactNode }) {
    const [blogs, setBlogs] = useState<I_Blog[]>(initialBlogs);
    const updateBlogs = (newBlog: I_Blog[]) => setBlogs((prev) => [...prev, ...newBlog]);

    return (
        <BlogContext.Provider value={{ blogs, updateBlogs }}>
            {children}
        </BlogContext.Provider>
    );
}
