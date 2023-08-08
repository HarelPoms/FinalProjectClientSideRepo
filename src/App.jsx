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
import Router from "./routes/Router";
import LoadingAnimationComponent from "./components/LoadingAnimationComponent";
import { useSelector } from "react-redux";

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
  const [isLoading, setIsLoading] = useState(false);
    const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

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
        <footer></footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
