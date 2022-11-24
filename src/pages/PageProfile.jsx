import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CardMedia,
  Button,
  Grid,
  TextField,
  Paper,
  Typography,
  Input,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useQuery, useMutation } from "@apollo/client";
import { getUsuario, editUsuario } from "../grapqhql/Queries";
import agemlogo from "../assets/logo512.png";
import "../css/PageProfile.css";
//import AddPhoto from "../gcp/AddPhoto"; //esto rompe todo

export default function PageProfile() {
  const { user } = useAuth0();
  const { loading, data } = useQuery(getUsuario(), {
    variables: { id: user.sub },
    fetchPolicy: "no-cache",
  });
  const [editUsuarioMutation] = useMutation(editUsuario());
  const [disabledMode, setDisabledMode] = useState(true);
  const [profileData, setProfileData] = useState([]);

  // Imagen
  const [image, setImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = {
  //       preview: URL.createObjectURL(event.target.files[0]),
  //       data: event.target.files[0],
  //     };
  //     setImage(file);
  //   }
  // };

  useEffect(() => {
    if (data) {
      setProfileData(data.data_usuario_by_pk);
    }
  }, [data]);

  // Funcion del boton subir foto
  const onUploadPhoto = () => {
    // TODO: agregar la funcionalidad de subir la foto
    // Estaria bueno que abra un dialog y ahi este para subir
  };

  // Funcion del input del upload file
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile);

  const fileUploadHandler = () => {};

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
          {/* <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={async (e) => {
            onImageChange(e);
            // const auth = await authorize();
            // addPhoto(auth, image);
          }}
        />
      </Button>
      {console.log(image)}
      <img src={image.preview} /> */}
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
                // TODO: aca cambiamos la imagen nomas y ya queda lindo
                image={agemlogo}
                alt="gato"
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
    </>
  );
}
