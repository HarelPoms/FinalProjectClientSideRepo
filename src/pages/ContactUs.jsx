import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import "../stylesheets/mainStyle.css";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const ContactUsPage = () => {
    return(
        <Box component="div" noValidate sx={{ mt: 3 }}>
            <Typography variant="h2" className="alignTextToCenter">How to contact us:</Typography>
            <Grid container spacing={2}>
                {/* Row one */}
                <Grid item xs={5} sm={5} sx={{mt:5, ml:1}}>
                    <Typography className="aboutTypography">
                        Telephone : 03-5461232
                        Fax : +44 161 999 8888
                        Address : 221B Baker St., London
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                    <Img alt="contact us image" src={"/assets/images/telephone.jpg"} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ContactUsPage;