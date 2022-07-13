import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Medico } from "./Medico.js";
import { Paciente } from "./Paciente.js";

export const Project = sequelize.define(
  "projects",
  {
    id_consulta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    hora_atencion: {
      type: DataTypes.DATE,
    },

    hora_reserva: {
        type: DataTypes.DATE,
    },

    puntuacion: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Consulta.hasMany(Paciente, {
  foreignkey: "id_consulta",
  sourceKey: "id_paciente",
});
Paciente.belongsTo(Consulta, { foreignkey: "id_consulta", targetId: "id_paciente" });

Consulta.hasMany(Paciente, {
    foreignkey: "id_consulta",
    sourceKey: "id_medico",
  });
Medico.belongsTo(Consulta, { foreignkey: "id_consulta", targetId: "id_medico" });