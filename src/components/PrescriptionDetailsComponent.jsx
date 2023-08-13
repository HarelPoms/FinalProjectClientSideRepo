import {
    Card,
    CardActionArea,
    CardMedia,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    List,
} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import PropTypes from "prop-types";
import isImage from "../validation/isImgUrlValid";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PrescriptionDetailsComponent = ({
    url, alt, medicineList, patientId, doctorId, hmoId
}) => {
    const prescriptionDetailsStartingVal = {
        doctorName : "",
        patientName : "",
        hmoName : "",
        medicineList : []
    };

    const [prescriptionDetailsState, setPrescriptionState] = useState(prescriptionDetailsStartingVal);

    useEffect(() => {
        (async () => {
        try{
            let patientNameToSet = "", doctorNameToSet = "", hmoNameToSet = "";
            let {data : patientData} = await axios.get("/users/" + patientId);
            let {data : doctorData} = await axios.get("/users/" + doctorId);
            let {data : hmoData} = await axios.get("/hmos/" + hmoId);
            patientNameToSet = patientData.name.first + " " + patientData.name.last;
            doctorNameToSet = doctorData.name.first + " " + doctorData.name.last;
            hmoNameToSet = hmoData.name;
            let newInputState = JSON.parse(JSON.stringify(prescriptionDetailsState));
            newInputState["doctorName"] =   doctorNameToSet;
            newInputState["patientName"] =  patientNameToSet;
            newInputState["hmoName"] =      hmoNameToSet;
            newInputState["medicineList"] = medicineList;
            setPrescriptionState(newInputState);
        }
        catch(err){
            toast.error("Failed to get and set prescription details");
        }
        })();
        
    }, []);

    return (
        <Card square raised>
        <CardActionArea>
            <CardMedia component="img" image={isImage(url) ? url : "/assets/images/placeholderCardImg.png"} alt={alt} />
        </CardActionArea>
            
        <CardContent>
            <Typography>Patient Name : {prescriptionDetailsState.patientName}</Typography>
            <Typography>Doctor Name : {prescriptionDetailsState.doctorName}</Typography>
            <Typography>HMO Name : {prescriptionDetailsState.hmoName}</Typography>
            <List>
                {prescriptionDetailsState.medicineList.map((item) => (
                    <ListItem disablePadding key={item._id + Date.now()}>
                        <ListItemButton>
                            <ListItemIcon>
                                <MedicationIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Medicine : ${item.medicineName} Qty : ${item.medicineUnits} Is Available : ${item.isActive}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CardContent>
        <CardActions>
            
        </CardActions>
        </Card>
    );
};

PrescriptionDetailsComponent.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    web: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.string.isRequired,
};

PrescriptionDetailsComponent.defaultProps = {
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    subTitle: ""
};

export default PrescriptionDetailsComponent;
