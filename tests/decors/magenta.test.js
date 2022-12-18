import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - magenta.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.magenta( 'magenta foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[35mmagenta foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.magenta', message )
}

/**
 * Module filename - magenta.test.js
 * magenta background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_magenta( id ){

  let success = true
  let message = Dang.bg_magenta( 'magenta background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[45mmagenta background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_magenta', Dang.color( 255, message ) )
}

/**
 * Module filename - magenta.test.js
 * magenta bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_magenta( id ){

  let success = true
  let message = Dang.b_magenta( 'magenta bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[35;1mmagenta bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_magenta', message )
}

/**
 * Module filename - magenta.test.js
 * magenta bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_magenta( id ){

  let success = true
  let message = Dang.b_bg_magenta( 'magenta bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[45;1mmagenta bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_magenta', Dang.color( 255, message ) )
}
