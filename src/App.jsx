import logo from './logo.svg';
import './App.css';
import MuiNavbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <MuiNavbar />
        <HomePage />
      </Container>
    </div>
  );
}

export default App;
