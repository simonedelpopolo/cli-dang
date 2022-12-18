import * as tttt from 'trythistrythat'
import { add, error_code, replace } from '@cli-dang/error'
import { resolvers } from 'trythistrythat'

/**
 * Module filename - code.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = undefined

  const result = await tttt.deepStrictEqual( async () => {

    return resolvers( error_code.COMMAND, 1 )
  } )

  if( result instanceof Error ){
    tttt.failed( '@cli-dang/error.COMMAND === 1' )
    success = false
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/error.COMMAND === 1', message )
}

/**
 * Module filename - code.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function error_add ( id ){

  let success = true
  let message = undefined

  const result = await tttt.deepStrictEqual( async () => {
    add( 'ERROR_TEST_ADDED', 256 )

    return resolvers( error_code.ERROR_TEST_ADDED, 256 )
  } )

  if( result instanceof Error ){
    tttt.failed( '@cli-dang/error.add(ERROR_TEST_ADDED) === 256' )
    success = false
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/error.add(ERROR_TEST_ADDED) === 256', message )
}

/**
 * Module filename - code.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function error_replace ( id ){

  let success = true
  let message = undefined

  let result = await tttt.deepStrictEqual( async () => {
    add( 'ERROR_TEST_ADDED_TO_BE_REPLACE', 256 )

    return resolvers( error_code.ERROR_TEST_ADDED_TO_BE_REPLACE, 256 )
  } )

  if( result instanceof Error ){
    tttt.failed( '@cli-dang/error.add(ERROR_TEST_ADDED_TO_BE_REPLACE) === 25' )
    success = false
    message = result.toLocaleString()
  }

  result = await tttt.deepStrictEqual( async () => {
    replace( 'ERROR_TEST_ADDED_TO_BE_REPLACE', 25 )

    return resolvers( error_code.ERROR_TEST_ADDED_TO_BE_REPLACE, 25 )
  } )

  if( result instanceof Error ){
    tttt.failed( '@cli-dang/error.add(ERROR_TEST_ADDED_TO_BE_REPLACE) === 25' )
    success = false
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/error.add(ERROR_TEST_ADDED_TO_BE_REPLACE) === 25', message )
}
