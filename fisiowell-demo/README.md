# Fisiowell Training — Prototipo (React, sin backend)

Prototipo de la aplicación para el negocio de fisioterapia de David (Fisiowell Training).
Funciona con datos de ejemplo en memoria: no necesita backend ni base de datos.
Al recargar la página (F5), los datos vuelven a su estado inicial (es para mostrar/probar).

## Cómo usarlo

1. Abre esta carpeta en VS Code.
2. En la terminal:

   npm install
   npm run dev

3. Abre http://localhost:5173

## Entrar (clave 123456 para todos)

Usa los botones de la pantalla de inicio, o escribe el correo:
- admin@fisiowell.com   -> Administración (ve todo: pacientes, agenda, caja, cuentas, servicios)
- lucia@fisiowell.com   -> Trabajador (pacientes, agenda, caja)
- conta@fisiowell.com   -> Contabilidad (ingresos, gastos, caja)

## Qué incluye

- Pacientes: lista, ficha con cédula/teléfono, botón de WhatsApp y resumen clínico editable.
- Agenda: citas del consultorio con estado (agendado, modificado, cancelado, atendido, no asistió).
- Caja: registrar pagos y ver el cuadre del día.
- Contabilidad: ingresos, gastos y balance.
- Servicios (admin): crear, habilitar o deshabilitar; se refleja en agenda y caja.

## Publicar en Vercel

Sube esta carpeta a GitHub e impórtala en Vercel. Si queda dentro de otra carpeta,
en Vercel pon el "Root Directory" apuntando a esta carpeta. El archivo vercel.json ya
viene incluido para que las páginas no den error 404 al recargar.
