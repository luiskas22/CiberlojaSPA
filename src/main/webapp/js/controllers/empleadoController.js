import EmpleadoView from '../views/empleadoView.js';
import EmpleadoService from '../services/empleadoService.js';
import Translations from '../resources/translations.js';

const EmpleadoController = {
    init(action, lang = 'pt') {
        console.log(`EmpleadoController.init(${action}, ${lang})...`);
        this.currentLang = lang;
        if (action === "create") {
            this.renderCreateForm();
            this.setupEvents();
        }

        // Escuchar cambios de idioma
        document.addEventListener('languageChange', (e) => {
            this.currentLang = e.detail.lang;
            if (window.location.hash === '#crear-empleados') {
                this.renderCreateForm();
            }
        });
    },

    renderCreateForm() {
        try {
            EmpleadoView.renderCreateEmpleadoForm('pro-inventario', this.currentLang);
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

    async handleCreateEmpleado() {
        const form = document.getElementById('createEmpleadoForm');
        if (!form) {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.form_not_found || 'Formulario no encontrado', this.currentLang);
            return;
        }

        const formData = new FormData(form);

        // Validar campos requeridos
        const nombre = formData.get('nombre');
        const apellido1 = formData.get('apellido1');
        const dniNie = formData.get('dniNie');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const password = formData.get('password');
        const tipoEmpleadoId = formData.get('tipo_empleado_id');
        const rolId = formData.get('rol_id');
        const nombreVia = formData.get('direccion[nombreVia]');
        const dirVia = formData.get('direccion[dirVia]');
        const localidadNombre = formData.get('direccion[localidadNombre]');
        const provinciaNombre = formData.get('direccion[provinciaNombre]');
        const paisNombre = formData.get('direccion[paisNombre]');

        // Validaciones básicas
        if (!nombre || nombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.name_required || 'El nombre es obligatorio.', this.currentLang);
            return;
        }
        if (!apellido1 || apellido1.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.apellido1_required || 'El primer apellido es obligatorio.', this.currentLang);
            return;
        }
        if (!dniNie || dniNie.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.dniNie_required || 'El DNI/NIE es obligatorio.', this.currentLang);
            return;
        }
        if (!telefono || telefono.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.telefono_required || 'El teléfono es obligatorio.', this.currentLang);
            return;
        }
        if (!email || email.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.email_required || 'El email es obligatorio.', this.currentLang);
            return;
        }
        if (!password || password.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.password_required || 'La contraseña es obligatoria.', this.currentLang);
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
        if (!localidadNombre || localidadNombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.localidad_required || 'La ciudad es obligatoria.', this.currentLang);
            return;
        }
        if (!provinciaNombre || provinciaNombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.provincia_required || 'La provincia es obligatoria.', this.currentLang);
            return;
        }
        if (!paisNombre || paisNombre.trim() === '') {
            EmpleadoView.renderError('pro-inventario', Translations[this.currentLang]?.empleados?.pais_required || 'El país es obligatorio.', this.currentLang);
            return;
        }

        // Construir el objeto empleadoData
        const empleadoData = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: formData.get('apellido2') || null,
            dniNie: dniNie,
            telefono: telefono,
            email: email,
            password: password,
            tipo_empleado_id: parseInt(tipoEmpleadoId, 10),
            rol_id: parseInt(rolId, 10),
            direccion: {
                nombreVia: nombreVia,
                dirVia: dirVia,
                localidadNombre: localidadNombre,
                provinciaNombre: provinciaNombre,
                paisNombre: paisNombre,
                localidadId: 1, // Valor por defecto (puedes ajustarlo si tienes un servicio para obtener IDs)
                provinciaId: 1, // Valor por defecto
                paisId: 1, // Valor por defecto
                empleadoId: null, // Se establecerá después de crear el empleado
            },
        };

        try {
            const newEmpleado = await EmpleadoService.createEmpleado(empleadoData);
            if (!newEmpleado || !newEmpleado.id) {
                throw new Error(Translations[this.currentLang]?.empleados?.invalid_response_create || 'Respuesta inválida del servicio al crear el empleado.');
            }
            EmpleadoView.renderSuccess('pro-inventario', Translations[this.currentLang]?.empleados?.create_success || `Empleado creado exitosamente con ID: ${newEmpleado.id}`, this.currentLang);
            setTimeout(() => {
                window.location.hash = "#home";
            }, 2000); // Redirigir después de mostrar el mensaje de éxito
        } catch (error) {
            console.error('Error al crear empleado:', error);
            EmpleadoView.renderError('pro-inventario', error.message || Translations[this.currentLang]?.empleados?.create_error || 'Error al crear empleado. Por favor, intenta de nuevo.', this.currentLang);
        }
    },

    updateTranslations(lang) {
        this.currentLang = lang;
        this.renderCreateForm();
    },
};

export default EmpleadoController;