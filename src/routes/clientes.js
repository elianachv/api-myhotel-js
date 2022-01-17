const express = require("express");
const router = express.Router();
const mysql = require("../database");

function calcularTotalById(id, res) {
  let getCliente = `SELECT * FROM clientes WHERE id = ${id}`;
  let getIngreso = `SELECT * FROM ingresos  WHERE cedula = ? ORDER BY id DESC LIMIT 1`;
  let getRegistros = `SELECT * FROM registros WHERE cedula = ? and id_ingreso = ?`;
  let getServicio = `SELECT * FROM servicios WHERE identificador  = ?`;
  let setTotal = `UPDATE ingresos SET total_consumo = ? WHERE id = ?`;


  mysql.query(getCliente, (err, rows, fields) => {
    if (!err && rows.length !== 0) {
      let cedula = rows[0].cedula;
      mysql.query(getIngreso, [cedula], (err, rows, fields) => {
        if (!err && rows.length !== 0) {
          let total = 0;
          let id_ingreso = rows[0].id;

          mysql.query(
            getRegistros,
            [cedula, id_ingreso],
            (err, rows, fields) => {
              if (!err && rows.length !== 0) {
                let servicios = rows;
                for (let index = 0; index < rows.length; index++) {
                  const registro = rows[index];
                  mysql.query(
                    getServicio,
                    [registro.servicio],
                    (err, rows, fields) => {
                      if (!err) {
                        total += Number.parseInt(rows[0].precio);
                        if (index === servicios.length - 1) {
                          mysql.query(
                            setTotal,
                            [total, id_ingreso],
                            (err, rows, fields) => {
                              if (err) {
                                console.log(err);
                              }
                            }
                          );
                          res.json({
                            servicios: servicios,
                            total: total,
                            mensaje: `El cliente con CC ${cedula} debe pagar ${total}`,
                          });
                        }
                      } else {
                        console.error("Error en el calculo", err);
                      }
                    }
                  );
                }

                // mysql.query(`UPDATE ingresos SET total_consumo = ${total} WHERE id = ${id_ingreso}`,(err,rows,fields)=>{

                //   if(!err){
                //     res.json({total: total, mensaje: `El cliente con CC ${cedula} debe pagar ${total}`})

                //   }
                // })
              } else {
                res
                  .status(500)
                  .json({ error: "No fue posible calcular el checkout" });
              }
            }
          );
        } else {
          res.status(400).json({ error: "Cliente no ingresado" });
        }
      });
      console.log();
    } else {
      res.status(400).json({ error: "Cliente no registrado" });
    }
  });
}

function calcularTotalByCC(cc, res) {
  let getCliente = `SELECT * FROM clientes WHERE cedula = ${cc}`;
  let getIngreso = `SELECT * FROM ingresos  WHERE cedula = ? ORDER BY id DESC LIMIT 1`;
  let getRegistros = `SELECT * FROM registros WHERE cedula = ? and id_ingreso = ?`;
  let getServicio = `SELECT * FROM servicios WHERE identificador  = ?`;
  let setTotal = `UPDATE ingresos SET total_consumo = ? WHERE id = ?`;

  mysql.query(getCliente, (err, rows, fields) => {
    if (!err && rows.length !== 0) {
      let cedula = rows[0].cedula;
      mysql.query(getIngreso, [cedula], (err, rows, fields) => {
        if (!err && rows.length !== 0) {
          let total = 0;
          let id_ingreso = rows[0].id;

          mysql.query(
            getRegistros,
            [cedula, id_ingreso],
            (err, rows, fields) => {
              if (!err && rows.length !== 0) {
                let servicios = rows;
                for (let index = 0; index < rows.length; index++) {
                  const registro = rows[index];
                  mysql.query(
                    getServicio,
                    [registro.servicio],
                    (err, rows, fields) => {
                      if (!err) {
                        total += Number.parseInt(rows[0].precio);
                        if (index === servicios.length - 1) {
                          mysql.query(
                            setTotal,
                            [total, id_ingreso],
                            (err, rows, fields) => {
                              if (err) {
                                console.log(err);
                              }
                            }
                          );

                          res.json({
                            servicios: servicios,
                            total: total,
                            mensaje: `El cliente con CC ${cedula} debe pagar ${total}`,
                          });
                        }
                      } else {
                        console.error("Error en el calculo", err);
                      }
                    }
                  );
                }
              } else {
                res
                  .status(500)
                  .json({ error: "No fue posible calcular el checkout" });
              }
            }
          );
        } else {
          res.status(400).json({ error: "Cliente no ingresado" });
        }
      });
      console.log();
    } else {
      res.status(400).json({ error: "Cliente no registrado" });
    }
  });
}

router.get("/api/clientes", (req, res) => {
  mysql.query("SELECT * FROM clientes", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
});

router.get("/api/clientes/id/:id", (req, res) => {
  mysql.query(
    `SELECT * FROM clientes WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({
          error: `El cliente con id ${id} no está registrdo en la base de datos`,
        });

        console.log(err);
      }
    }
  );
});

router.get("/api/clientes/checkout/id/:id", (req, res) => {
  calcularTotalById(req.params.id, res);
});

router.get("/api/clientes/cc/:cedula", (req, res) => {
  mysql.query(
    `SELECT * FROM clientes WHERE cedula = ${req.params.cedula}`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json({
          error: `El cliente con CC ${cedula} no está registrado en la base de datos`,
        });
        console.log(err);
      }
    }
  );
});

router.get("/api/clientes/checkout/cc/:cedula", (req, res) => {
  calcularTotalByCC(req.params.cedula, res);
});

router.post("/api/clientes", (req, res) => {
  const { cedula, nombre, correo, telefono } = req.body;

  const query = `CALL crearEditarCliente(?,?,?,?,?)`;
  mysql.query(
    query,
    [0, cedula, nombre, correo, telefono],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Cliente guardado" });
      } else {
        res.status(500).json({ error: err.message });
        console.error(err);
      }
    }
  );
});

router.put("/api/clientes/id/:id", (req, res) => {
  const { cedula, nombre, correo, telefono } = req.body;
  const id = req.params.id;

  const query = `CALL crearEditarCliente(?,?,?,?,?)`;
  mysql.query(
    query,
    [id, cedula, nombre, correo, telefono],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Cliente guardado" });
      } else {
        res.status(500).json({ error: err.message });
        console.error(err);
      }
    }
  );
});

router.put("/api/clientes/cc/:cedula", (req, res) => {
  const { nombre, correo, telefono } = req.body;
  const cedula = req.params.cedula;

  const query = `	UPDATE clientes SET  nombre = ${nombre}, correo = ${correo}, telefono =  ${telefono} WHERE cedula = ${cedula};`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Cliente identificado con CC ${cedula} actualizado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/clientes/id/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM clientes WHERE id = ${id}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Cliente con id ${id} eliminado` });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

router.delete("/api/clientes/cc/:cedula", (req, res) => {
  const cedula = req.params.cedula;

  const query = `DELETE FROM clientes WHERE cedula = ${cedula}`;
  mysql.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: `Cliente con CC ${cedula} eliminado`,
      });
    } else {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  });
});

module.exports = router;
