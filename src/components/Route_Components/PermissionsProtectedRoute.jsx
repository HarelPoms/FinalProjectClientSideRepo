import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

//isDocOrAdmin - False = regular, True = Doc/Admin
//Will have to add consideration for pharmas
const PermissionsProtectedRoute = ({ element, isAdmin, isDoc, isBizOrAdmin }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const adminOrDocCheck = () =>{
    return (payload && payload.isAdmin && isAdmin) || (payload && payload.isDoc && isDoc);
  }
  const regularUserCheck = () => {
    return (payload && payload.isAdmin === isAdmin) || (payload && payload.isDoc === isDoc);
  }
  //* html section
  if (isLoggedIn) {
    if(isBizOrAdmin && adminOrDocCheck()){
      return element;
    }
    else if (!isBizOrAdmin && regularUserCheck()){
      return element;
    }
  }
  toast.error("Invalid Permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};


PermissionsProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isBiz:   PropTypes.bool.isRequired,
    isBizOrAdmin: PropTypes.bool.isRequired,
};

PermissionsProtectedRoute.defaultProps = {
    isAdmin: false,
    isBiz: false,
    isBizOrAdmin: false
};
export default PermissionsProtectedRoute;
