"use client";

import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    SvgIconTypeMap,
    Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { AppContext } from "@/app/app-provider";

const drawerWidth = 250;

interface I_ListItem {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    text: string;
    path: string;
    focus: boolean;
}

export default function NavigationBar() {
    const router = useRouter();
    const pathName = usePathname();

    const { token, updateAccessToken } = useContext(AppContext);

    const [listItems, setLisItems] = useState<I_ListItem[]>([
        { icon: DashboardIcon, text: "Trang chủ", path: "/", focus: false },
        { icon: AddBoxIcon, text: "Tạo Blog", path: "/create-blog", focus: false },
        { icon: SaveAltIcon, text: "Blogs đã lưu", path: "/saved-blog", focus: false },
    ]);

    // check pathname to set hover css
    useEffect(() => {
        const newListItems = listItems.map((item) => {
            if (pathName === item.path) {
                return { ...item, focus: true };
            }
            return { ...item, focus: false };
        });
        setLisItems(newListItems);
    }, [pathName]);

    const handleLogout = async () => {
        await fetch("/api/logout");
        updateAccessToken({ access_token: "", refresh_token: "" });
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
                zIndex: 1,
            }}
            variant="permanent"
            anchor="left"
        >
            <Box p={2} display={"flex"} alignItems={"center"} gap={1} height={"15%"}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    p={0.8}
                    bgcolor={"blue"}
                    borderRadius={2}
                >
                    <ConnectingAirportsIcon sx={{ color: "white" }} fontSize="small" />
                </Box>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontFamily: "Arial Black, sans-serif" }}
                >
                    Travel Blogs
                </Typography>
            </Box>
            <Box
                height={"85%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
            >
                <List>
                    {listItems.map((item, index) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{
                                color: item.focus ? "blue" : "rgba(0, 0, 0, 0.7)",
                                "&:hover": { color: "blue" },
                            }}
                            onClick={() => router.push(item.path)}
                        >
                            <ListItemButton sx={{ paddingY: 1.6 }}>
                                <Stack direction={"row"} spacing={2}>
                                    <item.icon />
                                    <ListItemText primary={item.text} />
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {token.access_token && (
                    <List>
                        <ListItem
                            disablePadding
                            sx={{
                                color:
                                    pathName === "/setting"
                                        ? "blue"
                                        : "rgba(0, 0, 0, 0.7   )",
                                "&:hover": { color: "blue" },
                            }}
                            onClick={() => router.push("setting")}
                        >
                            <ListItemButton>
                                <Stack direction={"row"} spacing={1}>
                                    <SettingsIcon />
                                    <ListItemText primary={"Cài đặt"} />
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ color: "red" }}>
                            <ListItemButton onClick={handleLogout}>
                                <Stack direction={"row"} spacing={1}>
                                    <LogoutIcon />
                                    <ListItemText primary={"Đăng xuất"} />
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
            </Box>
        </Drawer>
    );
}
