import * as tttt from 'trythistrythat'
import { options } from '@cli-dang/input'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - options.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = undefined
  const actual = await options( '(first:option|second:option)', 'test_flag' )
  const expected = { first: 'option', second: 'option' }

  let error = await tttt.deepStrictEqual( async() => {

    return resolvers( actual, expected )
  } )

  if( error instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/input.options' )
    message = error.toLocaleString()

  }

  tttt.end( id, success, '@cli-dang/input.options', message )

}
