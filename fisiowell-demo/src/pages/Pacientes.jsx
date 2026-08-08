import { useState } from "react";
import { pacientes, citas, servicios, nextId } from "../api/data";

const waLink = (tel = "") => "https://wa.me/593" + tel.replace(/[^0-9]/g, "").replace(/^0/, "");

export default function Pacientes() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  const [selId, setSelId] = useState(null);
  const [busca, setBusca] = useState("");
  const [abrir, setAbrir] = useState(false);
  const [nuevo, setNuevo] = useState({ nombre: "", cedula: "", telefono: "" });
  const [resumen, setResumen] = useState("");

  const sel = pacientes.find((p) => p.id === selId);

  const abrirFicha = (p) => { setSelId(p.id); setResumen(p.resumen || ""); };
  const guardarResumen = () => { if (sel) { sel.resumen = resumen; refresh(); } };
  const crear = () => {
    if (!nuevo.nombre) return;
    pacientes.push({ id: nextId(), ...nuevo, resumen: "" });
    setNuevo({ nombre: "", cedula: "", telefono: "" }); setAbrir(false); refresh();
  };

  // ---- Ficha del paciente ----
  if (sel) {
    const suyas = citas.filter((c) => c.pacienteId === sel.id);
    const nombreServicio = (id) => servicios.find((s) => s.id === id)?.nombre || "—";
    return (
      <>
        <div className="hdr slim">
          <button className="back" onClick={() => setSelId(null)}>‹ Pacientes</button>
          <div className="name">{sel.nombre}</div>
        </div>
        <div className="scroll">
          <div className="card pad">
            <div className="kv"><span>Cédula</span><b>{sel.cedula || "—"}</b></div>
            <div className="kv"><span>Teléfono</span><b>{sel.telefono || "—"}</b></div>
            <a className="btn wa" href={waLink(sel.telefono)} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" /></svg>
              Escribir por WhatsApp
            </a>
          </div>

          <div className="eyebrow">Resumen del historial clínico</div>
          <div className="card pad">
            <textarea className="inp area" rows={5} value={resumen} onChange={(e) => setResumen(e.target.value)} placeholder="Anota lo esencial para quien lo atienda…" />
            <button className="btn primary sm" onClick={guardarResumen} disabled={resumen === (sel.resumen || "")}>Guardar resumen</button>
          </div>

          <div className="eyebrow">Sus citas</div>
          <div className="card">
            {suyas.length === 0 && <div className="empty">Sin citas registradas.</div>}
            {suyas.map((c) => (
              <div className="list-item" key={c.id}>
                <div className="li-main"><div className="t">{nombreServicio(c.servicioId)}</div><div className="d">{c.fecha} · {c.hora}</div></div>
                <span className={"chip est-" + c.estado.toLowerCase()}>{c.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ---- Lista de pacientes ----
  const lista = pacientes.filter((p) => p.nombre.toLowerCase().includes(busca.toLowerCase()));
  return (
    <>
      <div className="hdr slim">
        <div className="row">
          <div><div className="hi">Fisiowell Training</div><div className="name">Pacientes</div></div>
          <button className="avatar" onClick={() => setAbrir((v) => !v)} title="Nuevo paciente">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
      </div>
      <div className="scroll">
        {abrir && (
          <div className="card pad addbox">
            <div className="banner-t">Nuevo paciente</div>
            <input className="inp" placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
            <input className="inp" placeholder="Cédula" value={nuevo.cedula} onChange={(e) => setNuevo({ ...nuevo, cedula: e.target.value })} />
            <input className="inp" placeholder="Teléfono" value={nuevo.telefono} onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })} />
            <button className="btn primary" onClick={crear}>Guardar</button>
          </div>
        )}
        <input className="inp search" placeholder="Buscar paciente…" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <div className="card">
          {lista.length === 0 && <div className="empty">Sin pacientes.</div>}
          {lista.map((p) => (
            <button className="list-item tap" key={p.id} onClick={() => abrirFicha(p)}>
              <div className="ic soft">{p.nombre.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
              <div className="li-main"><div className="t">{p.nombre}</div><div className="d">CI: {p.cedula || "—"}</div></div>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#B6C1CD" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
