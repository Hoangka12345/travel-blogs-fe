import BlogDetail from "@/components/saved-blog/blog-detail.component";
import { Container } from "@mui/material";

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    return (
        <Container maxWidth={"md"} sx={{ mb: 1 }}>
            <BlogDetail id={params.id} />
        </Container>
    );
}
