import { Consulta } from "../models/Conslta.js";
import { Medico } from "../models/Medico.js";

export async function getConsultas(req, res) {
  try {
    const consultas = await Consulta.findAll({
      atributes: ['id_consulta', 'id_especialista', 'id_paciente', 'hora_atencion', 'hora_reserva', 'puntuacion'],
    });
    res.json(consultas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createConsulta(req, res) {
  const { id_consulta, id_especialista, id_paciente, hora_atencion, hora_reserva, puntuacion } = req.body;
  try {
    let newConsulta = await Consulta.create(
      {
        id_consulta,
        id_especialista,
        id_paciente,
        hora_atencion,
        hora_reserva,
        puntuacion
      },
      {
        fields: ['id_consulta', 'id_especialista', 'id_paciente', 'hora_atencion', 'hora_reserva', 'puntuacion'],
      }
    );
    return res.json(newConsulta);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

export async function getConsulta(req, res) {
  const { id } = req.params;
  try {
    const consulta = await Consulta.findOne({
      where: {
        id,
      },
    });
    res.json(consulta);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { diagnostico } = req.body;

    const consulta = await Consulta.findByPk(id);
    consulta.description = description;
    await consulta.save();

    res.json(consulta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteConsulta(req, res) {
  const { id_consulta } = req.params;
  try {
    await Consulta.destroy({
      where: {
        consultaId: id_consulta,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

