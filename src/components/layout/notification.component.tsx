"use client";

import { IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";

const options = ["None", "Atria", "Callisto", "Dione", "Ganymede", "Hangouts Call"];

const ITEM_HEIGHT = 50;

export default function Notification() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                <NotificationsIcon />
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
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        selected={option === "Pyxis"}
                        onClick={handleClose}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
