import * as tttt from 'trythistrythat'
import { add, error_code, get } from '@cli-dang/error'
import { ErrorsObject } from '../../../@cli-dang/error/lib/error/types'
import { trace, trace_options } from '@cli-dang/activity'

export default async ( id ) => {

  let success = true
  let message:string|undefined|ErrorsObject|number = undefined
  const UnitName = 'error.get() test'

  const result:Error = await tttt.deepStrictEqual( async () => {

    const actual:number|ErrorsObject = get()
    trace_options.mute = true
    message = await trace( actual )

    const expected:ErrorsObject = {
      COMMAND: 1,
      FLAG: 2,
      TYPE: 3,
      INTERNAL: 4,
      UNKNOWN: 5
    }

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ) {
    tttt.failed( UnitName )
    success = false
    message = result.stack
  }

  tttt.end( id, success, UnitName, message )

}

export async function get_key ( id ){

  let success = true
  let message:string|undefined|ErrorsObject|number = undefined
  const UnitName = 'error.get(key) test'

  const result:Error = await tttt.deepStrictEqual( async () => {

    const actual:number = <number> get( 'COMMAND' )

    const expected = 1

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ) {
    tttt.failed( UnitName )
    success = false
    message = result.stack
  }

  tttt.end( id, success, UnitName, message )

}

export async function add_key ( id ){

  let success = true
  let message:string|undefined|ErrorsObject|number = undefined
  const UnitName = 'error.add(key) test'

  const result:Error = await tttt.deepStrictEqual( async () => {

    add( 'EXTRA_COMMAND', 96 )
    const actual = get( 'EXTRA_COMMAND' )
    // 'cause asynchronous executing the tests can still stay sets and interfere with other tests
    // @ts-ignore
    delete error_code.EXTRA_COMMAND

    const expected = 96

    return tttt.resolvers( actual, expected )
  } )



  if( result instanceof Error ) {
    tttt.failed( UnitName )
    success = false
    message = result.stack
  }

  tttt.end( id, success, UnitName, message )

}

export async function get_key_return_0 ( id ){

  let success = true
  let message:string|undefined|ErrorsObject|number = undefined
  const UnitName = 'error.get(key) return 0 test'

  const result:Error = await tttt.deepStrictEqual( async () => {

    const actual = get( 'NOTHING' )

    const expected = 0

    return tttt.resolvers( actual, expected )
  } )

  if( result instanceof Error ) {
    tttt.failed( UnitName )
    success = false
    message = result.stack
  }

  tttt.end( id, success, UnitName, message )

}
