import { Grid, Stack } from "@mui/material";
import Blog from "./blog.component";

export default function BlogList() {
    return (
        <Stack spacing={2}>
            {[1, 2, 3, 4].map((item) => (
                <Blog key={item} />
            ))}
        </Stack>
    );
}
