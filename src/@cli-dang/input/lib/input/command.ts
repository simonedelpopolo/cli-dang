import check_flag from './check/flag'
import { array_, async_, resolvers } from 'oftypes'
import { Dang } from '@cli-dang/decors'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'
import { inspect } from 'node:util'
import { processor } from '@cli-dang/input'

export class Command implements InterfaceCommand{

  #_name: string | undefined

  #_target: { [command:string]: string|object } | string

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

    if ( Object.keys( parsed.object ).includes( 'help' ) ) {
      this.#_target = parsed.object
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
                  parsed.object[ flag ] = type_check  as never
                  parsed.flag = { [ flag ]: type_check } as object | string
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

  public define( name: string, cb: CommandCallBack, global = false, global_type:GlobalFlagType = 'string', rest_args: RestArgsCallbacks = [] ):void {
    this.#_name = name
    if( global ){
      this.#_global_flag[ name ] = {
        [ 'cb' ]: cb,
        rest_args: rest_args,
        type: global_type
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

      const parsed_global:ParsedArgv = await processor( [ 'global', key ] )
      let parameter = parsed

      if( key.match( '=' ) )
        parameter = key.replace( parsed_global.keys[ 1 ], '' ).replace( '=', '' )

      if ( Object.keys( this.#_global_flag ).includes( parsed_global.keys[ 1 ] ) ) {

        if ( this.#_global_flag[ parsed_global.keys[ 1 ] ]?.cb ) {

          const data = this.#_global_flag[ parsed_global.keys[ 1 ] ].type === 'opts'
            ? parsed_global
            : this.#_global_flag[ parsed_global.keys[ 1 ] ].type === 'string'
              ? parameter
              : parsed

          if ( await async_( this.#_global_flag[ parsed_global.keys[ 1 ] ].cb ) )

            await this.#_global_flag[ parsed_global.keys[ 1 ] ].cb( data, ...this.#_global_flag[ parsed_global.keys[ 1 ] ].rest_args )

          else
            this.#_global_flag[ parsed_global.keys[ 1 ] ].cb( data, ...this.#_global_flag[ parsed_global.keys[ 1 ] ].rest_args )

        }

        parsed.keys.splice( parsed.keys.indexOf( key ), 1 )
        delete parsed.object[ key ]
      }
    }
  }

  /**
   * @example `exec help --view=command:--flag|-f` to retrieve the manual entry of the flag related to the selected command
   * @example `exec help --view=command` to retrieve the manual entry related to the selected command
   * @example `exec help --view=--global-flag` to retrieve the manual entry related to the selected global flag
   *
   * @todo add description and usage properties to commands and global-flags objects.
   * now only the command flag is retrievable!!
   *
   * @private
   */
  #help():void{

    if( this.#_target[ '--view' ] ) {
      if ( this.#_target[ '--view' ].constructor.name === 'String' && this.#_commands[  this.#_target[ '--view' ] ] )
        process.stdout.write( `${ this.#_commands[  this.#_target[ '--view' ] ] }\n` )
      else if(
        this.#_target[ '--view' ].constructor.name === 'Object' &&
        this.#_commands[ Object.keys( this.#_target[ '--view' ] )[ 0 ] ] &&
        this.#_commands[ Object.keys( this.#_target[ '--view' ] )[ 0 ] ].flags[ this.#_target[ '--view' ][ Object.keys( this.#_target[ '--view' ] )[ 0 ] ] ]
      ) {
        process.stdout.write( `${ this.#_commands[ Object.keys( this.#_target[ '--view' ] )[ 0 ] ].flags[ this.#_target[ '--view' ][ Object.keys( this.#_target[ '--view' ] )[ 0 ] ] ].description }\n` )
        process.stdout.write( `${ this.#_commands[ Object.keys( this.#_target[ '--view' ] )[ 0 ] ].flags[ this.#_target[ '--view' ][ Object.keys( this.#_target[ '--view' ] )[ 0 ] ] ].usage }\n` )
      }
      else
        process.stderr.write( `♠ command|flag|glob a-flag not found given --view: ${ inspect( this.#_target[ '--view' ] ) }\n` )
    }
    else {
      process.stderr.write( '`exec help --view=command:--flag` to retrieve the manual page entry of the flag related to selected command\n' )
      process.stderr.write( '`exec help --view=command` to retrieve the manual page entry related to the selected command\n' )
      process.stderr.write( '`exec help --view=--global-flag` to retrieve the manual page entry related to the selected global flag\n' )
    }
  }
}