"use client";

import removeBlogAction from "@/actions/saved-blogs/remove-blog.action";
import { I_Blog } from "@/interfaces/blog.interface";
import { I_SavedBlog } from "@/interfaces/saved-blog.interface";
import { AppContext } from "@/providers/app-provider";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    styled,
} from "@mui/material";
import moment from "moment";
import { revalidateTag } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const HeaderTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
}));

const fakeData = [
    { author: "John Doe", location: "Paris, France" },
    { author: "Alice Smith", location: "Tokyo, Japan" },
    { author: "Bob Johnson", location: "Rome, Italy" },
    { author: "Emily Brown", location: "New York, USA" },
];

export default function SavedBlogList() {
    const pathname = usePathname();
    const router = useRouter();

    const [blogs, setBlogs] = useState<I_Blog[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/saved-blog", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();

                if (data.statusCode === 200) {
                    setBlogs(data.data.savedBlogs);
                }
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    const onClickDelete = async (blogId: string) => {
        const res = await removeBlogAction(blogId);
        if (res.status) {
            const newBlogs = blogs.filter((blog) => blog._id !== blogId);
            setBlogs(newBlogs);
            toast.success("xóa blog từ bộ sưu tập thành công!");
        } else {
            toast.error("không thể xóa blog!");
        }
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <HeaderTitle>No</HeaderTitle>
                        </TableCell>
                        <TableCell>
                            <HeaderTitle>Tác giả</HeaderTitle>
                        </TableCell>
                        <TableCell>
                            <HeaderTitle>Địa điểm du lịch</HeaderTitle>
                        </TableCell>
                        <TableCell>
                            <HeaderTitle>Ngày tạo</HeaderTitle>
                        </TableCell>
                        <TableCell align="right">
                            <HeaderTitle>Action</HeaderTitle>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {blogs[0] &&
                        blogs.map((blog, index) => {
                            return (
                                <TableRow key={blog._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{blog?.user.fullName}</TableCell>
                                    <TableCell>{blog?.address}</TableCell>
                                    <TableCell>
                                        {blog.createdAt &&
                                            moment(blog.createdAt).format("DD-MM-YYYY")}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ display: "flex", gap: 1 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => onClickDelete(blog?._id)}
                                        >
                                            Xóa Blog
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                router.push(`/blog/${blog?._id}`)
                                            }
                                        >
                                            Thông tin chi tiết
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={10}
                rowsPerPage={5}
                page={0}
                onPageChange={(e, newPage) => console.log(newPage)}
            />
        </>
    );
}
