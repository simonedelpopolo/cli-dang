/**
 * Object [ error.code ]
 * key:value constants for exitCode.
 *
 * @type {{COMMAND:1,FLAG:2,TYPE:3,INTERNAL:4}}
 */
export const error_code = {
  COMMAND: 1,
  FLAG: 2,
  TYPE: 3,
  INTERNAL: 4,
  UNKNOWN: 5
}

/**
 * Object [ error.add ]
 * Add new property & exitCode.
 *
 * @param {string} key - property name
 * @param {number} value - exitCode
 */
export function add( key, value ){
  error_code[ key ] = value
}

/**
 * Object [ error.replace ]
 * Replace exitCode for property
 *
 * @param {string} key - property name
 * @param {number} value - exitCode
 */
export function replace( key, value ){
  error_code[ key ] = value
}
