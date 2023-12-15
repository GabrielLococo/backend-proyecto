const express = require('express')
const ProductManager = require('./main.js')

const app = express()
const PORT = 8080



app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})

const productManagerJson = new ProductManager('../productos.json')

app.get('/' , (req,res) => {
    res.send('hola hay rutas a seguir : /products, /products?limit= , /products/PId')
})

app.get('/products' , async (req, res) => {
    try {
        const productos = await productManagerJson.getProducts()

        let limit = parseInt(req.query.limit)

        let productosSliced
        if(!isNaN (limit)) {
            productosSliced = productos.slice(0,limit)
        } else {
            productosSliced = productos
        }

        res.send({productosSliced})


    } catch (error) {
        res.status(500).json({error : ' error al encontrarrrrr'})
    }
})

app.get('/products/:pid', async (req,res) => {
    try {
        let productId = parseInt(req.params.pid)

        const product = await productManagerJson.getProductById(productId)
        console.log(product)
        console.log(productId)

        if(product) {
            res.send(product)
        } else {
            res.status(404).json ({error: 'producto no encontrado'})
        }


    } catch (error) {
        res.status(501).json({error:'producto con id no encontrado'})
    }
})