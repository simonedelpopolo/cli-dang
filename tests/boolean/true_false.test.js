import * as tttt from 'trythistrythat'
import { true_false } from '@cli-dang/boolean'

/**
 * Test Object [ boolean.true_false ]
 *
 * @param {string} id - random UUID
 * @returns {Promise<void>}
 */
export default async function ( id ){

  let success = true
  let message = undefined

  const test = await tttt.ok( async () => {

    return {
      expected: false,
      actual : await true_false( 'false' ),
      error: 'something went wrong'
    }
  } )

  if( test instanceof Error ){
    success = false
    message = test.toLocaleString()
    tttt.failed( 'test Object [ boolean.true_false ]' )
  }

  tttt.end( id, success, 'test Object [ boolean.true_false ]', message )
}
