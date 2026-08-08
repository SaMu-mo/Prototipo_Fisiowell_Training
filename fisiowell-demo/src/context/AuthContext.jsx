import { createContext, useContext, useState } from "react";
import { usuarios } from "../api/data";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const g = localStorage.getItem("fw_usuario");
    return g ? JSON.parse(g) : null;
  });

  function login(email, password) {
    const u = usuarios.find((x) => x.email === email && x.password === password);
    if (!u) throw new Error("Credenciales incorrectas");
    const pub = { id: u.id, nombre: u.nombre, email: u.email, rol: u.rol };
    localStorage.setItem("fw_usuario", JSON.stringify(pub));
    setUsuario(pub);
    return pub;
  }
  function logout() {
    localStorage.removeItem("fw_usuario");
    setUsuario(null);
  }
  return <AuthContext.Provider value={{ usuario, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
