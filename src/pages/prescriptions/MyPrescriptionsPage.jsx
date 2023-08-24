import { Box, Grid, Typography } from "@mui/material";
import PrescriptionComponent from "../../components/PrescriptionComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import { toast } from "react-toastify";
import Divider from '@mui/material/Divider';
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import isImage from "../../validation/isImgUrlValid";

const MyPrescriptionsPage = () => {
    const [originalPrescriptionsArr, setOriginalPrescriptionsArr] = useState(null);
    const [prescriptionsArr, setPrescriptionsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    useEffect(() => {
        axios.get("/prescriptions/my-prescriptions")
        .then(({ data }) => {
            filterFunc(data);
        })
        .catch((err) => {
            toast.error("Failed to retrieve my prescriptions data");
        });
    }, []);
    const filterFunc = (data) => {
        if (!originalPrescriptionsArr && !data) {
        return;
        }
        let filter = "";
        if (qparams.filter) {
        filter = qparams.filter;
        }
        if (!originalPrescriptionsArr && data) {
        /*
            when component loaded and states not loaded
        */
        setOriginalPrescriptionsArr(data);
        setPrescriptionsArr(data.filter((prescription) => prescription.patientId.startsWith(filter) || prescription.hmoId.startsWith(filter)));
        
        return;
        }
        if (originalPrescriptionsArr) {
        /*
            when all loaded and states loaded
        */
       //need to think of how to relate word typed to id
        let newOriginalPrescriptionsArr = JSON.parse(JSON.stringify(originalPrescriptionsArr));
        setPrescriptionsArr(
            newOriginalPrescriptionsArr.filter((prescription) => prescription.patientId.startsWith(filter) || prescription.hmoId.startsWith(filter))
        );
        }
    };
    useEffect(() => {
        filterFunc();
    }, [qparams.filter]);

    const handleDeleteFromInitialPrescriptionsArr = async (id) => {
        try {
        let response = await axios.delete("/prescriptions/" + id);
        if(response.status === 200){
            setPrescriptionsArr((newPrescriptionsArr) => newPrescriptionsArr.filter((item) => item._id != id));
            toast.success("Prescription deletion successful");
        }
        else{
            toast.error("Prescription Deletion Failed");
        }
        } catch (err) {
            toast.error("Error when deleting");
        }
    };
    const handleEditFromInitialPrescriptionsArr = (id) => {
        navigate(`/edit_prescription/${id}`);
    };

    const handleApprovePrescription = async (id) => {
        try {
        let response = await axios.patch("/prescriptions/flipApproved/" + id);
        if(response.status === 200){
            let newPrescriptionsArrState = JSON.parse(JSON.stringify(prescriptionsArr));
                for(let i=0; i<newPrescriptionsArrState.length; i++){
                    if(newPrescriptionsArrState[i]._id == id) newPrescriptionsArrState[i].isApproved = true;
                }
                setPrescriptionsArr(newPrescriptionsArrState);
                let newOriginalPrescriptionsArrState = JSON.parse(JSON.stringify(originalPrescriptionsArr));
                for(let i=0; i<newOriginalPrescriptionsArrState.length; i++){
                    if(newOriginalPrescriptionsArrState[i]._id == id) newOriginalPrescriptionsArrState[i].isApproved = true;
                }
                setOriginalPrescriptionsArr(newOriginalPrescriptionsArrState);
            toast.success("Prescription approval successful");
        }
        else{
            toast.error("Prescription approval Failed");
        }
        } catch (err) {
            toast.error("Error when approving");
        }
    }

    if (!prescriptionsArr) {
        return <LoadingAnimationComponent />;
    }
    return (
        <Box>
        <Typography variant="h1"> My Prescriptions Page </Typography>
        {prescriptionsArr && prescriptionsArr.length === 0 && <Divider> You have no prescriptions </Divider>}
        {prescriptionsArr && prescriptionsArr.length > 0 && <Divider> My Prescriptions </Divider>}
        <Grid container spacing={2}>
            {prescriptionsArr.map((item) => (
            <Grid item xs={6} md={4} key={item._id + Date.now()}>
                <PrescriptionComponent
                id={item._id}
                imgUrl={item.image && isImage(item.image.url) ? item.image.url : "/assets/images/placeholderPrescriptionImg.png"}
                medicineList={item.medicineList}
                patientId={item.patientId}
                doctorId={item.doctorId}
                hmoId={item.HMO}
                isActive={item.isActive}
                isApproved={item.isApproved}
                expiryDate={item.expiryDate}
                onDelete={handleDeleteFromInitialPrescriptionsArr}
                onEdit={handleEditFromInitialPrescriptionsArr}
                onAssumeResponsibility={handleApprovePrescription}
                onApprove={handleApprovePrescription}
                canEdit={payload && (payload.isDoctor || payload.isAdmin) && item.doctorId == payload._id }
                canDelete={payload && (payload.isAdmin || (payload.isDoctor && item.doctorId == payload._id))}
                canTakeChargeOf={false}
                canApprove={payload && payload.isDoctor && item.doctorId == payload._id && !item.isApproved}
                /> 
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};


export default MyPrescriptionsPage;