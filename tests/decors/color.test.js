import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - color.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {
  let success = true
  let message = Dang.color( 123, '256 colors foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[38;5;123m256 colors foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.256 color foreground' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.256 color foreground', message )
}
