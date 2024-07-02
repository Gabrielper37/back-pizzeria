const mysql = require('mysql2')   // module de mysql2
const connection = mysql.createConnection({ // definimos la base y su login 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tpopizza'

})

connection.connect((err) => {       // hacemos la conexion
    if (err) {
        console.log('Error en la conexion de la base de datos: ', err)
        return
    }

    console.log('Conectado con la base de datos.')
})

module.exports = connection