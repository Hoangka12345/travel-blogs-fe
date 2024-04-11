"use client";

import {
    Badge,
    Box,
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useContext, useEffect } from "react";
import { I_Notification } from "@/interfaces/notification.interface";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useRouter } from "next/navigation";
import deleteNotificationAction from "@/actions/notification/delete-notification.action";
import { WebSocketContext } from "@/providers/socket.provider";
import moment from "moment";

const ITEM_HEIGHT = 50;

export default function Notification() {
    const router = useRouter();

    const { socket } = useContext(WebSocketContext);

    const [notifications, setNotification] = React.useState<I_Notification[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/get-notifications", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.statusCode === 200) {
                setNotification(data.data.reverse());
            }
        })();
    }, []);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on("notification", (notifications) => {
    //             const newNotifications = notifications.reverse() as I_Notification[];
    //             setNotification(newNotifications);
    //         });

    //         return () => {
    //             socket.off("notification");
    //         };
    //     }
    // }, []);

    const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickNotification = async (notificationId: string, blogId: string) => {
        handleClose();
        router.push(`/blog/${blogId}`);
        const res = await deleteNotificationAction(notificationId);
        if (res.status) {
            const newNotifications = notifications.filter(
                (notification) => notification._id !== notificationId
            );
            setNotification(newNotifications);
        }
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Badge badgeContent={notifications.length} color="primary">
                    <NotificationsIcon fontSize={"medium"} />
                </Badge>
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 450,
                    },
                }}
            >
                {notifications[0] &&
                    notifications.map((notification) => (
                        <MenuItem
                            key={notification?._id}
                            onClick={() =>
                                handleClickNotification(
                                    notification?._id,
                                    notification?.blogId
                                )
                            }
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography fontWeight={600} variant="body1">
                                        {notification?.content}
                                    </Typography>
                                    <Typography variant="caption">
                                        {notification?.createdAt &&
                                            moment(notification?.createdAt).fromNow()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <PriorityHighIcon color="warning" />
                                </Box>
                            </Box>
                        </MenuItem>
                    ))}
            </Menu>
        </>
    );
}
