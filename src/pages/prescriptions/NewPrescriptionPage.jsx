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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MedicationIcon from '@mui/icons-material/Medication';
import {List} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import isImage from "../../validation/isImgUrlValid";
import ROUTES from "../../routes/ROUTES";
import validatePrescriptionEditSchema, {
    validateEditPrescriptionFieldFromSchema
} from "../../validation/prescriptionEditValidation";
import CancelIcon from '@mui/icons-material/Cancel';
import InputComponent from "../../components/InputComponent";
import CancelButtonComponent from "../../components/CancelButtonComponent";
import RefreshButtonComponent from "../../components/RefreshButtonComponent";
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import AddMedicineToPrescriptionDialogComponent from "../../components/AddMedicineToPrescriptionDialogComponent";
import useResponsiveQueries from "../../hooks/useResponsiveQueries";
import "../../stylesheets/mainStyle.css";

const NewPrescriptionPage = () => {
    let medCounter = 0;
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const startingInputVal = {url: "", alt: "", medicineList : [], patientId: payload._id };
    const startingInputErrVal = {};
    const [inputState, setInputState] = useState(startingInputVal);
    const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
    const [openNewMedicineDialog, setOpenNewMedicineDialog] = useState(false);
    const navigate = useNavigate();
    const querySize = useResponsiveQueries();

    const myUniqueId = (itemStr) => {
        medCounter++;
        return medCounter + itemStr + Date.now();
    }

    const getCurrUniqueId = () => {
        return medCounter;
    }
    
    const deleteItemFromMedicineList = (ev) => {
        let idxCounter = -1;
        let parentOfItem = ev.target.parentNode;
        while(!parentOfItem.id){
            parentOfItem = parentOfItem.parentNode;
        }
        //ev.target.parentNode.id or ev.target.parentNode.parentNode.id, depending.
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState.medicineList = newInputState.medicineList.filter((med) => {++idxCounter; if(parentOfItem.id != idxCounter) {return true} else {return false}});
        setInputState(newInputState);
    }

    const handleCreateClick = () => {
        setOpenNewMedicineDialog(true);
    }
    
    const handleCancelClick = () => {
        setOpenNewMedicineDialog(false);
    }

    const handleSubmitClick = (medicineToAdd) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState.medicineList.push(medicineToAdd);
        setInputState(newInputState);
        setOpenNewMedicineDialog(false);
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
                if (!joiResponse) {
                    let inputStateToSend = JSON.parse(JSON.stringify(inputState));
                    inputStateToSend.image = {url: inputStateToSend.url, alt: inputStateToSend.alt}
                    delete inputStateToSend.url;
                    delete inputStateToSend.alt;
                    await axios.post("/prescriptions/", inputStateToSend);
                    toast.success("Succeeded to save new prescription");
                    //move to homepage
                    navigate(ROUTES.HOME);
                }
            
            }
            catch(err){
                toast.error("Failed to save new prescription");
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
                Submit Prescription Request
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
                <List sx={{margin:"auto"}}>
                    {inputState.medicineList.map((item) => (
                        <ListItem disablePadding key={myUniqueId(item.medicineName)} secondaryAction={
                        <IconButton id={getCurrUniqueId()} name={getCurrUniqueId()} onClick={deleteItemFromMedicineList} edge="end" aria-label="delete">
                            <CancelIcon />
                        </IconButton>}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MedicationIcon />
                                </ListItemIcon>
                                <ListItemText primary={`${item.medicineName} [${item.medicineUnits}]`}  />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {inputState.medicineList.length < 5 ? 
                <Grid item xs={12} className="addMedicineToPrescriptionDialogBtn">
                    <AddMedicineToPrescriptionDialogComponent isDialogOpen={openNewMedicineDialog} handleClickOpenFromFather={handleCreateClick} handleClickCancelFromFather={handleCancelClick} handleAddMedicineToPrescriptionFromFather={handleSubmitClick}  />
                </Grid> : 
                <Grid item xs={12} className="medicineLimitCentered">
                    <Divider>Reached 5 medicine limit for prescription</Divider> 
                </Grid>}
                
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
