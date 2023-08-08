import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lightGreen } from '@mui/material/colors';

const activeTheme = createTheme({
  palette: {
    primary: {
      main: "#52b202"
    }
  },
});

const inactiveTheme = createTheme({
  palette: {
    primary: {
      main: blue
    },
  }
});

const NavLinkComponent = ({ url, label, ...rest }) => {
  return (
    
        <NavLink to={url} {...rest}>
          {({ isActive }) => (
            <ThemeProvider theme={isActive ? activeTheme : inactiveTheme}>
              <Typography
                sx={{
                  my: 2,
                  display: "block",
                  p: 2,
                }}
                color={"primary"}
              >
                {/* color={isActive ? "warning.main" : "text.primary"} */}
                {label}
              </Typography>
            </ThemeProvider>
          )}
        </NavLink>
    
    
  );
};

export default NavLinkComponent;
