import { _array } from './functions/_array.js'

/**
 * Object [ json.property_value ]
 *
 * Given an array it will give back an JSON string object
 * where, the first entry of the array will be the property name of the object
 * and the second entry of the array will be the value of the property.
 * !The given array length must be multiple of two.
 *
 * @param {string[]|number[]} array - The give array.
 * @param {boolean=false} obj - If set to true it will give back an object instead of a json string.
 * @returns {Promise | PromiseFulfilledResult<string|object> | PromiseRejectedResult<string>}
 */
export default async function property_value( array, obj = false ) {

  let is_array
  is_array = await _array( array )

  return new Promise( ( resolve, reject ) => {

    let json
    let even = 0
    let property_value = []

    if( is_array === false )
      reject( `this method accept only Array. Given type: ${ typeof array }` )

    if ( is_array.length % 2 !== 0 )
      reject( 'this method accept only Array that have at least two entries or multiple of 2' )

    for ( const key in is_array ) {

      if ( even + parseInt( key ) % 2 === 0 )
        property_value.push( Array.of( is_array[ parseInt( key ) ], is_array[ parseInt( key ) + 1 ] ) )

    }

    json = Object.fromEntries( property_value )

    resolve( obj === false ? JSON.stringify( json ) : json )

  } )
}
