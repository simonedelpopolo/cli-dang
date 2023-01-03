import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { object_to_json } from '@cli-dang/object'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.object_to_json no parameter rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      object_to_json(),
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

export async function object_to_json_rejects_no_object ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.object_to_json no object rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      object_to_json( '{}' ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'NO Object - failed instanceof'
        }

        message = 'NO Object - ' + error.toLocaleString()

        return true
      } )
    await assert.rejects(
      object_to_json( {} ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message += '\nEMPTY Object - failed instanceof'
        }

        message += '\nEMPTY Object - ' + error.toLocaleString()

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}


export async function object_to_json_no_rejects_object ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.object_to_json object does not rejects'

  try{
    await assert.doesNotReject( object_to_json( { type: 'object' } ) )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}

/* HALLO
export async function needle_rejects_no_empty_json_buffer ( id ):Promise<void> {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/object.object_to_json \nneedle parameter no empty string buffer\n only String|Buffer rejects'

  try{
    await assert.rejects(
      object_to_json( { type: 'object' }, '' ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message = 'String needle - failed instanceof'
        }

        message = 'String needle - ' + error.toLocaleString()

        return true
      } )
    await assert.rejects(
      object_to_json( { type: 'object' }, Buffer.from( '' ) ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message += '\nBuffer needle - failed instanceof'
        }

        message += '\nBuffer needle - ' + error.toLocaleString()

        return true
      } )

    await assert.rejects(
      // @ts-ignore
      object_to_json( { type: 'object' }, 6 ),
      ( error ) => {
        if( !( error instanceof Error ) ){
          success = false
          tttt.failed( UNITName )
          message += '\nneedle ONLY String|Buffer - failed instanceof'
        }

        message += '\nneedle ONLY String|Buffer - ' + error.toLocaleString()

        return true
      } )
  }catch ( AssertionError ) {
    success = false
    tttt.failed( UNITName )
    message = AssertionError.toLocaleString()
  }

  tttt.end( id, success, UNITName, message )
}
*/
