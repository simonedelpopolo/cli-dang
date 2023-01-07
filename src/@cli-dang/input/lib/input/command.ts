import check_flag from './check/flag'
import { async_ } from 'oftypes'
import { Commands, CommandsDefinition, ParsedArgv } from './types'
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

Object.defineProperty( Command, '_flag', {
  enumerable: false,
  configurable: false,
  writable: true,
  value : undefined
} )

Object.defineProperty( Command, 'retrieve', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name?: string|undefined ):CommandsDefinition|undefined => {
    // @ts-ignore
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

    for ( const key of parsed.keys ){

      if( Object.keys( commands ).includes( key ) ) {

        parsed.keys.splice( parsed.keys.indexOf( key ),  1 )

        delete parsed.object[ key ]

        for ( const flag of Object.keys( parsed.object ) ){

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
        }
        delete parsed.keys

        if( await async_( commands[ key ].cb ) )
          await commands[ key ].cb( parsed )
        else
          commands[ key ].cb( parsed )
      }

    }
  }
} )

Object.defineProperty( Command, 'define', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string, cb?:<cb>( args?: cb )=> Promise<cb>|Promise<void> | void ) => {

    Command._name = name
    if( ! commands[ Command._name ] )
      commands[ name ] = { [ 'flags' ]:{}, [ 'cb' ]: cb }

  }
} )

Object.defineProperty( Command, 'flag', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ):Commands => {
    Command._flag = name
    commands[ Command._name ].flags[ name ] = {
      long: null,
      short: null,
      description: null,
      usage: null,
      void: null,
      type: null,
      check: null,
      cb: null
    }

    return Command
  }
} )

Object.defineProperty( Command, 'short', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].short = `-${name}`

    return Command
  }
} )

Object.defineProperty( Command, 'long', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].long = `--${name}`

    return Command
  }
} )

Object.defineProperty( Command, 'description', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( text: string ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].description = text

    return Command
  }
} )

Object.defineProperty( Command, 'usage', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( text: string ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].usage = text

    return Command
  }
} )

Object.defineProperty( Command, 'void', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( bool: boolean ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].void = bool

    return Command
  }
} )

Object.defineProperty( Command, 'type', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( string: string ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].type = string

    return Command
  }
} )

Object.defineProperty( Command, 'check', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( bool: boolean ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].check = bool

    return Command
  }
} )

Object.defineProperty( Command, 'cb', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( cb: <cb>( args?: cb )=> Promise<cb>|Promise<void> | void ):Commands => {
    commands[ Command._name ].flags[ Command._flag ].cb = cb

    return Command
  }
} )

export default Command
