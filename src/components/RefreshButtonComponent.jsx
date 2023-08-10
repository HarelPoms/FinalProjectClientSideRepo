import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from "prop-types";


const RefreshButtonComponent = ({handleRefreshClick}) => {
    const refreshBtnClick = (ev) => {
        handleRefreshClick(ev);
    }
    return (
        <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={refreshBtnClick}
        >
            <RefreshIcon />
        </Button>
    )
}

RefreshButtonComponent.propTypes = {
    handleRefreshClick: PropTypes.func.isRequired
};
export default RefreshButtonComponent