import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Pacientes from "./pages/Pacientes";
import Agenda from "./pages/Agenda";
import Caja from "./pages/Caja";
import Contabilidad from "./pages/Contabilidad";
import Gestion from "./pages/Gestion";
import BottomNav from "./components/BottomNav";

function Privado({ children }) {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" replace />;
}
function Rol({ roles, children }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  return roles.includes(usuario.rol) ? children : <Navigate to="/" replace />;
}
function Shell({ children }) {
  return <div className="device"><div className="screen active">{children}</div><BottomNav /></div>;
}
function Inicio() {
  const { usuario } = useAuth();
  const destino = usuario?.rol === "CONTABILIDAD" ? "/contabilidad" : "/pacientes";
  return <Navigate to={destino} replace />;
}

export default function App() {
  return (
    <div className="stage">
      <Routes>
        <Route path="/login" element={<div className="device"><Login /></div>} />
        <Route path="/" element={<Privado><Inicio /></Privado>} />
        <Route path="/pacientes" element={<Rol roles={["ADMIN", "TRABAJADOR"]}><Shell><Pacientes /></Shell></Rol>} />
        <Route path="/agenda" element={<Rol roles={["ADMIN", "TRABAJADOR"]}><Shell><Agenda /></Shell></Rol>} />
        <Route path="/caja" element={<Rol roles={["ADMIN", "TRABAJADOR", "CONTABILIDAD"]}><Shell><Caja /></Shell></Rol>} />
        <Route path="/contabilidad" element={<Rol roles={["ADMIN", "CONTABILIDAD"]}><Shell><Contabilidad /></Shell></Rol>} />
        <Route path="/gestion" element={<Rol roles={["ADMIN"]}><Shell><Gestion /></Shell></Rol>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
