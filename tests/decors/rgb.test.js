import * as tttt from 'trythistrythat'
import Dang from '@cli-dang/decors/lib/decors/dang.js'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - rgb.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {
  let success = true
  let message = Dang.rgb( [ 123, 36, 78 ], 'rgb colors foreground' )

  const result = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[38;5;123;36;78mrgb colors foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.rgb color foreground' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.rgb color foreground', message )
}
