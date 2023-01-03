import { blaze_process } from './lib/input/dang_process'
import { entry_point } from '@cli-dang/input'

process.argv.splice( 0, 2 )

process.title = 'dang'

const dang = await entry_point( process.argv, { dang: blaze_process, executable:[ 'dang' ] } )

switch ( Object.keys( dang[ 'command' ] )[ 0 ] ) {

  case 'init':

    break

  case 'help':

    break

  default:

    break

}
