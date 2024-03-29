import {
    Avatar,
    Box,
    FilledInput,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function BlogComment() {
    const [comment, setComment] = useState<string>("");
    return (
        <Stack sx={{ paddingY: 1 }} spacing={1}>
            {[1, 2, 3, 4].map((item) => (
                <Box display={"flex"} alignItems={"start"} gap={1} key={item}>
                    <Avatar>H</Avatar>
                    <Box
                        sx={{
                            paddingX: 2,
                            paddingY: 0.5,
                            borderRadius: 5,
                            backgroundColor: "rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <Typography fontWeight={600}>Phan Bảo Hoàng</Typography>
                        <Typography>test comment</Typography>
                    </Box>
                </Box>
            ))}

            <Box display={"flex"} alignItems={"start"} gap={1}>
                <Avatar>H</Avatar>
                <OutlinedInput
                    fullWidth
                    size="small"
                    endAdornment={
                        <InputAdornment
                            position="end"
                            sx={{ pointerEvents: !comment ? "none" : "auto" }}
                        >
                            <IconButton size="small">
                                <SendIcon color={comment ? "primary" : "inherit"} />
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        borderRadius: 20,
                    }}
                    onChange={(e) => setComment(e.target.value)}
                />
            </Box>
        </Stack>
    );
}
