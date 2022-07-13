//CITAS
{
    "id_cit": "0001",
    "id_med": "0001",
    "id_pac": "0001",
    "fecha": "01-01-2022",
    "hora": "09:00",
    "diagnostico": "Asma"
}

{
    "id_cit": "0002",
    "id_med": "0001",
    "id_pac": "0002",
    "fecha": "02-01-2022",
    "hora": "09:00",
    "diagnostico": "Cefalea"
}

{
    "id_cit": "0003",
    "id_med": "0002",
    "id_pac": "0001",
    "fecha": "03-01-2022",
    "hora": "10:00",
    "diagnostico": "Bronquitis"
}

{
    "id_cit": "0004",
    "id_med": "0002",
    "id_pac": "0002",
    "fecha": "04-01-2022",
    "hora": "10:00",
    "diagnostico": "Contracción Muscular"
}

{
    "id_cit": "0005",
    "id_med": "0002",
    "id_pac": "0002",
    "fecha": "05-01-2022",
    "hora": "11:00",
    "diagnostico": "Dolor Estomacal"
}

{
    "id_cit": "0006",
    "id_med": "0002",
    "id_pac": "0001",
    "fecha": "06-01-2022",
    "hora": "07:00",
    "diagnostico": "Dolor Muscular"
}

{
    "id_cit": "0007",
    "id_med": "0002",
    "id_pac": "0002",
    "fecha": "06-01-2022",
    "hora": "09:00",
    "diagnostico": "Dolor Estomacal"
}

//RECETAS
{
    "id_rec": "0001",
    "id_cit": "0001",
    "medicamento" : "Budesonida",
    "cantidad": "1",
    "frecuencia": "8",
    "duracion": "10"
}

{
    "id_rec": "0002",
    "id_cit": "0001",
    "medicamento" : "Salbutamol",
    "cantidad": "2",
    "frecuencia": "8",
    "duracion": "5"
}

{
    "id_rec": "0003",
    "id_cit": "0002",
    "medicamento" : "Paracetamol",
    "cantidad": "2",
    "frecuencia": "8",
    "duracion": "3"
}

{
    "id_rec": "0004",
    "id_cit": "0003",
    "medicamento" : "Salbutamol",
    "cantidad": "2",
    "frecuencia": "6",
    "duracion": "5"
}

{
    "id_rec": "0005",
    "id_cit": "0004",
    "medicamento" : "Clonazepam",
    "cantidad": "0.5",
    "frecuencia": "8",
    "duracion": "5"
}

{
    "id_rec": "0006",
    "id_cit": "0005",
    "medicamento" : "Buscapina",
    "cantidad": "1",
    "frecuencia": "24",
    "duracion": "2"
}

{
    "id_rec": "0007",
    "id_cit": "0006",
    "medicamento" : "Dolocordalan",
    "cantidad": "1",
    "frecuencia": "24",
    "duracion": "3"
}

{
    "id_rec": "0008",
    "id_cit": "0007",
    "medicamento" : "Buscapina",
    "cantidad": "1",
    "frecuencia": "24",
    "duracion": "2"
}

{
    "id_rec": "0009",
    "id_cit": "0007",
    "medicamento" : "Toban",
    "cantidad": "1",
    "frecuencia": "24",
    "duracion": "3"
}

//COMENTARIOS
{
    "id_com": "0001",
    "id_med": "0001",
    "id_pac": "0001",
    "calificacion": "4.5",
    "comentario": "Buenísima atención!",
    "fecha": "01-01-2022"
}

{
    "id_com": "0002",
    "id_med": "0001",
    "id_pac": "0002",
    "calificacion": "3.5",
    "comentario": "Muy Amable!",
    "fecha": "02-01-2022"
}

//MEDICOS
{
    "id_med": "0001",
    "nombre": "Shaun",
    "apellido": "Murphy",
    "cmp": "16271",
    "especialidad": "Cirujía",
    "email": "s.murphy@medifast.com",
    "telefono" : "+51 123456789",
    "web": "/Shaun.Murphy",
    "ubicacion": "California"
}

