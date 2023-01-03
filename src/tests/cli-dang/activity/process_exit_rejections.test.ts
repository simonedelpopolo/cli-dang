import * as tttt from 'trythistrythat'
import { exit } from '@cli-dang/activity'

export default async ( id ) => {

  let success = true
  let message:undefined|string = undefined
  const UNITName = 'error_type argument requires to be instanceof Error throws/rejects'

  const result:null|Error = await tttt.deepStrictEqual( async() => {
    const actual:string = <string> await exit( 'the message error', <Error><unknown>'error_type requires to be instanceof Error', undefined, false, true ).catch( error => error.message )
    const expected = '\x1B[31;1m♠ activity.exit error - <oftype>String</oftype> not allowed for <argument>error_type</argument>\x1B[0m'

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ) {
    success = false
    message = result.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}

export async function argument_exit_code_rejects ( id ) {

  let success = true
  let message:undefined|string = undefined
  const UNITName = 'exit_code argument requires to be Number throws/rejects'

  const result:null|Error = await tttt.deepStrictEqual( async() => {
    const actual:string = <string> await exit( 'the message error', new Error( 'extra info and stack trace' ), <number><unknown> { exit_code: 'must be Number' }, false, true ).catch( error => error.message )
    const expected = '\x1B[31;1m♠ activity.exit error - <oftype>Object</oftype> not allowed for <argument>exit_code</argument>\x1B[0m'

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ) {
    success = false
    message = result.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}

export async function argument_message_rejects ( id ) {

  let success = true
  let message:string|undefined = undefined
  const UNITName = 'message argument requires to be Buffer|String throws/rejects'

  const result:null|Error = await tttt.deepStrictEqual( async() => {
    // @ts-ignore
    const actual:string = <string> await exit( 3, new Error( 'extra info and stack trace' ), undefined, false, true ).catch( error => error.message )
    const expected = '\x1B[31;1m♠ activity.exit error - <oftype>Number</oftype> not allowed for <argument>message</argument>\x1B[0m'

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ) {
    success = false
    message = result.message
    tttt.failed ( UNITName )
  }

  tttt.end( id, success, UNITName, message )
}
