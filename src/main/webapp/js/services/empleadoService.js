import ApiClient from './proxy/ApiClient.js';
import DefaultApi from './proxy/api/DefaultApi.js';

// Crear una instancia de ApiClient
const apiClient = new ApiClient();

// Crear una instancia de DefaultApi
const defaultApi = new DefaultApi(apiClient);

const EmpleadoService = {
    async createEmpleado(empleadoData) {
        try {
            console.log("Enviando datos de registro:", empleadoData);

            if (!empleadoData || typeof empleadoData !== 'object') {
                throw new Error('Datos de empleado inválidos');
            }

            console.log("Payload a enviar:", empleadoData);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            try {
                const response = await fetch("http://192.168.99.40:8080/ciberloja-rest-api/api/empleado/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(empleadoData),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                console.log('Full response:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                });

                const responseText = await response.text();
                console.log('Response text:', responseText);

                if (!response.ok) {
                    let errorMessage = `Error ${response.status}: ${response.statusText}`;
                    try {
                        const errorData = JSON.parse(responseText);
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } catch (parseError) {
                        errorMessage = responseText || errorMessage;
                    }
                    throw new Error(errorMessage);
                }

                let data = {};
                if (responseText && responseText.trim()) {
                    try {
                        data = JSON.parse(responseText);
                    } catch (parseError) {
                        console.error('Failed to parse response:', parseError);
                        data = { success: true, message: 'Empleado creado exitosamente' };
                    }
                } else {
                    data = { success: true, message: 'Empleado creado exitosamente' };
                }

                console.log("Empleado registrado con éxito:", data);
                return data;

            } catch (fetchError) {
                clearTimeout(timeoutId);

                if (fetchError.name === 'AbortError') {
                    throw new Error('La solicitud ha tardado demasiado tiempo. Por favor, intenta de nuevo.');
                }

                throw fetchError;
            }

        } catch (error) {
            console.error("Detalles completos del error al registrar el usuario:", {
                message: error.message,
                name: error.name,
                stack: error.stack
            });

            if (error.message.includes('fetch')) {
                throw new Error('Error de conexión. Verifica tu conexión a internet y que el servidor esté disponible.');
            }

            if (error.message.includes('CORS')) {
                throw new Error('Error de CORS. El servidor debe permitir requests desde este origen.');
            }

            throw error;
        }
    },
};

export default EmpleadoService;