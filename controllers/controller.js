const db = require('../db/db') // llamamos a db.js
const bcrypt = require('bcryptjs') // "Hasheador" para que nadie pueda ver la password
const jwt = require('jsonwebtoken') // generador de token para seguridad y manejar sesiones
const config = require('../config/config')
const { json } = require('express')

// no usamos req porque no lo necesita, podria usarse para ver reverificar privilegios de quien hace la peticion.
var usuarios = (req,res) =>{ 
    var sql = 'SELECT * from tpopizza.login'
    db.query(sql, (err,results) =>{
        if (err){
            console.log("Error en controller.js usuarios"+err)
            return
        }
        res.json(results)
    })
}

const registrarse = (req,res) =>{
    const user = req.body.Users             // informacion que se va a pedir del Front
    const password = req.body.Passwords
    const email = req.body.Email

    // Encriptar contraseña
    hashedPassword = bcrypt.hashSync(password, 8)
    console.log('Password encriptada: '+hashedPassword)
    // Encriptar contraseña
    const sql = 'INSERT INTO tpopizza.login (users, passwords, email) VALUES (?,?,?)' // ? son las variables

    db.query(sql, [user,hashedPassword,email],(err,results) =>{   // muy importante el orden de entrada de los datos
        if (err){
            console.log("Error en controller.js registrarse"+err)
            return
        }
        // console.log(results)
        if (results){ // si hay algo en results significa que el codigo funciono
            // con "id: results.insertId" averiguamos el id del usuario insertado para el token
            const token = jwt.sign({id: results.insertId}, config.secretKey, {expiresIn: config.tokenExpiresIn}) // generamos token registro
            res.send({Auth:true, token})
        } else {
            console.log("Error en controller.js registrarse if results")
        }
    })
}

const checkLogin = (req,res) =>{
    const user = req.body.Users         // pedimos usuario y contraseña
    const password = req.body.Passwords 
    // primero verificamos si el usuario existe
    const sql = 'SELECT Users FROM tpopizza.login WHERE Users = ?'
    db.query(sql,[user],(err,results) =>{   // preguntamos por el usuario si existe
        if (err){
            console.log("Error en controller.js checklogin busqueda user: "+err)
            return
        }
        if (results == ""){ // si esta vacio no encontro usuario.
            res.send("No existe ese usuario 1")
            return
        }
        else{
            // console.log(results[0].Users)
            if (user === results[0].Users){ // como SQL no tiene para === revisamos que sea exactamente el mismo manualmente.
                const sql = 'SELECT ID, Users, Passwords FROM tpopizza.login WHERE Users = ?' // traemos usuario y contraseña.
                db.query(sql, [user,password],(err,results) =>{
                    if (err){
                        console.log("Error en controller.js checkLogin traer usuario y contraseña"+err)
                        return
                    }
                    // comparamos la contraseña hasheandola contra la guardada
                    const passwordCheck = bcrypt.compareSync(password, results[0].Passwords) 
                    if (passwordCheck){
                        const token = jwt.sign({id: results[0].id}, config.secretKey, {expiresIn: config.tokenExpiresIn})

                        res.status(200).send({Auth: true, token})

                    } else return res.status(404).send({Auth: false, token: null})
            })
            } else {
                res.send("No existe ese usuario 2")
                return
            }
        } 
    })
}

const cambiarRanks = (req,res) =>{
    const identificador = req.body.UserID
    const rank = req.body.Ranks            
    // console.log(identificador)
    // console.log(rank)
    const sql = 'UPDATE tpopizza.login SET Ranks = ? WHERE login.ID = ?'
    
    db.query(sql, [rank,identificador],(err,results) =>{
        if (err){
            console.log("Error en controller.js cambiarRanks"+err)
            return
        }
        // console.log("Pre resultados cambiarRanks.")
        res.json(results)
        // console.log("Post resultados cambiarRanks.")
    })
}

const eliminarCuenta = (req,res) =>{
    const identificador = req.body.UserID
    // console.log(identificador)
    const sql = 'DELETE FROM tpopizza.login WHERE login.ID = ?'
    
    db.query(sql, [identificador],(err,results) =>{
        if (err){
            console.log("Error en controller.js eliminarCuenta"+err)
            return
        }
        // console.log("Pre resultados eliminarCuenta.")
        res.json(results)
        // console.log("Post resultados eliminarCuenta.")
    })
}

// Pedidos: 

