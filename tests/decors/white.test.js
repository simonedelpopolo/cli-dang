import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - white.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.white( 'white foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[37mwhite foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.white', message )
}

/**
 * Module filename - white.test.js
 * white background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_white( id ){

  let success = true
  let message = Dang.bg_white( 'white background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[47mwhite background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_white', Dang.color( 255, message ) )
}

/**
 * Module filename - white.test.js
 * white bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_white( id ){

  let success = true
  let message = Dang.b_white( 'white bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[37;1mwhite bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_white', message )
}

/**
 * Module filename - white.test.js
 * white bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_white( id ){

  let success = true
  let message = Dang.b_bg_white( 'white bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[47;1mwhite bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_white', Dang.color( 255, message ) )
}
