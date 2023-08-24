import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useState } from "react";
import { useSelector } from "react-redux";

const MedicineComponent = ({
  id,
  img,
  title,
  subTitle,
  description,
  onDelete,
  onEdit,
  onLike,
  onDislike,
  canEdit,
  canDelete,
  canLike,
  canDislike,
  isOwnedBySelf
}) => {
  const [likePossible, setLikePossible] = useState(canLike);
  const [dislikePossible, setDislikePossible] = useState(canDislike);
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  const navigate = useNavigate();

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handleLikeBtnClick = () => {
    setLikePossible(!likePossible);
    setDislikePossible(!dislikePossible);
    onLike(id);
  }

  const handleDislikeBtnClick = () =>{
    setLikePossible(!likePossible);
    setDislikePossible(!dislikePossible);
    onDislike(id);
  }
  const openDetailsPage = () => {
    navigate(`/full_details_medicine/${id}`);
  }

  return (
    <Card square raised>
      <CardActionArea onClick={openDetailsPage}>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        {isLoggedIn && likePossible && !isOwnedBySelf ? 
        <Button variant="text" color="primary" onClick={handleLikeBtnClick}>
          <FavoriteIcon />
        </Button> : isLoggedIn && dislikePossible && !isOwnedBySelf ?
        <Button variant="text" color="primary" onClick={handleDislikeBtnClick}>
          <HeartBrokenIcon />
        </Button> : ""
        }
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
      </CardActions>
    </Card>
  );
};

MedicineComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool
};

MedicineComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
  canDelete: false
};

export default MedicineComponent;
