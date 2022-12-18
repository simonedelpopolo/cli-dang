import { deepStrictEqual, end, failed, resolvers } from 'trythistrythat'
import { dissect_json_obj } from '@cli-dang/dissection'

/**
 * Module filename - dissect_json_obj.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = undefined

  const actual = await dissect_json_obj( '{"data":"json"}' )
  const result = await deepStrictEqual( async () => {
    return resolvers( actual, { data:'json' } )
  } )

  if( result instanceof Error ) {
    success = false
    message = result.toLocaleString()
    failed( '@cli-dang/dissection.dissect_json_obj' )
  }

  end( id, success, '@cli-dang/dissection.dissect_json_obj', message )
}

