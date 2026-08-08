import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CUENTAS = [
  { t: "Administración", email: "admin@fisiowell.com" },
  { t: "Trabajador", email: "lucia@fisiowell.com" },
  { t: "Contabilidad", email: "conta@fisiowell.com" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function entrar(e) {
    e.preventDefault();
    setError("");
    try { login(email, password); navigate("/"); }
    catch { setError("Correo o contraseña incorrectos"); }
  }
  const rellenar = (correo) => { setEmail(correo); setPassword("123456"); };

  return (
    <div className="login">
      <div className="brandmark"><img src="/logo.jpg" alt="Fisiowell Training" /></div>
      <p>Control de pacientes y de tu negocio, en un solo lugar.</p>
      <form onSubmit={entrar} className="login-form">
        <input className="inp" type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="inp" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="login-error">{error}</div>}
        <button className="btn primary">Entrar</button>
      </form>
      <div className="login-hint">
        <span>Cuentas de prueba:</span>
        {CUENTAS.map((c) => <button type="button" key={c.email} onClick={() => rellenar(c.email)}>{c.t}</button>)}
      </div>
    </div>
  );
}
