// controllers/cartController.js
import CartService from "../services/cartService.js";
import CartView from "../views/cartView.js";
import ProductoService from "../services/productoService.js";
import PedidoService from "../services/pedidoService.js"; // Para crear el pedido al finalizar

const CartController = {
	init() {
		console.log("CartController.init()...");
		const hash = window.location.hash;
		if (hash !== "#cart") {
			console.log("No está en la página del carrito, omitiendo inicialización.");
			return;
		}
		this.loadCart();
		this.setupEvents();
		// Flag to prevent multiple checkout submissions
		this.isProcessingCheckout = false;
	},

	setupEvents() {
		console.log("CartController.setupEvents()...");
		// Remove any existing event listeners to prevent duplicates
		const existingListener = document.getElementById('cart-event-listener');
		if (existingListener) {
			document.removeEventListener("click", existingListener);
		}

		// Create a named event handler function so we can reference it
		const handleCartEvents = async (event) => {
			const target = event.target;

			// Add to cart from product details or search results
			if (target.id === "addToCartBtn" || target.classList.contains("add-to-cart-btn")) {
				event.preventDefault();
				const productId = target.dataset.id;
				const productName = target.dataset.nombre;
				const productPrice = target.dataset.precio;
				const quantity = 1; // O puedes obtenerlo de un input si lo tienes

				// Crear un objeto producto mínimo con los datos necesarios
				const product = {
					id: productId,
					nombre: productName,
					precio: parseFloat(productPrice),
					stockDisponible: 100 // Puedes ajustar esto o obtenerlo de otra manera
				};

				await this.addToCart(productId, quantity, product);
			}

			// Remove item from cart
			if (target.classList.contains("remove-from-cart-btn")) {
				event.preventDefault();
				const productId = target.dataset.productId;
				await this.removeFromCart(productId);
			}

			// Update quantity in cart
			if (target.classList.contains("update-quantity-btn")) {
				event.preventDefault();
				const productId = target.dataset.productId;
				const quantity = parseInt(document.getElementById(`cart_quantity_${productId}`).value) || 1;
				await this.updateQuantity(productId, quantity);
			}

			// Clear cart
			if (target.id === "clear-cart-btn") {
				event.preventDefault();
				await this.clearCart();
			}

			// Checkout - Added debounce logic
			if (target.id === "checkout-btn") {
				event.preventDefault();
				// Prevent multiple clicks
				if (this.isProcessingCheckout) {
					console.log("Checkout already in progress, ignoring click");
					return;
				}

				// Disable the button visually
				target.disabled = true;
				target.innerHTML = "Processing...";

				// Set processing flag
				this.isProcessingCheckout = true;

				try {
					await this.checkout();
				} finally {
					// Reset processing flag even if there's an error
					this.isProcessingCheckout = false;

					// Re-enable the button (though it might be gone after checkout)
					if (document.getElementById("checkout-btn")) {
						document.getElementById("checkout-btn").disabled = false;
						document.getElementById("checkout-btn").innerHTML = "Checkout";
					}
				}
			}
		};

		// Store the handler reference
		handleCartEvents.id = 'cart-event-listener';

		// Attach the new event listener
		document.addEventListener("click", handleCartEvents);
	},

	async loadCart() {
		console.log("Loading cart...");
		try {
			const clienteData = this.getStoredClienteData();
			if (!clienteData || !clienteData.id) {
				throw new Error("User not identified. Please log in.");
			}
			const cart = await CartService.getCart(clienteData.id);
			CartView.renderCart("pro-inventario", cart);
		} catch (error) {
			console.error("Error loading cart:", error);
			CartView.renderError("Error loading cart. Please try again.");
		}
	},

	async addToCart(productId, quantity, product = null) {
		console.log(`Adding product ${productId} to cart with quantity ${quantity}...`);
		try {
			const clienteData = this.getStoredClienteData();
			if (!clienteData || !clienteData.id) {
				throw new Error("Please log in to add items to cart.");
			}

			// Si no nos pasan el producto, lo buscamos
			if (!product) {
				product = await ProductoService.findById(productId);
				if (!product) {
					throw new Error("Product not found.");
				}
			}

			if (product.stockDisponible < quantity) {
				throw new Error("Insufficient stock available.");
			}

			const cart = await CartService.addToCart(clienteData.id, product, quantity);
			CartView.renderCart("pro-inventario", cart);
			alert(`✅ Added ${quantity} x ${product.nombre} to cart!`);
		} catch (error) {
			console.error("Error adding to cart:", error);
			CartView.renderError(error.message || "Error adding to cart.");
		}
	},

	async removeFromCart(productId) {
		console.log(`Removing product ${productId} from cart...`);
		try {
			const clienteData = this.getStoredClienteData();
			const cart = await CartService.removeFromCart(clienteData.id, productId);
			CartView.renderCart("pro-inventario", cart);
			alert("✅ Item removed from cart!");
		} catch (error) {
			console.error("Error removing from cart:", error);
			CartView.renderError("Error removing item from cart.");
		}
	},

	async updateQuantity(productId, quantity) {
		console.log(`Updating quantity for product ${productId} to ${quantity}...`);
		try {
			const clienteData = this.getStoredClienteData();
			const cart = await CartService.updateQuantity(clienteData.id, productId, quantity);
			CartView.renderCart("pro-inventario", cart);
		} catch (error) {
			console.error("Error updating quantity:", error);
			CartView.renderError("Error updating cart quantity.");
		}
	},

	async clearCart() {
		console.log("Clearing cart...");
		try {
			const clienteData = this.getStoredClienteData();
			await CartService.clearCart(clienteData.id);
			CartView.renderCart("pro-inventario", { items: [], total: 0 });
			alert("✅ Cart cleared!");
		} catch (error) {
			console.error("Error clearing cart:", error);
			CartView.renderError("Error clearing cart.");
		}
	},

	async checkout() {
		console.log("Processing checkout...");
		try {
			const clienteData = this.getStoredClienteData();
			if (!clienteData || !clienteData.id) {
				throw new Error("Please log in to complete your purchase.");
			}
			const cart = await CartService.getCart(clienteData.id);
			if (!cart || cart.items.length === 0) {
				throw new Error("Cart is empty. Add items before checking out.");
			}

			const pedidoData = {
				clienteId: clienteData.id,
				lineas: cart.items.map(item => ({
					productoId: item.product.id,
					nombreProducto: item.product.nombre, // Añadir esta línea
					unidades: item.quantity,
					precio: item.product.precio
				})),
				precio: cart.total,
				fechaRealizacion: new Date().toISOString(),
				tipoEstadoPedidoId: 1,
				tipoEstadoPedidoNombre: "Pendiente"
			};

			console.log("Datos enviados al backend:", JSON.stringify(pedidoData, null, 2));
			const pedido = await PedidoService.createPedido(pedidoData);
			await CartService.clearCart(clienteData.id);
			CartView.renderCheckoutSuccess("pro-inventario", pedido);
			alert("✅ Order placed successfully! Order ID: " + pedido.id);
		} catch (error) {
			console.error("Error during checkout:", error);
			CartView.renderError(error.message || "Error processing checkout.");
		}
	},

	getStoredClienteData() {
		const clienteData = sessionStorage.getItem("cliente");
		return clienteData ? JSON.parse(clienteData) : null;
	}
};

export default CartController;