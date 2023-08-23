import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import axios from "axios";
import { toast } from "react-toastify";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavbarMenuLinks from "./NavbarMenuLinks";
import NavbarNotAuthLinks from "./NavbarNotAuthLinks";
import useResponsiveQueries from "../../hooks/useResponsiveQueries";
import NavProfileMenuComponent from "./NavProfileMenuComponent";

const MuiNavbar = () => {
  const navigate = useNavigate();
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const [isSearchUnfocused, setIsSearchUnfocused] = useState(true);
  const viewportSize = useResponsiveQueries();
  const [avatarURL,setAvatarURL] = useState(defaultAvatar);
  const [userName, setUserName] = useState("");
  const payload = useSelector((bigPie) => bigPie.authSlice.payload); 
  const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoClick = () => {
    navigate(ROUTES.HOME);
  }

  const trackSearchUnfocused = () => {
    setIsSearchUnfocused(!isSearchUnfocused);
  }

  const checkValidURLImage = (url) => {
    let suffixes = ["jpeg","jpg","png","gif","raw"]; //format img
    let splitUrl = url.split("."); // ["https://i", "imgur", "com/qMUWuXV", "jpg"]
    return(suffixes.includes(splitUrl[splitUrl.length-1]));
  }

  const getUserData = async (id) => {
    let {data} = await axios.get("/users/" + id);
    return {data: data};
  }

const getPharmaData = async (id) => {
  let {data} = await axios.get("/pharmas/" + id);
  return {data: data};
}

  useEffect(() => {
        (async () => {
        try{
            if(payload){
              let data;
              if(payload.isPharma){
                ({data} = await getPharmaData(payload._id));
              }
              else{
                ({data} = await getUserData(payload._id));
              }
              setUserName(data.name.firstName + " " + data.name.lastName);
              if(data.image.url && data.image.url !== "" && checkValidURLImage(data.image.url)){
                setAvatarURL(data.image.url);
              }
              else{
                setAvatarURL(defaultAvatar);
              }
            }
        }
        catch(err){
            toast.error("Failed to get user to set avatar picture");
        }
        })();
        
    }, [payload]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box onClick={logoClick} sx={{ display: { xs: "none", md: "inline" } }}>
            <LocalPharmacyIcon />
          </Box>
          
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavbarMenuLinks isMobile={false}/>
          </Box>
          <SearchPartial handleSearchFocus={trackSearchUnfocused}/>
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              {isDarkTheme && isSearchUnfocused ? <DarkModeIcon onClick={changeTheme} /> :
              isSearchUnfocused ?
              <LightModeIcon onClick={changeTheme}/> : ""}
              {isLoggedIn && isSearchUnfocused ? <NavProfileMenuComponent picSrc={avatarURL} userName={userName} /> : ""}
              {isSearchUnfocused && viewportSize !== "xs" && viewportSize !== "sm" ? <NavbarNotAuthLinks /> : ""}
            </Box>
            
          </Box>
          {/* hamburger with menu */}
          {isSearchUnfocused ? <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavbarMenuLinks isMobile={true}/>
            </Menu>
          </Box> : ""}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
