#!/usr/bin/env node --experimental-json-modules --experimental-import-meta-resolve --trace-warnings --no-warnings
import { blaze_process } from './lib/input/dang_process.js'
import { entry_point } from '@cli-dang/input'

// It gets the command line arguments splicing out from `process.argv` the paths for node and dang.js
process.argv.splice( 0, 2 )

process.title = 'dang'

/**
 * Entry point to deflate64.
 */
const dang = await entry_point( process.argv, { dang: blaze_process, executable:[ 'dang' ] } )

switch ( Object.keys( dang[ 'command' ] )[ 0 ] ) {

  case 'init':

    break

  case 'help':

    break

  default:

    break

}
