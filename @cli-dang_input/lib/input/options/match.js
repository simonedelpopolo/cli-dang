import { Dang } from '@cli-dang/decors'
import { dissect_prop_val } from '@cli-dang/dissection'

/**
 * Match options return the object.
 *
 * @param {string} option - options NOT enclosed in parentheses
 * @param {string} flag_name - in case of error while parsing the options.
 * @returns {Promise<{[unknown:string]: string} | {error: Error}>}
 */
export default async function match( option, flag_name ){

  return dissect_prop_val( option, '|', true )
    .catch( error => {
      let message = ` [dissection-error] ${ Dang.red( error ) } \n`
      message += `    @ ${ process.title } [...] ${ flag_name } -> ${ Dang.underline( Dang.strong( Dang.red( option.toString() ) ) ) } \n`
      message += Dang.red( '                                    ^' )

      return {
        error: new Error( message ),
      }
    } )
}
