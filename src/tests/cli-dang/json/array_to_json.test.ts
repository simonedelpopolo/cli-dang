import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { array_to_json } from '@cli-dang/json'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.array_to_json() no parameter rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      array_to_json(),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'failed instanceof'
        }
        message = error.toLocaleString()

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function array_to_json_rejects_no_array ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.array_to_json() no array rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      array_to_json( 'string' ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'failed instanceof'
        }

        message = error.toLocaleString()

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function array_to_json_no_rejects_array ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.array_to_json array does not rejects'

  try{
    await assert.doesNotReject( array_to_json( [ 'data', 'string', 0, 'data', async e => e, 52 ] ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function array_to_json_rejects_no_multiple_2 ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() no multiple of 2 rejects'

  try{
    await assert.rejects(
      array_to_json( [ 'data', 'string', 0, 'data', async e => e ] ),
      ( error ) => {

        let result:Error|null = null

        if( error instanceof Error ){

          try{
            assert.deepStrictEqual( error.message, `♠︎ parameter \`data\` <Array> not multiple of 2. given data: ${[ 'data', 'string', 0, 'data', async e => e ].toLocaleString()}` )
            result = null
          }catch ( AssertionError ) {
            success = false
            tttt.failed( UNITName )
            message = AssertionError.message
            result = AssertionError
          }

        }else{
          success = false
          tttt.failed( UNITName )
          message = 'failed instanceof'
        }

        if( result === null )
          return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}
