import Translations from '../resources/translations.js';

const EmpleadoView = {
    renderCreateEmpleadoForm(containerId, lang = 'pt', distritos = [], concelhos = [], freguesias = []) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Contenedor no encontrado con ID: ${containerId}`);
            return;
        }

        let t = {};
        try {
            t = Translations[lang]?.empleados?.create || {};
        } catch (e) {
            console.warn('Translation not available:', e);
        }

        const distritoOptions = distritos.length > 0
            ? distritos.map(dist => `<option value="${dist.id}">${dist.nombre}</option>`).join('')
            : `<option value="">${t.distritoPlaceholder || 'No hay distritos disponibles'}</option>`;

        const concelhoOptions = concelhos.length > 0
            ? concelhos.map(conc => `<option value="${conc.id}">${conc.nombre}</option>`).join('')
            : `<option value="">${t.concelhoPlaceholder || 'No hay concelhos disponibles'}</option>`;

        const freguesiaOptions = freguesias.length > 0
            ? freguesias.map(freg => `<option value="${freg.id}">${freg.nombre}</option>`).join('')
            : `<option value="">${t.freguesiaPlaceholder || 'No hay freguesias disponibles'}</option>`;

        container.innerHTML = `
            <div class="container empleado-container mt-5">
                <h2 class="empleado-title mb-4 text-center" data-i18n="empleados.create.title">
                    <i class="fas fa-user-plus me-2"></i>${t.title || 'Añadir Empleado'}
                </h2>
                <div class="card shadow-lg p-4">
                    <form id="createEmpleadoForm">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="createNombre" class="form-empleado" data-i18n="empleados.create.name">${t.name || 'Nombre'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" id="createNombre" name="nombre" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createApellido1" class="form-empleado" data-i18n="empleados.create.apellido1">${t.apellido1 || 'Primer Apellido'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" id="createApellido1" name="apellido1" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createApellido2" class="form-empleado" data-i18n="empleados.create.apellido2">${t.apellido2 || 'Segundo Apellido'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" id="createApellido2" name="apellido2" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createDniNie" class="form-empleado" data-i18n="empleados.create.dniNie">${t.dniNie || 'DNI/NIE'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-id-card"></i></span>
                                    <input type="text" id="createDniNie" name="dniNie" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createTelefono" class="form-empleado" data-i18n="empleados.create.telefono">${t.telefono || 'Teléfono'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                    <input type="text" id="createTelefono" name="telefono" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createEmail" class="form-empleado" data-i18n="empleados.create.email">${t.email || 'Email'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                    <input type="email" id="createEmail" name="email" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createPassword" class="form-empleado" data-i18n="empleados.create.password">${t.password || 'Contraseña'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    <input type="password" id="createPassword" name="password" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="createNombreVia" class="form-empleado" data-i18n="empleados.create.direccion">${t.direccion || 'Dirección'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                    <input type="text" id="createNombreVia" name="direccion[nombreVia]" class="form-control" placeholder="${t.direccionPlaceholder || 'Ejemplo: Rua Principal'}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createDirVia" class="form-empleado" data-i18n="empleados.create.dirVia">${t.dirVia || 'Número'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-hashtag"></i></span>
                                    <input type="text" id="createDirVia" name="direccion[dirVia]" class="form-control" placeholder="${t.dirViaPlaceholder || 'Ejemplo: 123, 2ºD'}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createDistritoId" class="form-empleado" data-i18n="empleados.create.distrito">${t.distrito || 'Distrito'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-map-signs"></i></span>
                                    <select id="createDistritoId" name="direccion[distritoId]" class="form-select" required>
                                        <option value="" data-i18n="empleados.create.selectDistrito">${t.selectDistrito || 'Seleccione un distrito'}</option>
                                        ${distritoOptions}
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createConcelhoId" class="form-empleado" data-i18n="empleados.create.concelho">${t.concelho || 'Concelho'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-map"></i></span>
                                    <select id="createConcelhoId" name="direccion[concelhoId]" class="form-select" required>
                                        <option value="" data-i18n="empleados.create.selectConcelho">${t.selectConcelho || 'Seleccione un concelho'}</option>
                                        ${concelhoOptions}
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="createFreguesiaId" class="form-empleado" data-i18n="empleados.create.freguesia">${t.freguesia || 'Freguesia'}</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-city"></i></span>
                                    <select id="createFreguesiaId" name="direccion[freguesiaId]" class="form-select" required>
                                        <option value="" data-i18n="empleados.create.selectFreguesia">${t.selectFreguesia || 'Seleccione una freguesia'}</option>
                                        ${freguesiaOptions}
                                    </select>
                                </div>
                            </div>
                           
                        </div>
                        <div class="text-center mt-4">
                            <button type="submit" class="btn btn-success px-4 py-2" data-i18n="empleados.create.saveBtn">
                                <i class="fas fa-check-circle me-2"></i>${t.saveBtn || 'Guardar'}
                            </button>
                            <button type="button" class="btn btn-outline-secondary ms-3" id="backToHomeBtn" data-i18n="empleados.create.backBtn">
                                <i class="fas fa-arrow-left me-2"></i>${t.backBtn || 'Volver'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    renderSuccess(containerId, message, lang = 'pt') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Contenedor '${containerId}' no encontrado`);
            return;
        }

        let t = {};
        try {
            t = Translations[lang]?.empleados || {};
        } catch (e) {
            console.warn('Translation not available:', e);
        }

        let messagesContainer = container.querySelector('#messages');
        if (!messagesContainer) {
            messagesContainer = document.createElement('div');
            messagesContainer.id = 'messages';
            container.prepend(messagesContainer);
        }
        messagesContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert" data-i18n="empleados.success_message">
                ${message || t.success_message || 'Empleado creado exitosamente.'}
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

        let t = {};
        try {
            t = Translations[lang]?.empleados || {};
        } catch (e) {
            console.warn('Translation not available:', e);
        }

        const defaultMessage = t.error_message || 'Ocurrió un error. Por favor, intenta de nuevo.';
        const localizedMessage = message || defaultMessage;

        let messagesContainer = container.querySelector('#messages');
        if (!messagesContainer) {
            messagesContainer = document.createElement('div');
            messagesContainer.id = 'messages';
            container.prepend(messagesContainer);
        }
        messagesContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert" data-i18n="empleados.error_message">
                ${localizedMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    },
};

export default EmpleadoView;