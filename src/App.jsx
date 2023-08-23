import './App.css';
import { useEffect, useState } from "react";
import MuiNavbar from "./components/Navbar/MuiNavbar";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/Router";
import LoadingAnimationComponent from "./components/LoadingAnimationComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLoggedIn from "./hooks/useLoggedIn";
import Box from "@mui/material/Box";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AttributionIcon from '@mui/icons-material/Attribution';
import ROUTES from "./routes/ROUTES";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
    const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const handleToAboutClick = () => {
    navigate(ROUTES.ABOUT);
  }
  const handleToFavMedicinesClick = () => {
    navigate(ROUTES.MYFAVMEDICINES);
  }
  const handleToMyPrescriptionsClick = () => {
    navigate(ROUTES.MYPRESCRIPTIONS);
  }
  
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <Container>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <header>
          <MuiNavbar />
        </header>
        <main>{isLoading ? <LoadingAnimationComponent /> : <Router />}</main>
        <footer>
          <Box>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
            <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={handleToAboutClick}/>
              {payload && ((!payload.isPharma && !payload.isAdmin && !payload.isDoctor)) &&  <BottomNavigationAction label="Favorite Medicines" icon={<FavoriteIcon />} onClick={handleToFavMedicinesClick}/>}
              {payload && ((!payload.isPharma && !payload.isAdmin) || payload.isDoctor) && <BottomNavigationAction label="My Prescriptions" icon={<AttributionIcon />} onClick={handleToMyPrescriptionsClick}/>}
            </BottomNavigation>
          </Box>
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
