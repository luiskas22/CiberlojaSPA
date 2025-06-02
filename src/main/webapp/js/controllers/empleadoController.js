import EmpleadoView from '../views/empleadoView.js';
import EmpleadoService from '../services/empleadoService.js';
import DireccionService from '../services/direccionService.js';
import Translations from '../resources/translations.js';

const EmpleadoController = {
    init(action, lang = 'pt') {
        console.log(`EmpleadoController.init(${action}, ${lang})...`);
        this.currentLang = lang;
        this.localidades = []; // Cache localities
        this.provincias = []; // Cache provinces
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
            const [localidades, provincias] = await Promise.all([
                DireccionService.getLocalidades(),
                DireccionService.getProvincias()
            ]);
            this.localidades = localidades; // Cache localities
            this.provincias = provincias; // Cache provinces
            EmpleadoView.renderCreateEmpleadoForm('pro-inventario', this.currentLang, localidades, provincias);
            this.setupProvinceChangeListener(); // Set up listener after rendering
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

    setupProvinceChangeListener() {
        const provinciaSelect = document.getElementById('createProvinciaId');
        const localidadSelect = document.getElementById('createLocalidadId');

        if (!provinciaSelect || !localidadSelect) {
            console.warn('Province or locality select not found');
            return;
        }

        provinciaSelect.addEventListener('change', () => {
            const provinciaId = provinciaSelect.value;
            localidadSelect.innerHTML = `<option value="" data-i18n="empleados.create.selectLocalidad">${Translations[this.currentLang]?.empleados?.create?.selectLocalidad || 'Seleccione una localidad'}</option>`;

            if (provinciaId) {
                const filteredLocalidades = this.localidades.filter(loc => loc.provinciaId == provinciaId);
                filteredLocalidades.forEach(loc => {
                    const option = document.createElement('option');
                    option.value = loc.id;
                    option.textContent = loc.nombre;
                    localidadSelect.appendChild(option);
                });
            } else {
                this.localidades.forEach(loc => {
                    const option = document.createElement('option');
                    option.value = loc.id;
                    option.textContent = loc.nombre;
                    localidadSelect.appendChild(option);
                });
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
        const dniNie = formData.get('dniNie');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const password = formData.get('password');
        const tipoEmpleadoId = formData.get('tipo_empleado_id');
        const rolId = formData.get('rol_id');
        const localidadId = formData.get('direccion[localidadId]');
        const provinciaId = formData.get('direccion[provinciaId]');
        const nombreVia = formData.get('direccion[nombreVia]');
        const dirVia = formData.get('direccion[dirVia]');
        const paisNombre = formData.get('direccion[paisNombre]');

        if (!nombre || nombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.name_required || 'El nombre es obligatorio.', this.currentLang);
            return;
        }
        if (!apellido1 || apellido1.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.apellido1_required || 'El primer apellido es obligatorio.', this.currentLang);
            return;
        }
        if (!dniNie || !/^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/.test(dniNie.trim())) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.dniNie_invalid || 'El DNI/NIE debe tener un formato válido (8 dígitos + letra o X/Y/Z + 7 dígitos + letra).', this.currentLang);
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
        if (!tipoEmpleadoId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.tipoEmpleado_required || 'Seleccione un tipo de empleado.', this.currentLang);
            return;
        }
        if (!rolId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.rol_required || 'Seleccione un rol.', this.currentLang);
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
        if (!localidadId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.localidad_required || 'La localidad es obligatoria.', this.currentLang);
            return;
        }
        if (!provinciaId) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.provincia_required || 'La provincia es obligatoria.', this.currentLang);
            return;
        }
        if (!paisNombre || paisNombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.pais_required || 'El país es obligatorio.', this.currentLang);
            return;
        }

        // Fetch locality and province names
        let localidadNombre = '';
        let provinciaNombre = '';
        try {
            const localidad = this.localidades.find(loc => loc.id === parseInt(localidadId));
            const provincia = this.provincias.find(prov => prov.id === parseInt(provinciaId));
            localidadNombre = localidad ? localidad.nombre : '';
            provinciaNombre = provincia ? provincia.nombre : '';
        } catch (error) {
            console.warn('Could not fetch localidad/provincia names:', error);
        }

        // Construct empleadoData to match server DTO
        const empleadoData = {
            id: 0,
            nombre: nombre.trim(),
            apellido1: apellido1.trim(),
            apellido2: formData.get('apellido2')?.trim() || null,
            dniNie: dniNie.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            password: password.trim(),
            tipo_empleado_id: parseInt(tipoEmpleadoId),
            tipo_empleado_nombre: tipoEmpleadoId === '1' ? 'Administrador' : 'Vendedor', // Adjust based on server values
            rol_id: parseInt(rolId),
            direccion: {
                id: 0,
                nombreVia: nombreVia.trim(),
                dirVia: dirVia.trim(),
                clienteId: 0,
                empleadoId: 0,
                localidadId: parseInt(localidadId),
                localidadNombre: localidadNombre,
                provinciaId: parseInt(provinciaId),
                provinciaNombre: provinciaNombre,
                paisId: 1,
                paisNombre: paisNombre.trim()
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