import Blog from "@/components/home/blogs/blog.component";
import { Container } from "@mui/material";

export default function BlogDetail({ params }: { params: { id: string } }) {
    return (
        <Container maxWidth={"md"} sx={{ mb: 1 }}>
            <Blog />
        </Container>
    );
}
