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
    primary: {
      main: blue
    },
  }
});

const activeThemeWhenLightMode = createTheme({
  palette: {
    primary: {
      main: "#ab003c"
    }
  },
});

const inactiveThemeWhenLightMode = createTheme({
  palette: {
    primary: {
      main: "#b22a00"
    },
  }
});

const NavLinkComponent = ({ url, label, ...rest }) => {
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
        <NavLink to={url} {...rest}>
          {({ isActive }) => (
            <ThemeProvider theme={isActive && isDarkTheme ? activeThemeWhenDarkMode : !isActive && isDarkTheme ? inactiveThemeWhenDarkMode : isActive && !isDarkTheme ? activeThemeWhenLightMode : inactiveThemeWhenLightMode}>
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
