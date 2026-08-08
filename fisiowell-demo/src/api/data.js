// Datos de ejemplo en memoria (se reinician al recargar la página).
export const hoy = () => new Date().toISOString().slice(0, 10);

export const usuarios = [
  { id: 1, nombre: "David Fisiowell", email: "admin@fisiowell.com", rol: "ADMIN", password: "123456" },
  { id: 2, nombre: "Lucía Terapeuta", email: "lucia@fisiowell.com", rol: "TRABAJADOR", password: "123456" },
  { id: 3, nombre: "Marco Fisio", email: "marco@fisiowell.com", rol: "TRABAJADOR", password: "123456" },
  { id: 4, nombre: "Sofía Contable", email: "conta@fisiowell.com", rol: "CONTABILIDAD", password: "123456" },
];

export let servicios = [
  { id: 1, nombre: "Masaje terapéutico", precio: 25, activo: true },
  { id: 2, nombre: "Tratamiento de loción", precio: 20, activo: true },
  { id: 3, nombre: "Terapia preventiva", precio: 30, activo: true },
  { id: 4, nombre: "Terapia preparativa", precio: 35, activo: true },
  { id: 5, nombre: "Rehabilitación deportiva", precio: 40, activo: false },
];

export let pacientes = [
  { id: 1, cedula: "1712345678", nombre: "Ana Morales", telefono: "0991112233", resumen: "Dolor lumbar por mala postura. Enfocar en zona baja de la espalda y estiramientos suaves." },
  { id: 2, cedula: "1723456789", nombre: "Carlos Vera", telefono: "0987654321", resumen: "Recuperación post-esguince de tobillo derecho. Evitar carga excesiva, trabajar movilidad." },
  { id: 3, cedula: "1734567890", nombre: "Beatriz Luna", telefono: "0995556677", resumen: "Tensión cervical y estrés. Masaje descontracturante en cuello y hombros." },
  { id: 4, cedula: "1745678901", nombre: "Diego Salas", telefono: "0981234567", resumen: "Preparación física pre-maratón. Fortalecer piernas y prevenir lesiones." },
];

export let citas = [
  { id: 1, pacienteId: 1, servicioId: 1, fecha: hoy(), hora: "09:00", estado: "AGENDADO", trabajadorId: 2 },
  { id: 2, pacienteId: 2, servicioId: 3, fecha: hoy(), hora: "10:30", estado: "AGENDADO", trabajadorId: 3 },
  { id: 3, pacienteId: 3, servicioId: 2, fecha: hoy(), hora: "12:00", estado: "MODIFICADO", trabajadorId: 2 },
  { id: 4, pacienteId: 4, servicioId: 4, fecha: hoy(), hora: "15:00", estado: "CANCELADO", trabajadorId: 3 },
];

export let pagos = [
  { id: 1, pacienteId: 1, servicioId: 1, monto: 25, fecha: hoy(), metodo: "Efectivo" },
  { id: 2, pacienteId: 3, servicioId: 2, monto: 20, fecha: hoy(), metodo: "Transferencia" },
];

export let movimientos = [
  { id: 1, tipo: "INGRESO", concepto: "Sesiones del día", monto: 45, fecha: hoy() },
  { id: 2, tipo: "GASTO", concepto: "Insumos (aceites, cremas)", monto: 18, fecha: hoy() },
  { id: 3, tipo: "GASTO", concepto: "Servicios básicos", monto: 30, fecha: hoy() },
];

export const ESTADOS = ["AGENDADO", "MODIFICADO", "CANCELADO", "ATENDIDO", "NO_ASISTIO"];
export let seq = 1000;
export const nextId = () => ++seq;
