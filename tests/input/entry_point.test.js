import * as input from '@cli-dang/input'
import * as tttt from 'trythistrythat'
import { resolvers } from 'trythistrythat'
import { spawn } from 'node:child_process'

const __dirname = new URL( '.', import.meta.url ).pathname

/**
 * Module filename - input.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  let success = true
  let message = undefined

  let logic = async ( argv ) => { return argv }
  let expected = { object:{ hello: undefined, my_friend: undefined }, keys:[ 'hello', 'my_friend' ] }

  const result = await tttt.deepStrictEqual( async() => {

    return resolvers( await input.entry_point( [ 'hello', '--my-friend' ], { executable:[ '4t' ], '4t': logic } ), expected )
  } )


  if( result instanceof Error ){
    message = result.toLocaleString()
    success = false
    tttt.failed( '@cli-dang/input.entry_point' )
  }

  tttt.end( id, success, '@cli-dang/input.entry_point', message )
}

/**
 * Module filename - input.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export async function entry_point_fails( id ){

  let success = true
  let message = undefined
  let process_end

  const process_not_recognize = spawn( 'node', [ `${__dirname}process_title/process.not.recognize.js` ] )

  process_not_recognize.on( 'exit', async code => {
    const result = await tttt.deepStrictEqual( async () => {

      return resolvers( code, 6 )
    } )

    if ( result instanceof Error ) {
      success = false
      message = result.toLocaleString()
      tttt.failed( '@cli-dang/entry_point not recognize process name' )
    }


  } )

  process_end = true
  if( process_end )
    tttt.end( id, success, '@cli-dang/entry_point not recognize process name', message )
}
