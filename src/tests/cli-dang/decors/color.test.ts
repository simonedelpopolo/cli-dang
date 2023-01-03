import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {
  let success = true
  let message = Dang.color( 123, '256 colors foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[38;5;123m256 colors foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.256 color foreground' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.256 color foreground', message )
}

export async function bg_color256( id ):Promise<void>{

  let success = true
  let message = Dang.bg_color( 65, 'color256 background' )

  const result:Error|null = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[48;5;65mcolor256 background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_color' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_color', Dang.color( 255, message ) )
}
