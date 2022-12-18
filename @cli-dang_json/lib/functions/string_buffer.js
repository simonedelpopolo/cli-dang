import { buffer_, object_, oftype_, string_ } from 'oftypes'
import { parse } from '../../index.js'

/**
 * It checks if the given argument has the right requested type.
 *
 * @param { any | Buffer} variable - The given variable to the string argument.
 * @param {string} jsn_property - Default ise set to check the property parse, otherwise checks is_json.
 * @returns {string|Buffer}
 */
export async function string_buffer( variable, jsn_property = 'parse' ){
  let is_string

  if( await buffer_( variable ) === true )
    is_string = variable.toString( 'utf-8' )

  else if ( await string_( variable ) === true )
    is_string = variable

  else
    is_string = false

  // eslint-disable-next-line default-case
  switch ( jsn_property ){

    case 'parse':

      return new Promise( ( resolve ) => {

        if( is_string === false )
          resolve( false )

        resolve( is_string )
      } )

    case 'is_json': {

      let parsed
      if ( await oftype_( is_string ) !== 'Boolean' ) {

        parsed = await parse( is_string ).catch( error => error )
        if ( await object_( parsed ) === true )
          parsed = true
      }

      return new Promise( ( ( resolve ) => {

        resolve( [ is_string, parsed ] )

      } ) )
    }
  }
}
