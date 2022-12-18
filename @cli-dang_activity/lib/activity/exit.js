import { exit_argument_type_check } from './exit/type.js'
import { stderr }  from '../../index.js'

/**
 * Object [ activity.exit ]
 * exit process with message and exit code
 *
 * @param {string|Buffer|Uint8Array|Error} message - of error
 * @param {Error=} error_type - Default dynamically generated error message based on process.title
 * @param {number=} [exit_code=1] - for the process
 * @param {boolean=} [process_exit=true] - if set to false will resolve the promise with the stack trace and erro message.
 * @param {boolean=} [mute=false] - do not print
 * @returns {Promise<void>|void}
 */
export default async function exit( message, error_type = new Error( `${process.title} ♠ error - internal` ), exit_code = 1, process_exit = true, mute = false ){

  let type
  for await ( const check of await exit_argument_type_check( message, error_type, exit_code ) ) {
    if( check instanceof Error ) {
      type = check
      break
    }
    type = check
  }

  if( !( type instanceof Error ) && process_exit && ! mute )
    await stderr( `\n${message.error || message}\n\n          [stacktrace]\n          ${error_type.stack}\n\n` )

  return new Promise( ( resolve, reject ) => {
    if( type instanceof Error ) reject( type )

    else if( ! process_exit  ) resolve( `\n${message.error || message}\n\n          [stacktrace]\n          ${error_type.stack}\n exit code -> ${exit_code}\n\n` )

    else process.exit( exit_code )
  } )
}
