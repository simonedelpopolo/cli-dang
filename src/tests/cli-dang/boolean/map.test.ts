import * as assert from 'node:assert'
import * as tttt from 'trythistrythat'
import { map } from '@cli-dang/boolean'

export default async ( id ):Promise<void> => {
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.map() logic'

  const result:null|Error = await tttt.deepEqual( async () => {
    const actual:boolean = await map( { 'hello': true }, 'hello' )
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

export async function map_rejects_both_parameters( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.map() logic rejects'

  try{
    await assert.rejects(
      // @ts-ignore
      map(),
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

export async function map_rejects_logic_parameter( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.map() logic rejects Array'

  try{
    await assert.rejects(
      // @ts-ignore
      map( [], 'not good' ),
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

export async function map_rejects_logic_property_value( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.map() logic rejects property:value'

  try{
    await assert.rejects(
      // @ts-ignore
      map( { 6: 'true' }, 'not good' ),
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

export async function map_rejects_logic_against_number( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.map() logic rejects against'

  try{
    await assert.rejects(
      // @ts-ignore
      map( { 'hello': true }, 1 ),
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

export async function map_rejects_logic_against_not_string( id ):Promise<void>{
  let success = true
  let message:string|undefined = undefined
  const UNITName = '@cli-dang/boolean.map() logic rejects against not string'

  try{
    await assert.rejects(
      // @ts-ignore
      map( { 'hello': true }, [] ),
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
