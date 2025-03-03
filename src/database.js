const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

// Creamos la conexión a la base de datos
const pool = mysql.createPool(database);

// Errores de conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar con la base de datos: ', err);

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión a la base de datos fue cerrada');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conexiones');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('La conexión a la base de datos fue rechazada');
        }

        return; // Salir si hay un error
    }

    // Si la conexión fue exitosa, liberamos la conexión y mostramos un mensaje
    if (connection) connection.release();
    console.log('La base de datos está conectada');
});

// Promisificar la consulta para usarla de forma asíncrona
pool.query = promisify(pool.query);

// Exportamos la conexión
module.exports = pool;
