import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Icon, NAV } from "./BottomNav";

export default function SideNav() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const items = NAV[usuario?.rol] || NAV.TRABAJADOR;
  const salir = () => { logout(); navigate("/login"); };
  return (
    <aside className="sidenav">
      <div className="side-brand">
        <img src="/logo.jpg" alt="Fisiowell" />
        <div><div className="sb-name">Fisiowell</div><div className="sb-sub">Training</div></div>
      </div>
      <div className="side-items">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} className={({ isActive }) => "side-link" + (isActive ? " active" : "")}>
            <Icon name={it.icon} /><span>{it.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="side-foot">
        <div className="side-user">{usuario?.nombre}</div>
        <button className="side-logout" onClick={salir}><Icon name="salir" /><span>Cerrar sesión</span></button>
      </div>
    </aside>
  );
}
