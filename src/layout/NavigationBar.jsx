import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoginButton from "../components/LoginButton";
import { mainListItems } from "./NavigationItems";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Button,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { getUsuario } from "../grapqhql/Queries";
import logosvg from "../assets/logosvg.svg";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#198caf",
    },
  },
});

export default function NavigationBar({ children }) {
  const [open, setOpen] = useState(true);
  const { user, logout, isAuthenticated } = useAuth0();

  // imagen de perfil, esto se deberia sacar del auth0 no de aca pero bueno.
  const { data } = useQuery(getUsuario(), {
    variables: { id: user.sub },
    fetchPolicy: "no-cache",
  });
  const [image, setImage] = useState();
  useEffect(() => {
    if (data) {
      setImage(data.data_usuario_by_pk.image);
    }
  }, [data]);

  const [openProfileMenu, setOpenProfileMenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (event) => {
    setOpenProfileMenu((prevOpen) => !prevOpen);
    anchorRef.current = event.currentTarget;
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenProfileMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          //style={{ background: "#7dcdd5" }}
          color="primary"
          position="absolute"
          open={open}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar src={logosvg} sx={{ marginLeft: -1 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, marginLeft: 1 }}
            >
              AGEM
            </Typography>

            {!isAuthenticated ? (
              <Grid container justifyContent="flex-end">
                <LoginButton justifyContent="flex-end" />
              </Grid>
            ) : (
              <Grid>
                <Button
                  onClick={(event) => {
                    handleToggle(event);
                  }}
                >
                  <Avatar src={image ? image : user.picture} />
                </Button>
                <Popper
                  open={openProfileMenu}
                  anchorEl={anchorRef.current}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-end"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <NavLink
                              to="/profile"
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            </NavLink>
                            <MenuItem
                              onClick={() => {
                                logout({ returnTo: window.location.origin });
                                handleClose();
                              }}
                            >
                              Cerrar sesión
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            <ListItemButton
              onClick={() => {
                logout({ returnTo: window.location.origin });
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {children}
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
