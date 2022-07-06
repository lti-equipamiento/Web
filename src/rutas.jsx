import { Routes, Route } from "react-router-dom";
import App from "./App";
import TablaUsuarios from "./components/tables/TablaUsuarios";
import TablaTickets from "./components/tables/TablaTickets";
import TablaEquipos from "./components/tables/TablaEquipos";
import TablaMantenimientos from "./components/tables/TablaMantenimientos";
import EquipoContext from "./components/context/EquipoContext";
import UsuarioContext from "./components/context/UsuarioContext";
import TicketContext from "./components/context/TicketContext";

export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/equipo"
        element={
          <EquipoContext>
            <TablaEquipos />
          </EquipoContext>
        }
      />
      <Route
        path="/usuario"
        element={
          <UsuarioContext>
            <TablaUsuarios />
          </UsuarioContext>
        }
      />
      <Route
        path="/ticket"
        element={
          <TicketContext>
            <TablaTickets />
          </TicketContext>
        }
      />
      <Route
        path="/mantenimiento"
        element={
          <TicketContext>
            <TablaMantenimientos />
          </TicketContext>
        }
      />
    </Routes>
  );
}
