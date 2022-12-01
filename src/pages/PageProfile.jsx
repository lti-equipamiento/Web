import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CardMedia,
  Button,
  Grid,
  TextField,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useQuery, useMutation } from "@apollo/client";
import { getUsuario, editUsuario } from "../grapqhql/Queries";
import agemlogo from "../assets/logo512.png";
import "../css/PageProfile.css";
import CustomizedDialogs from "../components/dialogs/Dialog";
import PhotoUpload from "../components/profile/PhotoUpload";

export default function PageProfile() {
  const { user } = useAuth0();
  const { loading, data } = useQuery(getUsuario(), {
    variables: { id: user.sub },
    fetchPolicy: "no-cache",
  });
  const [editUsuarioMutation] = useMutation(editUsuario());
  const [disabledMode, setDisabledMode] = useState(true);
  const [profileData, setProfileData] = useState([]);

  // Subir Foto
  const [dialogOpen, setDialogOpen] = useState(false);

  //Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (data) {
      setProfileData(data.data_usuario_by_pk);
    }
  }, [data]);

  // Funcion del boton subir foto
  const onUploadPhoto = () => {
    setDialogOpen(true);
  };

  // Funcion del boton edit
  const onEdit = () => {
    if (disabledMode) {
      setDisabledMode(false);
    } else {
      try {
        editUsuarioMutation({
          variables: {
            id: user.sub,
            nombre: profileData.nombre,
            telefono: profileData.telefono,
            direccion: profileData.direccion,
            cedula: profileData.cedula,
            mail: profileData.mail,
            rol: profileData.rol,
          },
        });
        setDisabledMode(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CachedIcon
            sx={{
              height: "100px",
              width: "100px",
            }}
          />
          <Typography variant="h4"> Cargando... </Typography>
        </Grid>
      ) : (
        <>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item marginBottom={1} xs={12}>
              <CardMedia
                sx={{
                  borderRadius: "50%",
                  border: "5px solid gray",
                  height: "200px",
                  width: "200px",
                  position: "relative",
                }}
                component="img"
                image={profileData.image ? profileData.image : agemlogo}
                alt="imagen de perfil"
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Button onClick={onUploadPhoto} variant="contained">
                Subir Foto
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Paper
              sx={{
                maxWidth: "500px",
              }}
            >
              <Grid container rowSpacing={0} columnSpacing={1}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={2}
                  marginBottom={-1}
                >
                  <Grid item xs={6} paddingLeft={4}>
                    <Typography variant="h6"> Datos del perfil</Typography>
                  </Grid>
                  <Grid item xs={6} paddingRight={2}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Button onClick={onEdit}>
                        {!disabledMode ? <DoneIcon /> : <EditIcon />}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} marginLeft={1.5} marginRight={1.5}>
                  <TextField
                    disabled={disabledMode}
                    label="Nombre"
                    value={profileData.nombre}
                    onChange={(e) =>
                      setProfileData({ ...profileData, nombre: e.target.value })
                    }
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} marginLeft={1.5} marginRight={1.5}>
                  <TextField
                    disabled={disabledMode}
                    label="Telefono"
                    value={profileData.telefono}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        telefono: e.target.value,
                      })
                    }
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} marginLeft={1.5} marginRight={1.5}>
                  <TextField
                    disabled={disabledMode}
                    label="Dirección"
                    value={profileData.direccion}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        direccion: e.target.value,
                      })
                    }
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} marginLeft={1.5} marginRight={1.5}>
                  <TextField
                    disabled={disabledMode}
                    label="Cedula"
                    value={profileData.cedula}
                    onChange={(e) =>
                      setProfileData({ ...profileData, cedula: e.target.value })
                    }
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} marginLeft={1.5} marginRight={1.5}>
                  <TextField
                    disabled={true}
                    label="Email"
                    value={profileData.mail}
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  marginLeft={1.5}
                  marginRight={1.5}
                  marginBottom={2}
                >
                  <TextField
                    disabled={true}
                    label="Rol"
                    value={profileData.rol}
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}
      <CustomizedDialogs
        modalTitle={"Subir Foto"}
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
      >
        <PhotoUpload
          setDialogOpen={setDialogOpen}
          userID={user.sub}
          profileData={profileData}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarText={setSnackbarText}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      </CustomizedDialogs>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </>
  );
}
