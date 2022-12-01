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
import { Button, SvgIcon } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getUsuario } from "../grapqhql/Queries";

const drawerWidth = 240;

function AgemIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M3857 3036 c-12 -13 -28 -50 -35 -82 -8 -33 -65 -278 -128 -547 -63
-268 -114 -489 -114 -492 0 -3 -124 -5 -275 -5 l-275 0 0 -88 0 -89 137 -6
c75 -4 216 -7 313 -7 170 0 177 1 197 23 15 15 33 72 58 182 63 269 74 317 95
405 11 47 28 120 37 163 10 42 20 77 23 77 4 0 21 -84 39 -187 32 -184 141
-794 161 -903 5 -30 19 -104 30 -165 16 -92 24 -114 45 -133 15 -12 32 -22 40
-22 35 0 65 45 81 120 8 41 38 183 65 315 28 132 55 266 61 298 5 31 13 57 17
57 3 0 29 -44 56 -97 28 -53 58 -105 68 -115 15 -16 39 -18 272 -18 l255 0 17
27 c10 16 18 46 18 71 0 36 -5 48 -28 68 -28 24 -30 24 -240 24 l-212 0 -44
83 c-155 293 -151 287 -190 287 -58 0 -65 -18 -122 -291 -28 -134 -53 -261
-56 -281 -7 -49 -19 -40 -27 19 -4 27 -11 71 -17 98 -5 28 -39 219 -75 425
-95 551 -132 748 -144 770 -23 44 -71 51 -103 16z"
      />
    </SvgIcon>
  );
}

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
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <AgemIcon />
              AGEM
            </Typography>

            {!isAuthenticated ? (
              <Grid container justifyContent="flex-end">
                <LoginButton justifyContent="flex-end" />
              </Grid>
            ) : (
              <Button
                title={user.email}
                onClick={(event) => (window.location.href = "/profile")}
              >
                <Avatar alt={user.email} src={image ? image : user.picture} />
              </Button>
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
