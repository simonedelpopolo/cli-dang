import Command from '../../../input/lib/input/command'
import { init } from '../shell/init/init'
import { ParsedArgv } from '@cli-dang/input'

export async function dang_process( parsed:ParsedArgv ):Promise<void>{

  const init_bare = <cb> ( data:cb ):void => {
    init( data )
  }

  const void_clear_cb =<cb> ( data:cb ):cb => {
    return <cb> JSON.stringify( data )
  }

  const dang_commands = Command
  dang_commands.define( 'init', init_bare )
  dang_commands.flag( 'bare' )
    .long( '--bare' )
    .void( true )
    .check( true )

  dang_commands.flag( 'void' )
    .long( '--void' )
    .void( false )
    .type( 'boolean' )
    .check( true )

  dang_commands.define( 'clean', init_bare )
  dang_commands.flag( 'bare' )
    .long( '--bare' )
    .void( true )
    .check( true )

  dang_commands.flag( 'void' )
    .long( '--void' )
    .void( false )
    .type( 'opts' )
    .check( true )
    .cb( void_clear_cb )

  await dang_commands.interceptor( parsed )


}
