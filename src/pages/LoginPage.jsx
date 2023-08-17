import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import CancelButtonComponent from "../components/CancelButtonComponent";
import RefreshButtonComponent from "../components/RefreshButtonComponent";
import ROUTES from "../routes/ROUTES";
import validateLoginSchema from "../validation/loginValidation";
import useLoggedIn from "../hooks/useLoggedIn";
import { validateLoginFieldFromSchema } from "../validation/loginValidation";
import useResponsiveQueries from "../hooks/useResponsiveQueries";

const LoginPage = () => {
  let startingInputVal = {email: "", password: ""};
  let startingInputErrVal = {};
  const [inputState, setInputState] = useState(startingInputVal);
  const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
  const [isPharmaState, setIsPharmaState] = useState(false);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    setIsPharmaState((newIsPharmaState) => newIsPharmaState);
  }, [isPharmaState]);

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      if(isPharmaState){
        const { data } = await axios.post("/pharmas/login", inputState);
        localStorage.setItem("token", data.token);
      }
      else{
        const { data } = await axios.post("/users/login", inputState);
        localStorage.setItem("token", data.token);
      }
      
      loggedIn();
      //move to homepage
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("Username/Password are Incorrect/Don't exist");
    }
  };
  const handleCheckboxChange = (ev) => {
    setIsPharmaState(ev.target.checked);
    console.log(isPharmaState);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    let inputErrorsStateToValidate;
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    let fieldValidationResult = validateLoginFieldFromSchema(ev.target.value, ev.target.id);
    if(!inputsErrorsState){
      inputErrorsStateToValidate = {};
    }
    else{
      inputErrorsStateToValidate = inputsErrorsState;
    }
    let newErrorState = JSON.parse(JSON.stringify(inputErrorsStateToValidate));
    newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
    setInputsErrorsState(newErrorState);
  };
  const handleRefreshClick = (ev) => {
    setInputState(startingInputVal);
    setInputsErrorsState(startingInputErrVal);
    setIsPharmaState(false);
  }

  return (
    <Container component="main" maxWidth={`${useResponsiveQueries()}`}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.email && (
                <Alert severity="warning">
                  {inputsErrorsState.email.map((item) => (
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputState.password}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.password && (
                <Alert severity="warning">
                  {inputsErrorsState.password.map((item) => (
                    <div key={"password-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="pharma" checked={isPharmaState} onChange={handleCheckboxChange} color="primary" />}
                label="Login as Pharma"
              />
            </Grid>
            <Grid item xs={6}>
              <CancelButtonComponent />
            </Grid>
            <Grid item xs={6}>
              <RefreshButtonComponent handleRefreshClick={handleRefreshClick}/>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBtnClick}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                <Typography variant="body2">
                  Did not have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
