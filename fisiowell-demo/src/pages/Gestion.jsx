import { useState } from "react";
import { servicios, nextId } from "../api/data";

export default function Gestion() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  const [n, setN] = useState({ nombre: "", precio: "" });

  const crear = () => {
    if (!n.nombre || !Number(n.precio)) return;
    servicios.push({ id: nextId(), nombre: n.nombre, precio: Number(n.precio), activo: true });
    setN({ nombre: "", precio: "" }); refresh();
  };
  const toggle = (s) => { s.activo = !s.activo; refresh(); };

  return (
    <>
      <div className="hdr slim">
        <div className="hi">Administración</div>
        <div className="name">Servicios</div>
      </div>
      <div className="scroll">
        <div className="card pad addbox">
          <div className="banner-t">Nuevo servicio</div>
          <input className="inp" placeholder="Nombre del servicio" value={n.nombre} onChange={(e) => setN({ ...n, nombre: e.target.value })} />
          <input className="inp" placeholder="Precio" inputMode="decimal" value={n.precio} onChange={(e) => setN({ ...n, precio: e.target.value })} />
          <button className="btn primary" onClick={crear}>Añadir servicio</button>
        </div>
        <p className="sub small">Al deshabilitar un servicio, deja de aparecer para agendar citas o registrar pagos.</p>
        <div className="card">
          {servicios.map((s) => (
            <div className="list-item" key={s.id}>
              <div className="li-main"><div className="t">{s.nombre}</div><div className="d">${s.precio}</div></div>
              <button className={"chip " + (s.activo ? "ok" : "pend")} onClick={() => toggle(s)}>{s.activo ? "Habilitado" : "Deshabilitado"}</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
