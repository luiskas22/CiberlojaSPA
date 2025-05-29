import ApiClient from './proxy/ApiClient.js';
import DefaultApi from './proxy/api/DefaultApi.js';

// Crear una instancia de ApiClient
const apiClient = new ApiClient();

// Crear una instancia de DefaultApi
const defaultApi = new DefaultApi(apiClient);

const EmpleadoService = {
    async createEmpleado(empleadoData) {
        return new Promise((resolve, reject) => {
            console.log("Enviando petición para crear empleado con datos:", empleadoData);
            defaultApi.createEmpleado(empleadoData, (error, data, response) => {
                if (error) {
                    console.error("Error en la petición a la API:", error);
                    if (error.response) {
                        console.error("Código de estado HTTP:", error.response.status);
                        console.error("Respuesta del servidor:", error.response.body);
                    } else if (error.request) {
                        console.error("No se recibió respuesta del servidor. Verifique la conexión de red.");
                    } else {
                        console.error("Error al configurar la solicitud:", error.message);
                    }
                    reject(error);
                } else {
                    console.log("Empleado creado:", data);
                    resolve(data);
                }
            });
        });
    }
}

export default EmpleadoService;