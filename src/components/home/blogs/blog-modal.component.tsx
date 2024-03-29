"use client";

import { Box, Divider, Modal } from "@mui/material";
import Blog from "./blog.component";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 700,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    overflow: "auto",
};

interface I_Props {
    open: boolean;
    handleClose: () => void;
}

export default function BlogModal({ open, handleClose }: I_Props) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Blog />
                <Divider />
                <Box>alo</Box>
            </Box>
        </Modal>
    );
}
