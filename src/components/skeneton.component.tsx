import { Skeleton, Stack } from "@mui/material";

export default function SkenetonComponent() {
    return (
        <Stack spacing={1}>
            <Stack direction={"row"} spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={80} height={40} />
            </Stack>
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={300} />
        </Stack>
    );
}
