import React, { useContext } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { multiStepContext } from "../StepContext";

export default function FirstStep() {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Fabricante"
          value={userData["fabricante"]}
          onChange={(e) =>
            setUserData({ ...userData, fabricante: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Distribuidor"
          value={userData["distribuidor"]}
          onChange={(e) =>
            setUserData({ ...userData, distribuidor: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="RUT"
          value={userData["rut"]}
          onChange={(e) => setUserData({ ...userData, rut: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Fecha de adquisición"
          value={userData["fecha_adquisicion"]}
          onChange={(e) =>
            setUserData({ ...userData, fecha_adquisicion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Autorizacion MSP"
          value={userData["msp"]}
          onChange={(e) => setUserData({ ...userData, msp: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ciudad fabricante"
          value={userData["ciudad_fabricante"]}
          onChange={(e) =>
            setUserData({ ...userData, ciudad_fabricante: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ciudad distribuidor"
          value={userData["ciudad_distribuidor"]}
          onChange={(e) =>
            setUserData({ ...userData, ciudad_distribuidor: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Telefono"
          value={userData["telefono"]}
          onChange={(e) =>
            setUserData({ ...userData, telefono: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Fecha de instalacion"
          value={userData["fecha_instalacion"]}
          onChange={(e) =>
            setUserData({ ...userData, fecha_instalacion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Forma de adquisición"
          value={userData["forma_adquisicion"]}
          onChange={(e) =>
            setUserData({ ...userData, forma_adquisicion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid container justifyContent="flex-end" xs={12}>
        <Button variant="contained" onClick={() => setStep(2)} color="primary">
          Siguiente
        </Button>
      </Grid>
    </Grid>
  );
}
