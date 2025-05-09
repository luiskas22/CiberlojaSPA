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
 * The FormDataContentDisposition model module.
 * @module model/FormDataContentDisposition
 * @version 1.0
 */
export default class FormDataContentDisposition {
  /**
   * Constructs a new <code>FormDataContentDisposition</code>.
   * @alias module:model/FormDataContentDisposition
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>FormDataContentDisposition</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FormDataContentDisposition} obj Optional instance to populate.
   * @return {module:model/FormDataContentDisposition} The populated <code>FormDataContentDisposition</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FormDataContentDisposition();
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('parameters'))
        obj.parameters = ApiClient.convertToType(data['parameters'], {'String': 'String'});
      if (data.hasOwnProperty('fileName'))
        obj.fileName = ApiClient.convertToType(data['fileName'], 'String');
      if (data.hasOwnProperty('creationDate'))
        obj.creationDate = ApiClient.convertToType(data['creationDate'], 'Date');
      if (data.hasOwnProperty('modificationDate'))
        obj.modificationDate = ApiClient.convertToType(data['modificationDate'], 'Date');
      if (data.hasOwnProperty('readDate'))
        obj.readDate = ApiClient.convertToType(data['readDate'], 'Date');
      if (data.hasOwnProperty('size'))
        obj.size = ApiClient.convertToType(data['size'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} type
 */
FormDataContentDisposition.prototype.type = undefined;

/**
 * @member {Object.<String, String>} parameters
 */
FormDataContentDisposition.prototype.parameters = undefined;

/**
 * @member {String} fileName
 */
FormDataContentDisposition.prototype.fileName = undefined;

/**
 * @member {Date} creationDate
 */
FormDataContentDisposition.prototype.creationDate = undefined;

/**
 * @member {Date} modificationDate
 */
FormDataContentDisposition.prototype.modificationDate = undefined;

/**
 * @member {Date} readDate
 */
FormDataContentDisposition.prototype.readDate = undefined;

/**
 * @member {Number} size
 */
FormDataContentDisposition.prototype.size = undefined;

/**
 * @member {String} name
 */
FormDataContentDisposition.prototype.name = undefined;

