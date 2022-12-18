import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - red.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.red( 'red foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[31mred foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.red' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.red', message )
}

/**
 * Module filename - red.test.js
 * red background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_red( id ){

  let success = true
  let message = Dang.bg_red( 'red background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[41mred background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_red' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_red', Dang.color( 255, message ) )
}

/**
 * Module filename - red.test.js
 * red bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_red( id ){

  let success = true
  let message = Dang.b_red( 'red bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[31;1mred bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_red' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_red', message )
}

/**
 * Module filename - red.test.js
 * red bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_red( id ){

  let success = true
  let message = Dang.b_bg_red( 'red bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[41;1mred bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_red' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_red', Dang.color( 255, message ) )
}
