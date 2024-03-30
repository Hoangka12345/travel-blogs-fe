import SavedBlogList from "@/components/saved-blog/saved-blog-list.component";
import { Paper } from "@mui/material";
import { cookies } from "next/headers";

export default async function SavedBlogPage() {
    return (
        <Paper sx={{ paddingX: 10, paddingY: 5 }}>
            <SavedBlogList />
        </Paper>
    );
}
