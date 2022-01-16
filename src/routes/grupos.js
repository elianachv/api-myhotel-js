const express = require("express");
const router = express.Router();
const mysql = require("../database");

router.get("/api/grupos", (req, res) => {
  mysql.query("SELECT * FROM grupos", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

router.get("/api/grupos/id/:id", (req, res) => {
  mysql.query(
    `SELECT * FROM grupos WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({
          error: `El grupo con id ${id} no está registrado en la base de datos`,
        });

        console.log(err);
      }
    }
  );
});

router.post("/api/grupos", (req, res) => {
  const { total_integrantes } = req.body;

  const query = `INSERT INTO grupos (total_integrantes) VALUES (${total_integrantes});`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Grupo guardado", id: rows });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.put("/api/grupos/id/:id", (req, res) => {
  const { total_integrantes } = req.body;
  const id = req.params.id;

  const query = `	UPDATE grupos SET  total_integrantes = ${total_integrantes} WHERE id = ${id};`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Grupo guardado" });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/grupos/id/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM grupos WHERE id = ${id}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Grupo con id ${id} eliminado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

module.exports = router;
