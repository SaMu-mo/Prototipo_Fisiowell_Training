import { useState } from "react";
import { citas, pacientes, servicios, ESTADOS, hoy, nextId } from "../api/data";

export default function Agenda() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  const [abrir, setAbrir] = useState(false);
  const [n, setN] = useState({ pacienteId: "", servicioId: "", fecha: hoy(), hora: "" });

  const nombrePac = (id) => pacientes.find((p) => p.id === id)?.nombre || "—";
  const nombreServ = (id) => servicios.find((s) => s.id === id)?.nombre || "—";
  const setEstado = (c, estado) => { c.estado = estado; refresh(); };
  const crear = () => {
    if (!n.pacienteId || !n.servicioId || !n.hora) return;
    citas.push({ id: nextId(), pacienteId: Number(n.pacienteId), servicioId: Number(n.servicioId), fecha: n.fecha, hora: n.hora, estado: "AGENDADO", trabajadorId: 2 });
    setN({ pacienteId: "", servicioId: "", fecha: hoy(), hora: "" }); setAbrir(false); refresh();
  };
  const orden = [...citas].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

  return (
    <>
      <div className="hdr slim">
        <div className="row">
          <div><div className="hi">Consultorio</div><div className="name">Agenda de citas</div></div>
          <button className="avatar" onClick={() => setAbrir((v) => !v)} title="Nueva cita">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
      </div>
      <div className="scroll">
        {abrir && (
          <div className="card pad addbox">
            <div className="banner-t">Nueva cita</div>
            <select className="inp" value={n.pacienteId} onChange={(e) => setN({ ...n, pacienteId: e.target.value })}>
              <option value="">Paciente…</option>
              {pacientes.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
            <select className="inp" value={n.servicioId} onChange={(e) => setN({ ...n, servicioId: e.target.value })}>
              <option value="">Servicio…</option>
              {servicios.filter((s) => s.activo).map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>
            <div className="dosinp">
              <input className="inp" type="date" value={n.fecha} onChange={(e) => setN({ ...n, fecha: e.target.value })} />
              <input className="inp" type="time" value={n.hora} onChange={(e) => setN({ ...n, hora: e.target.value })} />
            </div>
            <button className="btn primary" onClick={crear}>Agendar</button>
          </div>
        )}
        <div className="card">
          {orden.length === 0 && <div className="empty">No hay citas.</div>}
          {orden.map((c) => (
            <div className="list-item" key={c.id}>
              <div className="hora">{c.hora}</div>
              <div className="li-main"><div className="t">{nombrePac(c.pacienteId)}</div><div className="d">{nombreServ(c.servicioId)} · {c.fecha}</div></div>
              <select className={"estado-sel est-" + c.estado.toLowerCase()} value={c.estado} onChange={(e) => setEstado(c, e.target.value)}>
                {ESTADOS.map((e) => <option key={e} value={e}>{e.replace("_", " ")}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
