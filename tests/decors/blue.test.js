import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - blue.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.blue( 'blue foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[34mblue foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.blue', message )
}

/**
 * Module filename - blue.test.js
 * blue background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_blue( id ){

  let success = true
  let message = Dang.bg_blue( 'blue background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[44mblue background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_blue', Dang.color( 255, message ) )
}

/**
 * Module filename - blue.test.js
 * blue bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_blue( id ){

  let success = true
  let message = Dang.b_blue( 'blue bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[34;1mblue bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_blue', message )
}

/**
 * Module filename - blue.test.js
 * blue bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_blue( id ){

  let success = true
  let message = Dang.b_bg_blue( 'blue bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[44;1mblue bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_blue', Dang.color( 255, message ) )
}
