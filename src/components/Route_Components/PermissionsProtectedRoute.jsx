import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

//isDocOrAdmin - False = regular, True = Doc/Admin
//Will have to add consideration for pharmas
const PermissionsProtectedRoute = ({ element, isAdmin, isDoc, isDocOrAdmin, isPharma }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const adminOrDocCheck = () =>{
    return (payload && payload.isAdmin && isAdmin) || (payload && payload.isDoctor && isDoc);
  }
  const patientUserCheck = () => {
    return (payload && payload.isAdmin === isAdmin) && (payload && payload.isDoctor === isDoc) && (payload && payload.isPharma === isPharma);
  }
  const pharmaUserCheck = () => {
    return (payload && payload.isPharma === isPharma)
  }
  //* html section
  if (isLoggedIn) {
    if(isDocOrAdmin && adminOrDocCheck()){
      return element;
    }
    else if (!isDocOrAdmin && patientUserCheck()){
      return element;
    }
    else if(isPharma && pharmaUserCheck()){
      return element;
    }
    else if(isDoc && payload && payload.isDoctor){
      return element;
    }
  }
  toast.error("Invalid Permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};


PermissionsProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isDoc:   PropTypes.bool.isRequired,
    isDocOrAdmin: PropTypes.bool.isRequired,
};

PermissionsProtectedRoute.defaultProps = {
    isAdmin: false,
    isDoc: false,
    isDocOrAdmin: false
};
export default PermissionsProtectedRoute;
