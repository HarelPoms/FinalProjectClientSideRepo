import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { shoppingCartActions } from "../../store/shoppingCart";
import {Divider} from "@mui/material";

const ProfileMenuComponent = ({picSrc, userName }) => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl2(null);
    };

    const handleLogoutClick = () => {
        localStorage.clear();
        dispatch(shoppingCartActions.clearCart());
        dispatch(authActions.logout());
    }

    const isRegularNameOrPharmaName = (givenName) => {
        if (userName.firstName) return true;
        return false;
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
            {isRegularNameOrPharmaName(userName) ? 
            <div>
                <MenuItem>{userName.firstName}</MenuItem>
                <MenuItem>{userName.lastName}</MenuItem>
            </div> :
            <MenuItem>{userName}</MenuItem>
            }
            <Divider></Divider>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
        </div>
    );
};
export default ProfileMenuComponent;
