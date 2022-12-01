import React, { useState, useEffect } from "react";
import { IconButton, Button, Grid, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { editUsuario } from "../../grapqhql/Queries";
import ClearIcon from "@mui/icons-material/Clear";

export default function PhotoUpload(props) {
  const {
    setDialogOpen,
    profileData,
    userID,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;
  const [photoLink, setPhotoLink] = useState();
  const [editUsuarioMutation] = useMutation(editUsuario());

  useEffect(() => {
    if (profileData) {
      setPhotoLink(profileData.image);
    }
  }, [profileData]);

  const handleClearClick = () => {
    setPhotoLink("");
  };

  const onSubmit = () => {
    try {
      editUsuarioMutation({
        variables: {
          id: userID,
          nombre: profileData.nombre,
          telefono: profileData.telefono,
          direccion: profileData.direccion,
          cedula: profileData.cedula,
          mail: profileData.mail,
          rol: profileData.rol,
          image: photoLink,
        },
      });
      setDialogOpen(false);
      setOpenSnackbar(true);
      setSnackbarText("Se actualizo la foto con exito.");
      setSnackbarSeverity("success");
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
      setSnackbarText("No se pudo actualizar la foto.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop={-1}
      width={500}
    >
      <TextField
        label="Link"
        value={photoLink}
        margin="normal"
        variant="outlined"
        color="secondary"
        onChange={(e) => {
          setPhotoLink(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: photoLink ? "visible" : "hidden" }}
              onClick={handleClearClick}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        fullWidth
      />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        marginTop={1}
      >
        <Button variant="contained" onClick={onSubmit}>
          Aceptar
        </Button>
      </Grid>
    </Grid>
  );
}
