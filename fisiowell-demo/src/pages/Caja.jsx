import { useState } from "react";
import { pagos, pacientes, servicios, movimientos, hoy, nextId } from "../api/data";

const money = (n) => "$" + Number(n || 0).toFixed(2);

export default function Caja() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  const [f, setF] = useState({ pacienteId: "", servicioId: "", monto: "", metodo: "Efectivo" });

  const nombrePac = (id) => pacientes.find((p) => p.id === id)?.nombre || "—";
  const nombreServ = (id) => servicios.find((s) => s.id === id)?.nombre || "—";
  const onServ = (v) => { const s = servicios.find((x) => x.id === Number(v)); setF({ ...f, servicioId: v, monto: s ? String(s.precio) : f.monto }); };
  const registrar = () => {
    if (!f.pacienteId || !f.servicioId || !Number(f.monto)) return;
    const pac = pacientes.find((p) => p.id === Number(f.pacienteId));
    const serv = servicios.find((s) => s.id === Number(f.servicioId));
    pagos.push({ id: nextId(), pacienteId: Number(f.pacienteId), servicioId: Number(f.servicioId), monto: Number(f.monto), fecha: hoy(), metodo: f.metodo });
    // el pago también se registra como ingreso en contabilidad
    movimientos.push({ id: nextId(), tipo: "INGRESO", concepto: "Pago: " + (pac?.nombre || "paciente") + " (" + (serv?.nombre || "servicio") + ")", monto: Number(f.monto), fecha: hoy() });
    setF({ pacienteId: "", servicioId: "", monto: "", metodo: "Efectivo" }); refresh();
  };
  const delDia = pagos.filter((p) => p.fecha === hoy());
  const total = delDia.reduce((s, p) => s + p.monto, 0);

  return (
    <>
      <div className="hdr">
        <div className="row"><div><div className="hi">Cuadre del día</div><div className="name">Caja y pagos</div></div></div>
        <div className="hero-metrics">
          <div className="metric"><div className="lbl">Total del día</div><div className="val">{money(total)}</div></div>
          <div className="metric"><div className="lbl">Pagos</div><div className="val">{delDia.length}</div></div>
        </div>
      </div>
      <div className="scroll">
        <div className="card pad addbox">
          <div className="banner-t">Registrar pago</div>
          <select className="inp" value={f.pacienteId} onChange={(e) => setF({ ...f, pacienteId: e.target.value })}>
            <option value="">Paciente…</option>
            {pacientes.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <select className="inp" value={f.servicioId} onChange={(e) => onServ(e.target.value)}>
            <option value="">Servicio…</option>
            {servicios.filter((s) => s.activo).map((s) => <option key={s.id} value={s.id}>{s.nombre} — ${s.precio}</option>)}
          </select>
          <div className="dosinp">
            <input className="inp" inputMode="decimal" placeholder="Monto" value={f.monto} onChange={(e) => setF({ ...f, monto: e.target.value })} />
            <select className="inp" value={f.metodo} onChange={(e) => setF({ ...f, metodo: e.target.value })}>
              <option>Efectivo</option><option>Transferencia</option><option>Tarjeta</option>
            </select>
          </div>
          <button className="btn primary" onClick={registrar}>Registrar pago</button>
        </div>

        <div className="eyebrow">Pagos de hoy</div>
        <div className="card">
          {delDia.length === 0 && <div className="empty">Aún no hay pagos hoy.</div>}
          {delDia.map((p) => (
            <div className="list-item" key={p.id}>
              <div className="ic soft ok">✓</div>
              <div className="li-main"><div className="t">{nombrePac(p.pacienteId)}</div><div className="d">{nombreServ(p.servicioId)} · {p.metodo}</div></div>
              <div className="li-amt">{money(p.monto)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
