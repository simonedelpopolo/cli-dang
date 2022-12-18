import { stderr_argument_type_check } from './stderr/type.js'

/**
 * Object [ activity.stderr ]
 * Wrapper for process.stderr.write.
 *
 * @param {Buffer|Uint8Array|string} message - The message to the stderr.
 * @param {boolean=} [mute=false] - for debug and test only do not print
 * @throws OftypesError
 * @returns {Promise<Buffer|Uint8Array|string>|Buffer|Uint8Array|string}
 */
export default async function stderr( message, mute = false ){

  let type
  for await ( const check of await stderr_argument_type_check( message ) )
    type = check

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error ) reject( type )
    else if( ! mute )
      process.stderr.write( message )
    resolve( message )

  } )
}
