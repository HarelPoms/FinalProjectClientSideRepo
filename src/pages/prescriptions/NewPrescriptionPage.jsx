import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddCardIcon from '@mui/icons-material/AddCard';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import {List} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import isImage from "../../validation/isImgUrlValid";
import AddIcon from '@mui/icons-material/Add';
import ROUTES from "../../routes/ROUTES";
import validatePrescriptionEditSchema, {
    validateEditPrescriptionFieldFromSchema
} from "../../validation/prescriptionEditValidation";

import InputComponent from "../../components/InputComponent";
import CancelButtonComponent from "../../components/CancelButtonComponent";
import RefreshButtonComponent from "../../components/RefreshButtonComponent";
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import useResponsiveQueries from "../../hooks/useResponsiveQueries";

const NewPrescriptionPage = () => {
    const startingInputVal = {url: "", alt: "", medicineList : [] };
    const startingInputErrVal = {};
    const [inputState, setInputState] = useState(startingInputVal);
    const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
    const navigate = useNavigate();
    const querySize = useResponsiveQueries();

    const handleCreateClick = () => {
        navigate(ROUTES.NEWMEDICINE);
    } 
    
    const handleRefreshClick = (ev) => {
        setInputState(startingInputVal);
        setInputsErrorsState(startingInputErrVal);
    }

    const handleSaveBtnClick = (ev) => {
        (async () => {
            try{
                const joiResponse = validatePrescriptionEditSchema(inputState);
                setInputsErrorsState(joiResponse);
                console.log(joiResponse);
                if (!joiResponse) {
                    let inputStateToSend = JSON.parse(JSON.stringify(inputState));
                    inputStateToSend.image = {url: inputStateToSend.url, alt: inputStateToSend.alt}
                    delete inputStateToSend.url;
                    delete inputStateToSend.alt;
                    await axios.post("/medicines/", inputStateToSend);
                    toast.success("Succeeded to save new medicine");
                    //move to homepage
                    navigate(ROUTES.HOME);
                }
            
            }
            catch(err){
                toast.error("Failed to save new medicine");
            }
        })();
    };

    const handleInputChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.value;
        setInputState(newInputState);
        let fieldValidationResult = validateEditPrescriptionFieldFromSchema(ev.target.value, ev.target.id);
        let newErrorState = JSON.parse(JSON.stringify(inputsErrorsState));
        newErrorState[ev.target.id] = fieldValidationResult[ev.target.id];
        setInputsErrorsState(newErrorState);
    };

    //ensures the input state is synchronized with the latest character input
    useEffect(() => {
        setInputState((newInputState) => newInputState);
    }, [inputState]);

    if(!inputState){
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
                <AddCardIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
                Create Medicine
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
            src={isImage(inputState.url) ? inputState.url : "/assets/images/placeholderMedicineImg.jpg"}
            />
            <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <InputComponent id="url" label="Image URL" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
                <InputComponent id="alt" label="Image ALT" inputState={inputState} inputsErrorsState={inputsErrorsState} handleInputChange={handleInputChange} />
                <List>
                    {inputState.medicineList.map((item) => (
                        <ListItem disablePadding key={item._id + Date.now()}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MedicationIcon />
                                </ListItemIcon>
                                <ListItemText primary={`${item.medicineName} [${item.medicineUnits}]`} secondary={`Is Available : ${item.isActive}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Grid item xs={10}></Grid>
                <Grid item xs={2} >
                    <Button variant="contained" color="success" sx={ { borderRadius: 18 } } onClick={handleCreateClick}>
                        <AddIcon />
                    </Button>
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
export default NewPrescriptionPage;
