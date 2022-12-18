import { array_ } from 'oftypes'

/**
 * It checks that the argument passed is an array.
 *
 * @param {any} variable - The given variable to the array argument.
 * @returns {Promise<void>}
 */
export async function _array( variable ){

  let is_array
  if ( await array_( variable ) === true )
    is_array = variable
  else
    is_array = false

  return new Promise( ( ( resolve ) => {

    if( is_array === false )
      resolve( false )

    resolve( is_array )
  } ) )
}
