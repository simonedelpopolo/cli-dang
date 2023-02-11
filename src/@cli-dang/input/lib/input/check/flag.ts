import { null_, number_, oftype_, OftypesError, resolvers } from 'oftypes'
import { true_false } from '@cli-dang/boolean'

export default async function* check_flag<CheckFlag> ( data:CheckFlag, name:string, is_void = true, type: string ):AsyncGenerator<unknown>{

  const void_truthy = ():boolean => true
  const void_falsy = ():OftypesError => new OftypesError( `♠ ${name} doesn't accept any value` )

  const check_type = async <type>( data: type ):Promise<type|OftypesError> => {

    if( typeof data === 'undefined' )
      return new OftypesError( `♠ ${name} can't be undefined` )

    const bool:Error|boolean = await true_false( <string> data ).catch( error => error )
    if( ! ( bool instanceof Error )  )
      data = <type> bool

    if( await number_( data ) )
      data = <type> Number( data )

    /**
     * - void flag or any other given type.
     *
     * @example
     *
     * const app = new Command()
     *
     * // add a command to the process, and one flag
     * app.define('command')
     * await app.flag('--flag', {short:'--flag', type:'null', check: true, void: false})
     *
     * // execute the command from shell
     * 'process command --flag'
     * 'process command --flag=3000'
     */
    if( type === 'null' || data === null )
      return data

    // @todo parse any opts value to set properly its type string|number|boolean. keep it simple!
    if( type === 'opts' )
      return data
    else{
      if( await oftype_( data ) === type.charAt( 0 ).toUpperCase() + type.slice( 1 ) )
        return data
    }

    return new OftypesError( `♠ ${name} doesn't accept any other type than: ${type}` )

  }

  const data_type_check = is_void
    // @ts-ignore
    ? await ( await null_( data, await resolvers( void_truthy, void_falsy ) ) )()
    : await check_type( data )

  yield data_type_check

}