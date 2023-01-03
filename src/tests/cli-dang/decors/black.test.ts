import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'
export default async ( id ):Promise<void> => {

  let success = true
  let message = Dang.black( 'black foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[30mblack foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.black' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.black', message )
}
export async function bg_black( id ):Promise<void>{

  let success = true
  let message = Dang.bg_black( 'black background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[40mblack background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_black' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_black', Dang.color( 255, message ) )
}
export async function b_black( id ):Promise<void>{

  let success = true
  let message = Dang.b_black( 'black bold' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[30;1mblack bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_black' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_black', message )
}
export async function b_bg_black( id ):Promise<void>{

  let success = true
  let message = Dang.b_bg_black( 'black bold background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[40;1mblack bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_black' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_black', Dang.color( 255, message ) )
}
