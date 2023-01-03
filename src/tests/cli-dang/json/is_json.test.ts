import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { is_json } from '@cli-dang/json'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json no parameter rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      is_json(),
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

export async function is_json_rejects_no_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() no string buffer rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      is_json( [] ),
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

export async function is_json_no_rejects_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() buffer does not rejects'

  try{
    await assert.doesNotReject( is_json( Buffer.from( '{"type":"buffer"}' ) ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function is_json_no_rejects_string ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() string does not rejects'

  try{
    await assert.doesNotReject( is_json( '{"type":"string"}' ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function is_json_parse_rejects_no_well_formed_json ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() no well formed json rejects'

  try{
    await assert.rejects(
      is_json( '{"type":', true ),
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

export async function is_json_parse_rejects_false ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() rejects with false'

  try{
    await assert.rejects(
      is_json( '{"type":' ),
      ( error ) => {

        let result:Error|null|string

        if( ! error ){

          try{
            assert.deepStrictEqual( error, false )
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
          result = 'failed instanceof'
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

export async function is_json_rejects_no_empty_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() no empty string buffer rejects'

  try{
    await assert.rejects(
      is_json( '' ),
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

export async function is_json_rejects_no_boolean_check_error ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/json.is_json() no boolean check_error rejects'

  try{

    await assert.rejects(
      // @ts-ignore
      is_json( 'just a string', [ 'no', 'boolean' ] ),
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

