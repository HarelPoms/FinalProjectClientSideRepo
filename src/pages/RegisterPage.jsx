import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import validateRegisterSchema from "../validation/registerValidation";
import { validateRegisterFieldFromSchema } from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import InputComponent from "../components/InputComponent";
import CancelButtonComponent from "../components/CancelButtonComponent";
import RefreshButtonComponent from "../components/RefreshButtonComponent";
import LoadingAnimationComponent from "../components/LoadingAnimationComponent";
import useResponsiveQueries from "../hooks/useResponsiveQueries";
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const RegisterPage = () => {
  const startingInputVal = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    HMO: "",
    isDoctor: false
  };

  const startingInputErrVal = {};
  const [inputState, setInputState] = useState(startingInputVal);
  const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
  const [hmosState, setHmosState] = useState([]);
  const navigate = useNavigate();
  const viewportSize = useResponsiveQueries();

  useEffect(() => {
      (async () => {
      try{
        let {data: allHmos} = await axios.get("/hmos/");
        setHmosState(allHmos);
      }
      catch(err){
          toast.error("Failed to get and set register hmos");
      }
      })();
      
  }, []);

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      let inputStateToSend = JSON.parse(JSON.stringify(inputState));
      inputStateToSend.name = {firstName : inputStateToSend.firstName, middleName: inputStateToSend.middleName, lastName: inputStateToSend.lastName};
      delete inputStateToSend.firstName;
      delete inputStateToSend.middleName;
      delete inputStateToSend.lastName;
      inputStateToSend.address = {country: inputStateToSend.country, state: inputStateToSend.state, city: inputStateToSend.city, street: inputStateToSend.street, houseNumber: inputStateToSend.houseNumber, zipCode: inputStateToSend.zipCode};
      delete inputStateToSend.country;
      delete inputStateToSend.state;
      delete inputStateToSend.city;
      delete inputStateToSend.street;
      delete inputStateToSend.houseNumber;
      delete inputStateToSend.zipCode;
      inputStateToSend.image = {url: inputStateToSend.imageUrl, alt: inputStateToSend.imageAlt};
      delete inputStateToSend.imageUrl;
      delete inputStateToSend.imageAlt;
      if(!inputStateToSend.image.url || inputStateToSend.image.url === "")
      delete inputStateToSend.image;
      await axios.post("/users/", inputStateToSend);
      navigate(ROUTES.LOGIN);
    } catch (err) {
        toast.error("Error trying to register user");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    let fieldValidationResult = validateRegisterFieldFromSchema(ev.target.value, ev.target.id);
    let newErrorState = JSON.parse(JSON.stringify(inputsErrorsState));
    newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
    setInputsErrorsState(newErrorState);
  };

  const handleCheckboxChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.checked;
    setInputState(newInputState);
  };

  const handleRefreshClick = (ev) => {
    setInputState(startingInputVal);
    setInputsErrorsState(startingInputErrVal);
  }

  const handleHMOInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState.HMO = ev.target.value;
    setInputState(newInputState);
  };

  if (!hmosState) {
    return <LoadingAnimationComponent />;
  }
  return (
    <Container component="main" maxWidth={viewportSize}>
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
          Register
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <InputComponent id="firstName" label="First Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="middleName" label="Middle Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="lastName" label="Last Name" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="phone" label="Phone" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="email" label="Email" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="password" label="Password" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} inputType="password" />
            <InputComponent id="imageUrl" label="Image Url" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="imageAlt" label="Image Alt" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="country" label="Country" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="state" label="State" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="city" label="City" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="street" label="Street" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="houseNumber" label="House Number" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="zipCode" label="Zip Code" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <Grid item xs={12}>
              <FormControl fullWidth>
              <InputLabel id="selectHmo">HMO</InputLabel>
                <Select
                  labelId="hmoLabel"
                  id="HMO"
                  value={inputState.HMO}
                  label="HMO"
                  onChange={handleHMOInputChange}
                >
                  {hmosState.map((hmo) => (
                    <MenuItem value={hmo._id} key={hmo._id + Date.now()}>{hmo.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="isDoctor" checked={inputState.isDoctor} onChange={handleCheckboxChange} color="primary" />}
                label="Register as Doctor"
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
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.LOGIN}>
                <Typography variant="body2">
                  Already have an account?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
