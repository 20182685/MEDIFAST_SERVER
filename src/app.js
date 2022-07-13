import express from "express";
import pacienteRoutes from "./routes/paciente.routes.js";
import medicoRoutes from "./routes/medico.routes.js";
import consultaRoutes from "./routes/consulta.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(pacienteRoutes);
app.use(medicoRoutes);
app.use(consultaRoutes);

export default app;