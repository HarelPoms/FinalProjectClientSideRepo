import { Box, Grid } from "@mui/material";
import PatientCardComponent from "../../components/PatientCardComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import isImage from "../../validation/isImgUrlValid";

const MyPatientsPage = () => {
    const [originalMyPatientsArr, setOriginalMyPatientsArr] = useState(null);
    const [myPatientsArr, setMyPatientsArr] = useState(null);
    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    useEffect(() => {
        
        axios.get("/users/my-patients")
        .then(({ data }) => {
            filterFunc(data);
        })
        .catch((err) => {
            toast.error("Failed to retrieve this doctors patients");
        });
    }, []);
    const filterFunc = (data) => {
        if (!originalMyPatientsArr && !data) {
        return;
        }
        let filter = "";
        if (qparams.filter) {
        filter = qparams.filter;
        }
        if (!originalMyPatientsArr && data) {
        /*
            when component loaded and states not loaded
        */
        setOriginalMyPatientsArr(data);
        setMyPatientsArr(data.filter((patient) => patient.name.firstName.startsWith(filter) || patient.name.lastName.startsWith(filter)));
        return;
        }
        if (originalMyPatientsArr) {
        /*
            when all loaded and states loaded
        */
        let newOriginalMyPatientsArr = JSON.parse(JSON.stringify(originalMyPatientsArr));
        setMyPatientsArr(
            newOriginalMyPatientsArr.filter((patient) => patient.name.firstName.startsWith(filter) || patient.name.lastName.startsWith(filter))
        );
        }
    };
    useEffect(() => {
        filterFunc();
    }, [qparams.filter]);

    if (!myPatientsArr) {
        return <LoadingAnimationComponent />;
    }
    return (
        <Box>
        <Grid container spacing={2}>
            {myPatientsArr.map((item) => (
            <Grid item xs={6} md={4} key={item._id + Date.now()}>
                <PatientCardComponent
                name={item.name}
                phone={item.phone}
                email={item.email}
                imgUrl={item.image && isImage(item.image.url) ? item.image.url : "/assets/images/placeholderMedicineImg.jpg"}
                alt={item.image.alt}
                hmoId={item.HMO}
                createdAt={item.createdAt}
                />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};


export default MyPatientsPage;