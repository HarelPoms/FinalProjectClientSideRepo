import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import ROUTES from "../../routes/ROUTES";

const ProfileMenuComponent = ({picSrc }) => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl2(null);
    };
    const handleProfileClick = () => {
        navigate(ROUTES.PROFILE);
    }

    const handleLogoutClick = () => {
        localStorage.clear();
        dispatch(authActions.logout());
    }

    return (
        <div>
        <IconButton onClick={handleClick}>
            <Avatar src={picSrc} />
        </IconButton>
        <Menu
            anchorEl={anchorEl2}
            open={anchorEl2 ? true : false}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
        </div>
    );
};
export default ProfileMenuComponent;
