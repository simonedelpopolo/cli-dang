import check_flag from './check/flag'
import { async_, oftype_, resolvers, undefined_ } from 'oftypes'
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
    let command_argument: null | string = null

    if( parsed?.help ) {

      this.#_target = parsed.help
      await this.#help()

      return

    }

    for ( const key of parsed.keys ) {

      if ( Object.keys( commands )
        .includes( key ) ) {

        executed = key
        if ( typeof parsed.object[ key ] !== 'undefined' && commands[ key ].arguments === false )
          await exit( `♠ command ${ Dang.red( key ) } doesn't accept any argument`, undefined, error_code.COMMAND )
        else
          command_argument = parsed.object[ key ]
        parsed.keys.splice( parsed.keys.indexOf( key ), 1 )

        delete parsed.object[ key ]

        for ( const flag of Object.keys( parsed.object ) ) {

          if ( Object.keys( commands[ key ].flags )
            .includes( flag ) ) {
            if ( commands[ key ].flags[ flag ].check ) {

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
            parsed.keys.splice( parsed.keys.indexOf( flag ), 1 )
          } else
            await exit( `♠ flag ${ Dang.red( flag ) } not found`, undefined, error_code.FLAG )

        }
      } else
        await exit( `♠ command ${ Dang.red( key ) } not found`, undefined, error_code.COMMAND )

    }

    if( commands[ executed ]?.cb ) {
      if ( await async_( commands[ executed ].cb ) )
        await commands[ executed ].cb( parsed, ...( command_argument || [] ) )
      else
        commands[ executed ].cb( parsed, ...( command_argument || [] ) )

    }

  }

  public define( name: string, cb: CommandCallBack, args?: boolean ) {
    this.#_name = name
    if ( !commands[ this.#_name ] )
      commands[ name ] = { [ 'flags' ]: {}, [ 'cb' ]: cb, arguments: args }
  }

  public async flag( name: string, descriptor: FlagDescriptor ) {
    const populate = ( data ) => {
      commands[ this.#_name ].flags[ data ] = {
        long: descriptor.implement.long || null,
        short: descriptor.implement.short || null,
        description: descriptor.implement.description || null,
        usage: descriptor.implement.usage || null,
        void: descriptor.implement.void || false,
        type: descriptor.implement.type || 'string',
        check: descriptor.implement.check || false,
        cb: descriptor.implement.cb || null
      }
    }

    const truthy = () => {
      populate( name )
    }
    const falsy = () => {
      for ( const alias_flag of descriptor.alias )
        populate( alias_flag )
    }

    const implementation: () => void = <() => void>await undefined_( descriptor.alias, await resolvers( truthy, falsy ) )
    implementation()
  }

  async #help(){
    const help_message = `${commands[ this.#_target.command ].flags[ this.#_target.flag ].description} ${commands[ this.#_target.command ].flags[ this.#_target.flag ].usage}`
    process.stdout.write( help_message )
  }
}
