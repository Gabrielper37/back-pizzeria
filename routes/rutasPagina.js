// movies del profe
const express = require('express')
const router = express.Router()
const paginaController = require('../controllers/controller') // llamamos a controller.js
const protegidosController = require('../middleware/authMiddleware')

router.get('/usuarios', paginaController.usuarios)
router.get('/login', paginaController.checkLogin)
router.post('/registrarse', paginaController.registrarse)
router.put('/cambiarRango', paginaController.cambiarRanks)
router.delete('/eliminar', paginaController.eliminarCuenta)
router.get('/protected', protegidosController, (req,res) => {
    // console.log("test1")
    res.status(200).send("Ruta protegida accedida, algun dia tendra front.")
    // console.log("test2")
})
router.post('/enviarPedido', paginaController.hacerPedido)
router.get('/misPedidos', paginaController.pedidosPorUsuario)
router.get('/busqueda', paginaController.pedidosPorPalabraClave)
router.get('/listaProductos', paginaController.listaProductos)
router.get('/traerProductos', paginaController.traerProductos)
router.put('/modificarProducto', paginaController.modificarProducto)
router.delete('/eliminarProducto', paginaController.eliminarProducto)

module.exports = router // importante, no sea como el profe