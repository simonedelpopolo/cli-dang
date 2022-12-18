import * as tttt from 'trythistrythat'
import { dissect_prop_val } from '@cli-dang/dissection'

/**
 * Module filename -dissect_prop_val.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = undefined
  let actual = await dissect_prop_val( 'string:json|activate:true', '|', true )

  let result = await tttt.deepStrictEqual( async () => {
    return tttt.resolvers( actual, { string:'json', activate: 'true' } )
  } )

  if( result instanceof Error ){
    success = false
    message = result.toLocaleString()
    tttt.failed( '@cli-dang/dissection.dissect_prop_val' )
  }

  tttt.end( id, success, '@cli-dang/dissection.dissect_prop_val', message )

}
