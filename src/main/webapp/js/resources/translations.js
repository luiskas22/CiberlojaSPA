// translations.js
const translations = {
    es: {
        nav: {
            home: "Inicio",
            addProducts: "Añadir Productos",
            searchProducts: "Buscar Productos",
            searchOrders: "Buscar Pedidos",
            myAccount: "Mi Cuenta",
            myProfile: "Mi Perfil",
            myAddresses: "Mis Direcciones",
            myOrders: "Mis Pedidos",
            myCart: "Mi Carrito",
            logout: "Cerrar Sesión",
        },
        header: {
            title: "Bienvenidos a Ciberloja",
            subtitle: "Tu solución tecnológica integral",
        },
        home: {
            welcome: "¡Bienvenido a Ciberloja!",
            description: "En Ciberloja, ofrecemos productos y servicios innovadores para satisfacer tus necesidades tecnológicas.",
            explore: "Descubre nuestro amplio catálogo de productos tecnológicos y servicios personalizados.",
        },
        pedidos: {
            title: "Mis Pedidos",
            noOrders: "Ningún pedido encontrado. ¡Empieza a comprar ahora!",
            viewProducts: "Ver Productos",
            orderId: "ID del Pedido",
            dateFrom: "Fecha Desde",
            dateTo: "Fecha Hasta",
            priceFrom: "Precio Desde (€)",
            priceTo: "Precio Hasta (€)",
            clientId: "ID del Cliente",
            orderStatus: "Estado del Pedido",
            productId: "ID del Producto",
            description: "Descripción del Producto",
            search: "Buscar",
            clear: "Limpiar",
            orderDetail: "Detalles del Pedido",
            backToSearch: "Volver a la Búsqueda",
            status: "Estado",
            total: "Total",
            items: "Ítems",
            viewDetails: "Ver Detalles",
            all: "Todos",
            pending: "Pendiente",
            processing: "Procesando",
            shipped: "Enviado",
            delivered: "Entregado",
        },
        footer: {
            contact: {
                title: "Entre en contacto con nosotros",
                email: "Email: geral@ciberloja.pt",
                phone: "Teléfono: +351 252 873 365",
            },
            services: {
                title: "Nuestros servicios",
                address: "Rua João Bento Padilha Edifício do, Loja U, 4795-076 Vila das Aves",
                location: "Vila das Aves, Portugal",
            },
            social: {
                title: "Redes Sociales",
            },
            copyright: "© 2025 Ciberloja. Todos los derechos reservados.",
        },
        contact: {
            title: "Contacto",
            description: "¡Contáctenos! Estamos aquí para ayudarlo con cualquier consulta.",
            infoTitle: "Información de Contacto",
            phone: "Teléfono: +351 252 873 365",
            email: "Correo Electrónico: geral@ciberloja.com",
            hours: "Horario de Atención: Lunes a Viernes, 9:00-12:30 y 14:30-19:00",
            locationTitle: "Nuestra Ubicación",
            locationDescription: "Estamos ubicados en el corazón de Vila das Aves, Portugal. Visítenos en:",
            address: "Dirección: Rua João Bento Padilha, Edifício do, Tienda U, 4795-076 Vila das Aves, Portugal",
            mapLink: "Ver en Google Maps",
        },
        services: {
            title: "Nuestros Servicios",
            description: "En Ciberloja, ofrecemos una amplia gama de servicios informáticos diseñados para satisfacer las necesidades de empresas y particulares. A continuación, presentamos una lista detallada de lo que podemos hacer por usted:",
            support: {
                title: "Soporte Técnico",
                description: "Proporcionamos asistencia inmediata y eficaz para resolver problemas relacionados con hardware y software. Desde fallos en ordenadores hasta configuraciones de redes, nuestro equipo está disponible para garantizar que sus sistemas funcionen sin interrupciones.",
            },
            development: {
                title: "Desarrollo de Software",
                description: "Creamos aplicaciones y sistemas a medida según sus necesidades. Ya sea una aplicación móvil, un sistema de gestión empresarial o una plataforma web, utilizamos tecnologías modernas como Python, JavaScript y bases de datos avanzadas para ofrecer soluciones robustas y escalables.",
            },
            consulting: {
                title: "Consultoría IT",
                description: "Le ayudamos a optimizar su infraestructura tecnológica con estrategias personalizadas. Analizamos sus procesos actuales, recomendamos herramientas y diseñamos planes para mejorar la eficiencia, reducir costos y prepararlo para el futuro digital.",
            },
            maintenance: {
                title: "Mantenimiento de Equipos",
                description: "Ofrecemos servicios preventivos y correctivos para mantener sus dispositivos en óptimas condiciones. Desde la limpieza de hardware hasta actualizaciones de software, prolongamos la vida útil de sus equipos y evitamos fallos inesperados.",
            },
        },
        alerts: {
            employeeOnlyCreate: "Solo los empleados pueden crear productos.",
            employeeOnlyUpdate: "Solo los empleados pueden actualizar productos.",
            employeeOnlyDelete: "Solo los empleados pueden eliminar productos.",
            employeeOnlyOrders: "Solo los empleados pueden buscar pedidos.",
            loginEmployee: "Por favor, inicia sesión como empleado para buscar pedidos.",
            clientOnlyCart: "Solo los clientes pueden acceder al carrito.",
            loginCart: "Por favor, inicia sesión para ver tu carrito.",
            invalidFields: "Todos los campos son obligatorios y los valores numéricos deben ser mayores a 0.",
            productAdded: "Producto agregado correctamente.",
            addProductError: "Error al agregar el producto.",
            productUpdated: "✅ Producto actualizado exitosamente!",
            updateProductError: "❌ Error al actualizar el producto: ",
            productNotFound: "Producto no encontrado",
            loadProductError: "❌ Error al cargar los detalles del producto.",
            confirmDelete: "¿Estás seguro de que deseas eliminar este producto?",
            productDeleted: "✅ Producto eliminado exitosamente!",
            deleteProductError: "❌ Error al eliminar el producto. Inténtalo de nuevo."
        },
        session: {
            welcome: "¡Bienvenido",
            client: "Cliente",
            employee: "Empleado",
            login: "Iniciar Sesión",
            register: "Registrarse",
            logout: "Cerrar Sesión",
        },
        productos: {
            search: {
                title: "Filtrar Productos",
                id: "ID:",
                idPlaceholder: "ID del producto",
                name: "Nombre:",
                namePlaceholder: "Nombre del producto",
                description: "Descripción:",
                descriptionPlaceholder: "Palabras clave",
                priceMin: "Precio Mínimo:",
                priceMinPlaceholder: "Mínimo",
                priceMax: "Precio Máximo:",
                priceMaxPlaceholder: "Máximo",
                stockMin: "Stock Mínimo:",
                stockMinPlaceholder: "Mínimo",
                stockMax: "Stock Máximo:",
                stockMaxPlaceholder: "Máximo",
                category: "Categoría:",
                allCategories: "Todas las categorías",
                brand: "Marca:",
                allBrands: "Todas las marcas",
                unit: "Unidad de Medida:",
                allUnits: "Todas las unidades",
                searchBtn: "Buscar",
                clearBtn: "Limpiar",
                resultsPlaceholder: "Resultados de la búsqueda aparecerán aquí...",
            },
            create: {
                title: "Añadir Nuevo Producto",
                basicInfo: "Información Básica",
                name: "Nombre del Producto",
                namePlaceholder: "Ej: Smartphone X Pro",
                description: "Descripción",
                descriptionPlaceholder: "Breve descripción del producto",
                priceInventory: "Precio e Inventario",
                price: "Precio",
                pricePlaceholder: "0.00",
                stock: "Stock Disponible",
                stockPlaceholder: "Cantidad en inventario",
                classification: "Clasificación",
                category: "Categoría",
                selectCategory: "Seleccione categoría",
                brand: "Marca",
                selectBrand: "Seleccione marca",
                unit: "Unidad de Medida",
                selectUnit: "Seleccione unidad",
                images: "Imágenes del Producto",
                uploadImage: "Subir Imagen",
                imageFormats: "Formatos soportados: JPG, PNG. Tamaño máximo: 5MB",
                saveBtn: "Guardar Producto",
            },
            details: {
                stockAvailable: "Disponible",
                stockLow: "Últimas unidades",
                stockOut: "Agotado",
                inStock: "en stock",
                noCategory: "Sin categoría",
                noBrand: "Sin marca",
                noDescription: "No hay descripción disponible.",
                loginPrice: "Inicia sesión para ver el precio",
                loginStock: "Inicia sesión para ver el stock",
                editTitle: "Editar Producto",
                name: "Nombre del Producto",
                description: "Descripción",
                price: "Precio",
                stock: "Stock Disponible",
                category: "Categoría",
                brand: "Marca",
                unit: "Unidad de Medida",
                updateImage: "Actualizar Imagen",
                imageFormats: "Formatos soportados: JPG, PNG. Tamaño máximo: 5MB",
                backBtn: "Volver",
                saveBtn: "Guardar Cambios",
                deleteBtn: "Eliminar",
                addToCartBtn: "Añadir al carrito",
            },
            results: {
                noResults: "No se encontraron productos con los criterios de búsqueda.",
                outOfStock: "AGOTADO",
                available: "disponibles",
                noCategory: "Sin categoría",
                loginPrice: "Inicia sesión para ver el precio",
                loginStock: "Inicia sesión para ver el stock",
                viewDetailsBtn: "Ver Detalles",
            },
            pagination: {
                ariaLabel: "Paginación de productos",
                previous: "Anterior",
                next: "Siguiente",
                showing: "Mostrando {first} - {last} de {total} productos",
            },
        },
    },
    pt: {
        nav: {
            home: "Home",
            addProducts: "Adicionar Produtos",
            searchProducts: "Buscar Produtos",
            searchOrders: "Buscar Pedidos",
            myAccount: "Minha Conta",
            myProfile: "Meu Perfil",
            myAddresses: "Meus Endereços",
            myOrders: "Meus Pedidos",
            myCart: "Meu Carrinho",
            logout: "Sair",
        },
        header: {
            title: "Bem-vindos à Ciberloja",
            subtitle: "Sua solução tecnológica integral",
        },
        home: {
            welcome: "Bem-vindo à Ciberloja!",
            description: "Na Ciberloja, oferecemos produtos e serviços inovadores para atender às suas necessidades tecnológicas.",
            explore: "Descubra nosso amplo catálogo de produtos tecnológicos e serviços personalizados.",
        },
        pedidos: {
            title: "Meus Pedidos",
            noOrders: "Nenhum pedido encontrado. Comece a comprar agora!",
            viewProducts: "Ver Produtos",
            orderId: "ID do Pedido",
            dateFrom: "Data Desde",
            dateTo: "Data Até",
            priceFrom: "Preço Desde (€)",
            priceTo: "Preço Até (€)",
            clientId: "ID do Cliente",
            orderStatus: "Estado do Pedido",
            productId: "ID do Produto",
            description: "Descrição do Produto",
            search: "Buscar",
            clear: "Limpar",
            orderDetail: "Detalhes do Pedido",
            backToSearch: "Voltar à Busca",
            status: "Estado",
            total: "Total",
            items: "Itens",
            viewDetails: "Ver Detalhes",
            all: "Todos",
            pending: "Pendente",
            processing: "Processando",
            shipped: "Enviado",
            delivered: "Entregue",
        },
        footer: {
            contact: {
                title: "Entre em contacto connosco",
                email: "Email: geral@ciberloja.pt",
                phone: "Telefone: +351 252 873 365",
            },
            services: {
                title: "Os nossos serviços",
                address: "Rua João Bento Padilha Edifício do, Loja U, 4795-076 Vila das Aves",
                location: "Vila das Aves, Portugal",
            },
            social: {
                title: "Redes Sociais",
            },
            copyright: "© 2025 Ciberloja. Todos os direitos reservados.",
        },
        contact: {
            title: "Contacto",
            description: "Tem alguma dúvida? Entre em contacto connosco! Estamos aqui para ajudar.",
            infoTitle: "Informações de Contacto",
            phone: "Telefone: +351 252 873 365",
            email: "Correio Eletrónico: geral@ciberloja.com",
            hours: "Horário de Atendimento: Segunda a Sexta, 9:00-12:30 e 14:30-19:00",
            locationTitle: "A Nossa Localização",
            locationDescription: "Estamos localizados no coração de Vila das Aves, Portugal. Visite-nos em:",
            address: "Endereço: Rua João Bento Padilha, Edifício do, Loja U, 4795-076 Vila das Aves, Portugal",
            mapLink: "Ver no Google Maps",
        },
        services: {
            title: "Os Nossos Serviços",
            description: "Na Ciberloja, oferecemos uma ampla gama de serviços informáticos concebidos para satisfazer as necessidades de empresas e particulares. A seguir, apresentamos uma lista detalhada do que podemos fazer por si:",
            support: {
                title: "Suporte Técnico",
                description: "Prestamos assistência imediata e eficaz para resolver problemas relacionados com hardware e software. Desde falhas em computadores até configurações de redes, a nossa equipa está disponível para garantir que os seus sistemas funcionem sem interrupções.",
            },
            development: {
                title: "Desenvolvimento de Software",
                description: "Criamos aplicações e sistemas à medida das suas necessidades. Seja uma aplicação móvel, um sistema de gestão empresarial ou uma plataforma web, utilizamos tecnologias modernas como Python, JavaScript e bases de dados avançadas para oferecer soluções robustas e escaláveis.",
            },
            consulting: {
                title: "Consultoria IT",
                description: "Ajudamo-lo a otimizar a sua infraestrutura tecnológica com estratégias personalizadas. Analisamos os seus processos atuais, recomendamos ferramentas e concebemos planos para melhorar a eficiência, reduzir custos e prepará-lo para o futuro digital.",
            },
            maintenance: {
                title: "Manutenção de Equipamentos",
                description: "Oferecemos serviços preventivos e corretivos para manter os seus dispositivos em ótimas condições. Desde a limpeza de hardware até atualizações de software, prolongamos a vida útil dos seus equipamentos e evitamos falhas inesperadas.",
            },
        },
        alerts: {
            employeeOnlyCreate: "Apenas os funcionários podem criar produtos.",
            employeeOnlyUpdate: "Apenas os funcionários podem atualizar produtos.",
            employeeOnlyDelete: "Apenas os funcionários podem eliminar produtos.",
            employeeOnlyOrders: "Apenas os funcionários podem buscar pedidos.",
            loginEmployee: "Por favor, inicie sessão como funcionário para buscar pedidos.",
            clientOnlyCart: "Apenas os clientes podem acessar o carrinho.",
            loginCart: "Por favor, inicie sessão para ver o seu carrinho.",
            invalidFields: "Todos os campos são obrigatórios e os valores numéricos devem ser maiores que 0.",
            productAdded: "Produto adicionado com sucesso.",
            addProductError: "Erro ao adicionar o produto.",
            productUpdated: "✅ Produto atualizado com sucesso!",
            updateProductError: "❌ Erro ao atualizar o produto: ",
            productNotFound: "Produto não encontrado",
            loadProductError: "❌ Erro ao carregar os detalhes do produto.",
            confirmDelete: "Tem certeza de que deseja eliminar este produto?",
            productDeleted: "✅ Produto eliminado com sucesso!",
            deleteProductError: "❌ Erro ao eliminar o produto. Tente novamente."
        },
        session: {
            welcome: "Bem-vindo",
            client: "Cliente",
            employee: "Funcionário",
            login: "Iniciar Sessão",
            register: "Registar-se",
            logout: "Sair",
        },
        productos: {
            search: {
                title: "Filtrar Produtos",
                id: "ID:",
                idPlaceholder: "ID do produto",
                name: "Nome:",
                namePlaceholder: "Nome do produto",
                description: "Descrição:",
                descriptionPlaceholder: "Palavras-chave",
                priceMin: "Preço Mínimo:",
                priceMinPlaceholder: "Mínimo",
                priceMax: "Preço Máximo:",
                priceMaxPlaceholder: "Máximo",
                stockMin: "Stock Mínimo:",
                stockMinPlaceholder: "Mínimo",
                stockMax: "Stock Máximo:",
                stockMaxPlaceholder: "Máximo",
                category: "Categoria:",
                allCategories: "Todas as categorias",
                brand: "Marca:",
                allBrands: "Todas as marcas",
                unit: "Unidade de Medida:",
                allUnits: "Todas as unidades",
                searchBtn: "Buscar",
                clearBtn: "Limpar",
                resultsPlaceholder: "Os resultados da busca aparecerão aqui...",
            },
            create: {
                title: "Adicionar Novo Produto",
                basicInfo: "Informação Básica",
                name: "Nome do Produto",
                namePlaceholder: "Ex: Smartphone X Pro",
                description: "Descrição",
                descriptionPlaceholder: "Breve descrição do produto",
                priceInventory: "Preço e Inventário",
                price: "Preço",
                pricePlaceholder: "0,00",
                stock: "Stock Disponível",
                stockPlaceholder: "Quantidade em inventário",
                classification: "Classificação",
                category: "Categoria",
                selectCategory: "Selecione categoria",
                brand: "Marca",
                selectBrand: "Selecione marca",
                unit: "Unidade de Medida",
                selectUnit: "Selecione unidade",
                images: "Imagens do Produto",
                uploadImage: "Carregar Imagem",
                imageFormats: "Formatos suportados: JPG, PNG. Tamanho máximo: 5MB",
                saveBtn: "Guardar Produto",
            },
            details: {
                stockAvailable: "Disponível",
                stockLow: "Últimas unidades",
                stockOut: "Esgotado",
                inStock: "em stock",
                noCategory: "Sem categoria",
                noBrand: "Sem marca",
                noDescription: "Não há descrição disponível.",
                loginPrice: "Inicie sessão para ver o preço",
                loginStock: "Inicie sessão para ver o stock",
                editTitle: "Editar Produto",
                name: "Nome do Produto",
                description: "Descrição",
                price: "Preço",
                stock: "Stock Disponível",
                category: "Categoria",
                brand: "Marca",
                unit: "Unidade de Medida",
                updateImage: "Atualizar Imagem",
                imageFormats: "Formatos suportados: JPG, PNG. Tamanho máximo: 5MB",
                backBtn: "Voltar",
                saveBtn: "Guardar Alterações",
                deleteBtn: "Eliminar",
                addToCartBtn: "Adicionar ao carrinho",
            },
            results: {
                noResults: "Nenhum produto encontrado com os critérios de busca.",
                outOfStock: "ESGOTADO",
                available: "disponíveis",
                noCategory: "Sem categoria",
                loginPrice: "Inicie sessão para ver o preço",
                loginStock: "Inicie sessão para ver o stock",
                viewDetailsBtn: "Ver Detalhes",
            },
            pagination: {
                ariaLabel: "Paginação de produtos",
                previous: "Anterior",
                next: "Seguinte",
                showing: "Mostrando {first} - {last} de {total} produtos",
            },
        },
    },
    en: {
        nav: {
            home: "Home",
            addProducts: "Add Products",
            searchProducts: "Search Products",
            searchOrders: "Search Orders",
            myAccount: "My Account",
            myProfile: "My Profile",
            myAddresses: "My Addresses",
            myOrders: "My Orders",
            myCart: "My Cart",
            logout: "Log Out",
        },
        header: {
            title: "Welcome to Ciberloja",
            subtitle: "Your Complete Technology Solution",
        },
        home: {
            welcome: "Welcome to Ciberloja!",
            description: "At Ciberloja, we offer innovative products and services to meet your technological needs.",
            explore: "Explore our wide range of technological products and personalized services.",
        },
        pedidos: {
            title: "My Orders",
            noOrders: "No orders found. Start shopping now!",
            viewProducts: "View Products",
            orderId: "Order ID",
            dateFrom: "Date From",
            dateTo: "Date To",
            priceFrom: "Price From (€)",
            priceTo: "Price To (€)",
            clientId: "Client ID",
            orderStatus: "Order Status",
            productId: "Product ID",
            description: "Product Description",
            search: "Search",
            clear: "Clear",
            orderDetail: "Order Details",
            backToSearch: "Back to Search",
            status: "Status",
            total: "Total",
            items: "Items",
            viewDetails: "View Details",
            all: "All",
            pending: "Pending",
            processing: "Processing",
            shipped: "Shipped",
            delivered: "Delivered",
        },
        footer: {
            contact: {
                title: "Get in Touch with Us",
                email: "Email: geral@ciberloja.pt",
                phone: "Phone: +351 252 873 365",
            },
            services: {
                title: "Our Services",
                address: "Rua João Bento Padilha Edifício do, Loja U, 4795-076 Vila das Aves",
                location: "Vila das Aves, Portugal",
            },
            social: {
                title: "Social Media",
            },
            copyright: "© 2025 Ciberloja. All rights reserved.",
        },
        contact: {
            title: "Contact",
            description: "Have a question? Contact us! We’re here to help.",
            infoTitle: "Contact Information",
            phone: "Phone: +351 252 873 365",
            email: "Email: geral@ciberloja.com",
            hours: "Business Hours: Monday to Friday, 9:00-12:30 and 14:30-19:00",
            locationTitle: "Our Location",
            locationDescription: "We’re located in the heart of Vila das Aves, Portugal. Visit us at:",
            address: "Address: Rua João Bento Padilha, Edifício do, Store U, 4795-076 Vila das Aves, Portugal",
            mapLink: "View on Google Maps",
        },
        services: {
            title: "Our Services",
            description: "At Ciberloja, we offer a wide range of IT services designed to meet the needs of businesses and individuals. Below is a detailed list of what we can do for you:",
            support: {
                title: "Technical Support",
                description: "We provide immediate and effective assistance to resolve hardware and software issues. From computer failures to network setups, our team is available to ensure your systems run smoothly without interruptions.",
            },
            development: {
                title: "Software Development",
                description: "We create custom applications and systems tailored to your needs. Whether it’s a mobile app, a business management system, or a web platform, we use modern technologies like Python, JavaScript, and advanced databases to deliver robust and scalable solutions.",
            },
            consulting: {
                title: "IT Consulting",
                description: "We help you optimize your technological infrastructure with personalized strategies. We analyze your current processes, recommend tools, and design plans to improve efficiency, reduce costs, and prepare you for the digital future.",
            },
            maintenance: {
                title: "Equipment Maintenance",
                description: "We offer preventive and corrective services to keep your devices in top condition. From hardware cleaning to software updates, we extend the lifespan of your equipment and prevent unexpected failures.",
            },
        },
        alerts: {
            employeeOnlyCreate: "Only employees can create products.",
            employeeOnlyUpdate: "Only employees can update products.",
            employeeOnlyDelete: "Only employees can delete products.",
            employeeOnlyOrders: "Only employees can search orders.",
            loginEmployee: "Please log in as an employee to search orders.",
            clientOnlyCart: "Only clients can access the cart.",
            loginCart: "Please log in to view your cart.",
            invalidFields: "All fields are required and numeric values must be greater than 0.",
            productAdded: "Product added successfully.",
            addProductError: "Error adding the product.",
            productUpdated: "✅ Product updated successfully!",
            updateProductError: "❌ Error updating the product: ",
            productNotFound: "Product not found",
            loadProductError: "❌ Error loading product details.",
            confirmDelete: "Are you sure you want to delete this product?",
            productDeleted: "✅ Product deleted successfully!",
            deleteProductError: "❌ Error deleting the product. Please try again."
        },
        session: {
            welcome: "Welcome",
            client: "Client",
            employee: "Employee",
            login: "Log In",
            register: "Register",
            logout: "Log Out",
        },
        productos: {
            search: {
                title: "Filter Products",
                id: "ID:",
                idPlaceholder: "Product ID",
                name: "Name:",
                namePlaceholder: "Product Name",
                description: "Description:",
                descriptionPlaceholder: "Keywords",
                priceMin: "Minimum Price:",
                priceMinPlaceholder: "Minimum",
                priceMax: "Maximum Price:",
                priceMaxPlaceholder: "Maximum",
                stockMin: "Minimum Stock:",
                stockMinPlaceholder: "Minimum",
                stockMax: "Maximum Stock:",
                stockMaxPlaceholder: "Maximum",
                category: "Category:",
                allCategories: "All Categories",
                brand: "Brand:",
                allBrands: "All Brands",
                unit: "Unit of Measure:",
                allUnits: "All Units",
                searchBtn: "Search",
                clearBtn: "Clear",
                resultsPlaceholder: "Search results will appear here...",
            },
            create: {
                title: "Add New Product",
                basicInfo: "Basic Information",
                name: "Product Name",
                namePlaceholder: "E.g., Smartphone X Pro",
                description: "Description",
                descriptionPlaceholder: "Brief product description",
                priceInventory: "Price and Inventory",
                price: "Price",
                pricePlaceholder: "0.00",
                stock: "Available Stock",
                stockPlaceholder: "Quantity in inventory",
                classification: "Classification",
                category: "Category",
                selectCategory: "Select category",
                brand: "Brand",
                selectBrand: "Select brand",
                unit: "Unit of Measure",
                selectUnit: "Select unit",
                images: "Product Images",
                uploadImage: "Upload Image",
                imageFormats: "Supported formats: JPG, PNG. Max size: 5MB",
                saveBtn: "Save Product",
            },
            details: {
                stockAvailable: "Available",
                stockLow: "Low Stock",
                stockOut: "Out of Stock",
                inStock: "in stock",
                noCategory: "No Category",
                noBrand: "No Brand",
                noDescription: "No description available.",
                loginPrice: "Log in to see the price",
                loginStock: "Log in to see the stock",
                editTitle: "Edit Product",
                name: "Product Name",
                description: "Description",
                price: "Price",
                stock: "Available Stock",
                category: "Category",
                brand: "Brand",
                unit: "Unit of Measure",
                updateImage: "Update Image",
                imageFormats: "Supported formats: JPG, PNG. Max size: 5MB",
                backBtn: "Back",
                saveBtn: "Save Changes",
                deleteBtn: "Delete",
                addToCartBtn: "Add to Cart",
            },
            results: {
                noResults: "No products found matching the search criteria.",
                outOfStock: "OUT OF STOCK",
                available: "available",
                noCategory: "No Category",
                loginPrice: "Log in to see the price",
                loginStock: "Log in to see the stock",
                viewDetailsBtn: "View Details",
            },
            pagination: {
                ariaLabel: "Product Pagination",
                previous: "Previous",
                next: "Next",
                showing: "Showing {first} - {last} of {total} products",
            },
        },
    },
};

export default translations;
