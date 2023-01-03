import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {

  let success = true
  let message = Dang.green( 'green foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[32mgreen foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.green', message )
}

export async function bg_green( id ):Promise<void>{

  let success = true
  let message = Dang.bg_green( 'green background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[42mgreen background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_green', Dang.color( 255, message ) )
}

export async function b_green( id ):Promise<void>{

  let success = true
  let message = Dang.b_green( 'green bold' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[32;1mgreen bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_green', message )
}

export async function b_bg_green( id ):Promise<void>{

  let success = true
  let message = Dang.b_bg_green( 'green bold background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[42;1mgreen bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_green' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_green', Dang.color( 255, message ) )
}
