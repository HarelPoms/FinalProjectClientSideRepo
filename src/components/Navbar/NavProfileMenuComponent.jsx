import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import ROUTES from "../../routes/ROUTES";
import {Divider} from "@mui/material";
import { Fragment } from "react";

const ProfileMenuComponent = ({picSrc, userName }) => {
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

    const isRegularNameOrPharmaName = (givenName) => {
        if (userName.firstName) return true;
        return false;
    }
    const calibrateUserName = (givenName, firstOrLast) => {
        if (!userName.split(" ")[0]) return givenName;
        if (firstOrLast) return userName.split(" ")[0];
        return userName.split(" ")[1];
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
            {/* <MenuItem>{calibrateUserName(userName, true)}</MenuItem> */}
            {isRegularNameOrPharmaName(userName) ? 
            <div>
                <MenuItem>{userName.firstName}</MenuItem>
                <MenuItem>{userName.lastName}</MenuItem>
            </div> :
            <MenuItem>{userName}</MenuItem>
            }
            <Divider></Divider>
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
        </div>
    );
};
export default ProfileMenuComponent;
