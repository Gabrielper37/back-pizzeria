const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT ?? 3000
const paginaRouter = require('../routes/rutasPagina') // llamamos a rutasPagina.js
// console.log("Paso server.js linea 5")

app.use(express.json())

app.use(cors({ // Puede utilizar solo app.use(cors()) pero este establece todo los origins con *
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            `http://localhost:${port}`,
            'https://www.pizzeriael10.com',
            //Agregar direccion de la web en la que subimos el front
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))


app.use('/routes', paginaRouter) // '/routes' podria ser lo que queramos
app.listen(port, () => {
    console.log(`corriendo en http://localhost:${port}`)
})

// que tire la lista de rutas en la terminal o en la consola con el inspector.
console.log("")
console.log("Rutas actuales:")
console.log(`http://localhost:${port}/routes/registrarse POST`)
console.log("Requiere: Users, Passwords, Email")
console.log(`http://localhost:${port}/routes/login GET`)
console.log("Requiere: Users, Passwords")
console.log(`http://localhost:${port}/routes/protected GET`)
console.log("Requiere: Token")
console.log(`http://localhost:${port}/routes/usuarios GET`)
console.log("Requiere: Nada.")
console.log(`http://localhost:${port}/routes/cambiarRangos PUT`)
console.log("Requiere: Ranks, UserID")
console.log(`http://localhost:${port}/routes/eliminar DELETE`)
console.log("Requiere: UserID")
console.log(`http://localhost:${port}/routes/enviarPedido POST`)
console.log("Requiere: Users, prod1, prod2, prod3, prod4, prod5, cant1, cant2, cant3, cant4, cant5")
console.log(`http://localhost:${port}/routes/pedidosPorUsuario GET`)
console.log("Requiere: Users")
console.log(`http://localhost:${port}/routes/pedidosPorPalabraClave GET`)
console.log("Requiere: Palabra")
console.log(`http://localhost:${port}/routes/listaProductos GET`)
console.log("Requiere: Nada.")
console.log(`http://localhost:${port}/routes/traerProductos GET`)
console.log("Requiere: Nada.")
console.log(`http://localhost:${port}/routes/modificarProducto PUT`)
console.log("Requiere: idProdcto, Nombre, Tipo, Precio, TotalPedidos")
console.log(`http://localhost:${port}/routes/eliminarProducto DELETE`)
console.log("Requiere: idProducto.")
console.log("")

// console.log(`http://localhost:${port}/routes/enviarPedido`)
// console.log("Requiere: Nada.")


