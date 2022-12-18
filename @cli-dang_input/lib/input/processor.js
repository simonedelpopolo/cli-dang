import { randomUUID } from 'crypto'

/**
 * Object [ input.processor ]
 * parses the process.argv string[] and returns an object.
 *
 * @param { string[] } argv - given in terminal
 * @returns { Promise<{ object:{ [ p: string ]: any }, keys:string[] }|{ object:{ [ p: string ]: any }, keys:string[] }> }
 */
export default async function processor( argv ) {

  const uuid_empty = randomUUID()
  const uuid_equal = randomUUID()

  // - old RegExp const regExpression = /\s*[^-\s](?![-])[.?]*[=]*.[.?]*\S*/g
  /**
   * With this new RegExp it possible to catch every flag before a command.
   * And so, enabling global flag between commands.
   *
   * @example
   * npx [any-executable-name] --global-flag=anything performance --socket-path...
   * npx [any-executable-name] --global-flag='something else' set --hot...
   * @description with the old RegExp the --global-flag was going be treated as a command due to its position.
   * @type {RegExp}
   */
  const regExpression = /(\s*[^-\s](?![-])[.?]*[=]*[.?]*\S*)(\s*[.?]*)/g
  let argumentsString = ''

  argv.forEach( ( string ) => {
    argumentsString += `${string.replaceAll( ' ', uuid_empty )} `
  } )

  let process_arguments = []
  const matches = Array.from( argumentsString.matchAll( regExpression ), matches => matches[ 1 ] )

  for ( const index in matches ) {
    process_arguments.push( matches[ index ]
      .replaceAll( uuid_empty, ' ' )
      .replace( '=', uuid_equal )
      .split( uuid_equal ) )
  }

  let obj = Object.fromEntries( process_arguments )

  for ( const key in obj ) {
    if( key.search( '-' ) > 0 ) {
      obj[ key.replaceAll( '-', '_' ) ] = obj[ key ]
      delete obj[ key ]
    }
  }

  const keys = Object.keys( obj )

  return new Promise( resolve => {
    resolve( { object:obj, keys:keys } )
  } )
}
