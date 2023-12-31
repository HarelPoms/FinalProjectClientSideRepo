import { Box, Grid, Typography, Card } from "@mui/material";
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
import filterPrescriptionsByPatientOrDoctorName from "../../services/prescriptionFilterUtil";
import "../../stylesheets/mainStyle.css";

const UnassignedPrescriptionsPage = () => {
    const [originalPrescriptionsArr, setOriginalPrescriptionsArr] = useState(null);
    const [prescriptionsArr, setPrescriptionsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    useEffect(() => {
        axios.get("/prescriptions/unassigned-prescriptions")
        .then(({ data }) => {
            filterFunc(data);
        })
        .catch((err) => {
            toast.error("Failed to retrieve my prescriptions data");
        });
    }, []);
    const filterFunc = async (data) => {
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
            //same thing
            filterPrescriptionsByPatientOrDoctorName(data, filter).then(
                (filterMetTracker) => {
                    let filterIndex = -1;
                    setPrescriptionsArr(
                    data.filter((prescription) => {++filterIndex; return filterMetTracker[filterIndex];}));
                }
            ).catch((error) => {
                console.log(error);
            })
            
            return;
        }
        if (originalPrescriptionsArr) {
            /*
                when all loaded and states loaded
            */
            //need to think of how to relate word typed to actual names
            let newOriginalPrescriptionsArr = JSON.parse(JSON.stringify(originalPrescriptionsArr));

            filterPrescriptionsByPatientOrDoctorName(newOriginalPrescriptionsArr, filter).then(
                (filterMetTracker) => {
                    let filterIndex = -1;
                    setPrescriptionsArr(
                    newOriginalPrescriptionsArr.filter((prescription) => {++filterIndex; return filterMetTracker[filterIndex];}));
                }
            ).catch((error) => {
                console.log(error);
            })
        }
    };
    useEffect(() => {
        filterFunc();
    }, [qparams.filter]);

    const handleDeleteFromInitialPrescriptionsArr = async (id) => {
        try {
        let response = await axios.delete("/cards/" + id);
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

    const handleAssumeResponsibility = async (id, doctorIdUpdate) => {
        try{
            let response = await axios.put("/prescriptions/assumeResponsibility/" + id,  {doctorId:doctorIdUpdate});
            if(response.status === 200){
                setPrescriptionsArr((newPrescriptionsArr) => newPrescriptionsArr.filter((item) => item._id != id));
                toast.success("Prescription update successful");
            }
            else{
                toast.error("Prescription update Failed");
            }
        }
        catch(err){
            toast.error("Error when assuming responsibility");
        }
    }

    if (!prescriptionsArr) {
        return <LoadingAnimationComponent />;
    }
    return (
        <Box>
        <Typography variant="h1" className="alignTextToCenter"> Unassigned Prescriptions </Typography>
        {prescriptionsArr && prescriptionsArr.length === 0 && <Divider> No Unassigned Prescriptions </Divider>}
        {prescriptionsArr && prescriptionsArr.length > 0 && <Divider> All Unassigned Prescriptions </Divider>}
        <Grid container spacing={2}>
            {prescriptionsArr.map((item) => (
            <Grid item xs={6} md={4} key={item._id + Date.now()} className="prescriptionCardsUniformHeight">
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
                onAssumeResponsibility={handleAssumeResponsibility}
                onApprove={()=>{}}
                canEdit={payload && (payload.isDoctor || payload.isAdmin) && item.doctorId == payload._id && !item.isApproved && item.isActive }
                canDelete={payload && (payload.isAdmin || (payload.isDoctor && item.doctorId == payload._id))}
                canTakeChargeOf={payload && payload.isDoctor && !item.doctorId}
                canApprove={false}
                />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};


export default UnassignedPrescriptionsPage;