{
    "id_med": "0002",
    "nombre": "Aaron",
    "apellido": "Glassman",
    "cmp": "17851",
    "especialidad": "Cirujía",
    "email": "a.glassman@medifast.com",
    "telefono" : "+51 987456321",
    "web": "/Aaron.Glassman",
    "ubicacion": "California"
}

//PACIENTES
{
    "id_pac": "0001",
    "nombre": "Sebastian",
    "apellido": "Guevara",
    "nacimiento": "1995-05-24",
    "edad": "27",
    "genero": "Masculino",
    "grupo_sanguineo" : "RH+",
    "direccion": "Jr. Chincha 334 Urb. Mesa Redonda SMP",
    "telefono" : "+51 854123647",
    "email": "bastian_9097@hotmail.com"
}

{
    "id_pac": "0002",
    "nombre": "Rosario",
    "apellido": "Vásquez",
    "nacimiento": "1960-06-25",
    "edad": "62",
    "genero": "Femenino",
    "grupo_sanguineo" : "RH-",
    "direccion": "Jr. Chincha 334 Urb. Mesa Redonda SMP",
    "telefono" : "+51 564712354",
    "email": "doctoracharo@hotmail.com"
}

-----------------QUERYS CASO NEGOCIO-----------------
SELECCIONAR CITAS POR MEDICO

SELECT CITAS.ID_CIT, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EDAD, PACIENTES.GENERO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.HORA
FROM CITAS
JOIN PACIENTES
ON CITAS.ID_PAC = PACIENTES.ID_PAC
JOIN MEDICOS
ON CITAS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = '0002'
ORDER BY CITAS.FECHA, CITAS. HORA DESC;

SELECCIONAR CITAS POR MEDICO Y PROXIMIDAD DE FECHA Y HORA

SELECT CITAS.ID_CIT, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, PACIENTES.EDAD, PACIENTES.GENERO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.HORA
FROM CITAS
JOIN PACIENTES
ON CITAS.ID_PAC = PACIENTES.ID_PAC
JOIN MEDICOS
ON CITAS.ID_MED = MEDICOS.ID_MED
AND MEDICOS.ID_MED = '0002'
ORDER BY CITAS.FECHA DESC, CITAS.HORA ASC;

SELECCIONAR CITAS POR MEDICO Y LEJANÍA DE FECHA Y HORA

SELECT CITAS.ID_CIT, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, PACIENTES.EDAD, PACIENTES.GENERO, MEDICOS.ESPECIALIDAD, CITAS.FECHA, CITAS.HORA
FROM CITAS
JOIN PACIENTES
ON CITAS.ID_PAC = PACIENTES.ID_PAC
JOIN MEDICOS
ON CITAS.ID_MED = MEDICOS.ID_MED
AND MEDICOS.ID_MED = '0002'
ORDER BY CITAS.FECHA ASC, CITAS.HORA DESC;

SELECCIONAR CITAS POR PACIENTE

SELECT CITAS.ID_CIT, MEDICOS.NOMBRE, MEDICOS.APELLIDO, MEDICOS.ESPECIALIDAD, CITAS.FECHA
FROM CITAS
JOIN MEDICOS
ON CITAS.ID_MED = MEDICOS.ID_MED
JOIN PACIENTES
ON CITAS.ID_PAC = PACIENTES.ID_PAC AND PACIENTES.ID_PAC = '0001'
ORDER BY CITAS.FECHA DESC;

SELECCIONAR COMENTARIOS POR MEDICO

SELECT COMENTARIOS.ID_COM, PACIENTES.NOMBRE, PACIENTES.APELLIDO, PACIENTES.EMAIL, COMENTARIOS.CALIFICACION, COMENTARIOS.FECHA
FROM COMENTARIOS
JOIN PACIENTES
ON COMENTARIOS.ID_PAC = PACIENTES.ID_PAC
JOIN MEDICOS
ON COMENTARIOS.ID_MED = MEDICOS.ID_MED AND MEDICOS.ID_MED = '0001'
ORDER BY COMENTARIOS.CALIFICACION ASC;