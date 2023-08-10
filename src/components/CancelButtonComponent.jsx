import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const CancelButtonComponent = () => {
    const navigate = useNavigate();
    const cancelBtnClick = () => {
        navigate(ROUTES.HOME);
    }
    return (
        <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={cancelBtnClick}
        >
            Cancel
        </Button>
    )
}

export default CancelButtonComponent