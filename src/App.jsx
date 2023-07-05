import './App.css';
import { useEffect, useState } from "react";
import MuiNavbar from "./components/Navbar/Navbar";
import {
  Container,
  CssBaseline,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import Router from "./routes/Router";
import LoadingAnimationComponent from "./components/LoadingAnimationComponent";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
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
  );
}

export default App;
