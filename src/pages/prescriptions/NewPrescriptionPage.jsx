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
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import isImage from "../../validation/isImgUrlValid";
import ROUTES from "../../routes/ROUTES";
import validatePrescriptionEditSchema, {
    validateEditPrescriptionFieldFromSchema
} from "../../validation/prescriptionEditValidation";
import uniqueId from "lodash/uniqueId"
import CancelIcon from '@mui/icons-material/Cancel';
import InputComponent from "../../components/InputComponent";
import CancelButtonComponent from "../../components/CancelButtonComponent";
import RefreshButtonComponent from "../../components/RefreshButtonComponent";
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import AddMedicineToPrescriptionDialogComponent from "../../components/AddMedicineToPrescriptionDialogComponent";
import useResponsiveQueries from "../../hooks/useResponsiveQueries";

const NewPrescriptionPage = () => {
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const startingInputVal = {url: "", alt: "", medicineList : [], patientId: payload._id };
    const startingCounterArr = [];
    const startingInputErrVal = {};
    const [inputState, setInputState] = useState(startingInputVal);
    const [inputsErrorsState, setInputsErrorsState] = useState(startingInputErrVal);
    const [openNewMedicineDialog, setOpenNewMedicineDialog] = useState(false);
    const [medicineListItemCounterState, setMedicineListItemCounterState] = useState(startingCounterArr);
    const navigate = useNavigate();
    const querySize = useResponsiveQueries();

    const sequentializeListItem = (item) => {
        let uniqueGeneratedId = uniqueId();
        let newCounterState = JSON.parse(JSON.stringify(medicineListItemCounterState));
        newCounterState.medicineList.push(uniqueGeneratedId);
        setMedicineListItemCounterState(newCounterState);
        return item.medicineName + uniqueGeneratedId + Date.now()
    }

    const retrieveLatestSequentialId = () => {
        if(medicineListItemCounterState.length == 0){
            return 1;
        }
        else{
            return medicineListItemCounterState[medicineListItemCounterState.length] + 1
        }
    }
    
    const deleteItemFromMedicineList = (ev) => {
        console.log(ev);
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
        setMedicineListItemCounterState(startingCounterArr);
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
                <List>
                    {inputState.medicineList.map((item) => (
                        <ListItem disablePadding meditemlistid={1} key={uniqueId(item.medicineName) + Date.now()}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MedicationIcon />
                                </ListItemIcon>
                                <ListItemText primary={`${item.medicineName} [${item.medicineUnits}]`}  />
                                <ListItemButton onClick={deleteItemFromMedicineList}><CancelIcon></CancelIcon></ListItemButton>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Grid item xs={12}>
                    <AddMedicineToPrescriptionDialogComponent isDialogOpen={openNewMedicineDialog} handleClickOpenFromFather={handleCreateClick} handleClickCancelFromFather={handleCancelClick} handleAddMedicineToPrescriptionFromFather={handleSubmitClick}  />
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
