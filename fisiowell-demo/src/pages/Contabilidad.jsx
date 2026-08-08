import { useState } from "react";
import { movimientos, hoy, nextId } from "../api/data";

const money = (n) => "$" + Number(n || 0).toFixed(2);

export default function Contabilidad() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  const [f, setF] = useState({ tipo: "INGRESO", concepto: "", monto: "" });

  const ingresos = movimientos.filter((m) => m.tipo === "INGRESO").reduce((s, m) => s + m.monto, 0);
  const gastos = movimientos.filter((m) => m.tipo === "GASTO").reduce((s, m) => s + m.monto, 0);
  const balance = ingresos - gastos;

  const agregar = () => {
    if (!f.concepto || !Number(f.monto)) return;
    movimientos.push({ id: nextId(), tipo: f.tipo, concepto: f.concepto, monto: Number(f.monto), fecha: hoy() });
    setF({ tipo: "INGRESO", concepto: "", monto: "" }); refresh();
  };

  return (
    <>
      <div className="hdr">
        <div className="row"><div><div className="hi">Contabilidad</div><div className="name">Ingresos y gastos</div></div></div>
        <div className="hero-metrics">
          <div className="metric"><div className="lbl">Ingresos</div><div className="val">{money(ingresos)}</div></div>
          <div className="metric"><div className="lbl">Gastos</div><div className="val">{money(gastos)}</div></div>
          <div className="metric"><div className="lbl">Balance</div><div className="val">{money(balance)}</div></div>
        </div>
      </div>
      <div className="scroll">
        <div className="card pad addbox">
          <div className="banner-t">Nuevo movimiento</div>
          <div className="seg2">
            <button className={f.tipo === "INGRESO" ? "on" : ""} onClick={() => setF({ ...f, tipo: "INGRESO" })}>Ingreso</button>
            <button className={f.tipo === "GASTO" ? "on gasto" : ""} onClick={() => setF({ ...f, tipo: "GASTO" })}>Gasto</button>
          </div>
          <input className="inp" placeholder="Concepto" value={f.concepto} onChange={(e) => setF({ ...f, concepto: e.target.value })} />
          <input className="inp" inputMode="decimal" placeholder="Monto" value={f.monto} onChange={(e) => setF({ ...f, monto: e.target.value })} />
          <button className="btn primary" onClick={agregar}>Agregar</button>
        </div>

        <div className="eyebrow">Movimientos</div>
        <div className="card">
          {movimientos.map((m) => (
            <div className="list-item" key={m.id}>
              <div className={"ic soft " + (m.tipo === "INGRESO" ? "ok" : "bad")}>{m.tipo === "INGRESO" ? "+" : "–"}</div>
              <div className="li-main"><div className="t">{m.concepto}</div><div className="d">{m.fecha}</div></div>
              <div className={"li-amt " + (m.tipo === "INGRESO" ? "pos" : "neg")}>{m.tipo === "INGRESO" ? "+" : "–"}{money(m.monto)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
