import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { processor } from '@cli-dang/input'

export default async ( id ) => {

  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.processor'

  const result:null|Error = await tttt.deepStrictEqual( async() => {

    const actual = await processor( [ 'code', '--file-test=string.txt', '--json={"string":"failed"}' ] ).catch( error => error.message )
    const expected = { object: {
      code: undefined,
      file_test: 'string.txt',
      json: '{"string":"failed"}'
    }, keys: [ 'code', 'json', 'file_test' ] }

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ){
    tttt.failed( UNITName )
    success = false
    message = result.message
  }

  tttt.end( id, success, UNITName, message )
}

export async function rejects_undefined_argv( id ){

  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.processor rejects undefined argv'

  try{
    // @ts-ignore
    await assert.rejects( processor(),
      ( error:Error ) => {

        assert.deepStrictEqual( error.message, '♠ argv is undefined' )

        return true
      }
    )
  }catch ( AssertionError ) {

    tttt.failed( UNITName )
    success = false
    message = AssertionError.message
  }

  tttt.end( id, success, UNITName, message )
}

export async function rejects_empty_argv( id ){

  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.processor rejects empty argv'

  try{
    await assert.rejects( processor( [] ),
      ( error:Error ) => {

        assert.deepStrictEqual( error.message, '♠ empty argv' )

        return true
      }
    )
  }catch ( AssertionError ) {

    tttt.failed( UNITName )
    success = false
    message = AssertionError.message
  }

  tttt.end( id, success, UNITName, message )
}

export async function rejects_empty_argv_element( id ){

  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.processor rejects empty argv element'

  try{
    await assert.rejects( processor( [ ' ' ] ),
      ( error:Error ) => {

        assert.deepStrictEqual( error.message, '♠ pattern does not match anything or encountered a problem.' )

        return true
      }
    )
  }catch ( AssertionError ) {

    tttt.failed( UNITName )
    success = false
    message = AssertionError.message
  }

  tttt.end( id, success, UNITName, message )
}

export async function rejects_empty_argv_string_element( id ){

  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.processor rejects empty argv string element'

  try{
    await assert.rejects( processor( [ '' ] ),
      ( error:Error ) => {

        assert.deepStrictEqual( error.message, '♠ empty string.' )

        return true
      }
    )
  }catch ( AssertionError ) {

    tttt.failed( UNITName )
    success = false
    message = AssertionError.message
  }

  tttt.end( id, success, UNITName, message )
}

export async function rejects_argv_number( id ){

  let success = true
  let message:undefined|string = undefined
  const UNITName = '@cli-dang/input.processor rejects argv number'

  try{
    await assert.rejects( processor( [ 0 ] ),
      ( error:Error ) => {

        assert.deepStrictEqual( error.message, '♠ no numbers' )

        return true
      }
    )
  }catch ( AssertionError ) {

    tttt.failed( UNITName )
    success = false
    message = AssertionError.message
  }

  tttt.end( id, success, UNITName, message )
}
