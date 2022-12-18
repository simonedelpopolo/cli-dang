import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - negative.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = Dang.negative( 'negative' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[7mnegative\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.negative' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.negative', message )
}
