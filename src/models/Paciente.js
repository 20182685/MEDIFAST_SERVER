import { INTEGER } from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Paciente = sequelize.define(
  "pacientes",
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre_usuario: {
        type: DataTypes.STRING,
    },

    correo: {
      type: DataTypes.STRING,
    },

    contraseña: {
      type: DataTypes.STRING,
    },

    num_telef: {
      type: DataTypes.INTEGER,
    },

    especialidad: {
        type: DataTypes.STRING,
    },

  },
  {
    timestamps: false,
  }
);