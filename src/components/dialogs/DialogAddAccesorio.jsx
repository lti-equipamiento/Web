import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { addComponente } from "../../grapqhql/Queries";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogAddAccesorio(props) {
  const { dialogOpen, setDialogOpen, HDVData, setReload } = props;
  const [accesorioData, setAccesorioData] = useState([]);
  const [AccesorioMutation] = useMutation(addComponente());

  useEffect(() => {
    setAccesorioData({ hoja_de_vida: HDVData.id });
  }, [HDVData.id]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmar = () => {
    try {
      AccesorioMutation({
        variables: {
          serie_referencia: accesorioData.serie_referencia,
          nombre: accesorioData.nombre,
          marca: accesorioData.marca,
          hoja_de_vida: accesorioData.hoja_de_vida,
        },
      });
      setAccesorioData({
        ...accesorioData,
        nombre: " ",
        marca: " ",
        serie_referencia: " ",
      });
      setReload(true);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BootstrapDialog aria-labelledby="dialog-hdv" open={dialogOpen}>
        <BootstrapDialogTitle id="dialog-hdv" onClose={handleClose}>
          <label>Agregar Accesorio</label>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container rowSpacing={0} columnSpacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                value={accesorioData["nombre"]}
                onChange={(e) =>
                  setAccesorioData({ ...accesorioData, nombre: e.target.value })
                }
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Marca"
                value={accesorioData["marca"]}
                onChange={(e) =>
                  setAccesorioData({ ...accesorioData, marca: e.target.value })
                }
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Serie de referencia"
                value={accesorioData["serie_referencia"]}
                onChange={(e) =>
                  setAccesorioData({
                    ...accesorioData,
                    serie_referencia: e.target.value,
                  })
                }
                margin="normal"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button onClick={() => handleConfirmar()}>Confirmar</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
