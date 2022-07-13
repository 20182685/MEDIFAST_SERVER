import { INTEGER } from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Medico = sequelize.define(
  "medicos",
  {
    id_especialista: {
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

    tipo_atencion: {
        type: DataTypes.STRING,
    },

    precio: {
        type: DataTypes.INTEGER,
    },

    ubicacion_consulta: {
        type: DataTypes.STRING,
    },

    precio: {
        type: DataTypes.INTEGER,
    },
    
    puntuacion: {
        type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);