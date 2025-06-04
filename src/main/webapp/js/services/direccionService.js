import ApiClient from './proxy/ApiClient.js';
import DefaultApi from './proxy/api/DefaultApi.js';

const apiClient = new ApiClient();
const defaultApi = new DefaultApi(apiClient);

const DireccionService = {
  async deleteDireccion(clienteId, direccionId) {
    return new Promise((resolve, reject) => {
      console.log(`Eliminando dirección ${direccionId} del cliente ${clienteId}...`);
      const opts = { id: direccionId };
      defaultApi.deleteDireccion(opts, (error, data, response) => {
        if (error) {
          console.error(`Error al eliminar dirección ${direccionId} del cliente ${clienteId}:`, error);
          reject(error);
        } else {
          console.log(`Dirección ${direccionId} eliminada con éxito.`);
          resolve(data);
        }
      });
    });
  },

  async createDireccion(direccion) {
    return new Promise((resolve, reject) => {
      console.log("Creando nueva dirección:", direccion);
      if (!direccion || !direccion.nombreVia || !direccion.dirVia || !direccion.freguesiaId || !direccion.clienteId || !direccion.concelhoId || !direccion.distritoId) {
        reject(new Error("La dirección debe contener nombreVia, dirVia, freguesiaId, concelhoId, distritoId y clienteId válidos"));
        return;
      }
      fetch(`http://192.168.99.40:8080/ciberloja-rest-api/api/direccion/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(direccion)
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 400) throw new Error("Datos de dirección inválidos.");
            if (response.status === 500) throw new Error("Error interno del servidor.");
            throw new Error(`Error al crear la dirección: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Dirección creada con éxito:", data);
          resolve(data);
        })
        .catch(error => {
          console.error("Error en la solicitud:", error);
          reject(error);
        });
    });
  },

  async updateDireccion(direccion) {
    try {
      console.log("Enviando solicitud PUT con datos:", JSON.stringify(direccion, null, 2));
      if (!direccion || !direccion.id || !direccion.nombreVia || !direccion.dirVia || !direccion.freguesiaId || !direccion.concelhoId || !direccion.distritoId) {
        throw new Error("La dirección debe contener id, nombreVia, dirVia, freguesiaId, concelhoId y distritoId válidos");
      }
      const response = await fetch(`http://192.168.99.40:8080/ciberloja-rest-api/api/direccion/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(direccion)
      });
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 400) throw new Error("Datos de dirección inválidos.");
        if (response.status === 404) throw new Error("Dirección no encontrada.");
        if (response.status === 500) throw new Error("Error interno del servidor.");
        throw new Error(`Error al actualizar la dirección: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log("Dirección actualizada con éxito:", data);
      return data;
    } catch (error) {
      console.error("Error al actualizar la dirección:", error);
      throw error;
    }
  },

  async getDistritos() {
    return new Promise((resolve, reject) => {
      console.log("Obteniendo todos los Distritos...");
      defaultApi.findAllDistritos((error, data, response) => {
        if (error) {
          console.error("Error al obtener los Distritos:", error);
          reject(error);
        } else {
          resolve(response.body.map(dist => ({
            id: dist.id,
            nombre: dist.nombre
          })));
        }
      });
    });
  },

  async getConcelhos(distritoId = null) {
    return new Promise((resolve, reject) => {
      console.log(`Obteniendo Concelhos${distritoId ? ` para distrito ${distritoId}` : ''}...`);
      defaultApi.findAllConcelhos((error, data, response) => {
        if (error) {
          console.error("Error al obtener los Concelhos:", error);
          reject(error);
        } else {
          let concelhos = response.body.map(conc => ({
            id: conc.id,
            nombre: conc.nombre,
            distritoId: conc.distrito?.id || conc.distritoId
          }));
          if (distritoId) {
            concelhos = concelhos.filter(conc => conc.distritoId == distritoId);
          }
          resolve(concelhos);
        }
      });
    });
  },

  async getFreguesias(concelhoId = null) {
    return new Promise((resolve, reject) => {
      console.log(`Obteniendo Freguesias${concelhoId ? ` para concelho ${concelhoId}` : ''}...`);
      defaultApi.findAllFreguesias((error, data, response) => {
        if (error) {
          reject(error);
        } else {
          let freguesias = response.body.map(loc => ({
            id: loc.id,
            nombre: loc.nombre,
            concelhoId: loc.concelho?.id || loc.concelhoId
          }));
          if (concelhoId) {
            freguesias = freguesias.filter(loc => loc.concelhoId == concelhoId);
          }
          resolve(freguesias);
        }
      });
    });
  },

  async getPaises() {
    return new Promise((resolve, reject) => {
      console.log("Obteniendo todos los Paises...");
      defaultApi.findAllPaises((error, data, response) => {
        if (error) {
          console.error("Error al obtener los Paises:", error);
          reject(error);
        } else {
          resolve(response.body.map(pais => ({
            id: pais.id,
            nombre: pais.nombre
          })));
        }
      });
    });
  },

  async getAdresses(clienteId) {
    return new Promise((resolve, reject) => {
      console.log(`Obteniendo direcciones para el cliente ${clienteId}...`);
      fetch(`http://192.168.99.40:8080/ciberloja-rest-api/api/direccion/direcciones/${clienteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 400) throw new Error("ID de cliente inválido.");
            if (response.status === 404) throw new Error("No se encontraron direcciones para el cliente.");
            if (response.status === 500) throw new Error("Error interno del servidor.");
            throw new Error(`Error al obtener direcciones: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(`Direcciones obtenidas para el cliente ${clienteId}:`, data);
          resolve(data.map(d => ({
            id: d.id,
            nombreVia: d.nombreVia,
            dirVia: d.dirVia,
            freguesiaId: d.freguesiaId,
            freguesiaNombre: d.freguesiaNombre,
            concelhoId: d.concelhoId,
            concelhoNombre: d.concelhoNombre,
            distritoId: d.distritoId,
            distritoNombre: d.distritoNombre,
            clienteId: d.clienteId,
            isDefault: d.isDefault || false
          })));
        })
        .catch(error => {
          console.error(`Error al obtener direcciones para el cliente ${clienteId}:`, error);
          reject(error);
        });
    });
  },
};

export default DireccionService;