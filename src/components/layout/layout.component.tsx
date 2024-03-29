"use client";

import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline, Grid, createTheme } from "@mui/material";

import NavigationBar from "./navigation-bar.component";
import HeaderLayout from "./header.component";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/localstorage.hook";

const defaultTheme = createTheme();

export default function LayoutProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/register") {
        return <Box>{children}</Box>;
    } else {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Box display={"flex"}>
                    <CssBaseline />
                    <NavigationBar />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sx={{ position: "sticky", top: 0 }}>
                                    <Box sx={{ height: "70px", paddingX: 2 }}>
                                        <HeaderLayout />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            height: "calc(100vh - 95px)",
                                            overflow: "auto",
                                            paddingX: 2,
                                        }}
                                    >
                                        {children}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}
