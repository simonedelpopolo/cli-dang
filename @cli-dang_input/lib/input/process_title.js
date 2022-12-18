import { Dang } from '@cli-dang/decors'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'
import { string_ } from 'oftypes'

/**
 * Object [ input.process_title ]
 * Switches process.title returning an object containing command, flags and options to be digested.
 * The returned Promise always resolves.
 *
 * @param {{object:{[p: string]: any}, keys:string[]}} process_parsed_argv - Object.
 * @param {{[unknown]: (function({object:{[p: string]: any}, keys:string[]}): Promise<{[p:object]:any}>), executable: string[]}} logic - process selection
 * @param {boolean|string} [ejected=false] - when necessary to skip the process.title check, set this to the process.title that should have been used here
 * @returns {Promise<{[p:object]:any}>|{[p:object]:any}}
 */
export default async function process_title( process_parsed_argv, logic, ejected = false ){

  const promise = {
    resolve: null,
    reject: false
  }

  if( logic.executable.includes( process.title ) ) promise.resolve = await logic[ process.title ]( process_parsed_argv )
  else if( await string_( ejected ) ) promise.resolve = await logic[ ejected ]( process_parsed_argv )
  else promise.reject = true

  if( promise.reject ) await exit( Dang.red( `        process.title -> \`${ process.title }\` not recognize` ), new ReferenceError( 'INTERNAL-error' ), error_code.INTERNAL )

  return promise.resolve

}
