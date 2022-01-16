const express = require("express");
const router = express.Router();
const mysql = require("../database");

router.get("/api/ingresos", (req, res) => {
  mysql.query("SELECT * FROM ingresos", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

router.get("/api/ingresos/id/:id", (req, res) => {
  mysql.query(
    `SELECT * FROM ingresos WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({
          error: `El ingreso con id ${id} no está registrado en la base de datos`,
        });

        console.log(err);
      }
    }
  );
});

router.get("/api/ingresos/cc/:cedula", (req, res) => {
  mysql.query(
    `SELECT * FROM ingresos WHERE cedula = ${req.params.cedula}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        res.status(400).json({
          error: `No hay ningun ingreso registrado del usuario identificado con CC ${cedula}`,
        });
        console.log(err);
      }
    }
  );
});

router.post("/api/ingresos", (req, res) => {
  const { id_grupo, cedula,fecha_ingreso, fecha_salida, total_consumo } = req.body;

  const query = `INSERT INTO ingresos (id_grupo,cedula,fecha_ingreso,fecha_salida,total_consumo) VALUES (${id_grupo},${cedula},${fecha_ingreso},${fecha_salida},${total_consumo});`;
  mysql.query(
    query,
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Ingreso guardado" });
      } else {
        res.status(500).json({ error: err.message });
        console.error(err);
      }
    }
  );
});

router.put("/api/ingresos/id/:id", (req, res) => {
  const { cedula, nombre, correo, telefono } = req.body;
  const id = req.params.id;

  const query = `CALL crearEditarCliente(?,?,?,?,?)`;
  mysql.query(
    query,
    [id, cedula, nombre, correo, telefono],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Ingreso guardado" });
      } else {
        res.status(500).json({ error: err.message });
        console.error(err);
      }
    }
  );
});

router.put("/api/ingresos/id/:id", (req, res) => {
  const { id_grupo,cedula,fecha_ingreso,fecha_salida } = req.body;
  const id = req.params.id;

  const query = `UPDATE registros SET  id_grupo = ${id_grupo}, cedula = ${cedula} ,fecha_ingreso = ${fecha_ingreso}, fecha_salida = ${fecha_salida}, total_consumo = ${total_consumo} WHERE id = ${id};`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Ingreso identificado con id ${id} actualizado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/ingresos/id/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM ingresos WHERE id = ${id}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Ingreso con id ${id} eliminado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/ingresos/cc/:cedula", (req, res) => {
  const cedula = req.params.cedula;

  const query = `DELETE FROM ingresos WHERE cedula = ${cedula}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: `Todos los ingresos del cliente identificado con con CC ${cedula} han sido eliminados`,
      });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

module.exports = router;