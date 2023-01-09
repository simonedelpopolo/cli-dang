import check_flag from './check/flag'
import { async_, resolvers, undefined_ } from 'oftypes'
import { CommandCallBack, Commands, CommandsDefinition, FLAG, ParsedArgv } from './types'
import { Dang } from '@cli-dang/decors'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'

const commands: CommandsDefinition = {}
const Command: Commands = Object( null )

Object.defineProperty( Command, '_name', {
  enumerable: false,
  configurable: false,
  writable: true,
  value : undefined
} )

Object.defineProperty( Command, 'retrieve', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name?: string|undefined ): { flags?: { [ p: string ]: FLAG } | null; cb: CommandCallBack } | CommandsDefinition => {

    return typeof name !== 'undefined'
      ? typeof commands[ name ] !== 'undefined'
        ? commands [ name ]
        : undefined
      : commands
  }
} )

Object.defineProperty( Command, 'interceptor', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : async ( parsed: ParsedArgv  ):Promise<void> => {

    let executed: null | string = null
    for ( const key of parsed.keys ){

      if( Object.keys( commands ).includes( key ) ) {

        executed = key

        parsed.keys.splice( parsed.keys.indexOf( key ),  1 )

        delete parsed.object[ key ]

        for ( const flag of Object.keys( parsed.object ) ){

          if( Object.keys( commands[ key ].flags ).includes( flag ) ){
            if( commands[ key ].flags[ flag ].check ){

              for await ( const type_check of check_flag(
                parsed.object[ flag ],
                flag,
                commands[ key ].flags[ flag ].void,
                commands[ key ].flags[ flag ].type,
                commands[ key ].flags[ flag ].cb
              ) ) {
                if ( type_check instanceof Error )
                  await exit( type_check.message, undefined, error_code.FLAG )
                parsed.object[ flag ] = type_check
              }
            }
            parsed.keys.splice( parsed.keys.indexOf( flag ),  1 )
          }else
            await exit( `♠ flag ${Dang.red( flag )} not found`, undefined, error_code.FLAG )

        }
      }else
        await exit( `♠ command ${Dang.red( key )} not found`, undefined, error_code.COMMAND )

    }

    if( await async_( commands[ executed ].cb ) )
      await commands[ executed ].cb( parsed )
    else
      commands[ executed ].cb( parsed )
  }
} )

Object.defineProperty( Command, 'define', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string, cb:CommandCallBack ) => {

    Command._name = name
    if( ! commands[ Command._name ] )
      commands[ name ] = { [ 'flags' ]:{}, [ 'cb' ]: cb }

  }
} )

Object.defineProperty( Command, 'flag', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : async ( name: string, descriptor: FLAG, alias: string[]|undefined = undefined ):Promise<void> => {

    const truthy = () => {
      commands[ Command._name ].flags[ name ] = {
        long: descriptor.long || null,
        short: descriptor.short || null,
        description: descriptor.description || null,
        usage: descriptor.usage || null,
        void: descriptor.void || false,
        type: descriptor.type || 'string',
        check: descriptor.check || false,
        cb: descriptor.cb || null
      }
    }
    const falsy = () => {

      for ( const alias_flag of alias ){
        commands[ Command._name ].flags[ alias_flag ] = {
          long: descriptor.long || null,
          short: descriptor.short || null,
          description: descriptor.description || null,
          usage: descriptor.usage || null,
          void: descriptor.void || false,
          type: descriptor.type || 'string',
          check: descriptor.check || false,
          cb: descriptor.cb || null
        }
      }
    }
    const flag_implementation:()=>void = <()=>void>await undefined_( alias, await resolvers( truthy, falsy ) )
    flag_implementation()
  }
} )

export default Command
