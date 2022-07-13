const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//---------------------QUERYS BASE---------------------
//------------------QUERYS TABLA CITAS-----------------
//CREAR CITA
app.post("/citas", async (req, res) => {
  try {
    const { id_cit, id_med, id_pac, fecha, hora, diagnostico } = req.body;
    const newCita = await pool.query("INSERT INTO citas (id_cit, id_med, id_pac, fecha, hora, diagnostico) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [id_cit, id_med, id_pac, fecha, hora, diagnostico]);
    res.json(newCita.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR TODAS LAS CITAS
app.get("/citas", async (req, res) => {
  try {
    const allCitas = await pool.query("SELECT * FROM citas");
    res.json(allCitas.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR CITA POR ID_CITA
app.get("/citas/:id_cit", async (req, res) => {
  try {
    const { id_cit } = req.params;
    const cita = await pool.query("SELECT * FROM citas WHERE id_cit = $1", [id_cit]);
    res.json(cita.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//ACTUALIZAR CITA (SOLO FECHA Y HORA)
app.put("/citas/:id_cit", async (req, res) => {
  try {
    const { id_cit } = req.params;
    const { fecha, hora } = req.body;
    const udpdateCita = await pool.query("UPDATE citas SET fecha = $2, hora = $3 WHERE id_cit = $1", [id_cit, fecha, hora]);
    res.json("Cita actualiza!");

  } catch (error) {
    console.error(error.message);
  }
});

//ACTUALIZAR CITA (SOLO DIAGNÓSTICO)
app.put("/citas1/:id_cit", async (req, res) => {
  try {
    const { id_cit } = req.params;
    const { diagnostico } = req.body;
    const udpdateCita1 = await pool.query("UPDATE citas SET diagnostico = $2 WHERE id_cit = $1", [id_cit, diagnostico]);
    res.json("Cita actualiza!");

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR CITA (SOLO DIAGNÓSTICO)
app.get("/citas2/:id_cit", async (req, res) => {
  try {
    const { id_cit } = req.params;
    const getDiagnosticoPorCita = await pool.query("SELECT DIAGNOSTICO FROM citas WHERE id_cit = $1", [id_cit]);
    res.json(getDiagnosticoPorCita.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//-----------------QUERYS TABLA RECETAS----------------
//CREAR RECETA
app.post("/recetas", async (req, res) => {
  try {
    const { id_rec, id_cit, medicamento, cantidad, frecuencia, duracion } = req.body;
    const newReceta = await pool.query("INSERT INTO recetas (id_rec, id_cit, medicamento, cantidad, frecuencia, duracion) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [id_rec, id_cit, medicamento, cantidad, frecuencia, duracion]);
    res.json(newReceta.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR TODAS LAS RECETAS
app.get("/recetas", async (req, res) => {
  try {
    const allRecetas = await pool.query("SELECT * FROM recetas");
    res.json(allRecetas.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR RECETA POR ID_CITA
app.get("/recetas/:id_cit", async (req, res) => {
  try {
    const { id_cit } = req.params;
    const recetaPorCita = await pool.query("SELECT * FROM recetas WHERE id_cit = $1", [id_cit]);
    res.json(recetaPorCita.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//ELIMINAR RECETA POR ID_REC
app.delete("/recetas/:id_rec", async (req, res) => {
  try {
    const { id_rec } = req.params;
    const deleteReceta = await pool.query("DELETE FROM recetas WHERE id_rec= $1", [id_rec]);
    res.json("Receta eliminada!");

  } catch (error) {
    console.error(error.message);
  }
});

//--------------QUERYS TABLA COMENTARIOS---------------
//CREAR COMENTARIO
app.post("/comentarios", async (req, res) => {
  try {
    const { id_com, id_med, id_pac, calificacion, comentario, fecha } = req.body;
    const newComentario = await pool.query("INSERT INTO comentarios (id_com, id_med, id_pac, calificacion, comentario, fecha) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [id_com, id_med, id_pac, calificacion, comentario, fecha]);
    res.json(newComentario.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR TODAS LOS COMENTARIOS
app.get("/comentarios", async (req, res) => {
  try {
    const allComentarios = await pool.query("SELECT * FROM comentarios");
    res.json(allComentarios.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR COMENTARIO POR ID_COM
app.get("/comentarios/:id_com", async (req, res) => {
  try {
    const { id_com } = req.params;
    const comentario = await pool.query("SELECT * FROM comentarios WHERE id_com = $1", [id_com]);
    res.json(comentario.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//ACTUALIZAR COMENTARIO
app.put("/comentarios/:id_com", async (req, res) => {
  try {
    const { id_com } = req.params;
    const { calificacion, comentario, fecha } = req.body;
    const udpdateComentario = await pool.query("UPDATE comentarios SET calificacion = $2, comentario = $3,  fecha = $4 WHERE id_com = $1", [id_com, calificacion, comentario, fecha]);
    res.json("Comentario Actualizado!");

  } catch (error) {
    console.error(error.message);
  }
});

//----------------QUERYS TABLA MEDICOS-----------------
//CREAR MEDICO
app.post("/medicos", async (req, res) => {
  try {
    const { id_med, nombre, apellido, cmp, especialidad, email, telefono, web, ubicacion } = req.body;
    const newMedico = await pool.query("INSERT INTO medicos (id_med, nombre, apellido, cmp, especialidad, email, telefono, web, ubicacion) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [id_med, nombre, apellido, cmp, especialidad, email, telefono, web, ubicacion]);
    res.json(newMedico.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR TODOS LOS MEDICOS
app.get("/medicos", async (req, res) => {
  try {
    const allMedicos = await pool.query("SELECT * FROM medicos");
    res.json(allMedicos.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR MEDICO POR ID_MED
app.get("/medicos/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const medico = await pool.query("SELECT * FROM medicos WHERE id_med = $1", [id_med]);
    res.json(medico.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//---------------QUERYS TABLA PACIENTES----------------
//CREAR PACIENTE
app.post("/pacientes", async (req, res) => {
  try {
    const { id_pac, nombre, apellido, nacimiento, edad, genero, grupo_sanguineo, direccion, telefono, email } = req.body;
    const newPaciente = await pool.query("INSERT INTO pacientes (id_pac, nombre, apellido, nacimiento, edad, genero, grupo_sanguineo, direccion, telefono, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [id_pac, nombre, apellido, nacimiento, edad, genero, grupo_sanguineo, direccion, telefono, email]);
    res.json(newPaciente.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR TODOS LOS PACIENTES
app.get("/pacientes", async (req, res) => {
  try {
    const allPacientes = await pool.query("SELECT * FROM pacientes");
    res.json(allPacientes.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR PACIENTE POR ID_PAC
app.get("/pacientes/:id_pac", async (req, res) => {
  try {
    const { id_pac } = req.params;
    const paciente = await pool.query("SELECT * FROM pacientes WHERE id_pac = $1", [id_pac]);
    res.json(paciente.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
});

//-----------------QUERYS CASO NEGOCIO-----------------
//SELECCIONAR CITAS POR MEDICO
app.get("/citasPorMedico/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const citasPorMedico = await pool.query("SELECT CITAS.ID_CIT, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, PACIENTES.EDAD, PACIENTES.GENERO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.HORA FROM CITAS JOIN PACIENTES ON CITAS.ID_PAC = PACIENTES.ID_PAC JOIN MEDICOS ON CITAS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = $1", [id_med]);
    res.json(citasPorMedico.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR CITAS POR MEDICO Y PROXIMIDAD DE FECHA Y HORA
app.get("/citasPorMedicoYCercania/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const citasPorMedicoYCercania = await pool.query("SELECT CITAS.ID_CIT, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, PACIENTES.EDAD, PACIENTES.GENERO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.HORA FROM CITAS JOIN PACIENTES ON CITAS.ID_PAC = PACIENTES.ID_PAC JOIN MEDICOS ON CITAS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = $1 ORDER BY CITAS.FECHA ASC, CITAS.HORA ASC", [id_med]);
    res.json(citasPorMedicoYCercania.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR CITAS POR MEDICO Y LEJANÍA DE FECHA Y HORA
app.get("/citasPorMedicoYLejania/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const citasPorMedicoYLejania = await pool.query("SELECT CITAS.ID_CIT, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, PACIENTES.EDAD, PACIENTES.GENERO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.HORA FROM CITAS JOIN PACIENTES ON CITAS.ID_PAC = PACIENTES.ID_PAC JOIN MEDICOS ON CITAS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = $1 ORDER BY CITAS.FECHA DESC, CITAS.HORA DESC", [id_med]);
    res.json(citasPorMedicoYLejania.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR CITAS POR PACIENTE
app.get("/citasPorPaciente/:id_pac", async (req, res) => {
  try {
    const { id_pac } = req.params;
    const citasPorPaciente = await pool.query("SELECT CITAS.ID_CIT, MEDICOS.NOMBRE, MEDICOS.APELLIDO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.DIAGNOSTICO FROM CITAS JOIN MEDICOS ON CITAS.ID_MED = MEDICOS.ID_MED JOIN PACIENTES ON CITAS.ID_PAC = PACIENTES.ID_PAC AND PACIENTES.ID_PAC = $1", [id_pac]);
    res.json(citasPorPaciente.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR COMENTARIOS POR MEDICO
app.get("/comentariosPorMedico/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const comentariosPorMedico = await pool.query("SELECT COMENTARIOS.ID_COM, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, COMENTARIOS.CALIFICACION, COMENTARIOS.COMENTARIO, COMENTARIOS.FECHA FROM COMENTARIOS JOIN PACIENTES ON COMENTARIOS.ID_PAC = PACIENTES.ID_PAC JOIN MEDICOS ON COMENTARIOS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = $1", [id_med]);
    res.json(comentariosPorMedico.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR COMENTARIOS POR CALIFICACIÓN MÁS ALTA
app.get("/comentariosPorMedicoAlta/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const comentariosPorMedico = await pool.query("SELECT COMENTARIOS.ID_COM, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, COMENTARIOS.CALIFICACION, COMENTARIOS.COMENTARIO, COMENTARIOS.FECHA FROM COMENTARIOS JOIN PACIENTES ON COMENTARIOS.ID_PAC = PACIENTES.ID_PAC JOIN MEDICOS ON COMENTARIOS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = $1 ORDER BY COMENTARIOS.CALIFICACION DESC", [id_med]);
    res.json(comentariosPorMedico.rows);

  } catch (error) {
    console.error(error.message);
  }
});

//SELECCIONAR COMENTARIOS POR CALIFICACIÓN MÁS BAJA
app.get("/comentariosPorMedicoBaja/:id_med", async (req, res) => {
  try {
    const { id_med } = req.params;
    const comentariosPorMedico = await pool.query("SELECT COMENTARIOS.ID_COM, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, COMENTARIOS.CALIFICACION, COMENTARIOS.COMENTARIO, COMENTARIOS.FECHA FROM COMENTARIOS JOIN PACIENTES ON COMENTARIOS.ID_PAC = PACIENTES.ID_PAC JOIN MEDICOS ON COMENTARIOS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = $1 ORDER BY COMENTARIOS.CALIFICACION ASC", [id_med]);
    res.json(comentariosPorMedico.rows);

  } catch (error) {
    console.error(error.message);
  }
});

const server = app.listen(5000, () => {
  console.log("El servidor de datos se ha iniciado en el puerto 5000.")
});

//----------------------MESSAGING----------------------
io = socket(server, {
  cors:{
      origin: 'http://localhost:3000',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
      withCredentials: true
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});