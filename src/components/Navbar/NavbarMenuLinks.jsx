import NavLinkComponent from "./NavLinkComponent";
import { useSelector } from "react-redux";
import { Fragment } from "react";

import ROUTES from "../../routes/ROUTES";
import NavbarNotAuthLinks from "./NavbarNotAuthLinks";
import { Routes } from "react-router-dom";

// access to all
const pages = [
    {
        label: "Home",
        url: ROUTES.HOME,
    },
    {
        label: "About Us",
        url: ROUTES.ABOUT
    }
];

const patientPages = [
    {label: "Create prescription request", url: ROUTES.NEWPRESCRIPTION},
    {label: "My Prescriptions",url: ROUTES.MYPRESCRIPTIONS}
]
//pharma pages
const pharmaPages = [
    {label: "Create", url:ROUTES.NEWMEDICINE},
    {
        label: "My Medicines",
        url: ROUTES.MYMEDICINES
    }
];

//doctor pages
const doctorPages = [
    {label: "Unassigned Prescriptions", url: ROUTES.PRESCRIPTIONS},
    {label: "My Prescriptions", url: ROUTES.MYPRESCRIPTIONS},
    {label: "My Patients", url: ROUTES.MYPATIENTS}
]

const adminPages = [
    
]

const loggedInPages  = [{label: "Favorite Medicines", url: ROUTES.MYFAVMEDICINES}];

const NavbarMenuLinks = ({isMobile}) => {
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
    );

    return (
        <Fragment>
        {pages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        ))}
        {isMobile ? <NavbarNotAuthLinks /> : 
        ""}
        {payload && payload.isPharma ? pharmaPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {payload && payload.isDoctor ? doctorPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {payload && payload.isAdmin ? adminPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {isLoggedIn ? loggedInPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        </Fragment>
        );
}

export default NavbarMenuLinks;