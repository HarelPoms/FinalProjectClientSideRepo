import formatDate from "../services/formatDateUtil";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PatientCardComponent = ({
    nameObj,
    phone,
    email,
    imgUrl,
    alt,
    hmoId,
    createdAt
    }) => {
    const [hmoNameState, setHmoNameState] = useState("");

    useEffect(() => {
        (async () => {
        try{
            let {data : hmoData} = await axios.get("/hmos/" + hmoId);
            setHmoNameState(hmoData.name);
        }
        catch(err){
            toast.error("Failed to get and set user's hmo details");
        }
        })();
        
    }, []);
    return (
    <Card square raised>
        <CardActionArea>
            <CardMedia component="img" image={imgUrl} alt={alt} />
        </CardActionArea>
        <CardContent>
            <Typography>Patient Name : {nameObj.firstName + " " + nameObj.middleName + " " + nameObj.lastName}</Typography>
            <Typography>Phone : {phone}</Typography>
            <Typography>Email : {email}</Typography>
            <Typography>Register Date : {formatDate(createdAt)}</Typography>
            <Typography>HMO : {hmoNameState}</Typography>
        </CardContent>
        </Card>
    );
}

export default PatientCardComponent;
