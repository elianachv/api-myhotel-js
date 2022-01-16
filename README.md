<a id="top"></a>

# Construcción de API REST de un hotel

Para revisar la misma aplicación pero desarrollada con Backend Java haga clic [aquí]()

## Índice
1. [Descripción](#descripcion)
2. [Tecnologías y aplicaciones utilizadas](#tecnologias)
3. [Estructura del proyecto](#estructura)
 * [Base de datos](#bd)
   * [Servicios](#bd-servicios)
   * [Clientes](#bd-clientes)
   * [Grupos](#bd-grupos)
   * [Registros](#bd-registros)
   * [Ingresos](#bd-ingresos)
 * [API](#api)
   * [Servicios](#api-servicios)
   * [Clientes](#api-clientes)
   * [Grupos](#api-grupos)
   * [Registros](#api-registros)
   * [Ingresos](#api-ingresos)
4. [Despliegue](#despliegue)
5. [Pruebas](#pruebas)
6. [Contacto](#contacto)



<a id="descripcion"></a>
## Descripción
MVP de la API de un hotel que permite:
1. Conocer la fecha de ingreso y acompañantes de los clientes
2. Conocer los servicios consumidos dentro del hotel por cada cliente
3. Calcular el valor total a pagar al momento del checkout

<a id="tecnologias"></a>
## Tecnologías y aplicaciones utilizadas

* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [Node Js](https://nodejs.org/es/)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)
* [MySQL Workbench](https://dev.mysql.com/downloads/mysql/)
* [Postman](https://www.postman.com/)
* [Heroku](https://www.heroku.com/)

<a id="estructura"></a>
## Estructura del proyecto

<a id="bd"></a>
### Base de datos
La base de datos se encuentra diseñada de la siguiente manera

<a id="bd-clientes"></a>  
**Clientes:** Tabla en la que se almacena la información personal de los clientes  

| Campo | Descripción | Notas |  
|--|--|--|  
|id| Identificador único | Llave primaria, autoincremental|  
|cedula| Número de identificación |único|  
|nombre| Nombre del cliente |-|  
|correo| correo del cliente  |-|  
|telefono| Teléfono del cliente  |-|

<a id="bd-grupos"></a>  
**Grupos:** Tabla en la que se almacena la información sobre los grupos, número para agrupar a personas que se registren juntas. La idea es que si viene un grupo de personas se cree un grupo en la base de datos y posteriormente este sea asignado a todos los clientes que se registren juntos.

| Campo | Descripción | Notas |  
|--|--|--|  
|id| Identificador único | Llave primaria, autoincremental|  
|total_integrantes| Cantidad total de personas registradas con el identificador |-|

<a id="bd-servicios"></a>  
**Servicios:** Tabla en la que se almacena la información sobre los servicios que ofrece el hotel

| Campo | Descripción | Notas |  
|--|--|--|  
|id| Identificador único | Llave primaria, autoincremental|  
|identificador| Combinación de letras alusivas, identificador alfanumérico |único|  
|descripción| Breve explicación del servicio |Máximo 70 caracteres|  
|precio| Cuanto se cobrará por el servicio  |-|

<a id="bd-ingresos"></a>  
**Ingresos:** Tabla en la que se almacena la información sobre las personas que se registran en el hotel. Se hizo de manera separada porque un cliente puede ingresar varias veces al hotel.  

| Campo | Descripción | Notas |  
|--|--|--|  
|id| Identificador único | Llave primaria, autoincremental|  
|id_grupo| Identificador del grupo con el que viene |-|  
|cedula| Cedula del cliente |Debe estar previamente registrado en la tabla clientes|  
|fecha_ingreso| Fecha de ingreso al hotel  |-|  
|fecha_salida| Fecha de salida del hotel  |-|  
|total_consumo| Total a pagar una vez finalizada la estadía  |-|

<a id="bd-registros"></a>  
**Registros:** Tabla en la que se almacena la información sobre el consumo de servicios por parte los clientes ingresados.  

| Campo | Descripción | Notas |  
|--|--|--|  
|id| Identificador único | Llave primaria, autoincremental|  
|fecha| Fecha en la que se toma el servicio |-|  
|cedula| Cedula del cliente |Debe estar previamente registrado en la tabla clientes|  
|servicio| Identificador del servicio |Debe coincidir con algún servicio de la tabla servicios|

A continuación una imagen del modelo:

![modelo](https://github.com/elianachv/api-myhotel/blob/main/bd/modeloBd.png?raw=true)

En la carpeta bd puede encontrar el script sql para configurar la base de datos  

<a id="api"></a>
### API

<a id="api-servicios"></a>  
**Servicios**  

| Método | Url  |  Descripción |   
|--|--|--|  
|POST| /api/servicios  | Agrega otro servicio a la tabla servicios|  
| GET | /api/servicios  | Obtienes todos los servicios ofrecidos por el hotel|  
| GET | /api/servicios/tipo/{tipo}| Obtienes todos los servicios clasificados por el tipo especificado|  
| GET | /api/servicios/id/{id}  | Obtiene el servicio que coincida con el id especificado|  
| PUT| /api/servicios/id/{id}  | Modifica el servicio identificado con el id especificado con los datos del servicio recibido en el body|  
| DELETE| /api/servicios/id/{id}  | Elimina el servicio identificado con el id especificado|  
| GET | /api/servicios/identificador/{identificador}  | Obtiene el servicio que coincida con el identificador especificado|  
PUT| /api/servicios/identificador/{identificador}  | Modifica el servicio identificado con el identificador especificado con los datos del servicio recibido en el body|  
| DELETE| /api/servicios/identificador/{identificador}  | Elimina el servicio identificado con el identificador especificado|

<a id="api-clientes"></a>  
**Clientes**  

| Método | Url  |  Descripción |   
|--|--|--|  
|POST| /api/clientes| Agrega otro cliente a la tabla clientes|  
| GET | /api/clientes| Obtienes todos los clientes registrados en el hotel|  
| GET | /api/clientes/id/{id}| Obtiene el cliente que coincide con el id especificado|  
| PUT| /api/cliente/id/{id}  | Modifica el cliente identificado con el id especificado con los datos del cliente recibido en el body|  
| GET | /api/clientes/checkout/id/{id}  | Obtiene un objeto con la cantidad total que debe pagar el cliente identificado con el id especificado hasta el momento, un mensaje y actualiza de manera automatica el campo total_consumo en el registro de la tabla de ingreso correspondiente|  
| DELETE| /api/clientes/id/{id}  | Elimina el cliente identificado con el id especificado|  
| GET | /api/clientes/cc/{cc}  | Obtiene el cliente que coincida con la cedula especificada|  
| GET | /api/clientes/checkout/cc/{cc}  | Obtiene un objeto con la cantidad total que debe pagar el cliente identificado con la cedula especificada hasta el momento, un mensaje y actualiza de manera automatica el campo total_consumo en el registro de la tabla de ingreso correspondiente|  
|PUT| /api/clientes/cc/{cc}  | Modifica el cliente identificado con la cedula especificada con los datos del cliente recibido en el body|  
| DELETE| /api/clientes/cc/{cc}  | Elimina el cliente identificado con la cedula especificada|

<a id="api-grupos"></a>  
**Grupos**  

| Método | Url  |  Descripción |   
|--|--|--|  
|POST| /api/grupos| Agrega otro grupo a la tabla grupos|  
| GET | /api/grupos| Obtienes todos los grupos registrados en el hotel|  
| GET | /api/grupos/id/{id}| Obtiene el grupo que coincide con el id especificado|  
| PUT| /api/grupos/id/{id}  | Modifica el grupo identificado con el id especificado con los datos del grupo recibido en el body|  
| DELETE| /api/grupos/id/{id}  | Elimina el grupo identificado con el id especificado|  

<a id="api-registros"></a>  
**Registros**  

| Método | Url  |  Descripción |   
|--|--|--|  
|POST| /api/registros| Agrega otro registro a la tabla registros|  
| GET | /api/registros| Obtienes todos los registros |  
| GET | /api/registros/id/{id}| Obtiene el registro que corresponde al id especificado|
| GET | /api/registros/cliente/{cc_cliente}| Obtiene todos los registros de un cliente|  
| GET | /api/registros/servicio/{servicio}| Obtiene todos los registros del identificador del servicio especificado|
| PUT| /api/registros/id/{id}  | Modifica el registro identificado con el id especificado con los datos del registro recibido en el body|  
| DELETE| /api/registros/id/{id}  | Elimina el registro identificado con el id especificado|  

<a id="api-ingresos"></a>  
**Ingresos**  

| Método | Url  |  Descripción |   
|--|--|--|  
|POST| /api/ingresos| Agrega otro ingreso a la tabla ingresos|  
| GET | /api/ingresos| Obtienes todos los ingresos|  
| GET | /api/ingresos/grupo/{grupo}| Obtiene todos los ingresos de un grupo, todas las personas que se registraron juntas|  
| GET| /api/ingresos/cc/{cc}  | Obtiene todos los ingresos de cliente|  
| GET| /api/ingresos/id/{id}  | Obtiene el registro identificado con el id especificado|  
| PUT| /api/ingresos/id/{id}  | Modifica el ingreso identificado con el id especificado con los datos del ingreso recibido en el body|  
| DELETE| /api/registros/id/{id}  | Elimina el registro identificado con el id especificado|  
| DELETE| /api/registros/cc/{cc}  | Elimina todos los ingresos de un cliente identificado con la cedula especificada|

<a id="despliegue"></a>
## Despliegue

### Local

Para levantar la aplicación

1. Descargue el proyecto y ábralo con su editor de texto preferido, se recomienda [vscode](https://code.visualstudio.com/)

2. Configure la base de datos en [MySQL Workbench](https://dev.mysql.com/downloads/mysql/) utilizando el documento sql que encontrará en la carpeta bd con el nombre *bdMyHotel.sql*. Adicionalmente debe crear los procesos almacenados utilizando el documento sql *rutinas.sql*

3. Cambie las credenciales correspondientes en el archivo app.properties

4. Levante el servidor ejecutando el comando
`npm run dev`

5. Utilizando un cliente http, se recomienda [Postman](https://www.postman.com/) realice las pruebas de la API

### En la nube
El proyecto se encuentra desplegado en Heroku:

La url para acceder y realizar pruebas en vivo con la api es [http://apimyhotel-env.eba-aeaeep3n.us-east-2.elasticbeanstalk.com/](http://apimyhotel-env.eba-aeaeep3n.us-east-2.elasticbeanstalk.com/api/servicios)**

****Sujeto a disponibilidad del servicio**

<a id="pruebas"></a>
## Pruebas

Para realizar las pruebas de la API se sugiere seguir el siguiente flujo
1. Crear un nuevo cliente o varios, especificando el body de la peticion POST (revisar el apartado [API](#api))
~~~
{
    "cedula": "1111111111",
    "nombre": "Pepito Perez",
    "correo": "pepito@test.com",
    "telefono": "3125697856"
}
~~~
2. Crear un nuevo grupo especificando la cantidad de clientes que van juntos
~~~
{
   "total_integrantes": 1,
}
~~~
3. Crear los ingresos correspondientes a los clientes, verificar el id del grupo creado en caso de no recordarlo con la peticion GET correspondiente
~~~
{
    "id_grupo":1,
    "cedula": "1111111111",
    "fecha_ingreso": "2022-01-15T07:37:36.476+00:00",
    "fecha_salida": "",
    "total_consumo": 0
}
~~~
4. Crear registros simulando la compra de servicios por parte de los clientes

   **Nota: Si no configuró la base de datos utilizando el sql especificado debe hacer el proceso de creacion de servicios**
~~~
{
    "id_ingreso":1,
    "cedula": "1111111111",
    "fecha": "2022-01-15T06:29:19.810+00:00",
    "servicio": "GYM"
}
~~~

5. Obtener el total a pagar por el usuario haciendo la peticion get checkout

**Puede continuar interactuando con todos los métodos especificados en el apartado [API](#api) en su máquina local o hacer las pruebas con el servidor en la nube****

****Sujeto a disponibilidad del servicio**

<a id="contacto"></a>
## Contacto
Cualquier duda comentario o sugerencia es bienvenido. Puede enviarme un email a elianachavezv@gmail.com

[Volver arriba](#top)