import * as tttt from 'trythistrythat'
import { options } from '@cli-dang/input'

export default async ( id ) => {
  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.options'

  const result:null|Error = await tttt.deepStrictEqual( async() => {

    const actual = await options( 'file:index.php|socket:active', '--php-server-on' ).catch( error => error.message )
    const expected = {
      file: 'index.php',
      socket: 'active'
    }

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ){
    tttt.failed( UNITName )
    success = false
    message = result.message
  }

  tttt.end( id, success, UNITName, message )
}

export async function options_no_pipe_symbol( id ){

  let success = true
  let message:undefined|string
  const UNITName = '@cli-dang/input.options rejects no pipe symbol'
  let actual:Error|undefined = undefined

  const result:null|Error = await tttt.deepStrictEqual( async() => {

    actual = await options( 'file:index.php:socket:active', '--php-server-on' ).catch( error => error )
    const expected = true

    return tttt.resolvers( actual instanceof Error, expected )
  } )

  if( result instanceof Error ){
    tttt.failed( UNITName )
    success = false
    message = result.message
  }else
    message = actual.message


  tttt.end( id, success, UNITName, message )
}

