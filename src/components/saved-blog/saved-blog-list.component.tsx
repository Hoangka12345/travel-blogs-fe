"use client";

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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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

    return (
        <>
            <Table size="small">
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
                        <TableCell align="right">
                            <HeaderTitle>Action</HeaderTitle>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fakeData?.map((data, index) => {
                        return (
                            <TableRow key={data.author}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.author}</TableCell>
                                <TableCell>{data.location}</TableCell>
                                <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        // onClick={() =>
                                        //     onClickDelete(student?._id, student?.name)
                                        // }
                                    >
                                        Xóa Blog
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => router.push(`${pathname}/123`)}
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
