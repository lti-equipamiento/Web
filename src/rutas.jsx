import { Routes, Route } from "react-router-dom";
import App from "./App";
import TablaUsuarios from "./components/tables/TablaUsuarios2";
import TablaTickets from "./components/tables/TablaTickets";
import TablaEquipos from "./components/tables/TablaEquipos";
import TablaMantenimientos from "./components/tables/TablaMantenimientos";
import PermissionsGate from "./permission/PermissionGate";
import { SCOPES } from "./permission/PermissionMaps";
import { useAuth0 } from "@auth0/auth0-react";

export default function Rutas() {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/" element={<App />} />
      {isAuthenticated && (
        <>
          <Route
            path="/equipo"
            element={
              <PermissionsGate scopes={[SCOPES.canViewEquipo]}>
                <TablaEquipos />
              </PermissionsGate>
            }
          />
          <Route
            path="/usuario"
            element={
              <PermissionsGate scopes={[SCOPES.canViewUsuario]}>
                <TablaUsuarios />
              </PermissionsGate>
            }
          />
          <Route
            path="/ticket"
            element={
              <PermissionsGate scopes={[SCOPES.canViewTicket]}>
                <TablaTickets />
              </PermissionsGate>
            }
          />
          <Route
            path="/mantenimiento"
            element={
              <PermissionsGate scopes={[SCOPES.canViewMantenimiento]}>
                <TablaMantenimientos />
              </PermissionsGate>
            }
          />
        </>
      )}
    </Routes>
  );
}
