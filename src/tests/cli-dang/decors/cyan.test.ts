import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {

  let success = true
  let message = Dang.cyan( 'cyan foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[36mcyan foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.cyan', message )
}

export async function bg_cyan( id ):Promise<void>{

  let success = true
  let message = Dang.bg_cyan( 'cyan background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[46mcyan background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_cyan', Dang.color( 255, message ) )
}

export async function b_cyan( id ):Promise<void>{

  let success = true
  let message = Dang.b_cyan( 'cyan bold' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[36;1mcyan bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_cyan', message )
}

export async function b_bg_cyan( id ):Promise<void>{

  let success = true
  let message = Dang.b_bg_cyan( 'cyan bold background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[46;1mcyan bold background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_cyan' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_cyan', Dang.color( 255, message ) )
}
