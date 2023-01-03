import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { string_to_object } from '@cli-dang/object'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object no parameter rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      string_to_object(),
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

export async function string_to_object_rejects_no_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object no string buffer rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      string_to_object( [] ),
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

export async function string_to_object_no_rejects_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object buffer does not rejects'

  try{
    await assert.doesNotReject( string_to_object( Buffer.from( 'type:buffer:x:string' ) ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function string_to_object_no_rejects_string ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object string does not rejects'

  try{
    await assert.doesNotReject( string_to_object( 'type:string' ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function string_to_object_no_rejects_multiple_string ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object multiple string does not rejects'

  try{
    await assert.doesNotReject( string_to_object( 'type|string|variant|number', '|' ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function string_to_object_rejects_no_well_formed_string ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object no well formed string rejects'

  try{
    await assert.rejects(
      string_to_object( 'type:string:no_value' ),
      ( error ) => {

        let result:Error|boolean|string

        if( error instanceof Error ){

          try{
            assert.deepStrictEqual( error.message, '♠︎ parameter `data` <String> <Format>[property]:[value]</Format>. Not multiple of 2. given data: type:string:no_value' )
            result = true
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

        return result
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

export async function string_to_object_rejects_no_empty_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object no empty string buffer rejects'

  try{
    await assert.rejects(
      string_to_object( '' ),
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

export async function scalpel_rejects_no_empty_string_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.string_to_object \nscalpel parameter no empty string buffer\n only String|Buffer rejects'

  try{
    await assert.rejects(
      string_to_object( 'type:scalpel', '' ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'String scalpel - failed instanceof'
        }

        message = 'String scalpel - ' + error.toLocaleString()

        return true
      } )
    await assert.rejects(
      string_to_object( 'type:scalpel', Buffer.from( '' ) ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message += '\nBuffer scalpel - failed instanceof'
        }

        message += '\nBuffer scalpel - ' + error.toLocaleString()

        return true
      } )

    await assert.rejects(
      // @ts-ignore
      string_to_object( 'type:scalpel', 6 ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message += '\nscalpel ONLY String|Buffer - failed instanceof'
        }

        message += '\nscalpel ONLY String|Buffer - ' + error.toLocaleString()

        return true
      } )

    await assert.rejects(
      string_to_object( 'type' ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message += '\nMatched nothing - failed instanceof'
        }

        message += '\nMatched nothing - ' + error.toLocaleString()

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}
