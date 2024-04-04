import { Paper } from "@mui/material";
import SettingForm from "./settingForm.component";

export default function SettingPage() {
    return (
        <Paper sx={{ paddingX: 10, paddingY: 5, zIndex: 1 }}>
            <SettingForm />
        </Paper>
    );
}
