import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Divider from '@mui/material/Divider';

import MedicineComponent from "../components/MedicineComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import LoadingAnimationComponent from "../components/LoadingAnimationComponent";
import isImage from "../validation/isImgUrlValid";
import CheckIfNumberStartsWithPrefix from "../services/checkPrefixNumsUtil";
import "../stylesheets/mainStyle.css";

const HomePage = () => {
  const [originalMedsArr, setOriginalMedsArr] = useState(null);
  const [medsArr, setMedsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/medicines/")
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
      setOriginalMedsArr(data);
      setMedsArr(data.filter((med) => med.name.startsWith(filter) || CheckIfNumberStartsWithPrefix(med.medicineNumber, filter)));
      return;
    }
    if (originalMedsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalMedsArr));
      setMedsArr(
        newOriginalCardsArr.filter((med) => med.name.startsWith(filter) || CheckIfNumberStartsWithPrefix(med.medicineNumber, filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      let response = await axios.delete("/medicines/" + id);
      if(response.status === 200){
          setMedsArr((newMedsArr) => newMedsArr.filter((item) => item._id != id));
          toast.success("Card deletion successful");
      }
      else{
          toast.error("Card Deletion Failed");
      }
    } catch (err) {
      toast.error("Error when deleting card");
    }
  };
  const handleEditFromInitialMedicineArr = (id) => {
    navigate(`/edit_medicine/${id}`); //localhost:3000/edit/123213
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

  if (!medsArr) {
    return <LoadingAnimationComponent />;
  }

  return (
    <Box>
      <Typography variant="h5"> Welcome to MedManage: Your Complete Prescription Management Solution
                                Are you tired of keeping track of multiple prescriptions and struggling to remember when to take your medications? Look no further! MedManage is your one-stop solution for efficient and hassle-free medicine and prescription management.
      </Typography>
      <Typography variant="h2" className="alignTextToCenter"> Medicines Page </Typography>
      <Typography variant="h3" className="alignTextToCenter"> Here you can find medicines </Typography>
      <Divider> Medicines on display </Divider>
      <Grid container spacing={2}>
        {medsArr.map((item) => (
          <Grid item xs={6} md={4} key={item._id + Date.now()}>
            <MedicineComponent
              id={item._id}
              img={item.image && isImage(item.image.url) ? item.image.url : "/assets/images/placeholderMedicineImg.jpg"}
              name={item.name}
              subTitle={item.subTitle}
              description={item.description}
              isPrescriptionRequired={item.prescription_required}
              itemToAddOrRemove={{"_id": item._id, "name": item.name, "image": item.image, "price": item.price}}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialMedicineArr}
              onLike={handleLikeFromMedicines}
              onDislike={handleDislikeFromMedicines}
              canEdit={payload && (payload.isAdmin || (payload.isPharma && item.pharma_id == payload._id)) }
              canDelete={payload && (payload.isAdmin || (payload.isPharma && item.pharma_id == payload._id))}
              canLike={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor) && !item.likes.includes(payload._id)}
              canDislike={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor) && item.likes.includes(payload._id)}
              canAddToCart={payload && (!payload.isAdmin && !payload.isPharma && !payload.isDoctor)}
              isOwnedBySelf={payload && item.pharma_id === payload._id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;