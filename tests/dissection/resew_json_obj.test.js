import * as tttt from 'trythistrythat'
import { resew_json_obj } from '@cli-dang/dissection'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - resew_json_obj.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = undefined
  const actual = await resew_json_obj( { string: 'OK' } )

  const result = await tttt.deepStrictEqual( async () => {

    return resolvers( actual, '{"string":"OK"}' )
  } )

  if ( result instanceof Error ){
    success = false
    message = result.toLocaleString()
    tttt.failed( '@cli-dang/dissection.resew_json_obj ' )
  }

  tttt.end( id, success, '@cli-dang/dissection.resew_json_obj ', message )
}
