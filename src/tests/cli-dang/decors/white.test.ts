import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {

  let success = true
  let message = Dang.white( 'white foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[37mwhite foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.white', message )
}

export async function bg_white( id ):Promise<void>{

  let success = true
  let message = Dang.bg_white( 'white background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[47mwhite background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_white', Dang.color( 255, message ) )
}

export async function b_white( id ):Promise<void>{

  let success = true
  let message = Dang.b_white( 'white bold' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[37;1mwhite bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_white', message )
}

export async function b_bg_white( id ):Promise<void>{

  let success = true
  let message = Dang.b_bg_white( 'white bold background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[47;1mwhite bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_white' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_white', Dang.color( 255, message ) )
}
