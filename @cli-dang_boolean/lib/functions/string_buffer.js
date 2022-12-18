import { buffer_, string_ } from 'oftypes'

/**
 * It checks if the given argument has the right requested type.
 *
 * @param { any | Buffer} variable - The given variable to the string argument.
 * @returns {Promise|PromiseFulfilledResult<string>|PromiseRejectedResult<string>}
 */
export async function string_buffer( variable ){
  let is_string

  if ( await buffer_( variable ) === true )
    is_string = variable.toString( 'utf-8' )

  else if ( await string_( variable ) === true )
    is_string = variable

  else
    is_string = false

  return new Promise( ( resolve, reject ) => {

    if ( is_string === false )
      reject( 'no-string' )

    resolve( is_string )

  } )
}
