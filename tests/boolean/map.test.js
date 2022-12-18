import * as tttt from 'trythistrythat'
import { map } from '@cli-dang/boolean'

/**
 * Check map().
 *
 * @param {string} id - random UUID
 * @returns {Promise<void>}
 */
export default async function ( id ){

  let success = true
  let message = undefined

  const test = await tttt.ok( async () => {

    return {
      expected: true,
      actual : await map( { yes: true }, 'yes' ),
      error: 'something went wrong'
    }
  } )

  if( test instanceof Error ){
    success = false
    message = test.toLocaleString()
    tttt.failed( 'boolean.map function test' )
  }

  tttt.end( id, success, 'boolean.map function test', message  )
}
