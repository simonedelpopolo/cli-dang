import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - yellow.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.yellow( 'yellow foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[33myellow foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.yellow' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.yellow', message )
}

/**
 * Module filename - yellow.test.js
 * yellow background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function bg_yellow( id ){

  let success = true
  let message = Dang.bg_yellow( 'yellow background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[43myellow background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_yellow' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_yellow', Dang.color( 255, message ) )
}

/**
 * Module filename - yellow.test.js
 * yellow bold
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_yellow( id ){

  let success = true
  let message = Dang.b_yellow( 'yellow bold' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[33;1myellow bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_yellow' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_yellow', message )
}

/**
 * Module filename - yellow.test.js
 * yellow bold background
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function b_bg_yellow( id ){

  let success = true
  let message = Dang.b_bg_yellow( 'yellow bold background' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[43;1myellow bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_yellow' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_yellow', Dang.color( 255, message ) )
}
