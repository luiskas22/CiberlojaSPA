import ProductoController from './controllers/productoController.js';
import SesionController from './controllers/sessionController.js';
import ClienteController from './controllers/clienteController.js';
import PedidoController from './controllers/pedidoController.js';
import CartController from './controllers/cartController.js';
import DireccionController from './controllers/direccionController.js';
import FooterController from './controllers/footerController.js';
import LanguageManager from './resources/languageManager.js';

const Router = {
  init() {
    console.log("Router.init()...");
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
    // No llamar handleRouteChange aquí, ya se maneja en App.init()
  },

  handleRouteChange() {
    const hash = window.location.hash;
    console.log('Hash changed:', hash);

    // Ignorar cambios de hash que provienen de cambios de idioma
    if (document.activeElement?.hasAttribute('data-lang')) {
      console.log("Cambio de hash ignorado: proviene de cambio de idioma");
      return;
    }

    let route = '';

    // Manejo de rutas con prefijo #/
    if (hash.startsWith('#/')) {
      route = hash.substring(2).split('?')[0];
      console.log('Detected route with prefix:', route);

      switch (route) {
        case 'login':
          SesionController.init('login', App.languageManager.currentLang);
          App.hideHomeContent();
          return;
        case 'register':
          SesionController.init('register', App.languageManager.currentLang);
          App.hideHomeContent();
          return;
        case 'forgot_password':
          SesionController.init('forgot_password', App.languageManager.currentLang);
          App.hideHomeContent();
          return;
        case 'reset-password':
          SesionController.init('change_password', App.languageManager.currentLang);
          App.hideHomeContent();
          return;
      }
    }

    // Manejo de rutas estándar (sin prefijo #/)
    route = hash.substring(1);
    console.log('Processing standard route:', route);

    // Handle product details route
    if (route.startsWith('producto/')) {
      const productId = route.split('/')[1];
      if (productId) {
        // Asegurarse de que el contenedor pro-inventario esté listo
        const proInventario = document.getElementById("pro-inventario");
        if (proInventario) {
          proInventario.innerHTML = "";
          proInventario.classList.remove("hidden");
        }
        // Ocultar el contenido de home
        const homeContent = document.getElementById("home-content");
        if (homeContent) {
          homeContent.classList.add("hidden");
        }
        ProductoController.fetchProductoInfo(productId);
        return;
      }
    }

    // Switch para otras rutas
    switch (route) {
      case 'cart':
        if (App.cliente && App.isCliente()) {
          CartController.init(App.languageManager.currentLang);
          App.hideHomeContent();
        } else {
          SesionController.init('login', App.languageManager.currentLang);
          App.hideHomeContent();
        }
        break;
      case 'buscar-produtos':
        ProductoController.init("search", App.languageManager.currentLang);
        App.hideHomeContent();
        break;
      case 'crear-productos':
        if (App.isEmpleado()) {
          ProductoController.init("create", App.languageManager.currentLang);
          App.hideHomeContent();
        } else {
          App.showHomeContent();
        }
        break;
      case 'buscar-pedidos':
        if (App.cliente && App.isEmpleado()) {
          PedidoController.init("search", App.languageManager.currentLang);
          App.hideHomeContent();
        } else {
          App.showHomeContent();
        }
        break;
      case 'mis-pedidos':
        if (App.cliente) {
          PedidoController.init("pedidos", App.languageManager.currentLang);
          App.hideHomeContent();
        } else {
          SesionController.init('login', App.languageManager.currentLang);
          App.hideHomeContent();
        }
        break;
      case 'mi-perfil':
        if (App.cliente) {
          ClienteController.init("perfil", App.languageManager.currentLang);
          App.hideHomeContent();
        } else {
          SesionController.init('login', App.languageManager.currentLang);
          App.hideHomeContent();
        }
        break;
      case 'mis-direcciones':
        if (App.cliente) {
          DireccionController.init(App.languageManager.currentLang);
          App.hideHomeContent();
        } else {
          SesionController.init('login', App.languageManager.currentLang);
          App.hideHomeContent();
        }
        break;
      case 'contact':
        App.showContactContent();
        break;
      case '':
      case 'home':
        App.showHomeContent();
        // Limpiar pro-inventario explícitamente
        const proInventario = document.getElementById("pro-inventario");
        if (proInventario) {
          proInventario.innerHTML = "";
          proInventario.classList.add("hidden");
          console.log("pro-inventario limpiado en Router.handleRouteChange para home");
        }
        ProductoController.init('home', App.languageManager.currentLang);
        break;
      default:
        App.showHomeContent();
        if (proInventario) {
          proInventario.innerHTML = "";
          proInventario.classList.add("hidden");
          console.log("pro-inventario limpiado en Router.handleRouteChange para default");
        }
        ProductoController.init('home', App.languageManager.currentLang);
        break;
    }
  }
};

