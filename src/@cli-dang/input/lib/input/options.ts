import match from './functions/match'
import { error_message_text } from './functions/text/error_message'
import { oftype_, OftypesError } from 'oftypes'

export async function options( pattern:string, reference_to_flag:string ):Promise<OftypesError|object>{

  /**
   * @ flag options should match the pattern
   * [--flag=option1:value1|option2:value2]
   * | <-- the pipe symbol is mandatory when passing a group of options to a flag.
   *
   * @type {RegExp}
   */
  const options_reg_expression = /(.*)[|](.*)/g
  const matches = Array.from( pattern.matchAll( options_reg_expression ), matches => matches[ 0 ] )

  let matches_single:string[]|boolean = false
  let parsed_options:object|undefined|OftypesError = undefined

  if ( ( await oftype_( matches[ 0 ] ) ) === 'undefined' ) {

    const options_single_reg_expression = /(.*):(.*)/g
    matches_single = Array.from( pattern.matchAll( options_single_reg_expression ), matches => matches[ 0 ] )

    if ( ( await oftype_( matches_single[ 0 ] ) ) === 'undefined' )
      parsed_options = error_message_text( pattern, reference_to_flag )
  }

  parsed_options = await match( matches[ 0 ] || matches_single[ 0 ], !!matches_single[ 0 ] ).catch( error => error )

  return new Promise( ( resolve, reject ) => {
    if( parsed_options instanceof Error )
      reject( parsed_options )

    resolve( parsed_options )
  } )
}
