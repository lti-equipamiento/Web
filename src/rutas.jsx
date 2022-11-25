import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/DashboardPage";
import NavigationBar from "./layout/NavigationBar";
import PermissionsGate from "./permission/PermissionGate";
import { SCOPES } from "./permission/PermissionMaps";
import PageEquipo from "./pages/PageEquipo";
import PageUsuario from "./pages/PageUsuario";
import PageTicket from "./pages/PageTicket";
import PageMantenimiento from "./pages/PageMantenimiento";
import PageProfile from "./pages/PageProfile";
import PageLanding from "./pages/PageLanding";

export default function Rutas() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated ? (
        <PageLanding></PageLanding>
      ) : (
        <NavigationBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <>
              <Route
                path="/profile"
                element={
                  <PermissionsGate scopes={[SCOPES.canViewPerfil]}>
                    <PageProfile />
                  </PermissionsGate>
                }
              />
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
                    <PageEquipo />
                  </PermissionsGate>
                }
              />
              <Route
                path="/usuario"
                element={
                  <PermissionsGate scopes={[SCOPES.canViewUsuario]}>
                    <PageUsuario />
                  </PermissionsGate>
                }
              />
              <Route
                path="/ticket"
                element={
                  <PermissionsGate scopes={[SCOPES.canViewTicket]}>
                    <PageTicket />
                  </PermissionsGate>
                }
              />
              <Route
                path="/mantenimiento"
                element={
                  <PermissionsGate scopes={[SCOPES.canViewMantenimiento]}>
                    <PageMantenimiento />
                  </PermissionsGate>
                }
              />
            </>
          </Routes>
        </NavigationBar>
      )}
    </>
  );
}
