import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ROUTES from "./ROUTES";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
