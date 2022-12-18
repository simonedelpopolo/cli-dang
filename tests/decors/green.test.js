import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - green.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.green( 'green foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[32mgreen foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.green', message )
}

/**
 * Module filename - green.test.js
 * green background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_green( id ){

  let success = true
  let message = Dang.bg_green( 'green background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[42mgreen background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_green', Dang.color( 255, message ) )
}

/**
 * Module filename - green.test.js
 * green bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_green( id ){

  let success = true
  let message = Dang.b_green( 'green bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[32;1mgreen bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_green', message )
}

/**
 * Module filename - green.test.js
 * green bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_green( id ){

  let success = true
  let message = Dang.b_bg_green( 'green bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[42;1mgreen bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_green', Dang.color( 255, message ) )
}
