"use server";

import CreateForm from "@/components/create-blog/create-form.component";
import { Paper } from "@mui/material";

export default async function CreateBlogPage() {
    return (
        <Paper sx={{ paddingX: 20, paddingY: 5 }}>
            <CreateForm />
        </Paper>
    );
}
