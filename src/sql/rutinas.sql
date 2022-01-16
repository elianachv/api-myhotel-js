CREATE DEFINER=`root`@`localhost` PROCEDURE `crearEditarCliente`(
IN _id BIGINT,
IN _cedula VARCHAR(45),
IN _nombre VARCHAR(45),
IN _correo VARCHAR(45),
IN _telefono VARCHAR(45)
)
BEGIN
IF _id = 0 THEN
	INSERT INTO clientes (cedula, nombre, correo, telefono)
	VALUES (_cedula,_nombre,_correo,_telefono);
	SET _id = LAST_INSERT_ID();
ELSE
	UPDATE clientes
	SET
	cedula = _cedula,
    nombre = _nombre,
	correo = _correo,
	telefono = _telefono
	WHERE id = _id;
END IF;
SELECT _id AS id;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `crearEditarServicio`(
IN _id BIGINT,
IN _identificador VARCHAR(45),
IN _tipo VARCHAR(45),
IN _descripcion VARCHAR(70),
IN _precio BIGINT
)
BEGIN
IF _id = 0 THEN
	INSERT INTO servicios (identificador, tipo, descripcion, precio)
	VALUES (_identificador,_tipo,_descripcion,_precio);
	SET _id = LAST_INSERT_ID();
ELSE
	UPDATE servicios
	SET
	identificador = _identificador,
    tipo = _tipo,
	descripcion = _descripcion,
	precio = _precio
	WHERE id = _id;
END IF;
SELECT _id AS id;
END