import match from './options/match.js'
/**
 * Object [ input.options ]
 * parses, if any, the options given to the flag.
 *
 * @param { string }flag_value - the flag value passed to cli.
 * @param { string }flag_name - in case of error while parsing the options.
 * @returns { Promise<{ [ p:string ]:{ [ p:string ], any} }> }
 */
export default async function options( flag_value, flag_name ) {

  // - options enclosed in parentheses
  const options_reg_expression = /\(([^)]+)\)/g
  const matches = Array.from( flag_value.matchAll( options_reg_expression ), matches => matches[ 1 ] )

  const options = matches.length > 0
    ? await match( matches[ 0 ], flag_name )
    : await match( flag_value, flag_name ) === null ? flag_value : await match( flag_value, flag_name )

  return new Promise( resolve => {
    resolve( options )
  } )
}
