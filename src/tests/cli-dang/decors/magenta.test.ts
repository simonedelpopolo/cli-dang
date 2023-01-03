import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {

  let success = true
  let message = Dang.magenta( 'magenta foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[35mmagenta foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.magenta', message )
}

export async function bg_magenta( id ):Promise<void>{

  let success = true
  let message = Dang.bg_magenta( 'magenta background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[45mmagenta background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_magenta', Dang.color( 255, message ) )
}

export async function b_magenta( id ):Promise<void>{

  let success = true
  let message = Dang.b_magenta( 'magenta bold' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[35;1mmagenta bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_magenta', message )
}

export async function b_bg_magenta( id ):Promise<void>{

  let success = true
  let message = Dang.b_bg_magenta( 'magenta bold background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[45;1mmagenta bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_magenta' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_magenta', Dang.color( 255, message ) )
}
