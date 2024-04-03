import SavedBlogList from "@/app/saved-blog/saved-blog-list.component";
import { Paper } from "@mui/material";

export default async function SavedBlogPage() {
    return (
        <Paper sx={{ paddingX: 10, paddingY: 5 }}>
            <SavedBlogList />
        </Paper>
    );
}
