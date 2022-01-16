const express = require('express');
const router = express.Router();
const mysql = require('../database');

router.get("/api/servicios", (req, res) => {
  mysql.query("SELECT * FROM servicios", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

router.get("/api/servicios/id/:id", (req, res) => {
  mysql.query(
    `SELECT * FROM servicios WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({error: `El servicio con id ${id} no está registrdo en la base de datos`})

        console.log(err);
      }
    }
  );
});

router.get("/api/servicios/identificador/:identificador", (req, res) => {
  mysql.query(
    `SELECT * FROM servicios WHERE identificador = ${req.params.identificador}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({error: `El servicio ${identificador} no está registrdo en la base de datos`})
        console.log(err);
      }
    }
  );
});

router.get("/api/servicios/tipo/:tipo", (req, res) => {
  mysql.query(
    `SELECT * FROM servicios WHERE tipo = "${req.params.tipo}"`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/api/servicios", (req, res) => {
  const { identificador, tipo, descripcion, precio } = req.body;

  const query = `CALL crearEditarServicio(?,?,?,?,?)`;
  mysql.query(
    query,
    [0, identificador, tipo, descripcion, precio],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Servicio guardado" });
      } else {
        res.status(500).json({ error: err.message });
        console.error(err);
      }
    }
  );
});

router.put("/api/servicios/id/:id", (req, res) => {
  const { identificador, tipo, descripcion, precio } = req.body;
  const id = req.params.id;

  const query = `CALL crearEditarServicio(?,?,?,?,?)`;
  mysql.query(
    query,
    [id, identificador, tipo, descripcion, precio],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: `Servicio con id ${id} actualizado` });
      } else {
        res.status(500).json({ error: err.message });
        console.error(err);
      }
    }
  );
});

router.put("/api/servicios/identificador/:identificador", (req, res) => {
  const { tipo, descripcion, precio } = req.body;
  const identificador = req.params.identificador;

  const query = `	UPDATE servicios SET tipo = ${tipo}, descripcion = ${descripcion}, precio = ${precio}	WHERE identificador = ${identificador};`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Servicio ${identificador} actualizado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/servicios/id/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM servicios WHERE id = ${id}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Servicio con id ${id} eliminado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/servicios/identificador/:identificador", (req, res) => {
  const identificador = req.params.identificador;

  const query = `DELETE FROM servicios WHERE identificador = ${identificador}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: `Servicio con identificador ${identificador} eliminado`,
      });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

module.exports = router;
