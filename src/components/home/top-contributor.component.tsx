"use client";

import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function TopContributor() {
    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {[1, 2, 3, 4, 5].map((item) => (
                <ListItem
                    key={item}
                    sx={{
                        cursor: "pointer",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                    onClick={() => console.log(item)}
                >
                    <ListItemAvatar>
                        <Avatar>h</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Phan Bảo Hoàng" secondary="Jan 9, 2014" />
                </ListItem>
            ))}
        </List>
    );
}
