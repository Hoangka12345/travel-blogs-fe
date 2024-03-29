"use server";

import BlogList from "@/components/home/blogs/blog-list.component";
import TopContributor from "@/components/home/top-contributor.component";
import { Grid, Paper } from "@mui/material";
import { Suspense } from "react";

const stylePaperWrapper = {
    padding: 2,
    position: "sticky",
    top: 0,
};

export default async function Home() {
    return (
        <Grid container spacing={5} sx={{ height: "calc(100vh - 70px)" }}>
            <Grid item xs={8} sx={{ overflow: "auto" }}>
                <Suspense
                    fallback={
                        <p style={{ color: "red", fontSize: "30px" }}>loading oke...</p>
                    }
                >
                    <BlogList />
                </Suspense>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={stylePaperWrapper}>
                    <TopContributor />
                </Paper>
            </Grid>
        </Grid>
    );
}
