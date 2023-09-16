import {
    Card,
    CardActionArea,
    CardMedia,
    CardHeader,
    CardContent,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import isImage from "../validation/isImgUrlValid";

const MedicineDetailsComponent = ({
    name, subTitle, description, url, alt, medicineNumber, price
}) => {

return (
    <Card square raised>
    <CardActionArea>
        <CardMedia component="img" image={isImage(url) ? url : "/assets/images/placeholderCardImg.png"} alt={alt} />
    </CardActionArea>
    <CardHeader title={name} subheader={subTitle}></CardHeader>
    <CardContent>
        <Typography variant="h3">Medicine details</Typography>
        <Typography>{description}</Typography>
        <Typography sx={{ mb: 2 }}>Medicine Number : {medicineNumber}</Typography>
        <Typography>Price : {String.fromCharCode(0x20aa)}{price}</Typography>
    </CardContent>
    </Card>
);
};

MedicineDetailsComponent.propTypes = {
    name: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    medicineNumber: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
};

MedicineDetailsComponent.defaultProps = {
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    subTitle: ""
};

export default MedicineDetailsComponent;
