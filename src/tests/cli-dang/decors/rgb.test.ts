import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'

export default async ( id ):Promise<void> => {
  let success = true
  let message = Dang.rgb( [ 123, 36, 78 ], 'rgb colors foreground' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return tttt.resolvers( message, '\x1B[38;2;123;36;78mrgb colors foreground\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.rgb color foreground' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.rgb color foreground', message )
}

export async function bg_rgb( id ):Promise<void>{

  let success = true
  let message = Dang.bg_rgb( [ 0, 58, 63 ], 'RGB background' )

  const result:Error|null = await tttt.deepEqual( async () => {

    return tttt.resolvers( message, '\x1B[48;2;0;58;63mRGB background\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.bg_rgb' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.bg_rgb', Dang.color( 255, message ) )
}
