import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { json_parse } from '@cli-dang/json'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() no parameter rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      json_parse(),
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

export async function json_parse_rejects_no_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() no string buffer rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      json_parse( [] ),
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

export async function json_parse_no_rejects_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() buffer does not rejects'

  try{
    await assert.doesNotReject( json_parse( Buffer.from( '{"type":"buffer"}' ) ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function json_parse_no_rejects_string ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() string does not rejects'

  try{
    await assert.doesNotReject( json_parse( '{"type":"buffer"}' ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function json_parse_rejects_no_well_formed_json ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() no well formed json rejects'

  try{
    await assert.rejects(
      json_parse( '{"type":' ),
      ( error ) => {

        let result:Error|null = null

        if( error instanceof Error ){

          try{
            assert.deepStrictEqual( error.message, 'Unexpected end of JSON input' )
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

export async function json_parse_rejects_no_empty_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.json_parse() no empty string buffer rejects'

  try{
    await assert.rejects(
      json_parse( '' ),
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
