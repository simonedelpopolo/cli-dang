import { bare_flag } from './dang/flag/bare_flag'
import { Dang } from '@cli-dang/decors'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'
import { OftypesError, resolvers, undefined_ } from 'oftypes'

export async function blaze_process( parsed ) {

  let break_for_loop = false

  const dang = {
    command:{
      init: null,
      help: null
    },
    flag:{
      bare: null
    }
  }

  const blaze_commandKeys = Object.keys( dang.command )
  for ( const selected_command in blaze_commandKeys ) {

    if ( !( parsed.keys.includes( blaze_commandKeys[ selected_command ] ) ) )
      delete dang.command[ blaze_commandKeys[ selected_command ] ]
  }

  for ( const command in parsed.keys ) {

    if ( break_for_loop )
      break

    switch ( parsed.keys[ command ] ) {

      case 'init': {

        const truthy = () => {
          delete parsed.object.init
          parsed.keys.splice( 0, 1 )
        }
        const falsy = async () => exit( 'init command doesn\'t accept any argument', new SyntaxError( '♠︎' ), error_code.COMMAND )
        // @ts-ignore
        await ( await undefined_( parsed.object.init, await resolvers( truthy, falsy ) ) )()

        dang.command.init = true
      }
        break_for_loop = true
        break

      case 'v':
      case 'version':

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line import/no-unresolved,node/no-missing-import
        console.log( await ( await import( '../../package.json', { assert: { type: 'json' } } ) ).default.version )
        // eslint-disable-next-line no-process-exit
        process.exit( 0 )
        break

      default: {

        const error = `        command '${ Dang.red( parsed.keys[ command ] ) }' not recognize
        run -> ${ Dang.blue( process.title ) } help        `

        await exit( error, new SyntaxError( `${ process.title } ♠︎` ), error_code.COMMAND )
      }
    }
  }

  const blazeFlags = Object.keys( parsed.object )

  for ( const flag in blazeFlags ) {

    switch ( blazeFlags[ flag ] ) {

      case 'bare': {

        for await ( const type of await bare_flag( parsed.object[ blazeFlags[ flag ] ] ) ) {
          if ( type instanceof Error )
            await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

          dang.flag.bare = type
        }


        delete parsed.object[ blazeFlags[ flag ] ]
        parsed.keys.splice( 0, 1 )
      }
        break

      default: {
        const error = `        flag '${ Dang.red( blazeFlags[ flag ] ) }' not recognize
        run -> ${ Dang.blue( process.title ) } help        `

        await exit( error, new SyntaxError( `${ process.title } ♠︎` ), error_code.FLAG )
      }
    }
  }

  return dang
}
