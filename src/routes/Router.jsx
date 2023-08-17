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
import PermissionsProtectedRoute from "../components/Route_Components/PermissionsProtectedRoute";
import LoggedInRoute from "../components/Route_Components/LoggedInRoute";
import ROUTES from "./ROUTES";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MYPRESCRIPTIONS} element={
      <LoggedInRoute element={<MyPrescriptionsPage />} />
      } />
      <Route path={ROUTES.UNASSIGNEDPRESCRIPTIONS} element={
      <LoggedInRoute element={<UnassignedPrescriptionsPage />} />
      } />
      <Route path={ROUTES.MYFAVMEDICINES} element={
      <LoggedInRoute element={<FavMedicinesPage />} />
      } />
      <Route path={ROUTES.FULLDETAILSMEDICINE} element={<FullDetailsMedicinePage />} />
      <Route path={ROUTES.NEWMEDICINE} element={<PermissionsProtectedRoute isAdmin={true} isDoc={false} isDocOrAdmin={false} isPharma={true} element={<NewMedicinePage />} />} />
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
