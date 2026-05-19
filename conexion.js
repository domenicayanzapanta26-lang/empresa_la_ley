const mysql = require("mysql2");

const conexion = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "123456",
    database: "inventario_tecnologico"

});

conexion.connect(err => {

    if(err){
        console.log(err);
    }else{
        console.log("MySQL conectado");
    }

});

module.exports = conexion;