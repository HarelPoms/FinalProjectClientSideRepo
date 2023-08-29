import { Box, Grid, Typography } from "@mui/material";
import MedicineComponent from "../../components/MedicineComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import { toast } from "react-toastify";
import Divider from '@mui/material/Divider';
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import isImage from "../../validation/isImgUrlValid";
import CheckIfNumberStartsWithPrefix from "../../services/checkPrefixNumsUtil";

const FavMedicinesPage = () => {
    const [originalMedsArr, setOriginalMedsArr] = useState(null);
    const [medsArr, setMedsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    useEffect(() => {
        axios.get("/medicines/my-fav-meds")
        .then(({ data }) => {
            filterFunc(data);
        })
        .catch((err) => {
            toast.error("Failed to retrieve medicines data");
        });
    }, []);
    const filterFunc = (data) => {
        if (!originalMedsArr && !data) {
            return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!originalMedsArr && data) {
            /*
                when component loaded and states not loaded
            */
            //let favData = data.filter((card) => card.likes.includes(payload._id));
            setOriginalMedsArr(data);
            setMedsArr(data.filter((med) => med.name.startsWith(filter) || CheckIfNumberStartsWithPrefix(med.medicineNumber, filter)));
        
        return;
        }
        if (originalMedsArr) {
            /*
                when all loaded and states loaded
            */
            let newOriginalMedicinesArr = JSON.parse(JSON.stringify(originalMedsArr));
            setMedsArr(
                newOriginalMedicinesArr.filter((med) => med.name.startsWith(filter) || CheckIfNumberStartsWithPrefix(med.medicineNumber, filter))
        );
        }
    };
    useEffect(() => {
        filterFunc();
    }, [qparams.filter]);
    const handleDeleteFromInitialMedicinesArr = async (id) => {
        try {
        let response = await axios.delete("/medicines/" + id);
        if(response.status === 200){
            setMedsArr((newMedsArr) => newMedsArr.filter((item) => item._id != id));
            toast.success("Medicine deletion successful");
        }
        else{
            toast.error("Medicine Deletion Failed");
        }
        } catch (err) {
            toast.error("Error when deleting");
        }
    };
    const handleEditFromInitialMedicinesArr = (id) => {
        navigate(`/edit/${id}`); //localhost:3000/edit/123213
    };

    const handleLikeFromMedicines = async (id) => {
        try {
            await axios.patch("/medicines/"+ id);
            toast.success("Added to Favorites");
        } catch(err){
            toast.error("Failed to Favorite Medicine");
        }
    }

    const handleDislikeFromMedicines = async (id) => {
        try {
            await axios.patch("/medicines/"+ id);
            setMedsArr((newCardsArr) => newCardsArr.filter((card) => card._id != id));
            toast.success("Removed from Favorites");
        } catch(err){
            toast.error("Failed to remove card from favorites");
        }
    } 

    if (!medsArr) {
        return <LoadingAnimationComponent />;
    }
    return (
        <Box>
        <Typography variant="h1"> My Favorite Cards Page </Typography>
        <Typography variant="h3"> Cards I've favorited </Typography>
        {medsArr && medsArr.length === 0 && <Divider sx={{mb:20, mt:10}}> You have no favorite medicines </Divider>}
        {medsArr && medsArr.length > 0 && <Divider> My Favorited Medicines </Divider>}
        <Grid container spacing={2}>
            {medsArr.map((item) => (
            <Grid item xs={6} md={4} key={item._id + Date.now()}>
                <MedicineComponent
                id={item._id}
                img={item.image && isImage(item.image.url) ? item.image.url : "/assets/images/placeholderMedicineImg.jpg"}
                name={item.name}
                subTitle={item.subTitle}
                description={item.description}
                onDelete={handleDeleteFromInitialMedicinesArr}
                onEdit={handleEditFromInitialMedicinesArr}
                onLike={handleLikeFromMedicines}
                onDislike={handleDislikeFromMedicines}
                canEdit={payload && (payload.isDoctor || payload.isAdmin) && item.user_id == payload._id }
                canDelete={payload && (payload.isAdmin || (payload.isDoctor && item.user_id == payload._id))}
                canLike={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor) && !item.likes.includes(payload._id)}
                canDislike={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor) && item.likes.includes(payload._id)}
                isOwnedBySelf={item.user_id === payload._id}
                /> 
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};


export default FavMedicinesPage;