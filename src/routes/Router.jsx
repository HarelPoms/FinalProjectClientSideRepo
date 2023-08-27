import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LogoutPage from "../pages/LogoutPage";
import LoginPage from "../pages/LoginPage";
import FavMedicinesPage from "../pages/medicines/FavMedicinesPage";
import AboutPage from "../pages/AboutPage";
import FullDetailsMedicinePage from "../pages/medicines/FullDetailsMedicinePage";
import MyPrescriptionsPage from "../pages/prescriptions/MyPrescriptionsPage";
import UnassignedPrescriptionsPage from "../pages/prescriptions/UnassignedPrescriptionsPage";
import NewMedicinePage from "../pages/medicines/NewMedicinePage";
import MyMedicinesPage from "../pages/medicines/MyMedicinesPage";
import EditMedicinePage from "../pages/medicines/EditMedicinePage";
import NewPrescriptionPage from "../pages/prescriptions/NewPrescriptionPage";
import EditPrescriptionPage from "../pages/prescriptions/EditPrescriptionPage";
import MyPatientsPage from "../pages/patients/MyPatientsPage";
import PermissionsProtectedRoute from "../components/Route_Components/PermissionsProtectedRoute";
import LoggedInRoute from "../components/Route_Components/LoggedInRoute";
import ROUTES from "./ROUTES";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MYPRESCRIPTIONS} element={<PermissionsProtectedRoute isAdmin={false} isDoc={true} isDocOrAdmin={false} isPharma={false} element={<MyPrescriptionsPage />} />} />
      <Route path={ROUTES.UNASSIGNEDPRESCRIPTIONS} element={<PermissionsProtectedRoute isAdmin={false} isDoc={true} isDocOrAdmin={false} isPharma={false} element={<UnassignedPrescriptionsPage />} />} />
      <Route path={ROUTES.MYFAVMEDICINES} element={<PermissionsProtectedRoute isAdmin={false} isDoc={false} isDocOrAdmin={false} isPharma={true} element={<FavMedicinesPage />} />} />
      <Route path={ROUTES.NEWPRESCRIPTION} element={<PermissionsProtectedRoute isAdmin={false} isDoc={false} isDocOrAdmin={false} isPharma={false} element={<NewPrescriptionPage />} />} />
      <Route path={ROUTES.EDITPRESCRIPTION} element={<PermissionsProtectedRoute isAdmin={false} isDoc={true} isDocOrAdmin={false} isPharma={false} element={<EditPrescriptionPage />} />} />
      <Route path={ROUTES.FULLDETAILSMEDICINE} element={<FullDetailsMedicinePage />} />
      <Route path={ROUTES.NEWMEDICINE} element={<PermissionsProtectedRoute isAdmin={true} isDoc={false} isDocOrAdmin={false} isPharma={true} element={<NewMedicinePage />} />} />
      <Route path={ROUTES.MYMEDICINES} element={<PermissionsProtectedRoute isAdmin={false} isDoc={false} isDocOrAdmin={false} isPharma={true} element={<MyMedicinesPage />} />} />
      <Route path={ROUTES.EDITMEDICINE} element={<PermissionsProtectedRoute isAdmin={true} isDoc={false} isDocOrAdmin={false} isPharma={true} element={<EditMedicinePage />} />} />
      <Route path={ROUTES.MYPATIENTS} element={<PermissionsProtectedRoute isAdmin={false} isDoc={true} isDocOrAdmin={false} isPharma={false} element={<MyPatientsPage />} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={ROUTES.LOGOUT}
        element={<LoggedInRoute element={<LogoutPage />} />}
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
