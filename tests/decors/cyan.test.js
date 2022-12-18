import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - cyan.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.cyan( 'cyan foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[36mcyan foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.cyan', message )
}

/**
 * Module filename - cyan.test.js
 * cyan background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_cyan( id ){

  let success = true
  let message = Dang.bg_cyan( 'cyan background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[46mcyan background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_cyan', Dang.color( 255, message ) )
}

/**
 * Module filename - cyan.test.js
 * cyan bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_cyan( id ){

  let success = true
  let message = Dang.b_cyan( 'cyan bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[36;1mcyan bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_cyan', message )
}

/**
 * Module filename - cyan.test.js
 * cyan bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_cyan( id ){

  let success = true
  let message = Dang.b_bg_cyan( 'cyan bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[46;1mcyan bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_cyan', Dang.color( 255, message ) )
}
