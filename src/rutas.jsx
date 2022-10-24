import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/dashboard/DashboardPage";
import TablaEquipos from "./components/tables/TablaEquipos2";
import TablaMantenimientos from "./components/tables/TablaMantenimientos2";
import TablaTickets from "./components/tables/TablaTickets2";
import TablaUsuarios from "./components/tables/TablaUsuarios2";
import PermissionsGate from "./permission/PermissionGate";
import { SCOPES } from "./permission/PermissionMaps";

export default function Rutas() {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/" element={<App />} />
      {isAuthenticated && (
        <>
          <Route
            path="/dashboard"
            element={
              <PermissionsGate scopes={[SCOPES.canViewDashboard]}>
                <Dashboard />
              </PermissionsGate>
            }
          />
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
