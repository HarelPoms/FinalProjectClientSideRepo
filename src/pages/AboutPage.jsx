import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import "../stylesheets/mainStyle.css";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const AboutPage = () => {
    return(
        <Box component="div" noValidate sx={{ mt: 3 }}>
            <Typography variant="h2" className="alignTextToCenter">This page contains user instructions</Typography>
            <Divider>How to's</Divider>
            <Grid container spacing={2}>
                {/* Row one */}
                <Grid item xs={5} sm={5} sx={{mt:5, ml:1}}>
                    <Typography className="aboutTypography">This is a medicine card, including an image, brief subtitle and description.beneath it, is a row containing the myriad of actions your user may perform.
                    The Edit button allows you to edit the medicine card only if the card was created by you as a pharma user or admin.
                    The delete button is available if you're either an Admin, or you created the card as a pharma user. 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="Card With Actions for pharma/admin" src={"/assets/images/MedicinePreview1.PNG"} />
                </Grid>
                {/* Row Two */}
                <Grid item xs={5} sm={5} sx={{mt:5, ml:1}}>
                    <Typography className="aboutTypography">
                        You may also perform like/unlike via the button available if you are a patient. You can add any medicine to the shopping Cart via the cart button.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={"/assets/images/MedicinePreview2.PNG"} />
                </Grid>
                {/* Row Three */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography className="aboutTypography">
                        This is a prescription card, the actions available to you depend on your role (delete, edit, approve [for doctors])
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={"/assets/images/PrescriptionAllActionsCentered.PNG"} />
                </Grid>
                {/* Row Four */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography className="aboutTypography">
                        This is a prescription card as it appears under unassigned prescriptions for doctors, this page will only show prescriptions that have not had a doctor assume responsibility for them for patients making prescription requests of the same HMO as the doctor. A doctor from the same HMO may assume responsibility over it by pushing the button shown.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={"/assets/images/PrescriptionAssumeResponsibility.PNG"} />
                </Grid>
                {/* Row Five */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography className="aboutTypography">
                        This is right side of the navbar, here you may switch between light mode and dark mode, as well as search for particular items by medicine number or by name.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={"/assets/images/RightSideOfNavbar.PNG"} />
                </Grid>
                {/* Row Six */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography className="aboutTypography">
                        This is left side of the navbar, here you may perform any number of actions or access pages available to you on the basis of your user's permissions
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={"/assets/images/LeftSideOfNavbar.PNG"} />
                </Grid>
                {/* Row Seven */}
                <Grid item xs={5} sm={5} sx={{ml:1}}>
                    <Typography className="aboutTypography">
                        This is the footer; <br /> My favorite medicines is available to patients users.
                        <br />My Medicines is available to pharma users.<br /> About is available to anyone.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="test" src={"/assets/images/FooterShowcaseAllOptions.PNG"} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AboutPage;