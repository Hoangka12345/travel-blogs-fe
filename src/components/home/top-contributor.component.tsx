"use client";

import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface I_TopUser {
    _id: string;
    fullName: string;
    avatar: string;
    createdAt: string;
    totalBlogs: number;
}

export default function TopContributor() {
    const router = useRouter();

    const [topUsers, setTopUsers] = useState<I_TopUser[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/get-contributors", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.statusCode === 200) {
                setTopUsers(data.data);
            }
        })();
    }, []);

    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {topUsers[0] &&
                topUsers.map((user) => (
                    <ListItem
                        key={user?._id}
                        sx={{
                            cursor: "pointer",
                            borderRadius: 2,
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                        }}
                        onClick={() => router.push(`/profile/${user?._id}`)}
                    >
                        <ListItemAvatar>
                            <Avatar src={user?.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    spacing={0.5}
                                >
                                    <Typography>{user?.fullName}</Typography>
                                    <Typography>-</Typography>
                                    <Typography color={"darkgray"}>
                                        {user?.totalBlogs}{" "}
                                        {user?.totalBlogs > 1 ? "blogs" : "blog"}
                                    </Typography>
                                </Stack>
                            }
                            secondary={moment(user?.createdAt).format("DD-MM-YYYY")}
                        />
                    </ListItem>
                ))}
        </List>
    );
}
