const mysql = require('mysql2');
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BaseDeDatos2022',
  database: 'bdMyHotel',
  port     : '3306',
  insecureAuth : true

});

conexion.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Base de datos conectada con exito");
  }
});

module.exports = conexion;