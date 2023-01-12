import { Command } from '@cli-dang/input'
import { init } from '../shell/init/init'

export async function dang_process( parsed:ParsedArgv ):Promise<void>{

  const init_bare = <cb> ( data:cb ):void => {
    init( data )
  }

  const dang_commands = new Command()
  dang_commands.define( 'init', init_bare )
  dang_commands.flag( '--bare', {
    implement:{ short:'--bare' }
  } )

  await dang_commands.intercept( parsed )


}
