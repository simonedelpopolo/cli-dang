import * as tttt from 'trythistrythat'
import { OftypesError } from 'oftypes'
import { process_title } from '@cli-dang/input'

export default async ( id ) => {
  let success = true
  let message:undefined|string
  const UNITName = '@cli-dang/input.process_title'
  let actual: undefined|OftypesError = undefined

  const result:null|Error = await tttt.deepStrictEqual( async() => {
    const asyncFunction = async() => {
      return undefined
    }
    // @ts-ignore
    actual = await process_title( { object: { 'ciao':'hello' }, key: [ 'ciao' ] }, asyncFunction ).catch( error => error )
    const expected = true

    return tttt.resolvers( actual instanceof Error, expected )
  } )

  if( result instanceof Error ){
    tttt.failed( UNITName )
    success = false
    message = result.message
  }else
    message = actual.message

  tttt.end( id, success, UNITName, message )
}
