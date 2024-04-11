"use client";

import removeBlogAction from "@/actions/saved-blogs/remove-blog.action";
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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HeaderTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
}));

interface I_SavedBlog {
    _id: string;
    userId: {
        fullName: string;
    };
    blogId: {
        _id: string;
        address: string;
        createdAt: string;
    };
}

export default function SavedBlogList() {
    const router = useRouter();

    const [savedBlogs, setSavedBlogs] = useState<I_SavedBlog[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/get-saved-blog", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();

                if (data.statusCode === 200) {
                    setSavedBlogs(data.data);
                }
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    const onClickDelete = async (savedBlogId: string) => {
        const res = await removeBlogAction(savedBlogId);
        if (res.status) {
            const newSavedBlogs = savedBlogs.filter(
                (savedBlog) => savedBlog._id !== savedBlogId
            );
            setSavedBlogs(newSavedBlogs);
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
                    {savedBlogs &&
                        savedBlogs.map((savedBlog, index) => {
                            return (
                                <TableRow key={savedBlog?._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{savedBlog?.userId.fullName}</TableCell>
                                    <TableCell>{savedBlog?.blogId.address}</TableCell>
                                    <TableCell>
                                        {savedBlog?.blogId.createdAt &&
                                            moment(savedBlog?.blogId.createdAt).format(
                                                "DD-MM-YYYY"
                                            )}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ display: "flex", gap: 1 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => onClickDelete(savedBlog?._id)}
                                        >
                                            Xóa Blog
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                router.push(
                                                    `/blog/${savedBlog?.blogId._id}`
                                                )
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
