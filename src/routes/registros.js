const express = require("express");
const router = express.Router();
const mysql = require("../database");

router.get("/api/registros", (req, res) => {
  mysql.query("SELECT * FROM registros", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

router.get("/api/registros/id/:id", (req, res) => {
  mysql.query(
    `SELECT * FROM registros WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({
          error: `El registro con id ${id} no está registrado en la base de datos`,
        });

        console.log(err);
      }
    }
  );
});

router.get("/api/registros/cliente/:cedula", (req, res) => {
  mysql.query(
    `SELECT * FROM registros WHERE cedula = ${req.params.cedula}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        res.status(400).json({
          error: `El cliente con id ${id} no ha realizado ningun consumo`,
        });

        console.log(err);
      }
    }
  );
});

router.get("/api/registros/servicio/:id_servicio", (req, res) => {
  mysql.query(
    `SELECT * FROM registros WHERE servicio = ${req.params.id_servicio}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        res.status(400).json({
          error: `No hay registros asociados al servicio ${id_servicio} o el servicio no existe en la base de datos.`,
        });

        console.log(err);
      }
    }
  );
});

router.post("/api/registros", (req, res) => {
  const { id_ingreso, fecha, cedula, servicio } = req.body;

  const query = `INSERT INTO registros (id_ingreso,fecha,cedula,servicio) VALUES (${id_ingreso},${fecha},${cedula},${servicio});`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Registro guardado", id: rows });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.put("/api/registros/id/:id", (req, res) => {
    const { id_ingreso, fecha, cedula, servicio } = req.body;
    const id = req.params.id;

  const query = `UPDATE registros SET  id_ingreso = ${id_ingreso}, fecha = ${fecha}, cedula = ${cedula}, servicio = ${servicio} WHERE id = ${id};`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Registro guardado" });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/registros/id/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM registros WHERE id = ${id}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Registro con id ${id} eliminado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

module.exports = router;
