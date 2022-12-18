import * as assert from 'node:assert/strict'
import * as tttt from 'trythistrythat'
import { resolvers } from 'trythistrythat'
import { stderr } from '@cli-dang/activity'


/**
 * Module filename - stderr.test.js
 * test argument message String
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let result = undefined

  try {
    await assert.doesNotReject( stderr( 'process.stderr.write({String})\n', true ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'String doesn\'t throws/rejects' )
  }

  tttt.end( id, success, 'String doesn\'t throws/rejects', result )
}

/**
 * Module filename - stderr.test.js
 * test argument message Buffer
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_message_buffer_not_rejects ( id ){

  let success = true
  let result = undefined

  try {
    await assert.doesNotReject( stderr( Buffer.from( 'process.stderr.write({Buffer})\n' ), true ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'Buffer doesn\'t throws/rejects' )
  }

  tttt.end( id, success, 'Buffer doesn\'t throws/rejects', result )
}

/**
 * Module filename - stderr.test.js
 * test argument message Uint8Array
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_message_uint8array_not_rejects ( id ){

  let success = true
  let result = undefined

  try {
    // - generating Uint8Array form string[] of characters.
    let messageArray = Array.from( 'process.stderr.write({Uint8Array})\n' )
    const message_length = messageArray.length
    const messageBufferView = new Uint8Array( message_length )
    for ( const char in messageArray ) messageBufferView[ char ] = messageArray[ char ].codePointAt( 0 )
    await assert.doesNotReject( stderr( messageBufferView, true ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'Uint8Array doesn\'t throws/rejects' )
  }

  tttt.end( id, success, 'Uint8Array doesn\'t throws/rejects', result )
}

/**
 * Module filename - stderr.test.js
 * test argument message Number
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function argument_message_number_rejects ( id ){

  let success = true
  let result = undefined

  try {

    await assert.rejects( stderr( 3 ) )

  }catch ( AssertionError ) {
    success = false
    result = AssertionError.toLocaleString()
    tttt.failed ( 'Number throws/rejects' )
  }

  tttt.end( id, success, 'Number throws/rejects', result )
}

/**
 * Module filename - stderr.test.js
 * stderr async function always resolves with message
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function stderr_resolves_message( id ){

  let success = true
  let error = undefined
  let result
  let message = await stderr( 'message is resolved always', true )

  result = await tttt.deepStrictEqual( async () => {

    return resolvers( message, 'message is resolved always' )
  } )

  if( result instanceof Error ){
    tttt.failed ( 'stderr async function always resolves with message' )
    success = false
    error = result.toLocaleString()
  }

  tttt.end( id, success, 'stderr async function always resolves with message', error )
}
