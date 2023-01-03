import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {

  let success = true
  let message = Dang.blue( 'blue foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[34mblue foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.blue', message )
}
export async function bg_blue( id ):Promise<void>{

  let success = true
  let message = Dang.bg_blue( 'blue background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[44mblue background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_blue', Dang.color( 255, message ) )
}

export async function b_blue( id ):Promise<void>{

  let success = true
  let message = Dang.b_blue( 'blue bold' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[34;1mblue bold\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_blue', message )
}


export async function b_bg_blue( id ):Promise<void>{

  let success = true
  let message = Dang.b_bg_blue( 'blue bold back background' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[44;1mblue bold back background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.b_bg_blue' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.b_bg_blue', Dang.color( 255, message ) )
}

export async function empty_char_for_testing_only( id ):Promise<void>{

  let success = true
  //@ empty char argument for testing only
  let message = Dang.b_bg_blue( )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[44;1m\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors empty char for testing' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors empty char for testing', Dang.color( 255, message ) )
}
