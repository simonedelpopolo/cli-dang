import * as tttt from 'trythistrythat'
import { override } from '@cli-dang/decors'

export default async ( id ):Promise<void> => {

  override()

  let success = true
  let error:string|undefined = undefined

  if( typeof String.prototype.blue === 'undefined' ){
    success = false
    tttt.failed( '@cli-dang/decors.override check for String.prototype.blue' )
    error = 'override didn\'t happen'
  }

  let message = 'test colored extends String.prototype'.rgb( [ 25, 1, 23 ], ' .rgb' )

  let result:null|Error = await tttt.deepEqual( async () => {

    return tttt.resolvers( message, '\x1B[38;2;25;1;23mtest colored extends String.prototype .rgb\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.override' )
    error += result.toLocaleString()
  }

  message = 'test colored extends String.prototype'.rgb( [ 25, 1, 23 ] )

  result = await tttt.deepEqual( async () => {

    return tttt.resolvers( message, '\x1B[38;2;25;1;23mtest colored extends String.prototype\x1B[0m' )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( '@cli-dang/decors.override no extra text in the function rgb() just colors the String itself' )
    error += result.toLocaleString()
  }

  override( 'dang_' )
  // @ts-ignore
  if( typeof String.prototype.dang_blue === 'undefined' ){
    success = false
    tttt.failed( '@cli-dang/decors.override with prefix check for String.prototype.dang_blue' )
    error = 'override didn\'t happen'
  }

  tttt.end( id, success, '@cli-dang/decors.override', error )

  override( 'dang_', true )
  // @ts-ignore
  if( typeof String.prototype[ Symbol.for( 'dang_blue' ) ] === 'undefined' ){
    success = false
    tttt.failed( '@cli-dang/decors.override with prefix Symbol String.prototype.[Symbol.for(dang_blue)]' )
    error = 'override didn\'t happen'
  }

  tttt.end( id, success, '@cli-dang/decors.override', error )
}
