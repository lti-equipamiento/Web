import React, { useContext } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { multiStepContext } from "../StepContext";

export default function ThirdStep() {
  const { setStep, userData, setUserData, submitData } =
    useContext(multiStepContext);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Documentación tecnica"
          value={userData["doc_tecnica"]}
          onChange={(e) =>
            setUserData({ ...userData, doc_tecnica: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Accesorios o componentes asociados"
          value={userData["acc_comp_asociados"]}
          onChange={(e) =>
            setUserData({ ...userData, acc_comp_asociados: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Recomendaciones del fabricante"
          value={userData["recom_fabricante"]}
          onChange={(e) =>
            setUserData({ ...userData, recom_fabricante: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid container xs={12}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={() => setStep(2)}
            color="secondary"
          >
            Anterior
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end" xs={6}>
          <Button variant="contained" onClick={submitData} color="primary">
            Registrar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
