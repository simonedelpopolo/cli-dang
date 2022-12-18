import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - decors.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {
  let success = true
  let message = Dang.strong( 'strong text' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[1mstrong text\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.strong' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.strong', message )
}