const hacerPedido = (req,res) =>{
    const user = req.body.Users // llamamos todos los campos
    const p1 = req.body.prod1
    const p2 = req.body.prod2
    const p3 = req.body.prod3
    const p4 = req.body.prod4
    const p5 = req.body.prod5
    const c1 = req.body.cant1
    const c2 = req.body.cant2
    const c3 = req.body.cant3
    const c4 = req.body.cant4
    const c5 = req.body.cant5

    const sql = 'INSERT INTO tpopizza.pedidos (idPedidos, Fecha, UsersPedidos, Producto1, Cantidad1, Producto2, Cantidad2, Producto3, Cantidad3, Producto4, Cantidad4, Producto5, Cantidad5) VALUES (NULL, current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [user,p1,c1,p2,c2,p3,c3,p4,c4,p5,c5],(err,results) =>{
        if (err){
            console.log("Error en controller.js hacerPedido: "+err)
            return
        }
        res.status(200).send('Pedido exitoso.') // si el codigo llega aca significa que el query entro bien
    })
}

const pedidosPorUsuario = (req,res) => {
    const user = req.body.Users

    const sql = 'SELECT * FROM tpopizza.pedidos WHERE UsersPedidos = ?' // busca todos los pedidos de X usuario
    db.query(sql, [user],(err,results) =>{
        if(err){
            console.log("Error en controller.js pedidoPorUsuario: "+err)
            return
        }
        res.json(results) // enviamos los resultados al front
    })
}

const pedidosPorPalabraClave = (req,res) =>{ // Pizza, Empanada, etc
    const busqueda = req.body.Palabra

    const sql = 'SELECT * FROM tpopizza.pedidos WHERE Producto1 = ? OR Producto2 = ? OR Producto3 = ? OR Producto4 = ? OR Producto5 = ?'
    db.query(sql,[busqueda,busqueda,busqueda,busqueda,busqueda],(err,results)=>{ // metemos a busqueda por cada columna que va a buscar
        if(err){
            console.log("Error en controller.js pedidosPorPalabraClave: "+err)
            return
        }
        if(results){
            res.json(results)
        } else send.status(404).send("No hay resultados.")
    })
}

// Productos

const listaProductos = (req,res) =>{ // este es para cargar el HTML con opciones
    const sql = 'SELECT idProductos, Nombre, Tipo, Precio FROM tpopizza.productos'
    db.query(sql,(err,results)=>{
        if(err){
            console.log("Error en controller.js listaProductos: "+err)
            return
        }
        if(results){
            console.log("Se trajo productos de manera exitosa.")
            res.json(results)
        } else send.status(404).send("No hay productos, revise la base de datos.")
    }) 
}

const traerProductos = (req,res)=>{ // Este para modificarProducto
    const sql = 'SELECT * FROM tpopizza.productos'
    db.query(sql,(err,results)=>{
        if(err){
            console.log("Error en controller.js traerProductos: "+err)
            return
        }
        if (results){
            console.log("Se trajo productos de manera exitosa.")
            res.json(results)
        } else send.status(404).send("No hay productos, revise la base de datos.")
    })
}
// Este deberia estar precargado con los resultados de traerProductos y solo modificas lo que queres modificar
const modificarProducto = (req,res) => { 
    const id = req.body.idProducto     
    const nuevoNombre = req.body.Nombre
    const nuevoTipo = req.body.Tipo
    const nuevoPrecio = req.body.Precio
    const nuevoTotalPedidos = req.body.TotalPedidos
    const sql = 'UPDATE tpopizza.productos SET Nombre = ?, Tipo = ?, Precio = ?, TotalPedidos = ? WHERE productos.idProductos = ?;'
    db.query(sql, [nuevoNombre, nuevoTipo, nuevoPrecio, nuevoTotalPedidos, id], (err,results) => { // importante el orden en que entran las variables
        if(err){
            console.log("Error en controller.js modificarProducto: "+err)
            return
        }
        if(results){
            console.log("Se modifico el producto de manera exitosa.")
            res.json(results)
        } else send.status(404).send("No se pudo encontrar el producto, contacte con IT.")
        
    }) 
}

const eliminarProducto = (req,res)=>{ // sacas idProducto con traerProductos
    const id = req.body.idProducto
    const sql = 'DELETE FROM tpopizza.productos WHERE productos.idProductos = ?'
    db.query(sql,[id],(err,results)=>{
        if(err){
            console.log("Error en controller.js eliminarProducto: "+err)
            return
        }
        res.json(results)
    })
}

// Productos

module.exports = {
    usuarios,
    registrarse,
    cambiarRanks,
    eliminarCuenta,
    checkLogin,
    hacerPedido,
    pedidosPorUsuario,
    pedidosPorPalabraClave,
    listaProductos,
    traerProductos,
    modificarProducto,
    eliminarProducto
}
