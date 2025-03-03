const mysql = require("mysql");
const { database } = require("./keys");

const connection = mysql.createConnection(database);

connection.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos: ", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
    connection.end(); // Asegúrate de cerrar la conexión después de probarla
});
