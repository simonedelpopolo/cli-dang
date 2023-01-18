import check_flag from './check/flag'
import { array_, async_, resolvers } from 'oftypes'
import { Dang } from '@cli-dang/decors'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'
import { processor } from '@cli-dang/input'

export class Command implements InterfaceCommand{

  #_name: string | undefined

  #_target: { command: string, flag: string }

  readonly #_global_flag : GlobalFlag

  readonly #_commands : CommandsDefinition

  constructor() {
    this.#_name = undefined
    this.#_commands = {}
    this.#_global_flag = {}
  }

  public checkout( name?: string | undefined ): checkoutCommand | CommandsDefinition {

    if ( name && this.#_commands?.[ name ] )
      return this.#_commands[ name ]
    else if ( !name )
      return this.#_commands

    return undefined

  }

  public checkout_global( name?: string | undefined ): checkoutGlobal | GlobalFlag {

    if ( name && this.#_global_flag?.[ name ] )
      return this.#_global_flag[ name ]
    else if ( !name )
      return this.#_global_flag

    return undefined

  }

  public async intercept( parsed:ParsedArgv ):Promise<void> {
    let executed: null | string = null

    if( parsed?.help ) {

      this.#_target = parsed.help
      await this.#help()

      return

    }

    if( Object.keys( this.#_global_flag ).length > 0 )
      await this.#global( parsed )

    for ( const key of parsed.keys ) {

      if (  this.#_commands?.[ key ] ) {

        executed = key

        if ( parsed.object?.[ key ] )
          await exit( `♠ command ${ Dang.red( key ) } doesn't accept any argument`, undefined, error_code.COMMAND )

        parsed.keys.splice( parsed.keys.indexOf( key ), 1 )
        delete parsed.object[ key ]

        parsed.command = key
        for ( const flag of Object.keys( parsed.object ) ) {

          if ( this.#_commands[ key ]?.flags ) {
            /* - if a flag is present */
            if ( this.#_commands[ key ].flags?.[ flag ] ) {
              if ( this.#_commands[ key ].flags[ flag ].check ) {

                for await ( const type_check of check_flag(
                  parsed.object[ flag ],
                  flag,
                  this.#_commands[ key ].flags[ flag ].void,
                  this.#_commands[ key ].flags[ flag ].type,
                  this.#_commands[ key ].flags[ flag ].cb,
                  this.#_commands[ key ].flags[ flag ].rest_args
                ) ) {
                  if ( type_check instanceof Error )
                    await exit( type_check.message, undefined, error_code.FLAG )
                  parsed.object[ flag ] = type_check
                  parsed.flag = { [ 'flag' ]: type_check } as object | string
                }
              }
              parsed.keys.splice( parsed.keys.indexOf( flag ), 1 )
            } else

              await exit( `♠ flag ${ Dang.red( flag ) } not found`, undefined, error_code.FLAG )

          }

        }

      } else
        await exit( `♠ command ${ Dang.red( key ) } not found`, undefined, error_code.COMMAND )

    }

    if( this.#_commands[ executed ]?.cb ) {
      if ( await async_( this.#_commands[ executed ].cb ) )
        await this.#_commands[ executed ].cb( parsed, ...( this.#_commands[ executed ].rest_args ) )
      else
        this.#_commands[ executed ].cb( parsed, ...( this.#_commands[ executed ].rest_args ) )

    }

  }

  public define( name: string, cb: CommandCallBack, global = false, rest_args: RestArgsCallbacks = [] ):void {
    this.#_name = name
    if( global ){
      this.#_global_flag[ name ] = {
        [ 'cb' ]: cb,
        rest_args: rest_args,
      }
    }

    else {
      if ( !this.#_commands[ this.#_name ] )
        this.#_commands[ name ] = { [ 'flags' ]: {}, [ 'cb' ]: cb, rest_args: rest_args }
    }
  }

  public async flag( name: string|string[], descriptor: FlagDescriptor ):Promise<void> {

    const populate = ( data ) => {
      this.#_commands[ this.#_name ].flags[ data ] = {
        long: descriptor.long || null,
        short: descriptor.short || null,
        description: descriptor.description || null,
        usage: descriptor.usage || null,
        void: descriptor.void || false,
        type: descriptor.type || 'string',
        check: descriptor.check || false,
        cb: descriptor.cb || null,
        rest_args: descriptor.rest_args || []
      }
    }

    const truthy = () => {
      for ( const alias of name )
        populate( alias )

    }
    const falsy = () => {
      populate( name )
    }

    const implementation: () => void = <() => void>await array_( name, await resolvers( truthy, falsy ) )
    implementation()
  }

  async #global( parsed ):Promise<void>{
    for( const key of parsed.keys ){
      const parsed_global = await processor( [ 'global', key ] )
      let parameter = undefined
      if( key.match( '=' ) )
        parameter = key.replace( parsed_global.keys[ 1 ], '' ).replace( '=', '' )


      if ( Object.keys( this.#_global_flag ).includes( parsed_global.keys[ 1 ] ) ) {

        if ( this.#_global_flag[ parsed_global.keys[ 1 ] ]?.cb ) {

          if ( await async_( this.#_global_flag[ parsed_global.keys[ 1 ] ].cb ) )
            await this.#_global_flag[ parsed_global.keys[ 1 ] ].cb( parameter, ...this.#_global_flag[ parsed_global.keys[ 1 ] ].rest_args )
          else
            this.#_global_flag[ parsed_global.keys[ 1 ] ].cb( parameter, ...this.#_global_flag[ parsed_global.keys[ 1 ] ].rest_args )

        }

        parsed.keys.splice( parsed.keys.indexOf( key ), 1 )
        delete parsed.object[ key ]
      }
    }

  }

  #help():void{
    const help_message = `${this.#_commands[ this.#_target.command ].flags[ this.#_target.flag ].description} ${this.#_commands[ this.#_target.command ].flags[ this.#_target.flag ].usage}`
    process.stdout.write( help_message )
  }
}
