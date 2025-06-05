import Translations from '../resources/translations.js';

const DireccionView = {
  renderAddresses(containerId, direcciones = [], lang = 'pt') {
    console.log('Rendering addresses:', direcciones);
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Contenedor no encontrado con ID: ${containerId}`);
      return;
    }

    let t = {};
    try {
      t = Translations[lang]?.direcciones || {};
    } catch (e) {
      console.warn('Translation not available:', e);
    }

    container.innerHTML = `
      <div class="container address-container mt-5">
        <h2 class="address-title mb-4 text-center" data-i18n="direcciones.title">${t.title || 'Minhas Moradas'}</h2>
        ${direcciones.length > 0 ? `
          <div class="row justify-content-center">
            ${direcciones.map((direccion, index) => `
              <div class="col-md-6 mb-4">
                <div class="card address-card h-100">
                  <div class="card-body p-4">
                    <h5 class="card-title address-card-title mb-3" data-i18n="direcciones.address_title" data-i18n-values='{ "id": "${index + 1}" }'>
                      ${t.address_title?.replace('{id}', index + 1) || `Morada ${index + 1}`}
                    </h5>
                    <div class="address-details">
                      <p class="address-item"><i class="fas fa-road me-2"></i><strong data-i18n="direcciones.street">${t.street || 'Rua'}:</strong> ${direccion.nombreVia || (t.not_provided || 'Não informado')}</p>
                      <p class="address-item"><i class="fas fa-hashtag me-2"></i><strong data-i18n="direcciones.number">${t.number || 'Número'}:</strong> ${direccion.dirVia || '.'}</p>
                      <p class="address-item"><i class="fas fa-city me-2"></i><strong data-i18n="direcciones.freguesia">${t.freguesia || 'Freguesia'}:</strong> ${direccion.freguesiaNombre || ''}</p>
                      <p class="address-item"><i class="fas fa-map me-2"></i><strong data-i18n="direcciones.concelho">${t.concelho || 'Concelho'}:</strong> ${direccion.concelhoNombre || ''}</p>
                      <p class="address-item"><i class="fas fa-map-signs me-2"></i><strong data-i18n="direcciones.distrito">${t.distrito || 'Distrito'}:</strong> ${direccion.distritoNombre || ''}</p>
                      <p class="address-item"><i class="fas fa-globe me-2"></i><strong data-i18n="direcciones.country">${t.country || 'País'}:</strong> ${direccion.paisNombre || ''}</p>
                    </div>
                    <div class="address-actions mt-4 text-center">
                      <button class="btn btn-primary btn-sm btn-edit-direccion me-2" data-direccion-id="${direccion.id}" data-i18n="direcciones.edit">${t.edit || 'Editar'}</button>
                      <button class="btn btn-outline-danger btn-sm btn-delete-direccion" data-direccion-id="${direccion.id}" data-i18n="direcciones.delete">${t.delete || 'Eliminar'}</button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-primary btn-create-direccion" data-i18n="direcciones.add">${t.add || 'Adicionar Nova Morada'}</button>
          </div>
        ` : `
          <div class="alert alert-info text-center py-4">
            <i class="fas fa-info-circle me-2"></i>
            <span data-i18n="direcciones.no_addresses">${t.no_addresses || 'Não há moradas registadas. Deseja adicionar uma?'}</span>
            <div class="mt-3">
              <button class="btn btn-primary btn-create-direccion" data-i18n="direcciones.add">${t.add || 'Adicionar Morada'}</button>
            </div>
          </div>
        `}
      </div>
    `;
  },
  renderCreateAddressModal(containerId, distritos = [], concelhos = [], freguesias = [], lang = 'pt') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Contenedor no encontrado con ID: ${containerId}`);
      return;
    }

    const existingModal = document.getElementById('createAddressModal');
    if (existingModal) existingModal.remove();

    const t = Translations[lang].direcciones || {};
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
      <div class="modal fade" id="createAddressModal" tabindex="-1" aria-labelledby="createAddressModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createAddressModalLabel" data-i18n="direcciones.create_title">${t.create_title || 'Adicionar Nova Morada'}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="createAddressForm">
                <div class="mb-3">
                  <label for="nombreVia" class="form-label" data-i18n="direcciones.street">${t.street || 'Rua'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-road"></i></span>
                    <input type="text" class="form-control" id="nombreVia" name="nombreVia" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="dirVia" class="form-label" data-i18n="direcciones.number">${t.number || 'Número'}:</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-hashtag"></i></span>
                    <input type="text" class="form-control" id="dirVia" name="dirVia" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="distritoSelect" class="form-label" data-i18n="direcciones.distrito">${t.distrito || 'Distrito'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-map-signs"></i></span>
                    <select class="form-select" id="distritoSelect" name="distritoId" required>
                      <option value="" data-i18n="direcciones.select_distrito">${t.select_distrito || 'Selecione um distrito'}</option>
                      ${distritos.map(dist => `
                        <option value="${dist.id}">${dist.nombre}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="concelhoSelect" class="form-label" data-i18n="direcciones.concelho">${t.concelho || 'Concelho'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-map"></i></span>
                    <select class="form-select" id="concelhoSelect" name="concelhoId" required>
                      <option value="" data-i18n="direcciones.select_concelho">${t.select_concelho || 'Selecione um concelho'}</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="freguesiaSelect" class="form-label" data-i18n="direcciones.freguesia">${t.freguesia || 'Freguesia'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-city"></i></span>
                    <select class="form-select" id="freguesiaSelect" name="freguesiaId" required>
                      <option value="" data-i18n="direcciones.select_freguesia">${t.select_freguesia || 'Selecione uma freguesia'}</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" data-i18n="direcciones.cancel">${t.cancel || 'Cancelar'}</button>
              <button type="button" class="btn btn-primary" id="saveNewAddress" data-i18n="direcciones.save">${t.save || 'Guardar'}</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(modalContainer);
  },

  renderEditAddressModal(containerId, direccion, { distritos = [], concelhos = [], freguesias = [], paises = [] }, lang = 'pt') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Contenedor no encontrado con ID: ${containerId}`);
      return;
    }

    const existingModal = document.getElementById('editAddressModal');
    if (existingModal) existingModal.remove();

    const t = Translations[lang].direcciones || {};
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
      <div class="modal fade" id="editAddressModal" tabindex="-1" aria-labelledby="editAddressModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editAddressModalLabel" data-i18n="direcciones.edit_title" data-i18n-values='{ "id": "${direccion.id}" }'>${t.edit_title?.replace('{id}', direccion.id) || `Editar Morada ${direccion.id}`}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="editAddressForm">
                <input type="hidden" name="id" value="${direccion.id}">
                <div class="mb-3">
                  <label for="nombreVia" class="form-label" data-i18n="direcciones.street">${t.street || 'Rua'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-road"></i></span>
                    <input type="text" class="form-control" id="nombreVia" name="nombreVia" value="${direccion.nombreVia || ''}" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="dirVia" class="form-label" data-i18n="direcciones.number">${t.number || 'Número'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-hashtag"></i></span>
                    <input type="text" class="form-control" id="dirVia" name="dirVia" value="${direccion.dirVia || ''}" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="paisSelect" class="form-label" data-i18n="direcciones.country">${t.country || 'País'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-globe"></i></span>
                    <select class="form-select" id="paisSelect" name="paisId" required>
                      <option value="" data-i18n="direcciones.select_country">${t.select_country || 'Selecione um país'}</option>
                      ${paises.map(pais => `
                        <option value="${pais.id}" ${direccion.paisId == pais.id ? 'selected' : ''}>${pais.nombre}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="distritoSelect" class="form-label" data-i18n="direcciones.distrito">${t.distrito || 'Distrito'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-map-signs"></i></span>
                    <select class="form-select" id="distritoSelect" name="distritoId" required>
                      <option value="" data-i18n="direcciones.select_distrito">${t.select_distrito || 'Selecione um distrito'}</option>
                      ${distritos.map(dist => `
                        <option value="${dist.id}" ${direccion.distritoId == dist.id ? 'selected' : ''}>${dist.nombre}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="concelhoSelect" class="form-label" data-i18n="direcciones.concelho">${t.concelho || 'Concelho'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-map"></i></span>
                    <select class="form-select" id="concelhoSelect" name="concelhoId" required>
                      <option value="" data-i18n="direcciones.select_concelho">${t.select_concelho || 'Selecione um concelho'}</option>
                      ${concelhos.map(conc => `
                        <option value="${conc.id}" ${direccion.concelhoId == conc.id ? 'selected' : ''}>${conc.nombre}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="freguesiaSelect" class="form-label" data-i18n="direcciones.freguesia">${t.freguesia || 'Freguesia'}</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-city"></i></span>
                    <select class="form-select" id="freguesiaSelect" name="freguesiaId" required>
                      <option value="" data-i18n="direcciones.select_freguesia">${t.select_freguesia || 'Selecione uma freguesia'}</option>
                      ${freguesias.map(loc => `
                        <option value="${loc.id}" ${direccion.freguesiaId == loc.id ? 'selected' : ''}>${loc.nombre}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" data-i18n="direcciones.cancel">${t.cancel || 'Cancelar'}</button>
              <button type="button" class="btn btn-primary" id="saveEditedAddress" data-i18n="direcciones.save">${t.save || 'Guardar'}</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(modalContainer);
  },

  renderProfileUpdateSuccess(containerId, message, lang = 'pt') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Contenedor '${containerId}' no encontrado`);
      return;
    }
    const t = Translations[lang].direcciones || {};
    let messagesContainer = container.querySelector('#messages');
    if (!messagesContainer) {
      messagesContainer = document.createElement('div');
      messagesContainer.id = 'messages';
      container.prepend(messagesContainer);
    }
    messagesContainer.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert" data-i18n="direcciones.success_message">
        ${message || t.success_message || 'Operação concluída com sucesso.'}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  },

  renderError(containerId, message, lang = 'pt') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Contenedor '${containerId}' no encontrado`);
      return;
    }
    const defaultMessage = 'Ocorreu um erro. Por favor, tente novamente.';
    let localizedMessage = message;
    try {
      const t = Translations[lang]?.direcciones || {};
      if (!message) localizedMessage = t.error_message || defaultMessage;
    } catch (e) {
      console.warn('Translation not available, using default message');
      localizedMessage = message || defaultMessage;
    }
    let messagesContainer = container.querySelector('#messages');
    if (!messagesContainer) {
      messagesContainer = document.createElement('div');
      messagesContainer.id = 'messages';
      container.prepend(messagesContainer);
    }
    messagesContainer.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert" data-i18n="direcciones.error_message">
        ${localizedMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }
};

export default DireccionView;