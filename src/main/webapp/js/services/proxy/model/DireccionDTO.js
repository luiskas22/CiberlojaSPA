/*
 * CiberLoja API
 * API para gestionar tienda 
 *
 * OpenAPI spec version: 1.0
 * Contact: soporte@reflevision.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.68
 *
 * Do not edit the class manually.
 *
 */
import ApiClient from '../ApiClient.js';

/**
 * The DireccionDTO model module.
 * @module model/DireccionDTO
 * @version 1.0
 */
export default class DireccionDTO {
  /**
   * Constructs a new <code>DireccionDTO</code>.
   * @alias module:model/DireccionDTO
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>DireccionDTO</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DireccionDTO} obj Optional instance to populate.
   * @return {module:model/DireccionDTO} The populated <code>DireccionDTO</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new DireccionDTO();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('nombreVia'))
        obj.nombreVia = ApiClient.convertToType(data['nombreVia'], 'String');
      if (data.hasOwnProperty('dirVia'))
        obj.dirVia = ApiClient.convertToType(data['dirVia'], 'String');
      if (data.hasOwnProperty('clienteId'))
        obj.clienteId = ApiClient.convertToType(data['clienteId'], 'Number');
      if (data.hasOwnProperty('empleadoId'))
        obj.empleadoId = ApiClient.convertToType(data['empleadoId'], 'Number');
      if (data.hasOwnProperty('localidadId'))
        obj.localidadId = ApiClient.convertToType(data['localidadId'], 'Number');
      if (data.hasOwnProperty('localidadNombre'))
        obj.localidadNombre = ApiClient.convertToType(data['localidadNombre'], 'String');
      if (data.hasOwnProperty('provinciaId'))
        obj.provinciaId = ApiClient.convertToType(data['provinciaId'], 'Number');
      if (data.hasOwnProperty('provinciaNombre'))
        obj.provinciaNombre = ApiClient.convertToType(data['provinciaNombre'], 'String');
      if (data.hasOwnProperty('paisId'))
        obj.paisId = ApiClient.convertToType(data['paisId'], 'Number');
      if (data.hasOwnProperty('paisNombre'))
        obj.paisNombre = ApiClient.convertToType(data['paisNombre'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
DireccionDTO.prototype.id = undefined;

/**
 * @member {String} nombreVia
 */
DireccionDTO.prototype.nombreVia = undefined;

/**
 * @member {String} dirVia
 */
DireccionDTO.prototype.dirVia = undefined;

/**
 * @member {Number} clienteId
 */
DireccionDTO.prototype.clienteId = undefined;

/**
 * @member {Number} empleadoId
 */
DireccionDTO.prototype.empleadoId = undefined;

/**
 * @member {Number} localidadId
 */
DireccionDTO.prototype.localidadId = undefined;

/**
 * @member {String} localidadNombre
 */
DireccionDTO.prototype.localidadNombre = undefined;

/**
 * @member {Number} provinciaId
 */
DireccionDTO.prototype.provinciaId = undefined;

/**
 * @member {String} provinciaNombre
 */
DireccionDTO.prototype.provinciaNombre = undefined;

/**
 * @member {Number} paisId
 */
DireccionDTO.prototype.paisId = undefined;

/**
 * @member {String} paisNombre
 */
DireccionDTO.prototype.paisNombre = undefined;

