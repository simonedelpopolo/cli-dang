import * as tttt from 'trythistrythat'
import { Dang } from '@cli-dang/decors'
import { resolvers } from 'trythistrythat'

export default async ( id ):Promise<void> => {
  let success = true
  let message = Dang.underline( 'underlined text' )

  const result:null|Error = await tttt.deepEqual( async () => {

    return resolvers( message, '\x1B[4munderlined text\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.underline' )
    message = result.toLocaleString()
  }

  tttt.end( id, success, '@cli-dang/decors.underline', message )
}
