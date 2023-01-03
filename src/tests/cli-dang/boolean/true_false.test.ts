import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { true_false } from '@cli-dang/boolean'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.true_false()'

  const result:null|Error = await tttt.deepEqual( async () => {
    const actual:boolean = await true_false( 'true' )
    const expected = true

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ){
    success = false
    tttt.failed( UNITName )
    message = result.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function map_rejects_not_string( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.true_false() not string rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      true_false( [] ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'failed instanceof'
        }

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function map_rejects_string_not_true( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.true_false() string not true rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      true_false( 'not true|false doesn\'t work' ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'failed instanceof'
        }

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}
