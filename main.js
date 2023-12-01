class ProductManager {
	static ultId = 0 

	constructor()  {
		this.products = []
	}

	addProduct(title, description, price, img, code, stock) {
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
	}
	
	getProducts() {
		console.log(this.products)
	}

	getProductById(id){
		const product = this.products.find(item => item.id === id)
		if(!product) {
			console.error('Has dado con la misma nada, da un vistazo al vacio y retorna si quieres vivir.')
		}else {
			console.log('Diste con tu fortuna, bendiciones.')
		}return
	}
}


