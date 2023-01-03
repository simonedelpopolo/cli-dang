import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string = Dang.rgb( undefined, 'rgb colors foreground' )
  const UNITName = '@cli-dang/decors.rgb undefined black default color foreground'

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[38;2;0;0;0mrgb colors foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( UNITName )
    message = result.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function black_color_default ( id ):Promise<void>{
  let success = true
  let message:string = Dang.color( undefined, 'black color foreground' )
  const UNITName = '@cli-dang/decors.color undefined black default color foreground'

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[38;5;0mblack color foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( UNITName )
    message = result.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}
