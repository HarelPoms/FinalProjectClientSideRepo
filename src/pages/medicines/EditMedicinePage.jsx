import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import convertToBool from "../../services/convertToBoolUtil";
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import ROUTES from "../../routes/ROUTES";
import validateMedicineEditSchema, {
  validateEditMedicineParamsSchema, validateEditMedicineFieldFromSchema
} from "../../validation/medicineEditValidation";
import atom from "../../logo.svg";
import { toast } from "react-toastify";
import InputComponent from "../../components/InputComponent";
import CancelButtonComponent from "../../components/CancelButtonComponent";
import RefreshButtonComponent from "../../components/RefreshButtonComponent";
import useResponsiveQueries from "../../hooks/useResponsiveQueries";

const EditMedicinePage = () => {
  const startingInputVal = null;
  const startingInputErrVal = {};
  const { id } = useParams();
  const querySize = useResponsiveQueries();
  const [inputState, setInputState] = useState(startingInputVal);
  const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditMedicineParamsSchema({ id });
        if (errors) {
          // there were errors = incorrect id
          navigate("/");
          return;
        }
        const { data : currMedicine } = await axios.get("/medicines/" + id);
        const { data : medsOfPharma } = await axios.get("/pharmas/my-medicines");
        let filterObj = medsOfPharma.filter((med)=>med._id == id)[0];
        if(!filterObj){
          toast.error("You have no permissions for this medicine");
          navigate(ROUTES.HOME);
        }
        let newInputState = {
          ...currMedicine,
        };
        if (currMedicine.image && currMedicine.image.url) {
          newInputState.url = currMedicine.image.url;
        } else {
          newInputState.url = "";
        }
        if (currMedicine.image && currMedicine.image.alt) {
          newInputState.alt = currMedicine.image.alt;
        } else {
          newInputState.alt = "";
        }
        
        delete newInputState.__v;
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.pharma_id;
        delete newInputState.medicineNumber;
        delete newInputState.createdAt;
        setInputState(newInputState);
      } catch (err) {
        toast.error("Edited Medicine Data loading failed");
      }
    })();
  }, [id]);
  const handleCheckboxChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = convertToBool(ev.target.value);
    setInputState(newInputState);
  };
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateMedicineEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        let inputStateToSend = JSON.parse(JSON.stringify(inputState));
        inputStateToSend.image = {url: inputStateToSend.url, alt: inputStateToSend.alt}
        delete inputStateToSend.url;
        delete inputStateToSend.alt;
        await axios.put("/medicines/" + id, inputStateToSend);
        setTimeout(toast.success("Edit Saved Succesfully"),3000);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      toast.error("Failed to Save Edit");    
    }
  };

  const handleRefreshClick = (ev) => {
    setInputState(startingInputVal);
    setInputsErrorsState(startingInputErrVal);
  }
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    let fieldValidationResult = validateEditMedicineFieldFromSchema(ev.target.value, ev.target.id);
    let newErrorState = JSON.parse(JSON.stringify(inputsErrorsState));
    newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
    setInputsErrorsState(newErrorState);
  };

  if (!inputState) {
    return <LoadingAnimationComponent />;
  }

  return (
    <Container component="main" maxWidth={querySize}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit medicine
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <InputComponent id="title" label="Title" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="subTitle" label="Subtitle" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="description" label="Description" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} isRequired={true} />
            <InputComponent id="url" label="Image URL" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <InputComponent id="alt" label="Image ALT" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="prescription_required" checked={inputState.prescription_required} onChange={handleCheckboxChange} color="primary" />}
                label="Prescription Required"
              />
            </Grid>
                
            <Grid item xs={6}>
                <CancelButtonComponent />
            </Grid>
            <Grid item xs={6}>
                <RefreshButtonComponent handleRefreshClick={handleRefreshClick}/>
            </Grid>
            <Grid item xs={12}>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSaveBtnClick}>
                    Save
                </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditMedicinePage;
