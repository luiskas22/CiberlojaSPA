import DireccionView from '../views/direccionView.js';
import DireccionService from '../services/direccionService.js';
import Translations from '../resources/translations.js';

const DireccionController = {
  init(lang = 'pt') {
    console.log("DireccionController.init()...");
    this.currentLang = lang;
    this.render();
    this.setupEvents();
    document.addEventListener('languageChange', (e) => {
      this.currentLang = e.detail.lang;
      if (window.location.hash === '#mis-direcciones') this.render();
    });
  },

  render() {
    try {
      this.showAddressesPage();
    } catch (error) {
      console.error('Error rendering addresses:', error);
      DireccionView.renderError('pro-inventario', null, this.currentLang);
    }
  },

  setupEvents() {
    console.log("DireccionController.setupEvents()...");
    document.addEventListener('click', (event) => {
      const deleteTarget = event.target.closest('.btn-delete-direccion');
      if (deleteTarget) {
        event.preventDefault();
        const direccionId = deleteTarget.dataset.direccionId;
        if (direccionId) this.deleteAddress(direccionId);
      }

      const createTarget = event.target.closest('.btn-create-direccion');
      if (createTarget) {
        event.preventDefault();
        this.showCreateAddressForm();
      }

      const editTarget = event.target.closest('.btn-edit-direccion');
      if (editTarget) {
        event.preventDefault();
        const direccionId = editTarget.dataset.direccionId;
        if (direccionId) this.showEditAddressForm(direccionId);
      }

      const saveNewAddress = event.target.closest('#saveNewAddress');
      if (saveNewAddress) {
        event.preventDefault();
        this.handleCreateAddressSubmit();
      }

      const saveEditedAddress = event.target.closest('#saveEditedAddress');
      if (saveEditedAddress) {
        event.preventDefault();
        this.handleEditAddressSubmit();
      }
    });

    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#direcciones') this.showAddressesPage();
    });
  },

  async showAddressesPage() {
    console.log('Showing addresses page...');
    const app = document.getElementById('pro-inventario');
    const homeContent = document.getElementById('home-content');

    if (homeContent) homeContent.style.display = 'none';
    if (app) {
      try {
        const clienteData = this.getStoredClienteData();
        console.log('Client data for addresses rendering:', clienteData);

        if (!clienteData || !clienteData.id) {
          throw new Error(Translations[this.currentLang].direcciones.error_user_not_identified || 'Usuário não identificado. Por favor, inicie a sessão.');
        }

        DireccionView.renderAddresses('pro-inventario', clienteData.direcciones || [], this.currentLang);
        app.style.display = 'block';
      } catch (error) {
        console.error('Error loading addresses:', error);
        DireccionView.renderError('pro-inventario', error.message || Translations[this.currentLang].direcciones.load_error || 'Erro ao carregar moradas.', this.currentLang);
      }
    }
  },

  async deleteAddress(direccionId) {
    console.log(`Eliminando dirección ${direccionId}...`);
    try {
      const clienteData = this.getStoredClienteData();
      if (!clienteData || !clienteData.id) {
        throw new Error(Translations[this.currentLang].direcciones.error_user_not_identified || 'Usuário não identificado. Por favor, inicie a sessão.');
      }
      if (!direccionId || isNaN(direccionId)) {
        throw new Error('ID de morada inválido');
      }
      await DireccionService.deleteDireccion(clienteData.id, direccionId);
      clienteData.direcciones = clienteData.direcciones.filter(dir => dir.id != direccionId);
      sessionStorage.setItem('cliente', JSON.stringify(clienteData));
      DireccionView.renderAddresses('pro-inventario', clienteData.direcciones, this.currentLang);
      DireccionView.renderProfileUpdateSuccess('pro-inventario', Translations[this.currentLang].direcciones.delete_success || 'Morada eliminada com sucesso.', this.currentLang);
    } catch (error) {
      console.error('Error al eliminar dirección:', error);
      const errorMessage = error.message || Translations[this.currentLang].direcciones.delete_error || 'Erro ao eliminar morada. Por favor, tente novamente.';
      DireccionView.renderError('pro-inventario', errorMessage, this.currentLang);
    }
  },

  async showCreateAddressForm() {
    console.log('Mostrando formulario para crear nueva dirección...');
    try {
      const clienteData = this.getStoredClienteData();
      if (!clienteData || !clienteData.id) {
        throw new Error(Translations[this.currentLang].direcciones.error_user_not_identified || 'Usuário não identificado. Por favor, inicie a sessão.');
      }

      const distritos = await DireccionService.getDistritos();
      DireccionView.renderCreateAddressModal('pro-inventario', distritos, [], [], this.currentLang);

      const modal = new bootstrap.Modal(document.getElementById('createAddressModal'));
      modal.show();

      const distritoSelect = document.getElementById('distritoSelect');
      const concelhoSelect = document.getElementById('concelhoSelect');
      const freguesiaSelect = document.getElementById('freguesiaSelect');

      distritoSelect.addEventListener('change', async () => {
        const distritoId = distritoSelect.value;
        concelhoSelect.innerHTML = `<option value="" data-i18n="direcciones.select_concelho">${Translations[this.currentLang].direcciones.select_concelho || 'Selecione um concelho'}</option>`;
        freguesiaSelect.innerHTML = `<option value="" data-i18n="direcciones.select_freguesia">${Translations[this.currentLang].direcciones.select_freguesia || 'Selecione uma freguesia'}</option>`;

        if (distritoId) {
          const concelhos = await DireccionService.getConcelhos(distritoId);
          concelhos.forEach(conc => {
            const option = document.createElement('option');
            option.value = conc.id;
            option.textContent = conc.nombre;
            concelhoSelect.appendChild(option);
          });
        }
      });

      concelhoSelect.addEventListener('change', async () => {
        const concelhoId = concelhoSelect.value;
        freguesiaSelect.innerHTML = `<option value="" data-i18n="direcciones.select_freguesia">${Translations[this.currentLang].direcciones.select_freguesia || 'Selecione uma freguesia'}</option>`;

        if (concelhoId) {
          const freguesias = await DireccionService.getFreguesias(concelhoId);
          freguesias.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc.id;
            option.textContent = loc.nombre;
            freguesiaSelect.appendChild(option);
          });
        }
      });
    } catch (error) {
      console.error('Error al cargar formulario:', error);
      DireccionView.renderError('pro-inventario', error.message || Translations[this.currentLang].direcciones.load_cities_error || 'Erro ao carregar freguesias. Por favor, tente novamente.', this.currentLang);
    }
  },

  async handleCreateAddressSubmit() {
    const form = document.getElementById('createAddressForm');
    if (!form) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.form_not_found || 'Formulário não encontrado', this.currentLang);
      return;
    }

    const formData = new FormData(form);
    const distritoSelect = document.getElementById('distritoSelect');
    const concelhoSelect = document.getElementById('concelhoSelect');
    const freguesiaSelect = document.getElementById('freguesiaSelect');

    if (!distritoSelect.value || !concelhoSelect.value || !freguesiaSelect.value) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.select_distrito_concelho_freguesia || 'Por favor, selecione distrito, concelho e freguesia', this.currentLang);
      return;
    }

    const distritoNombre = distritoSelect.options[distritoSelect.selectedIndex].text;
    const concelhoNombre = concelhoSelect.options[concelhoSelect.selectedIndex].text;
    const freguesiaNombre = freguesiaSelect.options[freguesiaSelect.selectedIndex].text;

    const direccionData = {
      nombreVia: formData.get('nombreVia'),
      dirVia: formData.get('dirVia'),
      clienteId: this.getStoredClienteData().id,
      freguesiaId: parseInt(freguesiaSelect.value, 10),
      freguesiaNombre: freguesiaNombre,
      concelhoId: parseInt(concelhoSelect.value, 10),
      concelhoNombre: concelhoNombre,
      distritoId: parseInt(distritoSelect.value, 10),
      distritoNombre: distritoNombre,
      paisId: 2,
      paisNombre: 'Portugal'
    };

    try {
      await this.createAddress(direccionData);
      const modalElement = document.getElementById('createAddressModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
        modalElement.remove();
      }
    } catch (error) {
      console.error('Error al crear dirección:', error);
      DireccionView.renderError('pro-inventario', error.message || Translations[this.currentLang].direcciones.create_error || 'Erro ao criar morada', this.currentLang);
    }
  },

  async handleEditAddressSubmit() {
    const form = document.getElementById('editAddressForm');
    if (!form) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.form_not_found || 'Formulário não encontrado', this.currentLang);
      return;
    }

    const formData = new FormData(form);
    const clienteData = this.getStoredClienteData();

    const id = parseInt(formData.get('id'), 10);
    const nombreVia = formData.get('nombreVia');
    const dirVia = formData.get('dirVia');
    const freguesiaId = parseInt(formData.get('freguesiaId'), 10);
    const concelhoId = parseInt(formData.get('concelhoId'), 10);
    const distritoId = parseInt(formData.get('distritoId'), 10);
    const paisId = parseInt(formData.get('paisId'), 10);

    const freguesiaSelect = document.getElementById('freguesiaSelect');
    const concelhoSelect = document.getElementById('concelhoSelect');
    const distritoSelect = document.getElementById('distritoSelect');
    const paisSelect = document.getElementById('paisSelect');

    if (!clienteData || !clienteData.id) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.error_user_not_identified || 'Usuário não identificado. Por favor, inicie a sessão.', this.currentLang);
      return;
    }
    if (isNaN(id)) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.invalid_id || 'O ID da morada é inválido.', this.currentLang);
      return;
    }
    if (!nombreVia || nombreVia.trim() === '') {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.street_required || 'O nome da rua é obrigatório.', this.currentLang);
      return;
    }
    if (!dirVia || dirVia.trim() === '') {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.number_required || 'O número da rua é obrigatório.', this.currentLang);
      return;
    }
    if (isNaN(freguesiaId) || !freguesiaSelect.value) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.select_freguesia_valid || 'Por favor, selecione uma freguesia válida.', this.currentLang);
      return;
    }
    if (isNaN(concelhoId) || !concelhoSelect.value) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.select_concelho_valid || 'Por favor, selecione um concelho válido.', this.currentLang);
      return;
    }
    if (isNaN(distritoId) || !distritoSelect.value) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.select_distrito_valid || 'Por favor, selecione um distrito válido.', this.currentLang);
      return;
    }
    if (isNaN(paisId) || !paisSelect.value) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.select_country_valid || 'Por favor, selecione um país válido.', this.currentLang);
      return;
    }

    const freguesiaNombre = freguesiaSelect.options[freguesiaSelect.selectedIndex].text;
    const concelhoNombre = concelhoSelect.options[concelhoSelect.selectedIndex].text;
    const distritoNombre = distritoSelect.options[distritoSelect.selectedIndex].text;
    const paisNombre = paisSelect.options[paisSelect.selectedIndex].text;

    const direccionData = {
      id: id,
      nombreVia: nombreVia,
      dirVia: dirVia,
      freguesiaId: freguesiaId,
      freguesiaNombre: freguesiaNombre,
      concelhoId: concelhoId,
      concelhoNombre: concelhoNombre,
      distritoId: distritoId,
      distritoNombre: distritoNombre,
      paisId: paisId,
      paisNombre: paisNombre,
      clienteId: clienteData.id,
      empleadoId: null
    };

    try {
      await this.updateAddress(direccionData);
      const modalElement = document.getElementById('editAddressModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
        modalElement.remove();
      }
      DireccionView.renderProfileUpdateSuccess('pro-inventario', Translations[this.currentLang].direcciones.update_success || 'Morada atualizada com sucesso.', this.currentLang);
    } catch (error) {
      console.error('Error al actualizar la dirección:', error);
      DireccionView.renderError('pro-inventario', error.message || Translations[this.currentLang].direcciones.update_error || 'Erro ao atualizar morada.', this.currentLang);
    }
  },

  async showEditAddressForm(direccionId) {
    console.log(`Mostrando formulario para editar dirección ${direccionId}...`);
    const clienteData = this.getStoredClienteData();
    const direccion = clienteData.direcciones?.find(dir => dir.id == direccionId);
    if (!direccion) {
      DireccionView.renderError('pro-inventario', Translations[this.currentLang].direcciones.address_not_found || 'Morada não encontrada.', this.currentLang);
      return;
    }

    try {
      const [distritos, concelhos, freguesias, paises] = await Promise.all([
        DireccionService.getDistritos(),
        DireccionService.getConcelhos(direccion.distritoId),
        DireccionService.getFreguesias(direccion.concelhoId),
        DireccionService.getPaises()
      ]);

      DireccionView.renderEditAddressModal(
        'pro-inventario',
        direccion,
        { distritos, concelhos, freguesias, paises },
        this.currentLang
      );

      const modal = new bootstrap.Modal(document.getElementById('editAddressModal'));
      modal.show();

      const distritoSelect = document.getElementById('distritoSelect');
      const concelhoSelect = document.getElementById('concelhoSelect');
      const freguesiaSelect = document.getElementById('freguesiaSelect');

      distritoSelect.addEventListener('change', async () => {
        const distritoId = distritoSelect.value;
        concelhoSelect.innerHTML = `<option value="" data-i18n="direcciones.select_concelho">${Translations[this.currentLang].direcciones.select_concelho || 'Selecione um concelho'}</option>`;
        freguesiaSelect.innerHTML = `<option value="" data-i18n="direcciones.select_freguesia">${Translations[this.currentLang].direcciones.select_freguesia || 'Selecione uma freguesia'}</option>`;

        if (distritoId) {
          const concelhos = await DireccionService.getConcelhos(distritoId);
          concelhos.forEach(conc => {
            const option = document.createElement('option');
            option.value = conc.id;
            option.textContent = conc.nombre;
            concelhoSelect.appendChild(option);
          });
        }
      });

      concelhoSelect.addEventListener('change', async () => {
        const concelhoId = concelhoSelect.value;
        freguesiaSelect.innerHTML = `<option value="" data-i18n="direcciones.select_freguesia">${Translations[this.currentLang].direcciones.select_freguesia || 'Selecione uma freguesia'}</option>`;

        if (concelhoId) {
          const freguesias = await DireccionService.getFreguesias(concelhoId);
          freguesias.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc.id;
            option.textContent = loc.nombre;
            freguesiaSelect.appendChild(option);
          });
        }
      });
    } catch (error) {
      console.error('Error al mostrar el formulario de edición:', error);
      DireccionView.renderError('pro-inventario', error.message || Translations[this.currentLang].direcciones.edit_form_error || 'Erro ao carregar formulário de edição.', this.currentLang);
    }
  },

  async updateAddress(direccionData) {
    try {
      const clienteData = this.getStoredClienteData();
      if (!clienteData || !clienteData.id) {
        throw new Error(Translations[this.currentLang].direcciones.error_user_not_identified || 'Usuário não identificado. Por favor, inicie a sessão.');
      }
      const updatedDireccion = await DireccionService.updateDireccion(direccionData);
      clienteData.direcciones = clienteData.direcciones.map(dir => dir.id == updatedDireccion.id ? updatedDireccion : dir);
      sessionStorage.setItem('cliente', JSON.stringify(clienteData));
      DireccionView.renderAddresses('pro-inventario', clienteData.direcciones, this.currentLang);
    } catch (error) {
      console.error('Error al actualizar dirección:', error);
      throw error;
    }
  },

  async createAddress(direccionData) {
    try {
      const clienteData = this.getStoredClienteData();
      if (!clienteData || !clienteData.id) {
        throw new Error(Translations[this.currentLang].direcciones.error_user_not_identified || 'Usuário não identificado. Por favor, inicie a sessão.');
      }
      const newDireccion = await DireccionService.createDireccion(direccionData);
      clienteData.direcciones = clienteData.direcciones ? [...clienteData.direcciones, newDireccion] : [newDireccion];
      sessionStorage.setItem('cliente', JSON.stringify(clienteData));
      DireccionView.renderAddresses('pro-inventario', clienteData.direcciones, this.currentLang);
      DireccionView.renderProfileUpdateSuccess('pro-inventario', Translations[this.currentLang].direcciones.create_success || 'Morada criada com sucesso.', this.currentLang);
    } catch (error) {
      console.error('Error al crear dirección:', error);
      throw error;
    }
  },

  getStoredClienteData() {
    const clienteData = sessionStorage.getItem('cliente');
    return clienteData ? JSON.parse(clienteData) : { id: null, direcciones: [] };
  }
};

export default DireccionController;