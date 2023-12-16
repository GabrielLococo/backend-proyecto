const fs = require('fs')
class ProductManager {
	static ultId = 0 

	constructor(path)  {
		this.path = path 
		this.products = path ? this.leerArchivo() : [];
	}	

	
	getProducts() {
		return this.products
	}

	async getProductById(id){
		try {
			const buscado = this.products.find(item => item.id == id)
			
			if (buscado) {
				return buscado
			}else {
				console.log('producto no encontrado')
			}
		} catch (error) {
			console.log('error al leer el archivo', error)
		}
	}

	leerArchivo() {
		try {
			const respuesta = fs.readFileSync(this.path , 'utf-8')
			return JSON.parse(respuesta) || []
		} catch (error) {
			console.log('error al leer un archivo', error)
		}
	}

	guardarArchivo(arrayProductos) {
		try {
			fs.writeFileSync(this.path , JSON.stringify(arrayProductos, null, 2))
		} catch (error) {
			console.log('error al guardar el archivo', error)
		}
	}

	async updateProduct(id,productoActualizado) {
		try {
			const arrayProductos = await this.leerArchivo()
			const index = arrayProductos.findIndex(item => item.id === id)

			if (index !== -1) {
				arrayProductos.splice(index, 1, productoActualizado)
				await this.guardarArchivo(arrayProductos)
			}else {
				console.log('no se encontro el producto')
			}

		} catch (error) {
			console.log('error al actualizar el producto', error)
		}
	}

	async deleteProduct(id) {
		try {
			const arrayProductos = await this.leerArchivo()
			const index = arrayProductos.findIndex(item => item.id === id)

			if (index !== -1) {
				arrayProductos.splice(index, 1)
				await this.guardarArchivo(arrayProductos)
			}else {
				console.log('no se encontro el producto')
			}

		} catch (error) {
			console.log('error al eliminar el producto', error)
		}
	}

}





module.exports = ProductManager