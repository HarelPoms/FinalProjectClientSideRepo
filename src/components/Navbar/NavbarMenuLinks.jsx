import NavLinkComponent from "./NavLinkComponent";
import { useSelector } from "react-redux";
import { Fragment } from "react";

import ROUTES from "../../routes/ROUTES";
import NavbarNotAuthLinks from "./NavbarNotAuthLinks";

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

const loggedInPatientPages = [
    {label: "Create prescription request", url: ROUTES.NEWPRESCRIPTION},
    {label: "My Prescriptions",url: ROUTES.MYPRESCRIPTIONS},
    {label: "Favorite Medicines", url: ROUTES.MYFAVMEDICINES}
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
const loggedInDoctorPages = [
    {label: "Unassigned Prescriptions", url: ROUTES.UNASSIGNEDPRESCRIPTIONS},
    {label: "My Prescriptions", url: ROUTES.MYPRESCRIPTIONS},
    {label: "My Patients", url: ROUTES.MYPATIENTS}
]

const adminPages = [
    
]
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
        {/* patient links who is logged in */}
        {payload && !payload.isPharma && !payload.isDoctor && !payload.isAdmin ? loggedInPatientPages.map((page) => <NavLinkComponent key={page.url} {...page} />) : ""}
        {payload && payload.isPharma ? pharmaPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {payload && payload.isDoctor ? loggedInDoctorPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {payload && payload.isAdmin ? adminPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        </Fragment>
        );
}

export default NavbarMenuLinks;