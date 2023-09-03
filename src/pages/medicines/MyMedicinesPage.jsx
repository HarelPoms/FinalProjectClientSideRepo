import { Box, Grid } from "@mui/material";
import MedicineComponent from "../../components/MedicineComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import ROUTES from "../../routes/ROUTES";
import LoadingAnimationComponent from "../../components/LoadingAnimationComponent";
import isImage from "../../validation/isImgUrlValid";
import CheckIfNumberStartsWithPrefix from "../../services/checkPrefixNumsUtil";

const MyCardsPage = () => {
    const [originalMyMedsArr, setOriginalMyMedsArr] = useState(null);
    const [myMedsArr, setMyMedsArr] = useState(null);
    const navigate = useNavigate();
    let qparams = useQueryParams();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    useEffect(() => {
        axios.get("/pharmas/my-medicines")
        .then(({ data }) => {
            filterFunc(data);
        })
        .catch((err) => {
            toast.error("Failed to retrieve this pharmas medicines");
        });
    }, []);
    const filterFunc = (data) => {
        if (!originalMyMedsArr && !data) {
        return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!originalMyMedsArr && data) {
            /*
                when component loaded and states not loaded
            */
            setOriginalMyMedsArr(data);
            setMyMedsArr(data.filter((med) => med.name.startsWith(filter) || CheckIfNumberStartsWithPrefix(med.medicineNumber, filter)));
            return;
        }
        if (originalMyMedsArr) {
            /*
                when all loaded and states loaded
            */
            let newOriginalMyMedsArr = JSON.parse(JSON.stringify(originalMyMedsArr));
            setMyMedsArr(
                newOriginalMyMedsArr.filter((med) => med.name.startsWith(filter) || CheckIfNumberStartsWithPrefix(med.medicineNumber, filter))
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
            setMyMedsArr((newMedsArr) => newMedsArr.filter((item) => item._id != id));
            toast.success("Medicine deletion successful");
        }
        else{
            toast.error("Medicine Deletion Failed");
        }
        } catch (err) {
            toast.error("Medicine Deletion Server error");
        }
    };
    const handleEditFromInitialMedicinesArr = (id) => {
        navigate(`/edit_medicine/${id}`);
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
            toast.success("Removed from Favorites");
        } catch(err){
            toast.error("Failed to remove medicine from favorites");
        }
    }
    const handleCreateClick = () => {
        navigate(ROUTES.NEWMEDICINE);
    } 

    if (!myMedsArr) {
        return <LoadingAnimationComponent />;
    }
    return (
        <Box>
        <Grid container spacing={2}>
            {myMedsArr.map((item) => (
            <Grid item xs={6} md={4} key={item._id + Date.now()}>
                <MedicineComponent
                id={item._id}
                img={item.image && isImage(item.image.url) ? item.image.url : "/assets/images/placeholderMedicineImg.jpg"}
                name={item.name}
                subTitle={item.subTitle}
                description={item.description}
                itemToAddOrRemove={{"_id": item._id, "name": item.name, "image": item.image, "price": item.price}}
                onDelete={handleDeleteFromInitialMedicinesArr}
                onEdit={handleEditFromInitialMedicinesArr}
                onLike={handleLikeFromMedicines}
                onDislike={handleDislikeFromMedicines}
                canEdit={payload && (payload.isAdmin || (payload.isPharma && item.pharma_id == payload._id ))}
                canDelete={payload && (payload.isAdmin || (payload.isPharma && item.pharma_id == payload._id))}
                canLike={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor) && !item.likes.includes(payload._id)}
                canDislike={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor) && item.likes.includes(payload._id)}
                canAddToCart={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor)}
                isOwnedBySelf={item.pharma_id === payload._id}
                />
            </Grid>
            ))}
            <Grid item xs={10}></Grid>
            <Grid item xs={2} >
                <Button variant="contained" color="success" sx={ { borderRadius: 18 } } onClick={handleCreateClick}>
                    <AddIcon />
                </Button>
            </Grid>
        </Grid>
        </Box>
    );
};


export default MyCardsPage;