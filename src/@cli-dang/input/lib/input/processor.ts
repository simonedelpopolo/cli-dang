import { OftypesError } from 'oftypes'
import { ParsedArgv } from './types'
import { randomUUID } from 'node:crypto'

export async function processor( argv:string[] ):Promise<ParsedArgv|OftypesError>{

  return new Promise( ( resolve, reject ) => {

    if( typeof argv === 'undefined' )
      reject( new OftypesError( '♠ argv is undefined' ) )

    if( argv.length === 0 )
      reject( new OftypesError( '♠ empty argv' ) )

    const uuid_empty = randomUUID().slice( 0, 4 )
    const uuid_equal = randomUUID().slice( 0, 4 )

    const regExpression = /([^-](?!-)[.?]*=*[.?]*\S*)(\s*[.?]*)/g
    let argumentsString = ''


    for ( const index in argv ) {

      if( typeof argv[ index ] === 'number' )
        reject( new OftypesError( '♠ no numbers' ) )

      if( argv[ index ].length === 0 )
        reject( new OftypesError( '♠ empty string.' ) )

      if( argv[ index ].match( /^\s+$/ ) )
        reject( new OftypesError( '♠ pattern does not match anything or encountered a problem.' ) )

      argumentsString += `${ argv[ index ].replaceAll( ' ', uuid_empty ) } `/*<-- do not remove this empty chars*/
    }

    const process_arguments = []
    const matches = Array.from( argumentsString.matchAll( regExpression ), matches => matches[ 1 ] )

    for ( const index in matches ) {
      process_arguments.push( matches[ index ]
        .replaceAll( uuid_empty, ' ' )
        .replace( '=', uuid_equal )
        .split( uuid_equal ) )
    }

    const argv_to_object = Object.fromEntries( process_arguments )

    for ( const key in argv_to_object ) {
      if( key.search( '-' ) > 0 ) {
        argv_to_object[ key.replaceAll( '-', '_' ) ] = argv_to_object[ key ]
        delete argv_to_object[ key ]
      }
    }

    resolve( { object:argv_to_object, keys:Object.keys( argv_to_object ) } )
  } )
}
