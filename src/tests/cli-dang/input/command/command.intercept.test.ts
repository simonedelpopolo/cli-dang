import * as assert from 'assert'
import * as tttt from 'trythistrythat'
import { Command } from '@cli-dang/input'
import { execFile } from 'child_process'

export default async ( id ) => {

  const UNITName = '@cli-dang/input.command.intercept help'

  execFile( `${process.cwd()}/tests/cli-dang/input/processes/intercept.help.process.js`, ( error, stdout ) => {
    let success = true
    let message: undefined | string

    let result: Error | Command
    try {
      assert.deepStrictEqual( stdout, 'get it #boom boom' )
    } catch ( error ) {
      result = error
    }

    if ( result instanceof Error ) {
      tttt.failed( UNITName )
      success = false
      message = result.message
    }

    tttt.end( id, success, UNITName, message )
  } )

}

export async function intercept_data( id ){

  const UNITName = '@cli-dang/input.command.intercept data'

  execFile( `${process.cwd()}/tests/cli-dang/input/processes/intercept.process.js`, ( error, stdout ) => {
    let success = true
    let message: undefined | string

    if( error ) {
      message = error.message
      tttt.failed( UNITName )
      success = false
    }

    else{

      let result: Error
      try {
        assert.deepStrictEqual( JSON.parse( stdout ), { object:{ get:'this' }, keys:[] } )
      } catch ( error ) {
        result = error
      }

      if ( result instanceof Error ) {
        tttt.failed( UNITName )
        success = false
        message = result.message
      }}


    tttt.end( id, success, UNITName, message )
  } )

}
