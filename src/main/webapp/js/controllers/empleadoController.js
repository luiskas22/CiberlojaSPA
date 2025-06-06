import EmpleadoView from '../views/empleadoView.js';
import EmpleadoService from '../services/empleadoService.js';
import DireccionService from '../services/direccionService.js';
import Translations from '../resources/translations.js';

const EmpleadoController = {
    init(action, lang = 'pt') {
        console.log(`EmpleadoController.init(${action}, ${lang})...`);
        this.currentLang = lang;
        this.distritos = []; // Cache districts
        this.concelhos = []; // Cache municipalities
        this.freguesias = []; // Cache parishes
        if (action === "create") {
            this.renderCreateForm();
            this.setupEvents();
        }

        document.addEventListener('languageChange', (e) => {
            this.currentLang = e.detail.lang;
            if (window.location.hash === '#crear-empleados') {
                this.renderCreateForm();
            }
        });
    },

    async renderCreateForm() {
        try {
            const distritos = await DireccionService.getDistritos();
            this.distritos = distritos; // Cache districts
            EmpleadoView.renderCreateEmpleadoForm('pro-inventario', this.currentLang, distritos, [], []);
            this.setupAddressChangeListeners(); // Set up listeners after rendering
        } catch (error) {
            console.error('Error rendering empleado form:', error);
            EmpleadoView.renderError('pro-inventario', null, this.currentLang);
        }
    },

    setupEvents() {
        console.log("EmpleadoController.setupEvents()...");
        document.addEventListener('click', (event) => {
            const submitTarget = event.target.closest('form#createEmpleadoForm button[type="submit"]');
            const backTarget = event.target.closest('#backToHomeBtn');

            if (submitTarget) {
                event.preventDefault();
                this.handleCreateEmpleado();
            }

            if (backTarget) {
                event.preventDefault();
                window.location.hash = "#home";
            }
        });
    },

    setupAddressChangeListeners() {
        const distritoSelect = document.getElementById('createDistritoId');
        const concelhoSelect = document.getElementById('createConcelhoId');
        const freguesiaSelect = document.getElementById('createFreguesiaId');

        if (!distritoSelect || !concelhoSelect || !freguesiaSelect) {
            console.warn('District, concelho, or freguesia select not found');
            return;
        }

        distritoSelect.addEventListener('change', async () => {
            const distritoId = distritoSelect.value;
            concelhoSelect.innerHTML = `<option value="" data-i18n="empleados.create.selectConcelho">${Translations[this.currentLang]?.empleados?.create?.selectConcelho || 'Seleccione un concelho'}</option>`;
            freguesiaSelect.innerHTML = `<option value="" data-i18n="empleados.create.selectFreguesia">${Translations[this.currentLang]?.empleados?.create?.selectFreguesia || 'Seleccione una freguesia'}</option>`;

            if (distritoId) {
                try {
                    const concelhos = await DireccionService.getConcelhos(distritoId);
                    this.concelhos = concelhos; // Cache concelhos
                    concelhos.forEach(conc => {
                        const option = document.createElement('option');
                        option.value = conc.id;
                        option.textContent = conc.nombre;
                        concelhoSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Error fetching concelhos:', error);
                }
            }
        });

        concelhoSelect.addEventListener('change', async () => {
            const concelhoId = concelhoSelect.value;
            freguesiaSelect.innerHTML = `<option value="" data-i18n="empleados.create.selectFreguesia">${Translations[this.currentLang]?.empleados?.create?.selectFreguesia || 'Seleccione una freguesia'}</option>`;

            if (concelhoId) {
                try {
                    const freguesias = await DireccionService.getFreguesias(concelhoId);
                    this.freguesias = freguesias; // Cache freguesias
                    freguesias.forEach(freg => {
                        const option = document.createElement('option');
                        option.value = freg.id;
                        option.textContent = freg.nombre;
                        freguesiaSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Error fetching freguesias:', error);
                }
            }
        });
    },

    async handleCreateEmpleado() {
        const form = document.getElementById('createEmpleadoForm');
        if (!form) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.form_not_found || 'Formulario no encontrado', this.currentLang);
            return;
        }

        const formData = new FormData(form);

        // Validate required fields
        const nombre = formData.get('nombre');
        const apellido1 = formData.get('apellido1');
        const nif = formData.get('dniNie');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const password = formData.get('password');
        const nombreVia = formData.get('direccion[nombreVia]');
        const dirVia = formData.get('direccion[dirVia]');
        const distritoId = formData.get('direccion[distritoId]');
        const concelhoId = formData.get('direccion[concelhoId]');
        const freguesiaId = formData.get('direccion[freguesiaId]');
        const paisNombre = formData.get('direccion[paisNombre]');

        if (!nombre || nombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.name_required || 'El nombre es obligatorio.', this.currentLang);
            return;
        }
        if (!apellido1 || apellido1.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.apellido1_required || 'El primer apellido es obligatorio.', this.currentLang);
            return;
        }
        if (!nif || !/^[0-9]{9}$/.test(nif.trim())) {
            EmpleadoView.renderError(
                'pro-inventario',
                Translations[this.currentLang]?.empleados?.nif_invalid || 'El NIF debe tener 9 dígitos numéricos.',
                this.currentLang
            );
            return;
        }

        if (!telefono || !/^\+?\d{9,15}$/.test(telefono.trim())) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.telefono_invalid || 'El teléfono debe contener entre 9 y 15 dígitos.', this.currentLang);
            return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.email_invalid || 'El email debe tener un formato válido.', this.currentLang);
            return;
        }
        if (!password || password.trim().length < 6) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.password_invalid || 'La contraseña debe tener al menos 6 caracteres.', this.currentLang);
            return;
        }
        if (!nombreVia || nombreVia.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.direccion_required || 'La calle es obligatoria.', this.currentLang);
            return;
        }
        if (!dirVia || dirVia.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.dirVia_required || 'El número de la calle es obligatorio.', this.currentLang);
            return;
        }
        if (!distritoId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.distrito_required || 'El distrito es obligatorio.', this.currentLang);
            return;
        }
        if (!concelhoId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.concelho_required || 'El concelho es obligatorio.', this.currentLang);
            return;
        }
        if (!freguesiaId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.freguesia_required || 'La freguesia es obligatoria.', this.currentLang);
            return;
        }


        // Fetch names for distrito, concelho, and freguesia
        let distritoNombre = '';
        let concelhoNombre = '';
        let freguesiaNombre = '';
        try {
            const distritoSelect = document.getElementById('createDistritoId');
            const concelhoSelect = document.getElementById('createConcelhoId');
            const freguesiaSelect = document.getElementById('createFreguesiaId');
            distritoNombre = distritoSelect.options[distritoSelect.selectedIndex].text;
            concelhoNombre = concelhoSelect.options[concelhoSelect.selectedIndex].text;
            freguesiaNombre = freguesiaSelect.options[freguesiaSelect.selectedIndex].text;
        } catch (error) {
            console.warn('Could not fetch distrito/concelho/freguesia names:', error);
        }

        // Construct empleadoData to match server DTO
        const empleadoData = {
            id: 0,
            nombre: nombre.trim(),
            apellido1: apellido1.trim(),
            apellido2: formData.get('apellido2')?.trim() || null,
            dniNie: nif.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            password: password.trim(),
            tipo_empleado_id: 1, // Default to 'Administrador' (adjust as needed)
            tipo_empleado_nombre: 'Administrador', // Adjust based on server values
            rol_id: 2, // Default to employee role (adjust as needed)
            direccion: {
                id: 0,
                nombreVia: nombreVia.trim(),
                dirVia: dirVia.trim(),
                clienteId: null,
                empleadoId: 0,
                freguesiaId: parseInt(freguesiaId),
                freguesiaNombre: freguesiaNombre,
                concelhoId: parseInt(concelhoId),
                concelhoNombre: concelhoNombre,
                distritoId: parseInt(distritoId),
                distritoNombre: distritoNombre,
                paisId: 2, // Portugal
                paisNombre: "Portugal",
            }
        };

        console.log('Request payload:', JSON.stringify(empleadoData, null, 2));

        try {
            const newEmpleado = await EmpleadoService.createEmpleado(empleadoData);
            if (!newEmpleado || !newEmpleado.id) {
                throw new Error(Translations[this.currentLang]?.empleados?.invalid_response_create || 'Respuesta inválida del servicio al crear el empleado.');
            }
            EmpleadoView.renderSuccess('pro-inventario', Translations[this.currentLang]?.empleados?.create_success || `Empleado creado exitosamente con ID: ${newEmpleado.id}`, this.currentLang);
            setTimeout(() => {
                window.location.hash = "#home";
            }, 2000);
        } catch (error) {
            console.error('Error al crear empleado:', error);
            let errorMessage = error.message;
            if (error.response && error.response.body && error.response.body.error) {
                errorMessage = error.response.body.error;
            }
            EmpleadoView.renderError('pro-inventario', errorMessage || Translations[this.currentLang]?.empleados?.create_error || 'Error al crear empleado. Por favor, intenta de nuevo.', this.currentLang);
        }
    },

    updateTranslations(lang) {
        this.currentLang = lang;
        this.renderCreateForm();
    },
};

export default EmpleadoController;