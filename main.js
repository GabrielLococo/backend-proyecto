const fs = require('fs').promises

class ProductManager {
	static ultId = 0 

	constructor(path)  {
		this.products = []
		this.path = path 
	}

	async addProduct(nuevoObjeto) {
		let {title, description, price, img, code, stock} = nuevoObjeto

		if(!title || !description || !price || !img || !code || !stock) {
			console.error('Llena los campos o enfrenta la oscura nada de la inactividad digital.')
			return
		}
	
	
	 	if (this.products.some(item => item.code === code)) {
			console.error('Duplicado detectado, no oses desafiar la ira del bug')
			return
		}

		const newProduct = {
			id: ++ProductManager.ultId,
			title,
			description,
			price,
			img,
			code,
			stock
		}
		
		this.products.push(newProduct)
		
		await this.guardarArchivo(this.products)
	}
	
	getProducts() {
		console.log(this.products)
	}

	async getProductById(id){
		try {
			const arrayProductos = await this.leerArchivo()
			const buscado = arrayProductos.find(item => item.id === id)

			if (!buscado) {
				console.log('producto no encontrado!')
			}else {
				console.log('producto encontrado!')
				return buscado
			}
		} catch (error) {
			console.log('error al leer el archivo', error)
		}
		
	}

	async leerArchivo() {
		try {
			const respuesta = await fs.readFile(this.path , 'utf-8')
			const arrayProductos = JSON.parse(respuesta)
			return arrayProductos
		} catch (error) {
			console.log('error al leer un archivo', error)
		}
	}

	async guardarArchivo(arrayProductos) {
		try {
			await fs.writeFile(this.path , JSON.stringify(arrayProductos, null, 2))
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



//TESTING

//1) Crear una instancia de la clase "ProductManager"

const manager = new ProductManager("./productos.json")

//2) Llamar "getProducts", debe devolver un arreglo vacio.
manager.getProducts()

//3) Llamar al metodo addProduct y agregar un objeto con todos sus campos.

const pancito = {
	title: ' pancito',
	description: 'un pan riquisimo',
	price: 2000,
	img: 'sin imagen',
	code: 'abc123',
	stock: 50
}

manager.addProduct(pancito)

//4) el objeto debe agregarse con un id generado automaticamente sin repetirse.

const fruta = {
	title: 'manzana',
	description: 'manzana roja rica deliciosa ñamñam',
	price: 250,
	img: 'sin imagen',
	code: 'abc124',
	stock: 2000
}

manager.addProduct(fruta)

//5)repetimos el codigo para chequear que las validaciones esten en funcionamiento

const verdura = {
	title: 'zanahoria',
	description: 'las que comia bugs bunny',
	price: 400,
	img: 'sin imagen',
	code: 'abc124', //mismo codigo que 'fruta' -> error
	stock: 2500
}

manager.addProduct(verdura)

//6)repetimos el codigo para chequear que las validaciones esten funcionando

const pescado = {
	title: 'salmon',
	description: 'rosado',
	price: 7000,
	img: 'sin imagen',
	code: 'abc125', 
	//stock: 2500  //no agrego el stock ---> error
}

manager.addProduct(pescado)

// 7) se llamara al metodo getProducts nuevamente, esta vez debe aparecer el producto recien agregado. 

manager.getProducts()

// 8) se llamara al metodo getProductById y se corroborara que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

async function testeamosBusquedaPorId() {
	const buscado = await manager.getProductById(2)
	console.log(buscado)
}

testeamosBusquedaPorId()

// 9) se llamara al metodo updateProduct y se intentara cambiar un campo de algun producto, se evaluara q no se elimine el id y q si se haya hecho la actualizacion

const legumbre = {
	title: 'garbanzo',
	description: 'garbanzos san vicente ',
	price: 1785,
	img: 'sin imagen',
	code: 'abc123',
	stock: 10000
}

async function testeamosActualizar() {
	await manager.updateProduct(1,legumbre)
}

testeamosActualizar()

// 10) se llamara al metodo deleteProduct , se evaluara q realmente se elimine el producto o que arroje un error en caso de no existir. 

async function testeamosBorrar() {
	await manager.deleteProduct(2)
}

testeamosBorrar()