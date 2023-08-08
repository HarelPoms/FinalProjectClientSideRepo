import { Fragment } from "react";
import NavLinkComponent from "./NavLinkComponent";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";

//not logged in users
const notAuthPages = [
    {
        label: "Register",
        url: ROUTES.REGISTER,
    },
    {
        label: "Login",
        url: ROUTES.LOGIN,
    },
];

const NavbarNotAuthLinks = () => {
    const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
    );

    return (
    <Fragment>
        {!isLoggedIn
            ? notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
        )) : ""}
    </Fragment>)
}

export default NavbarNotAuthLinks;