const App = {
  cliente: null,
  previousResults: [],
  languageManager: null,

  async init() {
    console.log("App.init()...");
    this.languageManager = new LanguageManager('pt');
    await this.setupSessionState();

    // IMPORTANTE: Inicializar Router ANTES de procesar rutas
    Router.init();

    this.setEvents();
    // Remover setupNavigation() ya que Router lo maneja
    // this.setupNavigation();

    const hash = window.location.hash;
    console.log("Hash inicial:", hash);

    // Handle initial routes - SIMPLIFICADO
    this.handleInitialRoute(hash);

    this.updateUIForSession();
    FooterController.init(this.languageManager.currentLang);
  },

  handleInitialRoute(hash) {
    // Usar el Router para manejar la ruta inicial
    if (hash) {
      Router.handleRouteChange();
    } else {
      // Sin hash, mostrar home
      ProductoController.init('home', this.languageManager.currentLang);
      this.showHomeContent();
    }
  },

  async setupSessionState() {
    const clienteData = sessionStorage.getItem("cliente");
    this.cliente = clienteData ? JSON.parse(clienteData) : null;

    console.log("Datos del cliente recuperados:", this.cliente);
    console.log("Rol detectado:", this.cliente ?
      (this.cliente.rol_id === 1 ? "Cliente" :
        this.cliente.rol_id === 2 ? "Empleado" : "Rol desconocido") :
      "No logueado");
  },

  setEvents() {
    console.log("Configurando eventos...");

    document.querySelector('a[href="#"]')?.addEventListener("click", (e) => {
      e.preventDefault();
      this.showHomeContent();
    });

    document.getElementById("logoutLink")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleLogout();
    });

    document.addEventListener("click", (e) => {
      if (e.target.id === "logoutBtn") {
        this.handleLogout();
      } else if (e.target.classList.contains("home-login-btn")) {
        e.preventDefault();
        SesionController.init("login", this.languageManager.currentLang);
        this.hideHomeContent();
      } else if (e.target.classList.contains("home-register-btn")) {
        e.preventDefault();
        SesionController.init("register", this.languageManager.currentLang);
        this.hideHomeContent();
      }
    });

    // Event listeners para navigation links
    this.setupNavigationEvents();

    // Event listener para cambios de idioma
    document.addEventListener('languageChange', (e) => {
      const { lang, currentHash } = e.detail;
      console.log(`Actualizando UI para idioma: ${lang}, hash: ${currentHash}`);
      this.handleLanguageChange(lang, currentHash);
    });
  },

  setupNavigationEvents() {
    const navLinks = [
      { selector: 'a[href="#buscar-produtos"]', action: () => this.navigateToSearch() },
      { selector: 'a[href="#crear-productos"]', action: () => this.navigateToCreate() },
      { selector: 'a[href="#buscar-pedidos"]', action: () => this.navigateToSearchOrders() },
      { selector: 'a[href="#mi-perfil"]', action: () => this.navigateToProfile() },
      { selector: 'a[href="#mis-direcciones"]', action: () => this.navigateToAddresses() },
      { selector: 'a[href="#mis-pedidos"]', action: () => this.navigateToOrders() },
      { selector: 'a[href="#cart"]', action: () => this.navigateToCart() },
      { selector: 'a[href="#contact"]', action: () => this.navigateToContact() },
      { selector: 'a[href="#services"]', action: () => this.navigateToServices() }
    ];

    navLinks.forEach(({ selector, action }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          action();
        });
      }
    });
  },

  // Métodos de navegación simplificados
  navigateToSearch() {
    window.location.hash = '#buscar-produtos';
  },

  navigateToCreate() {
    if (this.isEmpleado()) {
      window.location.hash = '#crear-productos';
    } else {
      alert(this.languageManager.getTranslation('alerts.employeeOnlyCreate'));
    }
  },

  navigateToSearchOrders() {
    if (this.cliente) {
      if (this.isEmpleado()) {
        window.location.hash = '#buscar-pedidos';
      } else {
        alert(this.languageManager.getTranslation('alerts.employeeOnlyOrders'));
      }
    } else {
      alert(this.languageManager.getTranslation('alerts.loginEmployee'));
    }
  },

  navigateToProfile() {
    window.location.hash = '#mi-perfil';
  },

  navigateToAddresses() {
    window.location.hash = '#mis-direcciones';
  },

  navigateToOrders() {
    window.location.hash = '#mis-pedidos';
  },

  navigateToCart() {
    if (this.cliente) {
      if (this.isCliente()) {
        window.location.hash = '#cart';
      } else {
        alert(this.languageManager.getTranslation('alerts.clientOnlyCart'));
      }
    } else {
      alert(this.languageManager.getTranslation('alerts.loginCart'));
    }
  },

  navigateToContact() {
    window.location.hash = '#contact';
  },

  navigateToServices() {
    window.location.hash = '#services';
  },

  handleLanguageChange(lang, currentHash) {
    if (currentHash === "#cart" && CartController.updateTranslations) {
      CartController.updateTranslations(lang);
    } else if (currentHash === "#buscar-produtos") {
      ProductoController.updateTranslations(lang);
    } else if (currentHash === "#crear-productos" && this.isEmpleado()) {
      ProductoController.updateTranslations(lang);
    } else if (currentHash === "#buscar-pedidos" && this.isEmpleado()) {
      PedidoController.updateTranslations(lang);
    } else if (currentHash === "#mis-pedidos") {
      PedidoController.updateTranslations(lang);
    } else if (currentHash === "#mi-perfil") {
      ClienteController.updateTranslations(lang);
    } else if (currentHash === "#mis-direcciones") {
      DireccionController.updateTranslations(lang);
    } else if (currentHash === "#contact") {
      this.showContactContent();
    } else if (currentHash === "#services") {
      this.showServicesContent();
    } else {
      this.updateUIForSession();
    }

    FooterController.init(lang);
  },

  showHomeContent() {
    console.log("Mostrando contenido home...");
    const homeContent = document.getElementById("home-content");
    const proInventario = document.getElementById("pro-inventario");

    if (homeContent && proInventario) {
      homeContent.classList.remove("hidden");
      proInventario.innerHTML = "";
      proInventario.classList.add("hidden");
      console.log("pro-inventario limpiado y oculto");
    } else {
      console.error("Contenedores no encontrados:", { homeContent, proInventario });
    }

    this.updateUIForSession();
    window.location.hash = "#home"; // Asegurar que el hash sea consistente
  },

  hideHomeContent() {
    console.log("Ocultando contenido home...");
    const homeContent = document.getElementById("home-content");
    const proInventario = document.getElementById("pro-inventario");

    if (homeContent && proInventario) {
      homeContent.classList.add("hidden");
      proInventario.classList.remove("hidden");
    }
  },

  updateUIForSession() {
    console.log("Actualizando UI según estado de sesión...");
    this.updateNavbarButtons();
    this.updateHomeSessionButtons();
  },

  updateNavbarButtons() {
    console.log("Actualizando botones de navegación...");
    const accountDropdown = document.getElementById("accountDropdown");
    const btnCrearProducto = document.querySelector('a[href="#crear-productos"]');
    const btnCart = document.querySelector('a[href="#cart"]');
    const btnBuscarPedidos = document.querySelector('a[href="#buscar-pedidos"]');

    if (!accountDropdown) return;

    if (this.cliente) {
      accountDropdown.style.display = "block";
      if (btnCrearProducto) {
        btnCrearProducto.style.display = this.isEmpleado() ? "block" : "none";
      }
      if (btnCart) {
        btnCart.style.display = this.isCliente() ? "block" : "none";
      }
      if (btnBuscarPedidos) {
        btnBuscarPedidos.style.display = this.isEmpleado() ? "block" : "none";
      }
    } else {
      accountDropdown.style.display = "none";
      if (btnCrearProducto) btnCrearProducto.style.display = "none";
      if (btnCart) btnCart.style.display = "none";
      if (btnBuscarPedidos) btnBuscarPedidos.style.display = "none";
    }
  },

  updateHomeSessionButtons() {
    const sessionButtons = document.getElementById("session-buttons");
    if (!sessionButtons) return;

    if (this.cliente) {
      sessionButtons.innerHTML = `
        <div class="alert alert-success mb-3">
          ${this.languageManager.getTranslation('session.welcome')}, ${this.cliente.nombre}! (${this.isCliente() ? this.languageManager.getTranslation('session.client') : this.languageManager.getTranslation('session.employee')})
        </div>
        <button id="logoutBtn" class="btn btn-danger" data-i18n="session.logout">
          <i class="fas fa-sign-out-alt me-2"></i>${this.languageManager.getTranslation('session.logout')}
        </button>
      `;
    } else {
      sessionButtons.innerHTML = `
        <div class="d-grid gap-3">
          <a href="#login" class="btn btn-primary home-login-btn" data-i18n="session.login">
            <i class="fas fa-sign-in-alt me-2"></i>${this.languageManager.getTranslation('session.login')}
          </a>
          <a href="#register" class="btn btn-success home-register-btn" data-i18n="session.register">
            <i class="fas fa-user-plus me-2"></i>${this.languageManager.getTranslation('session.register')}
          </a>
        </div>
      `;
    }
  },

  handleLogout() {
    console.log("Cerrando sesión...");
    sessionStorage.removeItem("cliente");
    this.cliente = null;
    this.updateUIForSession();
    this.showHomeContent();
  },

  onLoginSuccess(clienteData) {
    console.log("Login exitoso, actualizando aplicación...", clienteData);
    this.cliente = clienteData;
    sessionStorage.setItem("cliente", JSON.stringify(clienteData));
    this.updateUIForSession();

    const sessionButtons = document.getElementById("session-buttons");
    if (sessionButtons) {
      sessionButtons.innerHTML = `
        <div class="alert alert-success mb-3">
          ${this.languageManager.getTranslation('session.welcome')} ${clienteData.nombre}! (${this.isCliente() ? this.languageManager.getTranslation('session.client') : this.languageManager.getTranslation('session.employee')})
        </div>
        <button id="logoutBtn" class="btn btn-danger" data-i18n="session.logout">
          <i class="fas fa-sign-out-alt me-2"></i>${this.languageManager.getTranslation('session.logout')}
        </button>
      `;
    }
  },

  isCliente() {
    return this.cliente && (this.cliente.rol_id === 1 || !this.cliente.hasOwnProperty('rol_id'));
  },

  isEmpleado() {
    return this.cliente && this.cliente.rol_id === 2;
  },
};

$(function () {
  App.init();
});

export default App;