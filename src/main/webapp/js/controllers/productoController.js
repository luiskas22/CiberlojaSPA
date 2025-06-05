import ProductoView from "../views/productoView.js";
import ProductoService from "../services/productoService.js";
import FileService from "../services/fileService.js";
import App from "../app.js";
import Translations from '../resources/translations.js';
import CartService from "../services/cartService.js";

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
}

const ProductoController = {
    previousResults: [],
    allResults: [],
    currentPage: 1,
    itemsPerPage: 30,
    totalItems: 0,
    totalPages: 0,
    currentLang: 'pt',
    lastFilters: {},
    productSource: null, // Track source of product (highlighted or search)

    init(action, lang = 'pt') {
        console.log(`ProductoController.init(${action}, ${lang})...`);
        this.currentLang = lang;
        this.currentAction = action;

        // Limpiar pro-inventario explícitamente para acción home
        const proInventario = document.getElementById("pro-inventario");
        if (proInventario && action === "home") {
            proInventario.innerHTML = "";
            proInventario.classList.add("hidden");
            console.log("pro-inventario limpiado en ProductoController.init para home");
        }

        if (action === "search") {
            this.loadProductoSearchForm();
        } else if (action === "create") {
            if (App.isEmpleado()) {
                this.loadProductoAddForm();
            }
        } else if (action === "home") {
            this.loadHighlightedProducts();
        }
    },
    setupEvents() {
        console.log("ProductoController.setupEvents()...");
        this.setupSearchInputs();

        // Remover el listener anterior si existe
        if (this.handleDocumentClick) {
            document.removeEventListener("click", this.handleDocumentClick);
        }
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        document.addEventListener("click", this.handleDocumentClick);

        const createForm = document.getElementById("createProductoForm");
        if (createForm && !createForm.hasListener && App.isEmpleado()) {
            createForm.addEventListener("submit", (event) => this.handleAddProducto(event));
            createForm.hasListener = true;
        }

        const updateForm = document.getElementById("updateProductoForm");
        if (updateForm && !updateForm.hasListener && App.isEmpleado()) {
            updateForm.addEventListener("submit", (event) => this.handleUpdateProducto(event));
            updateForm.hasListener = true;
        }

        const clearButton = document.getElementById("clearSearchForm");
        if (clearButton && !clearButton.hasListener) {
            clearButton.addEventListener("click", () => this.clearSearchForm());
            clearButton.hasListener = true;
        }

        const searchForm = document.getElementById("searchProductosForm");
        if (searchForm && !searchForm.hasListener) {
            searchForm.addEventListener("submit", (event) => {
                event.preventDefault();
                this.handleSearch();
            });
            searchForm.hasListener = true;
        }

        const globalSearch = document.getElementById("globalSearch");
        if (globalSearch && !globalSearch.hasListener) {
            globalSearch.addEventListener("input", debounce(() => this.handleSearch(), 300));
            globalSearch.hasListener = true;
        }

        const clearGlobalSearch = document.getElementById("clearGlobalSearch");
        if (clearGlobalSearch && !clearGlobalSearch.hasListener) {
            clearGlobalSearch.addEventListener("click", () => {
                globalSearch.value = "";
                this.handleSearch();
            });
            clearGlobalSearch.hasListener = true;
        }
    },

    async loadHighlightedProducts() {
        console.log("Cargando productos destacados...");
        const proInventario = document.getElementById("pro-inventario");
        if (proInventario) {
            proInventario.innerHTML = "";
            proInventario.classList.add("hidden");
            console.log("pro-inventario limpiado en loadHighlightedProducts");
        }

        try {
            const response = await ProductoService.findByProductosDestaques({
                page: 1,
                size: this.itemsPerPage
            });

            console.log("Productos destacados obtenidos:", {
                pageLength: response.page?.length,
                total: response.total,
                totalPages: response.totalPages
            });

            if (response && Array.isArray(response.page)) {
                let highlightedProducts = response.page;

                // Filter products to only include those with stockDisponible > 0 and precio > 0
                highlightedProducts = highlightedProducts.filter(p => 
                    p.stockDisponible > 0 && p.precio != null && p.precio > 0
                );

                const imagePromises = highlightedProducts.map(p =>
                    FileService.getImagesByProductoId(p.id).catch(() => [])
                );
                const imageResults = await Promise.all(imagePromises);
                highlightedProducts.forEach((p, i) => p.images = imageResults[i]);

                this.allResults = highlightedProducts;
                this.totalItems = highlightedProducts.length;
                this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));

                this.renderHighlightedProducts();
                this.setupEvents();
            } else {
                this.allResults = [];
                this.totalItems = 0;
                this.totalPages = 0;
                ProductoView.renderResults([], "highlighted-products", this.currentPage, this.itemsPerPage, this.totalItems, this.currentLang);
            }
        } catch (error) {
            console.error("Error al cargar productos destacados:", error);
            this.allResults = [];
            this.totalItems = 0;
            this.totalPages = 0;
            ProductoView.renderResults([], "highlighted-products", this.currentPage, this.itemsPerPage, this.totalItems, this.currentLang);
        }
    },

    renderHighlightedProducts() {
        console.log(`Renderizando productos destacados página ${this.currentPage} de ${this.totalPages}`);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.allResults.length);

        this.previousResults = this.allResults.slice(startIndex, endIndex);

        ProductoView.renderResults(
            this.previousResults,
            "highlighted-products",
            this.currentPage,
            this.itemsPerPage,
            this.totalItems,
            this.currentLang
        );
    },

    clearSearchForm() {
        console.log("ProductoController.clearSearchForm()...");
        const form = document.getElementById("searchProductosForm");
        const globalSearch = document.getElementById("globalSearch");
        if (form) {
            form.reset();
            if (globalSearch) globalSearch.value = "";
            this.lastFilters = {};
            this.currentPage = 1;
            this.previousResults = [];
            this.allResults = [];
            this.totalItems = 0;
            this.totalPages = 0;
            this.handleSearch();
        }
    },

    // En ProductoController.js, reemplaza el método showPreviousResults con este:

    // Y también modifica el método fetchProductoInfo para establecer correctamente el productSource:

    async fetchProductoInfo(productId) {
        try {
            const producto = await ProductoService.findById(productId);
            if (!producto) {
                throw new Error(Translations[this.currentLang].alerts.productNotFound);
            }

            try {
                const images = await FileService.getImagesByProductoId(productId);
                producto.images = images || [];
            } catch (imageError) {
                console.warn(`No se pudieron cargar las imágenes para el producto ${productId}:`, imageError);
                producto.images = [];
            }

            // Determinar correctamente el origen del producto
            const homeContent = document.getElementById("home-content");
            const proInventario = document.getElementById("pro-inventario");

            // Si el home-content está visible, significa que venimos de productos destacados
            if (homeContent && !homeContent.classList.contains("hidden")) {
                this.productSource = "highlighted";
                homeContent.classList.add("hidden");
                console.log("productSource establecido como 'highlighted' - venimos del home");
            } else {
                // Si ya estamos en pro-inventario (búsqueda), mantenemos como search
                this.productSource = "search";
                console.log("productSource establecido como 'search' - venimos de búsqueda");
            }

            // Asegurarse de que el contenedor pro-inventario esté visible y limpio
            if (proInventario) {
                proInventario.innerHTML = "";
                proInventario.classList.remove("hidden");
            }

            // Actualizar la URL
            window.location.hash = `#producto/${productId}`;

            // Renderizar los detalles del producto
            ProductoView.renderProductoDetails(producto, "pro-inventario", App.isEmpleado(), this.currentLang);

            // Configurar eventos para el formulario de actualización si es empleado
            this.setupProductDetailEvents();

        } catch (error) {
            console.error("Error al obtener la información del producto:", error);
            alert(Translations[this.currentLang].alerts.loadProductError);
            this.showPreviousResults();
        }
    },

    showPreviousResults() {
        const container = document.getElementById("pro-inventario");
        const homeContent = document.getElementById("home-content");

        if (!container) {
            console.error("Contenedor pro-inventario no encontrado");
            return;
        }

        console.log("showPreviousResults called, productSource:", this.productSource);

        if (this.productSource === "highlighted") {
            console.log("Volviendo desde producto destacado...");

            // Limpiar y ocultar pro-inventario completamente
            container.innerHTML = "";
            container.classList.add("hidden");

            // Mostrar el contenido de home
            if (homeContent) {
                homeContent.classList.remove("hidden");
            }

            // Actualizar la URL sin recargar
            window.location.hash = '#login';

            // Resetear el estado del producto
            // this.productSource = null;

            // Detener ejecución aquí para evitar ejecutar la lógica de búsqueda
            return;
        }

        // Solo ejecutar esta lógica si NO venimos de productos destacados
        console.log("Manejando retorno desde búsqueda...");

        // Si no existe el formulario de búsqueda, recrearlo
        if (!document.getElementById('searchResults')) {
            console.log("Renderizando formulario de búsqueda...");
            ProductoView.render("pro-inventario", "search", this.currentLang);

            // Restaurar valores previos del formulario
            const inputs = [
                "precioMinCriteria",
                "precioMaxCriteria",
                "stockMinCriteria",
                "stockMaxCriteria",
                "familiaCriteria",
                "stockAvailableCriteria",
                "globalSearch"
            ];

            inputs.forEach(inputId => {
                const input = document.getElementById(inputId);
                if (input && input.dataset.previousValue) {
                    if (input.type === 'checkbox') {
                        input.checked = input.dataset.previousValue === 'true';
                    } else {
                        input.value = input.dataset.previousValue;
                    }
                }
            });

            this.setupEvents();
        }

        // Mostrar resultados anteriores si existen
        if (this.allResults && this.allResults.length > 0) {
            console.log("Renderizando página actual de resultados de búsqueda...");
            this.renderCurrentPage();
        } else {
            console.log("Ejecutando nueva búsqueda...");
            this.handleSearch();
        }
    },

    // 3. Nueva función para configurar eventos en detalles de producto
    setupProductDetailEvents() {
        const updateForm = document.getElementById("updateProductoForm");
        if (updateForm && !updateForm.hasListener && App.isEmpleado()) {
            updateForm.addEventListener("submit", (event) => {
                event.preventDefault();
                this.handleUpdateProducto(event);
            });
            updateForm.hasListener = true;
        }
    },

    refreshViewsAfterLogin() {
        console.log("Refrescando vistas después del login...");

        // Verificar el estado de App.cliente
        if (!App.cliente && !App.empleado) {
            console.warn("No se encontró App.cliente ni App.empleado, no se puede refrescar las vistas.");
            return;
        }

        // Si estamos en la página de home, recargar productos destacados
        const homeContent = document.getElementById("home-content");
        if (homeContent && !homeContent.classList.contains("hidden")) {
            console.log("Recargando productos destacados en home...");
            this.loadHighlightedProducts();
            return;
        }

        // Si estamos en búsqueda de productos, re-renderizar resultados actuales
        const searchResults = document.getElementById("searchResults");
        if (searchResults && this.allResults && this.allResults.length > 0) {
            console.log("Re-renderizando resultados de búsqueda...");
            this.renderCurrentPage();
            return;
        }

        // Si estamos viendo detalles de un producto, re-renderizar
        const currentHash = window.location.hash;
        const productMatch = currentHash.match(/#producto\/(\d+)/);
        if (productMatch) {
            console.log("Re-renderizando detalles del producto...");
            const productId = productMatch[1];
            this.fetchProductoInfo(productId);
            return;
        }

        // Si no estamos en ninguna de las anteriores, recargar la página de inicio
        console.log("Ningún contexto específico detectado, recargando home...");
        this.init("home", this.currentLang);
    },

    handleDocumentClick(event) {
    const target = event.target;

    if (target.classList.contains("product-link")) {
        const productId = target.getAttribute("data-id");
        this.productSource = target.getAttribute("data-source");

        // Guardar valores de formulario solo si estamos en búsqueda
        const searchForm = document.getElementById('searchProductosForm');
        if (searchForm) {
            const inputs = document.querySelectorAll('#searchProductosForm input, #searchProductosForm select, #globalSearch');
            inputs.forEach(input => {
                input.dataset.previousValue = input.value;
            });
        }

        this.fetchProductoInfo(productId);
        return;
    }

    const addToCartButton = target.closest(".btn-add-to-cart");
    if (addToCartButton) {
        const productId = addToCartButton.getAttribute("data-id");
        const nombre = addToCartButton.getAttribute("data-nombre");
        const precio = parseFloat(addToCartButton.getAttribute("data-precio")) || 0;

        // Verificar si el usuario está autenticado
        if (!App.cliente && !App.empleado) {
            console.log("Usuario no logueado, redirigiendo al login...");
            alert(Translations[this.currentLang].alerts.loginRequired || "Por favor, inicia sesión para añadir productos al carrito");
            window.location.hash = '#login';
            return;
        }

        this.handleAddToCart(productId, nombre, precio);
        return;
    }

    const addToCartBtn = document.getElementById("addToCartBtn");
    if (addToCartBtn && addToCartBtn.contains(target)) {
        const productId = addToCartBtn.getAttribute("data-id");
        const nombre = addToCartBtn.getAttribute("data-nombre");
        const precio = parseFloat(addToCartBtn.getAttribute("data-precio")) || 0;

        // Verificar si el usuario está autenticado
        if (!App.cliente && !App.empleado) {
            console.log("Usuario no logueado, redirigiendo al login...");
            alert(Translations[this.currentLang].alerts.loginRequired || "Por favor, inicia sesión para añadir productos al carrito");
            window.location.hash = '#login';
            return;
        }

        this.handleAddToCart(productId, nombre, precio);
        return;
    }

    if (target.id === "backToResultsBtn") {
        event.preventDefault();
        this.showPreviousResults();
        return;
    }

    if (target.id === "deleteProduct" && App.isEmpleado()) {
        const productId = target.getAttribute("data-id");
        this.handleDeleteProduct(productId);
        return;
    }

    if (target.classList.contains("page-link") || target.parentElement.classList.contains("page-link")) {
        event.preventDefault();
        const pageElement = target.classList.contains("page-link") ? target : target.parentElement;
        const page = parseInt(pageElement.dataset.page);
        console.log(`Clic en enlace de página: ${page}, Total páginas: ${this.totalPages}`);
        if (!isNaN(page) && page > 0 && page <= this.totalPages) {
            this.goToPage(page);
        } else {
            console.warn(`Página inválida: ${page}`);
        }
        return;
    }
},

    async handleAddToCart(productId, nombre, precio) {
        console.log(`ProductoController.handleAddToCart(productId: ${productId}, nombre: ${nombre}, precio: ${precio})...`);

        // Verificar si el usuario está logueado
        if (!App.cliente) {
            console.log("Usuario no logueado, redirigiendo al login...");
            // Mostrar mensaje opcional antes de redirigir
            alert(Translations[this.currentLang].alerts.loginRequired || "Por favor, inicia sesión para añadir productos al carrito");
            window.location.hash = '#login';
            return;
        }

        try {
            const product = {
                id: productId,
                nombre: nombre,
                precio: precio
            };

            const clienteId = App.cliente.id;
            if (!clienteId) {
                throw new Error("ID de cliente no disponible. Por favor, inicia sesión nuevamente.");
            }

            const quantity = 1;
            await CartService.addToCart(clienteId, product, quantity);

        } catch (error) {
            console.error("Error al añadir el producto al carrito:", error);
            alert(Translations[this.currentLang].alerts.addToCartError || "Error al añadir el producto al carrito: " + error.message);
        }
    },

    loadProductoSearchForm() {
        console.log("Cargando formulario de búsqueda de productos...");
        ProductoView.render("pro-inventario", "search", this.currentLang);
        this.setupEvents();
        this.handleSearch();
    },

    loadProductoAddForm() {
        console.log("Cargando formulario de creación de productos...");
        ProductoView.render("pro-inventario", "create", this.currentLang);
        this.setupEvents();
    },

    setupSearchInputs() {
        console.log("ProductoController.setupSearchInputs()...");
        const inputs = [
            "precioMinCriteria",
            "precioMaxCriteria",
            "stockMinCriteria",
            "stockMaxCriteria",
            "familiaCriteria",
            "stockAvailableCriteria",
            "globalSearch"
        ];
        const debouncedSearch = debounce(() => this.handleSearch(), 300);

        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                if (input.hasListener) {
                    input.removeEventListener("input", input.listener);
                    input.removeEventListener("change", input.listener);
                }
                const listener = () => debouncedSearch();
                const eventType = input.tagName === 'SELECT' || input.type === 'checkbox' ? 'change' : 'input';
                input.addEventListener(eventType, listener);
                input.hasListener = true;
                input.listener = listener;
            }
        });
    },

    async handleSearch(resetPage = true) {
        console.log(`ProductoController.handleSearch(resetPage: ${resetPage})...`);

        if (resetPage) {
            this.currentPage = 1;
        }

        const familiaSelect = document.getElementById("familiaCriteria");
        const selectedFamilias = familiaSelect ? Array.from(familiaSelect.selectedOptions).map(option => option.value) : [];
        const globalSearch = document.getElementById("globalSearch")?.value || "";

        const filters = {
            precioMin: parseFloat(document.getElementById("precioMinCriteria")?.value) || null,
            precioMax: parseFloat(document.getElementById("precioMaxCriteria")?.value) || null,
            stockMin: parseInt(document.getElementById("stockMinCriteria")?.value) || null,
            stockMax: parseInt(document.getElementById("stockMaxCriteria")?.value) || null,
            familia: selectedFamilias,
            stockAvailable: document.getElementById("stockAvailableCriteria")?.checked || false,
            globalSearch: globalSearch
        };
        console.log("Filtros de búsqueda:", filters);
        const normalizedFilters = {
            ...filters,
            precioMin: filters.precioMin ?? null,
            precioMax: filters.precioMax ?? null,
            stockMin: filters.stockMin ?? null,
            stockMax: filters.stockMax ?? null
        };
        const normalizedLastFilters = {
            ...this.lastFilters,
            precioMin: this.lastFilters.precioMin ?? null,
            precioMax: this.lastFilters.precioMax ?? null,
            stockMin: this.lastFilters.stockMin ?? null,
            stockMax: this.lastFilters.stockMax ?? null
        };

        const filtersChanged = JSON.stringify(normalizedFilters) !== JSON.stringify(normalizedLastFilters);
        if (filtersChanged) {
            console.log("Filtros cambiados, reiniciando página a 1");
            this.currentPage = 1;
        }

        this.lastFilters = { ...filters };

        if (filters.precioMin && filters.precioMax && filters.precioMin > filters.precioMax) {
            alert(Translations[this.currentLang].alerts.invalidPrecioRange);
            return;
        }

        if (filters.stockMin && filters.stockMax && filters.stockMin > filters.stockMax) {
            alert(Translations[this.currentLang].alerts.invalidStockRange);
            return;
        }

        try {
            const response = await ProductoService.findByProductosCriteria(filters, {
                page: 1,
                size: 10000
            });

            console.log("Respuesta del servicio REST:", {
                pageLength: response.page?.length,
                total: response.total,
                totalPages: response.totalPages
            });

            if (response && Array.isArray(response.page)) {
                let filteredResults = response.page;

                if (!App.isEmpleado()) {
                    filteredResults = filteredResults.filter(p => p.precio != null && p.precio > 0);
                }

                if (filters.stockAvailable && filters.stockMin === null) {
                    filteredResults = filteredResults.filter(p => p.stockDisponible > 0);
                }

                if (filters.globalSearch) {
                    const searchTerm = filters.globalSearch.toLowerCase();
                    filteredResults = filteredResults.filter(p =>
                        p.id?.toString().toLowerCase().includes(searchTerm) ||
                        p.nombre?.toLowerCase().includes(searchTerm)
                    );
                }

                const imagePromises = filteredResults.map(p =>
                    FileService.getImagesByProductoId(p.id).catch(() => [])
                );
                const imageResults = await Promise.all(imagePromises);
                filteredResults.forEach((p, i) => p.images = imageResults[i]);

                this.allResults = filteredResults;
                this.totalItems = filteredResults.length;
                this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));

                this.renderCurrentPage();
            } else {
                this.allResults = [];
                this.totalItems = 0;
                this.totalPages = 0;
                ProductoView.renderResults([], "pro-inventario", this.currentPage, this.itemsPerPage, this.totalItems, this.currentLang);
            }
        } catch (error) {
            console.error("Error al buscar productos:", error);
            this.allResults = [];
            this.totalItems = 0;
            this.totalPages = 0;
            ProductoView.renderResults([], "pro-inventario", this.currentPage, this.itemsPerPage, this.totalItems, this.currentLang);
        }
    },

    renderCurrentPage() {
        console.log(`Renderizando página ${this.currentPage} de ${this.totalPages}`);
        console.log(`Total resultados en allResults: ${this.allResults.length}`);
        console.log(`Total items: ${this.totalItems}, Total pages: ${this.totalPages}`);

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.allResults.length);
        console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);

        this.previousResults = this.allResults.slice(startIndex, endIndex);
        console.log(`Productos en previousResults: ${this.previousResults.length}`, this.previousResults);

        ProductoView.renderResults(
            this.previousResults,
            "pro-inventario",
            this.currentPage,
            this.itemsPerPage,
            this.totalItems,
            this.currentLang
        );
    },

    goToPage(page) {
        console.log(`ProductoController.goToPage(${page}) - Total páginas: ${this.totalPages}`);
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.warn(`Página ${page} fuera de rango. Páginas válidas: 1-${this.totalPages}`);
        }
    },

    async handleAddProducto(event) {
        event.preventDefault();
        if (!App.isEmpleado()) {
            alert(Translations[this.currentLang].alerts.employeeOnlyCreate);
            return;
        }
        console.log("ProductoController.handleAddProducto()...");

        try {
            const form = event.target;
            const formData = new FormData(form);

            const nombre = formData.get("createNombre") || "";
            const precio = parseFloat(formData.get("createPrecio")) || 0;
            const stockDisponible = parseInt(formData.get("createStockDisponible")) || 0;
            const familia = formData.get("createFamilia") || "";
            const productImage = formData.get("createProductImage");

            console.log("Form values:", {
                nombre,
                precio,
                stockDisponible,
                familia,
                productImage: productImage ? productImage.name : "No file"
            });

            if (!nombre || precio <= 0 || stockDisponible <= 0 || !familia) {
                throw new Error(Translations[this.currentLang].alerts.invalidFields);
            }

            const productoData = {
                nombre,
                precio,
                stockDisponible,
                familia
            };

            const response = await ProductoService.createProducto(productoData);

            if (productImage && productImage.size > 0) {
                await FileService.uploadImageToProducto(response.id, productImage);
            }

            const message = Translations[this.currentLang].alerts.productAdded;
            ProductoView.renderCompraSuccess(message, this.currentLang);
            form.reset();
            this.loadProductoSearchForm();
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            ProductoView.renderCompraError(error.message || Translations[this.currentLang].alerts.addProductError, this.currentLang);
        }
    },

    async handleUpdateProducto(event) {
        event.preventDefault();
        if (!App.isEmpleado()) {
            alert(Translations[this.currentLang].alerts.employeeOnlyUpdate);
            return;
        }
        console.log("ProductoController.handleUpdateProducto()...");

        try {
            const form = event.target;
            const formData = new FormData(form);

            const id = formData.get("updateId") || "";
            const productImage = formData.get("productImage");

            console.log("Form values:", {
                id,
                productImage: productImage ? productImage.name : "No file"
            });

            if (!id) {
                throw new Error(Translations[this.currentLang].alerts.invalidFields);
            }

            if (productImage && productImage.size > 0) {
                await FileService.uploadImageToProducto(id, productImage);
            } else {
                throw new Error(Translations[this.currentLang].alerts.noImageProvided || "Nenhuma imagem fornecida");
            }

            await this.fetchProductoInfo(id);
            alert(Translations[this.currentLang].alerts.productUpdated);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert(Translations[this.currentLang].alerts.updateProductError + (error.message || ""));
        }
    },

};

export default ProductoController;