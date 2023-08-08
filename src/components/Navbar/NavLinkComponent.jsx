import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lightGreen } from '@mui/material/colors';
import { useSelector } from "react-redux";


const activeThemeWhenDarkMode = createTheme({
  palette: {
    primary: {
      main: "#52b202"
    }
  },
});

const inactiveThemeWhenDarkMode = createTheme({
  palette: {
    primary: 
    {main :blue[500]}
  }
});

const NavLinkComponent = ({ url, label, ...rest }) => {
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
        <NavLink to={url} {...rest}>
          {({ isActive }) => (
            <ThemeProvider theme={isActive ? activeThemeWhenDarkMode : inactiveThemeWhenDarkMode}>
              <Typography
                sx={{
                  my: 2,
                  display: "block",
                  p: 2,
                }}
                color={"primary"}
              >
                {label}
              </Typography>
            </ThemeProvider>
          )}
        </NavLink>
    
    
  );
};

export default NavLinkComponent;
