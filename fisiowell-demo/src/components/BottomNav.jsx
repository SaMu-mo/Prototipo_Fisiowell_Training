import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Icon({ name }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "pacientes") return <svg viewBox="0 0 24 24" {...P}><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M21 21v-2a4 4 0 0 0-3-3.9" /></svg>;
  if (name === "agenda") return <svg viewBox="0 0 24 24" {...P}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
  if (name === "caja") return <svg viewBox="0 0 24 24" {...P}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 10v4M18 10v4" /></svg>;
  if (name === "conta") return <svg viewBox="0 0 24 24" {...P}><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></svg>;
  if (name === "gestion") return <svg viewBox="0 0 24 24" {...P}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>;
  if (name === "salir") return <svg viewBox="0 0 24 24" {...P}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>;
  return null;
}

const NAV = {
  ADMIN: [
    { to: "/pacientes", label: "Pacientes", icon: "pacientes" },
    { to: "/agenda", label: "Agenda", icon: "agenda" },
    { to: "/caja", label: "Caja", icon: "caja" },
    { to: "/contabilidad", label: "Cuentas", icon: "conta" },
    { to: "/gestion", label: "Servicios", icon: "gestion" },
  ],
  TRABAJADOR: [
    { to: "/pacientes", label: "Pacientes", icon: "pacientes" },
    { to: "/agenda", label: "Agenda", icon: "agenda" },
    { to: "/caja", label: "Caja", icon: "caja" },
  ],
  CONTABILIDAD: [
    { to: "/contabilidad", label: "Cuentas", icon: "conta" },
    { to: "/caja", label: "Caja", icon: "caja" },
  ],
};

export default function BottomNav() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const items = NAV[usuario?.rol] || NAV.TRABAJADOR;
  const salir = () => { logout(); navigate("/login"); };
  return (
    <nav className="nav">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} className={({ isActive }) => (isActive ? "active" : "")}>
          <Icon name={it.icon} />
          {it.label}
        </NavLink>
      ))}
      <button className="salir-tab" onClick={salir} title="Cerrar sesión">
        <Icon name="salir" />
        Salir
      </button>
    </nav>
  );
}
