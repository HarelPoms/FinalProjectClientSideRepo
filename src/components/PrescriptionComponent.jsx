import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  List
} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import formatDate from "../services/formatDateUtil";
import useResponsiveQueries from "../hooks/useResponsiveQueries";

const PrescriptionComponent = ({
  id,
  imgUrl,
  medicineList,
  patientId,
  doctorId,
  hmoId,
  isActive,
  isApproved,
  expiryDate,
  onDelete,
  onEdit,
  onAssumeResponsibility,
  onApprove,
  canEdit,
  canDelete,
  canTakeChargeOf,
  canApprove
}) => {
  const prescriptionDetailsStartingVal = {
        doctorName : "",
        patientName : "",
        hmoName : "",
        medicineList : []
    };

  const [prescriptionDetailsState, setPrescriptionState] = useState(prescriptionDetailsStartingVal);

  const navigate = useNavigate();
  const viewportSize = useResponsiveQueries();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const formatIsAvailable = (validBool) => {
    return validBool ? "Yes" : "No";
  }

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handleAssumeResponsibilityClick = () => {
    onAssumeResponsibility(id, payload._id);
  }

  const handleApproveClick = () => {
    onApprove(id);
  }

  useEffect(() => {
        (async () => {
        try{
            let patientNameToSet = "", doctorNameToSet = "", hmoNameToSet = "";
            let {data : patientData} = await axios.get("/users/fullNameOfUser/" + patientId);
            if(doctorId){
              let {data : doctorData} = await axios.get("/users/fullNameOfUser/" + doctorId);
              doctorNameToSet = doctorData.name.firstName + " " + doctorData.name.lastName;
            }
            let {data : hmoData} = await axios.get("/hmos/" + hmoId);
            patientNameToSet = patientData.name.firstName + " " + patientData.name.lastName;
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
        <CardMedia component="img" image={imgUrl} />
      </CardActionArea>
      <CardContent sx={{textAlign:"center"}}>
        <Typography>Patient Name : {prescriptionDetailsState.patientName}</Typography>
        <Typography>Doctor Name : {prescriptionDetailsState.doctorName}</Typography>
        <Typography>HMO Name : {prescriptionDetailsState.hmoName}</Typography>
        <Typography>Expiry Date : {formatDate(expiryDate)}</Typography>
        <Typography>Is valid : {formatIsAvailable(isActive)}</Typography>
        <Typography>Is Approved: {formatIsAvailable(isApproved)}</Typography>
        <List>
          {prescriptionDetailsState.medicineList.map((item) => (
              <ListItem disablePadding key={item._id + Date.now()} className="prescriptionListItem">
                  <ListItemButton>
                    {viewportSize !== "sm" ? <ListItemIcon>
                          <MedicationIcon />
                      </ListItemIcon> : ""}
                      
                      <ListItemText primary={`${item.medicineName} [${item.medicineUnits}]`} secondary={`Is Available : ${formatIsAvailable(item.isActive)}`} />
                  </ListItemButton>
              </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{justifyContent: "center"}}>
        {canEdit ? (
          <Fragment>
            <Button variant="text" color="warning" onClick={handleEditBtnClick}>
              <ModeEditIcon />
            </Button>
          </Fragment>
        ) : (
          ""
        )}
        {canDelete ? (
          <Fragment>
            <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
              <DeleteForeverIcon />
            </Button>
          </Fragment>
        ) : ("")}
        {canTakeChargeOf ? (
          <Fragment>
            <Button variant="text" color="primary" onClick={handleAssumeResponsibilityClick}>
              <FactCheckIcon />
            </Button>
          </Fragment>
        ) : ("")}
        {canApprove ? (
          <Fragment>
            <Button variant="text" color="success" onClick={handleApproveClick}>
              <CheckCircleOutlineIcon />
            </Button>
          </Fragment>
        ) : ""}
      </CardActions>
    </Card>
  );
};

PrescriptionComponent.propTypes = {
  id: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool
};

PrescriptionComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  canEdit: false,
  canDelete: false
};

export default PrescriptionComponent;
