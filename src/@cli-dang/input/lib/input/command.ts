import check_flag from './check/flag'
import { array_, async_, oftype_, resolvers } from 'oftypes'
import { Dang } from '@cli-dang/decors'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'

const commands: CommandsDefinition = {}

export class Command implements InterfaceCommand{

  #_name: string | undefined = undefined

  #_target: { command: string, flag: string }

  public async checkout( name?: string | undefined )
    : Promise<checkoutCommand | CommandsDefinition > {
    const retrieve_commands: CommandsDefinition = <CommandsDefinition>await oftype_( name, { 'undefined': commands } )

    if ( !retrieve_commands && commands[ name ] )
      return commands[ name ]
    else if ( !name )
      return commands

    return undefined

  }

  public async intercept( parsed:ParsedArgv ):Promise<void> {
    let executed: null | string = null

    if( parsed?.help ) {

      this.#_target = parsed.help
      await this.#help()

      return

    }

    for ( const key of parsed.keys ) {

      if (  commands?.[ key ] ) {

        executed = key
        if ( parsed.object?.[ key ] )
          await exit( `♠ command ${ Dang.red( key ) } doesn't accept any argument`, undefined, error_code.COMMAND )

        parsed.keys.splice( parsed.keys.indexOf( key ), 1 )
        parsed.command = key

        delete parsed.object[ key ]

        for ( const flag of Object.keys( parsed.object ) ) {

          if ( commands[ key ]?.flags ) {
            /* - if a flag is present */
            if( commands[ key ].flags?.[ flag ] ){
              if ( commands[ key ].flags[ flag ].check ) {

                for await ( const type_check of check_flag(
                  parsed.object[ flag ],
                  flag,
                  commands[ key ].flags[ flag ].void,
                  commands[ key ].flags[ flag ].type,
                  commands[ key ].flags[ flag ].cb,
                  commands[ key ].flags[ flag ].rest_args
                ) ) {
                  if ( type_check instanceof Error )
                    await exit( type_check.message, undefined, error_code.FLAG )
                  parsed.object[ flag ] = type_check
                  parsed.flag = { [ 'flag' ]:type_check } as object | string
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

    if( commands[ executed ]?.cb ) {
      if ( await async_( commands[ executed ].cb ) )
        await commands[ executed ].cb( parsed, ...( commands[ executed ].rest_args ) )
      else
        commands[ executed ].cb( parsed, ...( commands[ executed ].rest_args ) )

    }

  }

  public define( name: string, cb: CommandCallBack, rest_args: RestArgsCallbacks = [] ) {
    this.#_name = name
    if ( !commands[ this.#_name ] )
      commands[ name ] = { [ 'flags' ]: {}, [ 'cb' ]: cb, rest_args: rest_args }
  }

  public async flag( name: string|string[], descriptor: FlagDescriptor ) {

    const populate = ( data ) => {
      commands[ this.#_name ].flags[ data ] = {
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

  async #help(){
    const help_message = `${commands[ this.#_target.command ].flags[ this.#_target.flag ].description} ${commands[ this.#_target.command ].flags[ this.#_target.flag ].usage}`
    process.stdout.write( help_message )
  }
}
