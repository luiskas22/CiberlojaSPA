import FooterView from '../views/footerView.js';

const FooterController = {
  init(lang = 'pt') {
    console.log("FooterController.init()...");
    this.currentLang = lang; // Almacenar idioma actual
    this.render();
    this.setupEvents();
    // Escuchar cambios de idioma
    document.addEventListener('languageChange', (e) => {
      this.currentLang = e.detail.lang;
      this.render();
      // Re-renderizar páginas de contacto o servicios si están activas
      const currentHash = window.location.hash;
      if (currentHash === '#contact' || currentHash === '#contacto') {
        this.showContactPage();
      } else if (currentHash === '#services' || currentHash === '#servicos') {
        this.showServicesPage();
      }
    });
  },

  render() {
    try {
      FooterView.renderFooter('footer-content', this.currentLang);
    } catch (error) {
      console.error('Error rendering footer:', error);
    }
  },

  setupEvents() {
    console.log("FooterController.setupEvents()...");
    document.addEventListener('click', (e) => {
      // Manejo de clicks en enlaces del footer
      if (e.target.classList.contains('contact-link') || e.target.closest('.contact-link')) {
        e.preventDefault();
        window.location.hash = '#contact';
      } else if (e.target.classList.contains('services-link') || e.target.closest('.services-link')) {
        e.preventDefault();
        window.location.hash = '#services';
      }
    });
  },

  showContactPage() {
    console.log('Showing contact page...');
    const proInventario = document.getElementById('pro-inventario');
    const homeContent = document.getElementById('home-content');

    if (homeContent) {
      homeContent.classList.add('hidden');
    }
    if (proInventario) {
      proInventario.classList.remove('hidden');
      FooterView.renderContact('pro-inventario', this.currentLang);
    }
  },

  showServicesPage() {
    console.log('Showing services page...');
    const proInventario = document.getElementById('pro-inventario');
    const homeContent = document.getElementById('home-content');

    if (homeContent) {
      homeContent.classList.add('hidden');
    }
    if (proInventario) {
      proInventario.classList.remove('hidden');
      FooterView.renderServices('pro-inventario', this.currentLang);
    }
  },

  updateTranslations(lang) {
    console.log('Updating footer translations to:', lang);
    this.currentLang = lang;
    this.render();
    
    // Re-renderizar la página actual si es contacto o servicios
    const currentHash = window.location.hash;
    if (currentHash === '#contact' || currentHash === '#contacto') {
      this.showContactPage();
    } else if (currentHash === '#services' || currentHash === '#servicos') {
      this.showServicesPage();
    }
  },
};

export default FooterController;