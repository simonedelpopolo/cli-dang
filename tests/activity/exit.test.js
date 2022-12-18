import * as assert from 'node:assert/strict'
import * as tttt from 'trythistrythat'
import { exit } from '@cli-dang/activity'
import { resolvers } from 'trythistrythat'
import { spawn } from 'node:child_process'
import { URL } from 'url'

const __dirname = new URL( '.', import.meta.url ).pathname

/**
 * Module filename - exit.test.js
 * test exit()
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  const error = []
  let result = undefined

  let exitCode1 = spawn( `${__dirname}process/exitCode1.js`, { stdio:[ 'ignore', 'inherit', 'inherit', 'ipc' ] } )
  let exitedProcessMessage = undefined

  exitCode1.send( id )
  exitCode1.on( 'message', message => exitedProcessMessage = message )
  exitCode1.on( 'exit', async code => {

    result = await tttt.deepStrictEqual( async () => {

      return resolvers( exitedProcessMessage, id )
    } )

    if( result instanceof Error ){
      success = false
      error.push( result.toLocaleString() )
    }

    result = await tttt.deepStrictEqual( async () => {

      return resolvers( code, 1 )
    } )

    if( result instanceof Error ){
      success = false
      tttt.failed ( 'exit process with message and exit code 1' )
      error.push( result.toLocaleString() )
    }

    tttt.end( id, success, 'exit process with message and exit code 1', error.join( '\n' ) )
  } )
}

/**
 * Module filename - exit.test.js
 * test argument error_type must be an instance of Error exit()
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_error_type_rejects ( id ) {

  let success = true
  let result = undefined

  try {
    await assert.rejects( exit( 'the message error', 'error_type requires to be instanceof Error' ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'error_type argument requires to be instanceof Error throws/rejects' )
  }

  tttt.end( id, success, 'error_type argument requires to be instanceof Error throws/rejects', result )
}

/**
 * Module filename - exit.test.js
 * test argument exit_code must be a Number
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_exit_code_rejects ( id ) {

  let success = true
  let result = undefined

  try {
    await assert.rejects( exit( 'the message error', new Error( 'extra info and stack trace' ), { exit_code: 'must be Number' } ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'exit_code argument requires to be Number throws/rejects' )
  }

  tttt.end( id, success, 'exit_code argument requires to be Number throws/rejects', result )
}

/**
 * Module filename - exit.test.js
 * test argument message must be Uint8Array|Buffer|String
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_message_rejects ( id ) {

  let success = true
  let result = undefined

  try {
    await assert.rejects( exit( 3, new Error( 'extra info and stack trace' ), 1 ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'message argument requires to be Uint8Array|Buffer|String throws/rejects' )
  }

  tttt.end( id, success, 'message argument requires to be Uint8Array|Buffer|String throws/rejects', result )
}

/**
 * Module filename - exit.test.js
 * test argument message could be instanceOf Error
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_message_not_rejects ( id ) {

  let success = true
  let result = undefined

  try {
    await assert.doesNotReject( exit( new Error( 'message' ), new Error( 'extra info and stack trace' ), 1, false ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'message argument can be instanceof Error doesn\'t throws/rejects' )
  }

  tttt.end( id, success, 'message argument can be instanceof Error doesn\'t throws/rejects', result )
}
