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
import DireccionDTO from './DireccionDTO.js';

/**
 * The ClienteDTO model module.
 * @module model/ClienteDTO
 * @version 1.0
 */
export default class ClienteDTO {
  /**
   * Constructs a new <code>ClienteDTO</code>.
   * @alias module:model/ClienteDTO
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ClienteDTO</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClienteDTO} obj Optional instance to populate.
   * @return {module:model/ClienteDTO} The populated <code>ClienteDTO</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ClienteDTO();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('nickname'))
        obj.nickname = ApiClient.convertToType(data['nickname'], 'String');
      if (data.hasOwnProperty('nombre'))
        obj.nombre = ApiClient.convertToType(data['nombre'], 'String');
      if (data.hasOwnProperty('apellido1'))
        obj.apellido1 = ApiClient.convertToType(data['apellido1'], 'String');
      if (data.hasOwnProperty('apellido2'))
        obj.apellido2 = ApiClient.convertToType(data['apellido2'], 'String');
      if (data.hasOwnProperty('dniNie'))
        obj.dniNie = ApiClient.convertToType(data['dniNie'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('telefono'))
        obj.telefono = ApiClient.convertToType(data['telefono'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('rol_id'))
        obj.rolId = ApiClient.convertToType(data['rol_id'], 'Number');
      if (data.hasOwnProperty('direcciones'))
        obj.direcciones = ApiClient.convertToType(data['direcciones'], [DireccionDTO]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ClienteDTO.prototype.id = undefined;

/**
 * @member {String} nickname
 */
ClienteDTO.prototype.nickname = undefined;

/**
 * @member {String} nombre
 */
ClienteDTO.prototype.nombre = undefined;

/**
 * @member {String} apellido1
 */
ClienteDTO.prototype.apellido1 = undefined;

/**
 * @member {String} apellido2
 */
ClienteDTO.prototype.apellido2 = undefined;

/**
 * @member {String} dniNie
 */
ClienteDTO.prototype.dniNie = undefined;

/**
 * @member {String} email
 */
ClienteDTO.prototype.email = undefined;

/**
 * @member {String} telefono
 */
ClienteDTO.prototype.telefono = undefined;

/**
 * @member {String} password
 */
ClienteDTO.prototype.password = undefined;

/**
 * @member {Number} rolId
 */
ClienteDTO.prototype.rolId = undefined;

/**
 * @member {Array.<module:model/DireccionDTO>} direcciones
 */
ClienteDTO.prototype.direcciones = undefined;

