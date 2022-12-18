import { process_title, processor } from '../../index.js'

/**
 * Object [input.entry_point].
 * Shared entry point for the available executable files.
 * Its return an object from the given process.argv.
 * Object [input.process_title] elaborates commands, flags and options dispatching to the right process switching the process.title.
 *
 * @param {string[]} argv - The process.argv passed to the process.
 * @param {{[unknown]: (function({object:{[p: string]: any}, keys:string[]}): Promise<{[p:object]:any}>), executable: string[]}} logic - process selection
 * @param {boolean|string} [ejected=false] - when necessary to skip the process.title check, set this to the process.title that should have been used here
 * @returns {Promise<{[p:object]:any}>| {[p:object]:any}}
 */
export default async function entry_point( argv, logic, ejected = false ) {

  return process_title( await processor( argv ), logic, ejected )
}

