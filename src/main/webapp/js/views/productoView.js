import App from "../app.js";
import Translations from '../resources/translations.js';

const ProductoView = {
    getSearchForm(lang = 'pt') {
        const t = Translations[lang].productos.search;
        return `
        <div class="main-content">
            <div class="productos-container">
                <div class="row">
                    <!-- Barra lateral con el formulario -->
                    <aside class="col-lg-3 col-md-4 sidebar">
                        <div class="sidebar-sticky">
                            <div class="product-search-header">
                                <h2 data-i18n="productos.search.title">${t.title}</h2>
                                <form id="searchProductosForm">
                                    <div class="search-form-grid">
                                        <div class="form-group">
                                            <label for="familiaCriteria" class="form-label" data-i18n="productos.search.familia">${t.familia || 'Familia'}</label>
                                            <select id="familiaCriteria" class="form-control custom-combobox" multiple>
                                                <option value="Software">Software</option>
                                                <option value="Impressoras">Impressoras</option>
                                                <option value="Consumiveis">Consumiveis</option>
                                                <option value="Diversos">Diversos</option>
                                                <option value="Computadores">Computadores</option>
                                                <option value="Armazenamento">Armazenamento</option>
                                                <option value="Impressoras de Grande Formato">Impressoras de Grande Formato</option>
                                                <option value="Scanners">Scanners</option>
                                                <option value="Maquinas Fotograficas Digitais">Maquinas Fotograficas Digitais</option>
                                                <option value="Multifunções">Multifunções</option>
                                                <option value="Gravadores">Gravadores</option>
                                                <option value="Portáteis">Portáteis</option>
                                                <option value="Palmtops">Palmtops</option>
                                                <option value="Redes e Conectividade">Redes e Conectividade</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="precioMin" class="form-label" data-i18n="productos.search.priceMin">${t.priceMin}</label>
                                            <div class="input-group">
                                                <span class="input-group-text">€</span>
                                                <input type="number" step="0.01" id="precioMinCriteria" class="form-control" placeholder="${t.priceMinPlaceholder}">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="precioMax" class="form-label" data-i18n="productos.search.priceMax">${t.priceMax}</label>
                                            <div class="input-group">
                                                <span class="input-group-text">€</span>
                                                <input type="number" step="0.01" id="precioMaxCriteria" class="form-control" placeholder="${t.priceMaxPlaceholder}">
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="stockAvailableCriteria" name="stockAvailable" checked>
                                                <label class="form-check-label" for="stockAvailableCriteria" data-i18n="productos.search.stockAvailable">
                                                    ${t.stockAvailable || 'Stock disponible'}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-3">
                                        <button type="submit" class="btn btn-primary px-4" data-i18n="productos.search.searchBtn">
                                            <i class="bi bi-search me-2"></i>${t.searchBtn}
                                        </button>
                                        <button type="button" id="clearSearchForm" class="btn btn-secondary px-4 mt-2" data-i18n="productos.search.clearBtn">
                                            <i class="bi bi-x-circle me-2"></i>${t.clearBtn}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </aside>
                    <!-- Contenido principal (resultados de búsqueda) -->
                    <main class="col-lg-9 col-md-8">
                        <div class="search-bar">
                            <div class="input-group mb-3">
                                <input type="text" id="globalSearch" class="form-control" placeholder="${t.globalSearchPlaceholder || 'Procurar por ID o Nome...'}">
                                <button class="btn btn-outline-secondary" type="button" id="clearGlobalSearch">
                                    <i class="bi bi-x-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div id="searchResults" class="mt-4">
                            <p data-i18n="productos.search.resultsPlaceholder">${t.resultsPlaceholder}</p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    `;

    },

    getCreateForm(lang = 'pt') {
        const t = Translations[lang].productos.create;
        return `
            <div class="productos-container">
                <div class="product-form-container shadow-lg">
                    <h2 class="product-form-title" data-i18n="productos.create.title">
                        <i class="fas fa-box-open me-2"></i>${t.title}
                    </h2>
                    <form id="createProductoForm" enctype="multipart/form-data">
                        <div class="form-section mb-4">
                            <h3 class="form-section-title" data-i18n="productos.create.basicInfo">
                                <i class="fas fa-info-circle me-1"></i>${t.basicInfo}
                            </h3>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="createNombre" class="form-label" data-i18n="productos.create.name">${t.name}</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-tag"></i></span>
                                        <input type="text" id="createNombre" name="createNombre" class="form-control" placeholder="${t.namePlaceholder}" required>
                                        <div class="invalid-feedback">${t.nameRequired || 'Nome é obrigatório'}</div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="createFamilia" class="form-label" data-i18n="productos.create.familia">${t.familia || 'Familia'}</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-sitemap"></i></span>
                                        <input type="text" id="createFamilia" name="createFamilia" class="form-control" placeholder="${t.familiaPlaceholder || 'Ingrese la familia'}" required>
                                        <div class="invalid-feedback">${t.familiaRequired || 'Familia é obrigatória'}</div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="createProductImage" class="form-label" data-i18n="productos.create.image">${t.image || 'Imagem'}</label>
                                    <input class="form-control" type="file" id="createProductImage" name="createProductImage" accept="image/*">
                                    <div class="form-text" data-i18n="productos.create.imageFormats">${t.imageFormats || 'Formatos permitidos: JPG, PNG'}</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-section mb-4">
                            <h3 class="form-section-title" data-i18n="productos.create.priceInventory">
                                <i class="fas fa-euro-sign me-1"></i>${t.priceInventory}
                            </h3>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="createPrecio" class="form-label" data-i18n="productos.create.price">${t.price}</label>
                                    <div class="input-group">
                                        <span class="input-group-text">€</span>
                                        <input type="number" step="0.01" min="0" id="createPrecio" name="createPrecio" class="form-control" placeholder="${t.pricePlaceholder}" required>
                                        <div class="invalid-feedback">${t.priceRequired || 'Preço é obrigatório'}</div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="createStockDisponible" class="form-label" data-i18n="productos.create.stock">${t.stock}</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-warehouse"></i></span>
                                        <input type="number" min="0" id="createStockDisponible" name="createStockDisponible" class="form-control" placeholder="${t.stockPlaceholder}" required>
                                        <div class="invalid-feedback">${t.stockRequired || 'Estoque é obrigatório'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-4">
                            <button type="submit" class="btn btn-success px-5 py-2" data-i18n="productos.create.saveBtn">
                                <i class="fas fa-check-circle me-2"></i>${t.saveBtn}
                                <span class="spinner-border spinner-border-sm ms-2 d-none" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </form>
                    <div id="createResults" class="mt-4"></div>
                </div>
            </div>
        `;
    },

    render(containerId, type, lang = 'pt') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`No se encontró el contenedor con ID: ${containerId}`);
            return;
        }
        container.innerHTML = '';
        if (type === "search") {
            container.innerHTML = this.getSearchForm(lang);
        } else if (type === "create") {
            container.innerHTML = this.getCreateForm(lang);
        }
    },

    // En ProductoView.js, modifica el método renderResults para forzar re-evaluación del estado de login:

    renderResults(productos, containerId = "pro-inventario", currentPage = 1, itemsPerPage = 30, totalItems = 0, lang = 'pt') {
        console.log(`ProductoView.renderResults called with ${productos.length} products, page: ${currentPage}, totalItems: ${totalItems}`);

        let resultsContainer;
        if (containerId === "highlighted-products") {
            resultsContainer = document.getElementById(containerId);
        } else {
            resultsContainer = document.getElementById("searchResults");
        }

        if (!resultsContainer) {
            console.error(`No se encontró el contenedor de resultados con ID: ${containerId === "highlighted-products" ? containerId : "searchResults"}`);
            return;
        }

        const t = Translations[lang].productos.results;

        console.log("Productos a renderizar:", productos);

        if (!Array.isArray(productos) || productos.length === 0) {
            console.log("No hay productos para mostrar, renderizando mensaje de no resultados");
            resultsContainer.innerHTML = `
        <div class="alert alert-info text-center" data-i18n="productos.results.noResults">
            <i class="bi bi-info-circle me-2"></i>${t.noResults}
        </div>`;
            return;
        }

        // CORRECCIÓN: Re-evaluar el estado de login en tiempo de renderizado
        const isLoggedIn = App.cliente !== null;
        console.log("Estado de login al renderizar:", isLoggedIn);

        let resultsHtml = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">';

        productos.forEach((producto, index) => {
            const stockStatus = producto.stockDisponible > 10 ? 'in-stock' :
                producto.stockDisponible > 0 ? 'low-stock' : 'out-of-stock';
            const nombre = producto.nombre || 'N/A';
            const precio = producto.precio ? Number(producto.precio).toFixed(2) + ' €' : 'N/A';
            const stockDisponible = producto.stockDisponible || 0;
            const source = containerId === "highlighted-products" ? "highlighted" : "search";

            resultsHtml += `
        <div class="col">
            <div class="product-card h-100">
                <div class="product-image-container">
                    ${producto.images && producto.images.length > 0 ? `
                        <img src="http://192.168.99.40:8080${producto.images[0].url}" 
                            alt="${nombre}" 
                            class="product-image"
                            onerror="this.onerror=null; this.src='./img/placeholder.png'; console.error('Error loading image: ${producto.images[0].url}');">
                    ` : `
                        <img src="./img/placeholder.png" 
                            alt="${nombre}" 
                            class="product-image">
                    `}
                    ${stockDisponible <= 0 && isLoggedIn ? `<span class="product-badge" data-i18n="productos.results.outOfStock">${t.outOfStock}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${nombre}</h3>
                    ${isLoggedIn ? `
                        <div class="product-price">${precio}</div>
                        <p class="product-stock ${stockStatus}">
                            <i class="bi bi-box-seam me-1"></i>${stockDisponible} ${t.available}
                        </p>
                    ` : `
                        <div class="product-price text-muted" data-i18n="productos.results.loginPrice">${t.loginPrice}</div>
                    `}
                    <div class="product-actions">
                        <button class="btn btn-view-details product-link" data-id="${producto.id || ''}" data-source="${source}" data-i18n="productos.results.viewDetailsBtn">
                            <i class="bi bi-eye me-1"></i>${t.viewDetailsBtn}
                        </button>
                        ${isLoggedIn ? `
                            <button class="btn btn-success btn-add-to-cart" 
                        data-id="${producto.id || ''}" 
                        data-nombre="${nombre}" 
                        data-precio="${producto.precio || 0}"
                        data-stock-disponible="${stockDisponible}"
                        ${stockDisponible <= 0 ? 'disabled' : ''} 
                        aria-label="${t.addToCartBtn || 'Añadir al Carrito'}">
                        <i class="bi bi-cart-plus fs-5"></i>
                    </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>`;
        });

        resultsHtml += '</div>';

        if (totalItems > 0) {
            resultsHtml += this.getPaginationHtml(currentPage, Math.max(1, Math.ceil(totalItems / itemsPerPage)), totalItems, lang);
        }

        resultsContainer.innerHTML = resultsHtml;
    },

    // También corrige la función renderProductoDetails
    renderProductoDetails(producto, containerId = "pro-inventario", isEmpleado = false, lang = 'pt') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`No se encontró el contenedor con ID: ${containerId}`);
            return;
        }

        const t = Translations[lang].productos.details;
        container.innerHTML = '';
        const isLoggedIn = App.cliente !== null;
        const stockStatus = producto.stockDisponible > 10 ? 'stock-available' :
            producto.stockDisponible > 0 ? 'stock-low' : 'stock-unavailable';
        const stockText = producto.stockDisponible > 10 ? t.stockAvailable :
            producto.stockDisponible > 0 ? t.stockLow : t.stockOut;

        const nombre = producto.nombre || 'N/A';
        const familiaNombre = producto.familiaNombre || t.familiaNombre || 'N/A';
        const precio = producto.precio ? Number(producto.precio).toFixed(2) + ' €' : 'N/A';
        const stockDisponible = producto.stockDisponible || 0;

        let productoDetails = `
        <div class="product-detail-container">
            <div class="product-detail-card">
                <div class="row g-0">
                    <div class="col-md-6">
                        <div class="product-detail-image-container">
                            ${producto.images && producto.images.length > 0 ? `
                                <img src="http://192.168.99.40:8080${producto.images[0].url}" 
                                    alt="${nombre}" 
                                    class="product-detail-image"
                                    onerror="this.onerror=null; this.src='./img/placeholder.png'; console.error('Error loading image: ${producto.images[0].url}');">
                            ` : `
                                <img src="./img/placeholder.png" 
                                    alt="${nombre}" 
                                    class="product-detail-image">
                            `}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="product-detail-info">
                            <h1 class="product-detail-title">${nombre}</h1>
                            <div class="product-detail-meta">
                                <span class="product-detail-familia">${familiaNombre}</span>
                            </div>
                            ${isLoggedIn ? `
                                <div class="product-detail-price">${precio} <span class="iva">(IVA incluido)</span></div>
                                <div class="product-detail-stock ${stockStatus}" data-i18n="productos.details.stockText">
                                    <i class="bi bi-box-seam me-2"></i>${stockText} | ${stockDisponible} ${t.inStock}
                                </div>
                            ` : `
                                <div class="product-detail-price text-muted" data-i18n="productos.details.loginPrice">${t.loginPrice}</div>
                                <div class="product-detail-stock text-muted" data-i18n="productos.details.loginStock">${t.loginStock}</div>
                            `}
    `;

        if (isEmpleado) {
            productoDetails += `
            <form id="updateProductoForm" enctype="multipart/form-data">
                <input type="hidden" id="updateId" name="updateId" value="${producto.id || ''}">
                <div class="form-section">
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label for="productImage" class="form-label" data-i18n="productos.details.updateImage">${t.updateImage}</label>
                            <input class="form-control" type="file" id="productImage" name="productImage" accept="image/*">
                            <div class="form-text" data-i18n="productos.details.imageFormats">${t.imageFormats}</div>
                        </div>
                    </div>
                </div>
                <div class="product-detail-actions">
                    <button type="button" id="backToResultsBtn" class="btn btn-outline-secondary" data-i18n="productos.details.backBtn">
                        <i class="bi bi-arrow-left me-2"></i>${t.backBtn}
                    </button>
                    <button type="submit" class="btn btn-primary" data-i18n="productos.details.saveBtn">
                        <i class="bi bi-save me-2"></i>${t.saveBtn}
                    </button>
                    <button type="button" id="deleteProduct" class="btn btn-danger" data-id="${producto.id || ''}" data-i18n="productos.details.deleteBtn">
                        <i class="bi bi-trash me-2"></i>${t.deleteBtn}
                    </button>
                </div>
            </form>
        `;
        } else {
            productoDetails += `
            <div class="product-detail-actions">
                <button type="button" id="backToResultsBtn" class="btn btn-outline-secondary" data-i18n="productos.details.backBtn">
                    <i class="bi bi-arrow-left me-2"></i>${t.backBtn}
                </button>
                ${isLoggedIn ? `
                     <button type="button" id="addToCartBtn" class="btn btn-success" 
                    data-id="${producto.id || ''}" 
                    data-nombre="${nombre}" 
                    data-precio="${producto.precio || 0}"
                    data-stock-disponible="${stockDisponible}"
                    ${stockDisponible <= 0 ? 'disabled' : ''} 
                    data-i18n="productos.details.addToCartBtn">
                    <i class="bi bi-cart-plus me-2"></i>${t.addToCartBtn}
                </button>
                ` : ''}
            </div>
        `;
        }

        productoDetails += `
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

        container.innerHTML = productoDetails;
    },

    getPaginationHtml(currentPage, totalPages, totalItems, lang = 'pt', itemsPerPage = 30) {
        const t = Translations[lang].productos.pagination;

        if (totalPages <= 1 || totalItems <= itemsPerPage) return '';

        let paginationHtml = `
        <nav aria-label="${t.ariaLabel}" class="mt-4">
            <ul class="pagination justify-content-center">`;

        const isPrevDisabled = currentPage <= 1;
        paginationHtml += `
        <li class="page-item ${isPrevDisabled ? 'disabled' : ''}">
            <a class="page-link ${isPrevDisabled ? '' : 'cursor-pointer'}" 
               ${!isPrevDisabled ? `data-page="${currentPage - 1}"` : ''} 
               aria-label="${t.previous}">
                <span aria-hidden="true">«</span> ${t.previous}
            </a>
        </li>`;

        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            paginationHtml += `
            <li class="page-item">
                <a class="page-link cursor-pointer" data-page="1">1</a>
            </li>`;

            if (startPage > 2) {
                paginationHtml += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage;
            paginationHtml += `
            <li class="page-item ${isActive ? 'active' : ''}">
                <a class="page-link ${isActive ? '' : 'cursor-pointer'}" 
                   ${!isActive ? `data-page="${i}"` : ''}>
                   ${i}
                   ${isActive ? '<span class="sr-only">(current)</span>' : ''}
                </a>
            </li>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHtml += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>`;
            }

            paginationHtml += `
            <li class="page-item">
                <a class="page-link cursor-pointer" data-page="${totalPages}">${totalPages}</a>
            </li>`;
        }

        const isNextDisabled = currentPage >= totalPages;
        paginationHtml += `
        <li class="page-item ${isNextDisabled ? 'disabled' : ''}">
            <a class="page-link ${isNextDisabled ? '' : 'cursor-pointer'}" 
               ${!isNextDisabled ? `data-page="${currentPage + 1}"` : ''} 
               aria-label="${t.next}">
                ${t.next} <span aria-hidden="true">»</span>
            </a>
        </li>
    </ul>`;

        const firstItem = Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1);
        const lastItem = Math.min(totalItems, currentPage * itemsPerPage);

        paginationHtml += `
        <p class="text-center mt-2 text-muted" data-i18n="productos.pagination.showing">
            ${t.showing.replace('{first}', firstItem).replace('{last}', lastItem).replace('{total}', totalItems)}
        </p>
    </nav>`;

        return paginationHtml;
    },

    getProductImageSrc(productId) {
        if (!productId) {
            return './img/placeholder.png';
        }
        return `./img/${productId}.jpg`;
    },

    renderCompraSuccess(message, lang = 'pt') {
        const resultsContainer = document.getElementById("createResults");
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${message}
                </div>
            `;
        }
    },

    renderCompraError(message, lang = 'pt') {
        const resultsContainer = document.getElementById("createResults");
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${message}
                </div>
            `;
        }
    },
};

export default ProductoView;