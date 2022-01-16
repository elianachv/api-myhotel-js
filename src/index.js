const express = require('express');
const app = express();


//Configuraciones
app.set('port', process.env.PORT || 3001);

//Middleware
app.use(express.json());

//Rutas
app.use(require('./routes/servicios'));
app.use(require('./routes/clientes'));
app.use(require('./routes/grupos'));
app.use(require('./routes/registros'));
app.use(require('./routes/ingresos'));


//Inicia servidor
app.listen(app.get('port'), () =>
  console.log('Servidor levantado en el puerto ' + app.get('port'))
);
